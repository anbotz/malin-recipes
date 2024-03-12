import { MongoId, ServiceResponse } from "@/types/query";
import RecipeModel from "../../model/recipe.model";
import { Batch, Recipe, User } from "@prisma/client";
import BatchModel from "../../model/batch.model";
import openAiService from "@/lib/openAi/service";
import userService from "@/lib/user/service";
import { CreateBatchData } from "@/types/batch";
import { errorMessage } from "../utils";

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
): Promise<ServiceResponse<string[]>> => {
  try {
    const { data: user } = await userService.getSessionUser();

    if (!user) {
      throw new Error("No user found");
    }

    const batch = user.batch;

    if (batch.length === 0 || batch.length !== size) {
      const { data } = await shuffleUserBatch(user.id, size);
      return { data };
    }

    return { data: batch };
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
  userId,
  recipeIds,
  ingredients,
  instructions,
}: CreateBatchData): Promise<ServiceResponse<Batch>> => {
  try {
    console.log("created");

    const createdBatch = await BatchModel.create({
      ingredients,
      instructions,
      recipeIds,
      userId,
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

    const recipes = await RecipeModel.getManyRandom(1);

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

export const cook = async ({
  qt,
}: {
  qt: number;
}): Promise<ServiceResponse<Batch>> => {
  try {
    const { data: user } = await userService.getSessionUser();

    if (!user) {
      throw new Error("No user found");
    }

    const { data } = await getRecipesFromBatch();

    if (!data?.recipes || !data?.recipeIds) {
      throw new Error();
    }

    const { recipes, recipeIds } = data;

    const { data: alreadyBatch } = await getBatchByRecipeIds(recipeIds);
    if (alreadyBatch) {
      console.log("This batch already exists");

      return { data: alreadyBatch };
    }

    const { data: createdBatch } = await openAiService.createBatchFromAi({
      userId: user.id,
      qt,
      recipes,
    });

    return { data: createdBatch };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}cook`);
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
  cook,
};

export default service;
