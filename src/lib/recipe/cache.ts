import { cache } from "react";
import Recipe from "@/types/recipe";
import { MongoId } from "@/types/query";
import service from "./service";

const getCachedRecipes = cache(
  async ({
    search,
    from,
  }: {
    search: string | undefined;
    from: number;
  }): Promise<{ data: Recipe[]; total: number }> => {
    const { data } = await service.searchRecipe({ from, size: 10, search });

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
    if (data) {
      return data;
    } else {
      throw new Error("Error while retrieving cached recipe");
    }
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
