"use server";
import { MongoId } from "@/types/query";
import service from "./service";
import { revalidatePath } from "next/cache";
import { IngredientLine } from "@prisma/client";
import { HEALTHS } from "../const";

export const createRecipeAction = async (
  formData: FormData,
  lineUuids: string[]
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const name = formData.get("name") as string;
      const instructionsStr = formData.get("instructions") as string;
      const qtCounter = parseInt(formData.get("qtCounter") as string);
      const health = HEALTHS.filter((h) => !!formData.get(`health.${h}`));

      const ingredientLines: IngredientLine[] = lineUuids.map((uuid) => ({
        quantity: parseInt(formData.get(`quantity-${uuid}`) as string),
        unit: formData.get(`unit-${uuid}`) as string,
        ingredient: formData.get(`ingredient-${uuid}`) as string,
      }));

      await service.createRecipe({
        name,
        ingredientLines,
        instructionsStr,
        qtCounter,
        health,
      });

      resolve(revalidatePath("/"));
    } catch (error: any) {
      reject(new Error(error.message + " on createRecipe"));
    }
  });
};

export const updateRecipeAction = async (
  id: MongoId,
  formData: FormData,
  lineUuids: string[]
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const name = formData.get("name") as string;
      const ingredientsStr = formData.get("ingredients") as string;
      const instructionsStr = formData.get("instructions") as string;
      const qtCounter = parseInt(formData.get("qtCounter") as string);
      const health = HEALTHS.filter((h) => !!formData.get(`health.${h}`));

      const ingredientLines: IngredientLine[] = lineUuids.map((uuid) => ({
        quantity: parseInt(formData.get(`quantity-${uuid}`) as string),
        unit: formData.get(`unit-${uuid}`) as string,
        ingredient: formData.get(`ingredient-${uuid}`) as string,
      }));

      await service.updateRecipeById(id, {
        name,
        ingredientsStr,
        instructionsStr,
        qtCounter,
        health,
        ingredientLines,
      });

      resolve(revalidatePath("/"));
    } catch (error: any) {
      reject(new Error(error.message + " on updateRecipe"));
    }
  });
};

export const uploadImageRecipeAction = async (
  id: MongoId,
  imageUrl: string
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await service.updateRecipeById(id, {
        imageUrl,
      });

      resolve(revalidatePath("/"));
    } catch (error: any) {
      reject(new Error(error.message + " on uploadImageRecipe"));
    }
  });
};

export const deleteRecipeAction = async (id: MongoId): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await service.deleteRecipeById(id);

      resolve(revalidatePath("/"));
    } catch (error: any) {
      reject(new Error(error.message + " on deleteRecipe"));
    }
  });
};
