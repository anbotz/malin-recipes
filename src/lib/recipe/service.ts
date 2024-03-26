import Query, { MongoId, ServiceResponse } from "@/types/query";
import RecipeModel from "../../model/recipe.model";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3/s3client";
import { errorMessage } from "../utils";
import { Health, IngredientLine, Recipe } from "@prisma/client";

const ERROR_MESSAGE = "Error on recipe.service.";

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
  try {
    const ingredients = ingredientLines.map(
      ({ quantity, unit, ingredient }) => `${quantity}${unit} ${ingredient}`
    );

    const instructions =
      instructionsStr.length > 0 ? instructionsStr.split("\n") : [];

    const data = await RecipeModel.create({
      name,
      ingredients,
      instructions,
      ingredientLines,
      qtCounter,
      health,
    });

    return { data };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}createRecipe`);
  }
};

const searchRecipe = async (
  query: Query
): Promise<ServiceResponse<{ data: Recipe[]; total: number }>> => {
  try {
    const data = await RecipeModel.search(query);

    return { data };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}searchRecipe`);
  }
};

const getLatestRecipes = async (): Promise<ServiceResponse<Recipe[]>> => {
  try {
    const data = await RecipeModel.getLatestRecipes();

    return { data };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}getLatestRecipes`);
  }
};

const getRecipeById = async (
  id: MongoId
): Promise<ServiceResponse<Recipe | null>> => {
  try {
    const data = await RecipeModel.getById(id);

    return { data };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}getRecipeById`);
  }
};

const deleteRecipeById = async (
  id: MongoId
): Promise<ServiceResponse<Recipe | null>> => {
  try {
    const data = await RecipeModel.deleteById(id);
    if (data) {
      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: id,
      });

      await s3Client.send(deleteObjectCommand);
    }
    return { data };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}deleteRecipeById`);
  }
};

const updateRecipeById = async (
  id: MongoId,
  updatedData: {
    name?: string;
    ingredientsStr?: string;
    instructionsStr?: string;
    imageUrl?: string;
    qtCounter?: number;
  }
): Promise<ServiceResponse<Recipe | null>> => {
  try {
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
      qtCounter: updatedData.qtCounter,
    };

    const updatedRecipe = await RecipeModel.updateById({ id, data });

    return { data: updatedRecipe };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}updateRecipeById`);
  }
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
