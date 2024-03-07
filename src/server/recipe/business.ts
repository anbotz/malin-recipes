import Query, { MongoId } from "@/_types/query";
import Recipe from "@/_types/recipe";
import RecipeModel from "./model";

const createRecipe = async (
  name: string,
  ingredientsStr: string,
  instructionsStr: string
) => {
  const ingredients = ingredientsStr.split("\n");
  const instructions = instructionsStr.split("\n");

  await RecipeModel.create({ name, ingredients, instructions });
};

const searchRecipe = async (query: Query): Promise<Recipe[]> => {
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

const deleteRecipeById = async (id: MongoId): Promise<Recipe | null> =>
  await RecipeModel.deleteById(id);

const updateRecipeById = async (
  id: MongoId,
  updatedData: {
    name?: string;
    ingredientsStr?: string;
    instructionsStr?: string;
  }
): Promise<Recipe | null> => {
  const ingredients = updatedData.ingredientsStr?.split("\n") || undefined;
  const instructions = updatedData.instructionsStr?.split("\n") || undefined;
  const data = { name: updatedData.name, ingredients, instructions };
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
