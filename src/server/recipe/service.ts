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

const service = { createRecipe, searchRecipe, getLatestRecipes, getRecipeById };
export default service;
