import { cache } from "react";
import recipe from "@/server/recipe";
import Recipe from "@/_types/recipe";
import { MongoId } from "@/_types/query";

const getCachedRecipes = cache(
  async ({ search }: { search: string | undefined }): Promise<Recipe[]> => {
    const items = await recipe.searchRecipe({ from: 0, size: 10, search });
    return items;
  }
);

const getCachedRecipeById = cache(
  async (id: MongoId): Promise<Recipe | null> => {
    const item = await recipe.getRecipeById(id);
    return item;
  }
);

const recipeCache = { getCachedRecipes, getCachedRecipeById };

export default recipeCache;
