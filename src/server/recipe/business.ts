import Query, { MongoId } from "@/_types/query";
import Recipe from "@/_types/recipe";
import RecipeModel from "./model";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3/s3client";

const createRecipe = async (
  name: string,
  ingredientsStr: string,
  instructionsStr: string
) => {
  const ingredients =
    ingredientsStr.length > 0 ? ingredientsStr.split("\n") : [];
  const instructions =
    instructionsStr.length > 0 ? instructionsStr.split("\n") : [];

  // FIXME create qtCounter on both forms
  const qtCounter = 2;
  await RecipeModel.create({ name, ingredients, instructions, qtCounter });
};

const searchRecipe = async (
  query: Query
): Promise<{ data: Recipe[]; total: number }> => {
  const recipes = await RecipeModel.search(query);
  return recipes;
};

const getLatestRecipes = async (): Promise<Recipe[]> => {
  const recipes = await RecipeModel.getLatestRecipes();
  return recipes;
};

const getRecipeById = async (id: MongoId): Promise<Recipe | null> => {
  const recipe = await RecipeModel.getById(id);
  return recipe;
};

const deleteRecipeById = async (id: MongoId): Promise<Recipe | null> => {
  const deletedRecipe = await RecipeModel.deleteById(id);

  if (deletedRecipe) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: id,
    });

    await s3Client.send(deleteObjectCommand);
  }

  return deletedRecipe;
};

const updateRecipeById = async (
  id: MongoId,
  updatedData: {
    name?: string;
    ingredientsStr?: string;
    instructionsStr?: string;
    imageUrl?: string;
  }
): Promise<Recipe | null> => {
  const ingredients =
    updatedData.ingredientsStr && updatedData.ingredientsStr.length > 0
      ? updatedData.ingredientsStr?.split("\n")
      : undefined;

  const instructions =
    updatedData.instructionsStr && updatedData.instructionsStr.length > 0
      ? updatedData.instructionsStr?.split("\n")
      : undefined;

  const data = {
    name: updatedData.name,
    ingredients,
    instructions,
    imageUrl: updatedData.imageUrl,
  };

  const recipe = await RecipeModel.updateById({ id, data });
  return recipe;
};

const business = {
  createRecipe,
  searchRecipe,
  getLatestRecipes,
  getRecipeById,
  deleteRecipeById,
  updateRecipeById,
};

export default business;
