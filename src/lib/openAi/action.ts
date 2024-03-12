"use server";
import { MongoId } from "@/types/query";
import { userMessage, systemMessage } from "./utils";
import { openai } from "./openAiclient";
import batchService from "@/lib/batch/service";
import { redirect } from "next/navigation";

export const cook = async ({
  userId,
  qt,
}: {
  userId: MongoId;
  qt: number;
}): Promise<never> => {
  const data = await batchService.getRecipesFromBatch({ userId });

  if (!data?.recipes || !data?.recipeIds) {
    throw new Error();
  }

  const { recipes, recipeIds } = data;

  const alreadyBatch = await batchService.getBatchByRecipeIds(recipeIds);
  if (alreadyBatch) {
    console.log("already");

    return redirect(`/batch/${alreadyBatch.id}`);
  }

  const formattedRecipes = recipes.map(
    ({ name, ingredients, instructions, qtCounter }, index) => ({
      index,
      name,
      ingredients,
      instructions,
      qtCounter,
    })
  );

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage({ qtCount: qt, recipes: formattedRecipes }),
      },
    ],
    model: "gpt-3.5-turbo",
  });

  if (!completion.choices[0].message.content) throw new Error("bug OpenAi");

  const parsedContent: { ingredients: string[]; instructions: string[] } =
    JSON.parse(completion.choices[0].message.content);

  const { instructions, ingredients } = parsedContent;

  const createdBatch = await batchService.create({
    userId,
    recipeIds,
    ingredients,
    instructions,
  });

  if (!createdBatch) throw new Error();

  return redirect(`/batch/${createdBatch.id}`);
};
