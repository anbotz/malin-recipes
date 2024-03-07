import { cache } from "react";
import Recipe from "@/_types/recipe";
import { MongoId } from "@/_types/query";
import service from "./service";

const getCachedRecipes = cache(
  async ({ search }: { search: string | undefined }): Promise<Recipe[]> =>
    await service.searchRecipe({ from: 0, size: 10, search })
);

const getCachedRecipeById = cache(
  async (id: MongoId): Promise<Recipe | null> => {
    const item = await service.getRecipeById(id);
    return item;
  }
);

const getCachedLastRecipeById = cache(
  async (): Promise<Recipe[]> => await service.getLatestRecipes()
);

const recipeCache = {
  getCachedRecipes,
  getCachedRecipeById,
  getCachedLastRecipeById,
};

export default recipeCache;
