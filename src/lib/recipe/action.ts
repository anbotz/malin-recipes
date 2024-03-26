"use server";
import { MongoId } from "@/types/query";
import service from "./service";
import { revalidatePath } from "next/cache";
import { IngredientLine } from "@prisma/client";

export const createRecipeAction = async (
  formData: FormData,
  lineUuids: string[]
) => {
  const name = formData.get("name") as string;
  const instructionsStr = formData.get("instructions") as string;
  const qtCounter = parseInt(formData.get("qtCounter") as string);

  const ingredientLines: IngredientLine[] = lineUuids.map((uuid) => ({
    quantity: parseInt(formData.get(`quantity-${uuid}`) as string),
    unit: formData.get(`unit-${uuid}`) as string,
    ingredient: formData.get(`ingredient-${uuid}`) as string,
  }));

  const data = await service.createRecipe({
    name,
    ingredientLines,
    instructionsStr,
    qtCounter,
  });

  if (data) {
    return revalidatePath("/");
  } else {
    return console.error(`Failed to create recipe`);
  }
};

export const updateRecipeAction = async (id: MongoId, formData: FormData) => {
  const name = formData.get("name") as string;
  const ingredientsStr = formData.get("ingredients") as string;
  const instructionsStr = formData.get("instructions") as string;
  const qtCounter = parseInt(formData.get("qtCounter") as string);

  const data = await service.updateRecipeById(id, {
    name,
    ingredientsStr,
    instructionsStr,
    qtCounter,
  });

  if (data) {
    return revalidatePath("/");
  } else {
    return console.error(`Failed to update recipe`);
  }
};

export const uploadImageRecipeAction = async (
  id: MongoId,
  imageUrl: string
) => {
  const data = await service.updateRecipeById(id, {
    imageUrl,
  });

  if (data) {
    return revalidatePath("/");
  } else {
    return console.error(`Failed to update recipe image`);
  }
};

export const deleteRecipeAction = async (id: MongoId) => {
  const data = await service.deleteRecipeById(id);

  if (data) {
    return revalidatePath("/");
  } else {
    return console.error(`Failed to delete recipe`);
  }
};
