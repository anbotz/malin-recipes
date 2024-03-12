import { ServiceResponse } from "./../../types/query";
import { MongoId } from "@/types/query";
import { userMessage, systemMessage } from "./utils";
import { openai } from "./openAiclient";
import batchService from "@/lib/batch/service";
import userService from "@/lib/user/service";
import { Batch, Recipe } from "@prisma/client";
import { errorMessage } from "../utils";
import { DateTime } from "luxon";

const ERROR_MESSAGE = "Error on openAi.service.";

const LOCK = { days: 6 };

const createBatchFromAi = async ({
  userId,
  recipes,
  qt,
}: {
  userId: MongoId;
  recipes: Recipe[];
  qt: number;
}): Promise<ServiceResponse<Batch>> => {
  try {
    const recipeIds = recipes.map(({ id }) => id);

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

    if (!completion.choices[0].message.content) {
      throw new Error("Error from OpenAi");
    }

    const parsedContent: { ingredients: string[]; instructions: string[] } =
      JSON.parse(completion.choices[0].message.content);

    const { instructions, ingredients } = parsedContent;

    if (!instructions.length || !ingredients.length) {
      throw new Error("Wrong return from OpenAi");
    }

    await userService.updateById(userId, {
      lockBatchExpiresAt: DateTime.now().plus(LOCK).toJSDate(),
    });

    const { data: createdBatch } = await batchService.create({
      userId,
      recipeIds,
      ingredients,
      instructions,
    });

    if (!createdBatch) {
      throw new Error("No batch has been created");
    }

    return { data: createdBatch };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}createBatchFromAi`);
  }
};

const service = {
  createBatchFromAi,
};

export default service;
