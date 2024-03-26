"use server";
import { ServiceResponse } from "@/types/query";
import service from "./service";
import { CreateRecipeDefaultValueType } from "@/types/recipe";

export const scrapRecipeAction = async (
  formData: FormData
): Promise<ServiceResponse<CreateRecipeDefaultValueType>> => {
  const recipe = formData.get("recipe") as string;

  return new Promise(async (resolve, reject) => {
    const response = await service.scrapRecipeFromAi({
      recipe,
    });

    if (response.error) {
      return reject(response.error);
    }
    return resolve(response);
  });
};
