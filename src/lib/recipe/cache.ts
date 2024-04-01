import { cache } from "react";
import { MongoId } from "@/types/query";
import service from "./service";
import { Recipe } from "@prisma/client";

const getCachedRecipes = cache(
  async ({
    search,
    from,
    size,
  }: {
    search: string | undefined;
    from: number;
    size: number;
  }): Promise<{ data: Recipe[]; total: number }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await service.searchRecipe({ from, size, search });

        resolve(data);
      } catch (error: any) {
        reject(new Error(error.message + " on getCachedRecipes"));
      }
    });
  }
);

const getCachedRecipeById = cache(
  async (id: MongoId): Promise<Recipe | null> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await service.getRecipeById(id);

        resolve(data);
      } catch (error: any) {
        reject(new Error(error.message + " on getCachedRecipeById"));
      }
    });
  }
);

const getCachedLastRecipeById = cache(async (): Promise<Recipe[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await service.getLatestRecipes();

      resolve(data);
    } catch (error: any) {
      reject(new Error(error.message + " on getCachedLastRecipeById"));
    }
  });
});

const recipeCache = {
  getCachedRecipes,
  getCachedRecipeById,
  getCachedLastRecipeById,
};

export default recipeCache;
