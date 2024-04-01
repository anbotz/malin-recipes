import Query, { MongoId, ServiceResponse } from "@/types/query";
import RecipeModel from "../../model/recipe.model";
import { Batch, Recipe, User } from "@prisma/client";
import BatchModel from "../../model/batch.model";
import AiService from "@/lib/ai/service";
import userService from "@/lib/user/service";
import { CreateBatchData } from "@/types/batch";
import { hasDuplicates, isDateExpired } from "../utils";
import { getPermissions } from "../permission";
import { PERMISSIONS } from "../permission/const";

const ERROR_MESSAGE = "Batch.service :";

const shuffleUserBatch = async (
  id: MongoId,
  size: number
): Promise<ServiceResponse<string[]>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.READ)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to shuffleUserBatch`
    );
  }

  const recipes = await RecipeModel.getManyRandom(size);

  if (!recipes) {
    throw new Error(`${ERROR_MESSAGE} No recipe found on shuffleUserBatch`);
  }

  const recipeIds = recipes.map((recipes) => recipes.id.toString());

  await userService.updateById(id, { batch: recipeIds });

  return { data: recipeIds };
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
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.READ)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to getUserBatch`
    );
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
};

const getRecipesFromBatch = async (): Promise<
  ServiceResponse<{ recipes: Recipe[]; recipeIds: string[] }>
> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.READ)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to getRecipesFromBatch`
    );
  }

  const batch = user.batch;

  if (batch.length === 0) {
    throw new Error(`${ERROR_MESSAGE} No batch found on getRecipesFromBatch`);
  }

  const recipes = await RecipeModel.getManyRecipeByIds(batch);

  if (!recipes) {
    throw new Error(`${ERROR_MESSAGE} No recipe found on getRecipesFromBatch`);
  }

  return { data: { recipes, recipeIds: batch } };
};

const getBatchById = async (
  id: MongoId
): Promise<ServiceResponse<Batch | null>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.READ)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to getBatchById`
    );
  }

  const data = await BatchModel.getById(id);

  return { data };
};

const create = async ({
  creator,
  userId,
  recipeIds,
  recipeNames,
  ingredients,
  instructions,
}: CreateBatchData): Promise<ServiceResponse<Batch>> => {
  console.log("creating batch ...");
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.COOK)) {
    throw new Error(`${ERROR_MESSAGE} User has not the permission to create`);
  }

  const createdBy = { creator: user.name ?? "Malin", userId: user.id };

  const createdBatch = await BatchModel.create({
    ingredients,
    instructions,
    recipeIds,
    recipeNames,
    userId,
    creator,
    createdBy,
  });

  if (!createdBatch) {
    throw new Error("No batch has been created");
  }

  return { data: createdBatch };
};

const getBatchByRecipeIds = async (
  recipeIds: MongoId[]
): Promise<ServiceResponse<Batch | null>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.READ)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to getBatchByRecipeIds`
    );
  }

  const batchs = await BatchModel.getManyByRecipeIds(recipeIds);

  if (batchs === null) return { data: null };

  if (batchs.length > 1) {
    throw new Error("Batch is not unique");
  }

  return { data: batchs[0] };
};

const updateOneRecipeFromUserBatch = async (
  index: number
): Promise<ServiceResponse<User>> => {
  const { data: user } = await userService.getSessionUser();

  const batch = user.batch;

  const recipes = await RecipeModel.getManyRandom(1, batch);

  if (!recipes) {
    throw new Error(
      `${ERROR_MESSAGE} No recipe found on updateOneRecipeFromUserBatch`
    );
  }

  const newRecipe = recipes[0];

  batch[index] = newRecipe.id;

  const { data: updatedUser } = await userService.updateById(user.id, {
    batch,
  });

  return {
    data: updatedUser,
    success: `User ${user.id} batch recipe at index ${index} succesfully updated`,
  };
};

const checkExistingBatch = async (): Promise<
  ServiceResponse<{ batchId?: string; isBatchLocked: boolean }>
> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.COOK)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to checkExistingBatch`
    );
  }

  const { data } = await getRecipesFromBatch();

  if (!data?.recipes || !data?.recipeIds) {
    throw new Error(`${ERROR_MESSAGE} No recipe found on checkExistingBatch`);
  }

  const { recipeIds } = data;

  if (hasDuplicates(recipeIds)) {
    throw new Error(
      `${ERROR_MESSAGE} Batchs has duplicated recipe on checkExistingBatch`
    );
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
};

const generateFromAi = async ({
  qt,
}: {
  qt: number;
}): Promise<ServiceResponse<Batch>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.UNLIMITED_COOK)) {
    if (!permissions.includes(PERMISSIONS.BATCH.COOK)) {
      throw new Error(
        `${ERROR_MESSAGE} User has not the permission to generateFromAi`
      );
    }

    const isBatchLocked = isDateExpired(user.lockBatchExpiresAt);

    if (isBatchLocked) {
      throw new Error(
        `${ERROR_MESSAGE} User can not generate a new batch on generateFromAi`
      );
    }
  }

  const { data } = await getRecipesFromBatch();

  if (!data?.recipes) {
    throw new Error(`${ERROR_MESSAGE} No recipe found on generateFromAi`);
  }

  const { recipes } = data;

  const createdBatchResponse = await AiService.createBatchFromAi({
    userId: user.id,
    qt,
    recipes,
  });

  return createdBatchResponse;
};

const searchBatch = async (
  query: Query
): Promise<ServiceResponse<{ data: Batch[]; total: number } | null>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.READ)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to searchBatch`
    );
  }

  const data = await BatchModel.search(query);

  return { data };
};

const deleteBatchById = async (
  id: MongoId
): Promise<ServiceResponse<Batch>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.DELETE)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to deleteBatchById`
    );
  }

  const data = await BatchModel.deleteById(id);

  if (!data) {
    throw new Error(`${ERROR_MESSAGE} No recipe deleted on deleteBatchById`);
  }

  return { data };
};

const updateBatchById = async (
  id: MongoId,
  updatedData: {
    name?: string;
    description?: string;
  }
): Promise<ServiceResponse<Batch | null>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.BASIC_UPDATE)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to updateBatchById`
    );
  }

  const updatedRecipe = await BatchModel.updateById({
    id,
    data: updatedData,
  });

  if (!updatedRecipe) {
    throw new Error(`${ERROR_MESSAGE} No recipe updated on updateBatchById`);
  }

  return { data: updatedRecipe };
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
