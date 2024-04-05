import Query, { MongoId, ServiceResponse } from "@/types/query";
import RecipeModel from "../../model/recipe.model";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3/s3client";
import userService from "@/lib/user/service";

import { Health, IngredientLine, Recipe } from "@prisma/client";
import { getPermissions } from "../permission";
import { PERMISSIONS } from "../permission/const";

const ERROR_MESSAGE = "Recipe.service :";

const createRecipe = async ({
  name,
  ingredientLines,
  instructionsStr,
  qtCounter,
  health,
}: {
  name: string;
  ingredientLines: IngredientLine[];
  instructionsStr: string;
  qtCounter: number;
  health: Health[];
}): Promise<ServiceResponse<Recipe>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.RECIPE.CREATE)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to createRecipe`
    );
  }

  const ingredients = ingredientLines.map(
    ({ quantity, unit, ingredient }) => `${quantity}${unit} ${ingredient}`
  );

  const instructions =
    instructionsStr.length > 0 ? instructionsStr.split("\n") : [];

  const createdBy = { creator: user.name ?? "Malin", userId: user.id };

  const data = await RecipeModel.create({
    name,
    ingredients,
    instructions,
    ingredientLines,
    qtCounter,
    health,
    createdBy,
  });

  if (!data) {
    throw new Error(`${ERROR_MESSAGE} No recipe created`);
  }

  return { data };
};

const searchRecipe = async (
  query: Query
): Promise<ServiceResponse<{ data: Recipe[]; total: number }>> => {
  const data = await RecipeModel.search(query);

  return { data };
};

const getLatestRecipes = async (): Promise<ServiceResponse<Recipe[]>> => {
  const data = await RecipeModel.getLatestRecipes();

  return { data };
};

const getRecipeById = async (
  id: MongoId
): Promise<ServiceResponse<Recipe | null>> => {
  const data = await RecipeModel.getById(id);

  return { data };
};

const deleteRecipeById = async (
  id: MongoId
): Promise<ServiceResponse<Recipe>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.RECIPE.DELETE)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to deleteRecipeById`
    );
  }

  const data = await RecipeModel.deleteById(id);

  if (!data) {
    throw new Error(`${ERROR_MESSAGE} No recipe to delete`);
  }

  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: id,
  });

  await s3Client.send(deleteObjectCommand);

  return { data };
};

const updateRecipeById = async (
  id: MongoId,
  updatedData: {
    name?: string;
    ingredientsStr?: string;
    instructionsStr?: string;
    imageUrl?: string;
    qtCounter?: number;
    health?: Health[];
    ingredientLines?: IngredientLine[];
  }
): Promise<ServiceResponse<Recipe>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.RECIPE.UPDATE)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to updateRecipeById`
    );
  }

  const { ingredientsStr, instructionsStr, ...rest } = updatedData;

  const ingredients =
    ingredientsStr && ingredientsStr.length > 0
      ? updatedData.ingredientsStr?.split("\n")
      : undefined;

  const instructions =
    instructionsStr && instructionsStr.length > 0
      ? updatedData.instructionsStr?.split("\n")
      : undefined;

  const data = {
    ingredients,
    instructions,
    ...rest,
  };

  const updatedRecipe = await RecipeModel.updateById({ id, data });

  if (!updatedRecipe) {
    throw new Error(`${ERROR_MESSAGE} No recipe updated`);
  }

  return { data: updatedRecipe };
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
