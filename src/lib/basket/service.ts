import { ServiceResponse } from "@/types/query";
import RecipeModel from "../../model/recipe.model";
import { IngredientLine } from "@prisma/client";
import userService from "@/lib/user/service";
import { getPermissions } from "../permission";
import { PERMISSIONS } from "../permission/const";

const ERROR_MESSAGE = "Basket.service :";

const getBasket = async ({
  basket,
}: {
  basket: string[];
}): Promise<
  ServiceResponse<{ ingredientLines: IngredientLine[]; recipeNames: string[] }>
> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BASKET.READ)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to getBasket`
    );
  }

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
