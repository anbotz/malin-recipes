type FormattedRecipes = {
  index: number;
  name: string;
  ingredients: string[];
  instructions: string[];
};

export const systemMessage =
  "you are an assistant that generates JSON, which contains two fields: ingredients[] and instructions[]. " +
  "You always return just the JSON with no additonal description or context. " +
  "You are a chief and you will help user to batch cook its recipes for the week.";

export const userMessage = ({
  qtCount,
  recipes,
}: {
  qtCount: number;
  recipes: FormattedRecipes[];
}): string => {
  const formattedRecipes: string = recipes.reduce((acc, cur) => {
    const currentRecipe = `recette ${cur.index + 1}: ${
      cur.name
    }\nIngrédients:\n${cur.ingredients.join(
      "\n"
    )}Instructions:\n${cur.instructions.join("\n")}`;
    return `${acc}\n${currentRecipe}`;
  }, "");

  return `
Tu vas m'assister en temps que cuisinier. Je vais réaliser un batch cooking pour ${qtCount} personnes pour ${recipes.length} repas à l'aide de 3 recettes.
chaque recette a une liste d'ingrédients, une liste d'instruction, et le nombre de portion.
tu dois me retourner uniquement la liste totale des ingrédients (en les additionnant si deux recettes ont les mêmes ingrédients par exemple) et une liste des instructions pour réaliser en simultanée les recettes.
Voici les recettes :
${formattedRecipes}
`;
};

export const createRecipeSystemMessage =
  "You are an assistant that generates JSON, user will gave you a recipe, " +
  "and you shall transform this recipe to the JSON format, " +
  "which has this type RecipeType = {name: string; qtCounter: integer; ingredientLines: IngredientLineType[]; instructions: string[]} " +
  "with IngredientLineType = {quantity: integer; unit: string; ingredient: string }. " +
  "qtCounter is the integer of people, if you don't find this information, set QtCounter = 2. " +
  "If there is no name, invent it" +
  "You always return just the JSON with no additonal description or context.";
