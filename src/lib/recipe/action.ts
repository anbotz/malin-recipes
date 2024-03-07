"use server";
import { MongoId } from "@/_types/query";
import service from "./service";

export const createRecipeAction = (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;

    return service.createRecipe(name, ingredients, instructions);
  } catch (e) {
    throw new Error("Failed to create recipe");
  }
};

export const updateRecipeAction = (id: MongoId, formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const ingredientsStr = formData.get("ingredients") as string;
    const instructionsStr = formData.get("instructions") as string;

    return service.updateRecipeById(id, {
      name,
      ingredientsStr,
      instructionsStr,
    });
  } catch (e) {
    throw new Error(`Failed to update recipe (_id: ${id}`);
  }
};

export const uploadImageRecipeAction = (id: MongoId, imageUrl: string) => {
  try {
    return service.updateRecipeById(id, {
      imageUrl,
    });
  } catch (e) {
    throw new Error(`Failed to upload image recipe (_id: ${id}`);
  }
};

export const deleteRecipeAction = async (id: MongoId) => {
  return await service.deleteRecipeById(id);
};
