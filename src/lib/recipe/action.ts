"use server";
import { MongoId } from "@/types/query";
import service from "./service";
import { revalidatePath } from "next/cache";

export const createRecipeAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const ingredients = formData.get("ingredients") as string;
  const instructions = formData.get("instructions") as string;
  const qtCounter = parseInt(formData.get("qtCounter") as string);

  const data = await service.createRecipe({
    name,
    ingredientsStr: ingredients,
    instructionsStr: instructions,
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
