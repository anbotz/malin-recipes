import { MongoId } from "@/_types/query";
import UserModel from "../../model/user.model";
import RecipeModel from "../../model/recipe.model";
import { Batch, Recipe } from "@prisma/client";
import BatchModel from "../../model/batch.model";
import { CreateBatchData } from "@/_types/batch";

const shuffleUserBatch = async (
  id: MongoId,
  size: number
): Promise<string[]> => {
  try {
    const recipes = await RecipeModel.getManyRandom(size);

    if (!recipes) {
      throw new Error("No recipe found");
    }

    const recipeIds = recipes.map((recipes) => recipes.id.toString());

    await UserModel.updateById(id, { batch: recipeIds });

    return recipeIds;
  } catch (error) {
    return [];
  }
};

const getUserBatch = async (
  id: MongoId,
  size: number
): Promise<string[] | null> => {
  try {
    const user = await UserModel.getById(id);

    if (!user) {
      throw new Error("No user found");
    }

    const batch = user.batch;

    if (batch.length === 0 || batch.length !== size) {
      return await shuffleUserBatch(id, size);
    }

    return batch;
  } catch (e) {
    return [];
  }
};

const getRecipesFromBatch = async ({
  userId,
}: {
  userId: MongoId;
}): Promise<{ recipes: Recipe[]; recipeIds: string[] } | null> => {
  try {
    const user = await UserModel.getById(userId);

    if (!user) {
      throw new Error("No user found");
    }

    const batch = user.batch;

    if (batch.length === 0) {
      throw new Error("No batch found");
    }
    const recipes = await RecipeModel.getManyRecipeByIds(batch);

    return { recipes, recipeIds: batch };
  } catch (e) {
    return null;
  }
};

const getBatchById = async (id: MongoId): Promise<Batch | null> =>
  await BatchModel.getById(id);

const create = async ({
  userId,
  recipeIds,
  ingredients,
  instructions,
}: CreateBatchData): Promise<Batch | null> => {
  try {
    console.log("created");

    const createdBatch = await BatchModel.create({
      ingredients,
      instructions,
      recipeIds,
      userId,
    });
    return createdBatch;
  } catch (error) {
    return null;
  }
};

const getBatchByRecipeIds = async (
  recipeIds: MongoId[]
): Promise<Batch | null> => {
  try {
    const batchs = await BatchModel.getManyByRecipeIds(recipeIds);

    if (batchs === null) return null;

    if (batchs.length > 1) {
      throw new Error("more than one same batch");
    }

    return batchs[0];
  } catch (e) {
    return null;
  }
};

const updateOneRecipeFromUserBatch = async (userId: MongoId, index: number) => {
  const user = await UserModel.getById(userId);

  if (!user) {
    throw new Error("No user found");
  }

  const batch = user.batch;

  const recipes = await RecipeModel.getManyRandom(1);

  const newRecipe = recipes[0];

  batch[index] = newRecipe.id;

  await UserModel.updateById(userId, { batch });

  return batch;
};

const service = {
  shuffleUserBatch,
  getUserBatch,
  updateOneRecipeFromUserBatch,
  getRecipesFromBatch,
  getBatchByRecipeIds,
  create,
  getBatchById,
};

export default service;
