import { MongoId } from "@/_types/query";
import UserModel from "../user/model";
import RecipeModel from "../recipe/model";

const shuffleUserBatch = async (id: MongoId, size: number) => {
  const recipes = await RecipeModel.batch(size);

  if (!recipes) {
    throw new Error("No recipe found");
  }

  const batch = recipes.map((recipes) => recipes.id.toString());

  await UserModel.updateById(id, { batch });

  return batch;
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

const updateOneRecipeFromUserBatch = async (userId: MongoId, index: number) => {
  const user = await UserModel.getById(userId);

  if (!user) {
    throw new Error("No user found");
  }

  const batch = user.batch;

  const recipes = await RecipeModel.batch(1);

  const newRecipe = recipes[0];

  batch[index] = newRecipe.id;

  const ee = await UserModel.updateById(userId, { batch });

  return batch;
};

const business = {
  shuffleUserBatch,
  getUserBatch,
  updateOneRecipeFromUserBatch,
};

export default business;
