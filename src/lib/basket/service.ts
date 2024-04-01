import { ServiceResponse } from "@/types/query";
import RecipeModel from "../../model/recipe.model";
import { IngredientLine } from "@prisma/client";

const ERROR_MESSAGE = "Basket.service :";

const getBasket = async ({
  basket,
}: {
  basket: string[];
}): Promise<
  ServiceResponse<{ ingredientLines: IngredientLine[]; recipeNames: string[] }>
> => {
  const recipes = await RecipeModel.getManyRecipeByIds(basket); // ORM request

  if (!recipes) {
    throw new Error(`${ERROR_MESSAGE} No recipe found on getBasket`);
  }

  if (recipes.length !== basket.length) {
    console.log("Not all recipes found on getBasket");
  }

  const recipeNames = recipes.map(({ name }) => name);

  const recipesIngredientsLines: IngredientLine[] = recipes
    .flatMap(({ ingredientLines }) => ingredientLines)
    .sort((a, b) => a.ingredient.localeCompare(b.ingredient));

  const ingredientLines: IngredientLine[] = recipesIngredientsLines.reduce(
    (accumulator: IngredientLine[], current) => {
      const existingIngredient = accumulator.find(
        (item) =>
          item.ingredient === current.ingredient && item.unit === current.unit
      );

      if (existingIngredient) {
        existingIngredient.quantity += current.quantity;
      } else {
        accumulator.push({ ...current });
      }

      return accumulator;
    },
    []
  );

  return { data: { ingredientLines, recipeNames } };
};

const BasketService = {
  getBasket,
};

export default BasketService;
