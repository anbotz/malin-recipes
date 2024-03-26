import type { IngredientLine } from "@prisma/client";

export type UpdatedRecipeData = {
  name?: string;
  ingredients?: string[];
  instructions?: string[];
  imageUrl?: string;
};

export type CreateRecipeDefaultValueType = {
  name: string;
  qtCounter: number;
  ingredientLines: IngredientLine[];
  instructions: string;
};
