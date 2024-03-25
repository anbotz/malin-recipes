import Query, { MongoId, ServiceResponse } from "@/types/query";
import RecipeModel from "../../model/recipe.model";
import { Batch, Recipe, User } from "@prisma/client";
import BatchModel from "../../model/batch.model";
import openAiService from "@/lib/ai/service";
import userService from "@/lib/user/service";
import { CreateBatchData } from "@/types/batch";
import { errorMessage, hasDuplicates, isDateExpired } from "../utils";
import { getPermissions } from "../permission";
import { PERMISSIONS } from "../permission/const";

const ERROR_MESSAGE = "Error on batch.service.";

const shuffleUserBatch = async (
  id: MongoId,
  size: number
): Promise<ServiceResponse<string[]>> => {
  try {
    const recipes = await RecipeModel.getManyRandom(size);

    if (!recipes) {
      throw new Error("No recipe found");
    }

    const recipeIds = recipes.map((recipes) => recipes.id.toString());

    await userService.updateById(id, { batch: recipeIds });

    return { data: recipeIds };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}shuffleUserBatch`);
  }
};

const getUserBatch = async (
  size: number
): Promise<
  ServiceResponse<{
    isBatchLocked: boolean;
    batch?: string[];
    lockBatchExpiresAt?: Date;
  }>
> => {
  try {
    const { data: user } = await userService.getSessionUser();

    if (!user) {
      throw new Error("No user found");
    }

    const batch = user.batch;
    const isBatchLocked = isDateExpired(user.lockBatchExpiresAt);

    if (batch.length === 0 || batch.length !== size) {
      const { data } = await shuffleUserBatch(user.id, size);
      return {
        data: {
          batch: data,
          isBatchLocked,
          lockBatchExpiresAt: user.lockBatchExpiresAt || undefined,
        },
      };
    }

    return {
      data: {
        batch,
        isBatchLocked,
        lockBatchExpiresAt: user.lockBatchExpiresAt || undefined,
      },
    };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}getUserBatch`);
  }
};

const getRecipesFromBatch = async (): Promise<
  ServiceResponse<{ recipes: Recipe[]; recipeIds: string[] }>
> => {
  try {
    const { data: user } = await userService.getSessionUser();

    if (!user) {
      throw new Error("No user found");
    }

    const batch = user.batch;

    if (batch.length === 0) {
      throw new Error("No batch found");
    }
    const recipes = await RecipeModel.getManyRecipeByIds(batch);

    return { data: { recipes, recipeIds: batch } };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}getRecipesFromBatch`);
  }
};

const getBatchById = async (id: MongoId): Promise<ServiceResponse<Batch>> => {
  try {
    const data = await BatchModel.getById(id);

    if (!data) {
      throw new Error("No batch found");
    }

    return { data };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}getBatchById`);
  }
};

const create = async ({
  creator,
  userId,
  recipeIds,
  recipeNames,
  ingredients,
  instructions,
}: CreateBatchData): Promise<ServiceResponse<Batch>> => {
  try {
    console.log("created");

    const createdBatch = await BatchModel.create({
      ingredients,
      instructions,
      recipeIds,
      recipeNames,
      userId,
      creator,
    });
    return { data: createdBatch };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}create`);
  }
};

const getBatchByRecipeIds = async (
  recipeIds: MongoId[]
): Promise<ServiceResponse<Batch | null>> => {
  try {
    const batchs = await BatchModel.getManyByRecipeIds(recipeIds);

    if (batchs === null) return { data: null };

    if (batchs.length > 1) {
      throw new Error("Batch is not unique");
    }

    return { data: batchs[0] };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}getBatchByRecipeIds`);
  }
};

const updateOneRecipeFromUserBatch = async (
  index: number
): Promise<ServiceResponse<User>> => {
  try {
    const { data: user } = await userService.getSessionUser();

    if (!user) {
      throw new Error("No user found");
    }

    const batch = user.batch;

    const recipes = await RecipeModel.getManyRandom(1, batch);

    const newRecipe = recipes[0];

    batch[index] = newRecipe.id;

    const { data: updatedUser } = await userService.updateById(user.id, {
      batch,
    });

    return {
      data: updatedUser,
      success: `User ${user.id} batch recipe at index ${index} succesfully updated`,
    };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}updateOneRecipeFromUserBatch`);
  }
};

const checkExistingBatch = async (): Promise<
  ServiceResponse<{ batchId?: string; isBatchLocked: boolean }>
> => {
  try {
    const { data: user } = await userService.getSessionUser();

    if (!user) {
      throw new Error("No user found");
    }

    const { data } = await getRecipesFromBatch();

    if (!data?.recipes || !data?.recipeIds) {
      throw new Error("No recipes found");
    }

    const { recipeIds } = data;

    if (hasDuplicates(recipeIds)) {
      throw new Error("Batchs has duplicated recipe");
    }

    const { data: alreadyBatch } = await getBatchByRecipeIds(recipeIds);

    const batchId = alreadyBatch?.id ?? undefined;

    if (batchId) {
      console.log("This batch already exists");
    } else {
      console.log("This batch does not exist");
    }

    const isBatchLocked = isDateExpired(user.lockBatchExpiresAt);

    return { data: { batchId, isBatchLocked } };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}checkExistingBatch`);
  }
};

const generateFromAi = async ({
  qt,
}: {
  qt: number;
}): Promise<ServiceResponse<Batch>> => {
  try {
    const { data: user } = await userService.getSessionUser();

    if (!user) {
      throw new Error("No user found");
    }
    const permissions = getPermissions(user);

    if (!permissions.includes(PERMISSIONS.BATCH.UNLIMITED_COOK)) {
      const isBatchLocked = isDateExpired(user.lockBatchExpiresAt);

      if (isBatchLocked) {
        throw new Error("User can not generate a new batch");
      }
    }

    const { data } = await getRecipesFromBatch();

    if (!data?.recipes) {
      throw new Error("No recipes found");
    }

    const { recipes } = data;

    const createdBatchResponse = await openAiService.createBatchFromAi({
      userId: user.id,
      qt,
      recipes,
    });

    return createdBatchResponse;
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}cook`);
  }
};

const searchBatch = async (
  query: Query
): Promise<ServiceResponse<{ data: Batch[]; total: number }>> => {
  try {
    const data = await BatchModel.search(query);

    return { data };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}searchBatch`);
  }
};

const deleteBatchById = async (
  id: MongoId
): Promise<ServiceResponse<Batch | null>> => {
  try {
    const data = await BatchModel.deleteById(id);

    return { data };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}deleteBatchById`);
  }
};

const updateBatchById = async (
  id: MongoId,
  updatedData: {
    name?: string;
    description?: string;
  }
): Promise<ServiceResponse<Batch | null>> => {
  try {
    const updatedRecipe = await BatchModel.updateById({
      id,
      data: updatedData,
    });

    return { data: updatedRecipe };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}updateBatchById`);
  }
};

const service = {
  shuffleUserBatch,
  getUserBatch,
  updateOneRecipeFromUserBatch,
  getRecipesFromBatch,
  getBatchByRecipeIds,
  create,
  getBatchById,
  checkExistingBatch,
  generateFromAi,
  searchBatch,
  deleteBatchById,
  updateBatchById,
};

export default service;
