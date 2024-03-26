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
    const { data } = await service.searchRecipe({ from, size, search });

    if (data) {
      return data;
    } else {
      throw new Error("Error while retrieving cached recipes");
    }
  }
);

const getCachedRecipeById = cache(
  async (id: MongoId): Promise<Recipe | null> => {
    const { data } = await service.getRecipeById(id);

    return new Promise(async (resolve, reject) => {
      const response = await service.getRecipeById(id);

      if (response.error) {
        return reject(response.error);
      }
      if (response.data) {
        return resolve(response.data);
      }
      // FIXME
      resolve(null);
    });
  }
);

const getCachedLastRecipeById = cache(async (): Promise<Recipe[]> => {
  const { data } = await service.getLatestRecipes();
  if (data) {
    return data;
  } else {
    throw new Error("Error while retrieving cached last recipes");
  }
});

const recipeCache = {
  getCachedRecipes,
  getCachedRecipeById,
  getCachedLastRecipeById,
};

export default recipeCache;
