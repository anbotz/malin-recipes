import type { Recipe } from "@prisma/client";

export type UpdatedRecipeData = {
  name?: string;
  ingredients?: string[];
  instructions?: string[];
};

export default Recipe;
