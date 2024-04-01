"use server";
import { ServiceResponse } from "@/types/query";
import service from "./service";
import { CreateRecipeDefaultValueType } from "@/types/recipe";

export const scrapRecipeAction = async (
  formData: FormData
): Promise<ServiceResponse<CreateRecipeDefaultValueType>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const recipe = formData.get("recipe") as string;
      const response = await service.scrapRecipeFromAi({
        recipe,
      });

      resolve(response);
    } catch (error: any) {
      reject(new Error(error.message + " on uploadImageRecipe"));
    }
  });
};
