import { ServiceResponse } from "../../types/query";
import { MongoId } from "@/types/query";
import { userMessage, systemMessage, createRecipeSystemMessage } from "./utils";
import { AIclient, AiClientConfig } from "./ai.client";
import batchService from "@/lib/batch/service";
import userService from "@/lib/user/service";
import { Batch, Recipe } from "@prisma/client";
import { errorMessage } from "../utils";
import { DateTime } from "luxon";
import { CreateRecipeDefaultValueType } from "@/types/recipe";

const ERROR_MESSAGE = "Error on Ai.service.";

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
    const recipeNames = recipes.map(({ name }) => name);

    const formattedRecipes = recipes.map(
      ({ name, ingredients, instructions, qtCounter }, index) => ({
        index,
        name,
        ingredients,
        instructions,
        qtCounter,
      })
    );

    const completion = await AIclient.chat.completions.create({
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
      model: AiClientConfig.model,
      response_format: { type: "json_object" },
    });

    if (!completion.choices[0].message.content) {
      throw new Error("Error from AIClient");
    }

    // check if JSON

    const parsedContent: { ingredients: string[]; instructions: string[] } =
      JSON.parse(completion.choices[0].message.content);

    const { instructions, ingredients } = parsedContent;

    if (!instructions.length || !ingredients.length) {
      console.error({
        instructionsLength: instructions.length,
        ingredientsLength: ingredients.length,
      });
      throw new Error("Wrong return from AiClient");
    }

    const qt_token_used = completion.usage?.total_tokens;

    const { data } = await userService.updateById(userId, {
      lockBatchExpiresAt: DateTime.now().plus(LOCK).toJSDate(),
      qt_token_used,
    });

    const { data: createdBatch } = await batchService.create({
      userId,
      creator:
        data?.name
          ?.split(" ")
          .map((i) => i.charAt(0).toUpperCase())
          .join("") ?? undefined,
      recipeIds,
      ingredients,
      instructions,
      recipeNames,
    });

    if (!createdBatch) {
      throw new Error("No batch has been created");
    }

    return { data: createdBatch };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}createBatchFromAi`);
  }
};

const scrapRecipeFromAi = async ({
  recipe,
}: {
  recipe: string;
}): Promise<ServiceResponse<CreateRecipeDefaultValueType>> => {
  try {
    const { data: user } = await userService.getSessionUser();

    if (!user) {
      throw new Error("No user found");
    }

    const completion = await AIclient.chat.completions.create({
      messages: [
        {
          role: "system",
          content: createRecipeSystemMessage,
        },
        {
          role: "user",
          content: recipe,
        },
      ],
      model: AiClientConfig.model,
      response_format: { type: "json_object" },
    });

    if (!completion.choices[0].message.content) {
      throw new Error("Error from AIClient");
    }

    // check if JSON

    const parsedContent: CreateRecipeDefaultValueType = JSON.parse(
      completion.choices[0].message.content
    );
    const qt_token_used = completion.usage?.total_tokens;

    await userService.updateById(user.id, {
      lockBatchExpiresAt: DateTime.now().plus(LOCK).toJSDate(),
      qt_token_used,
    });

    return { data: parsedContent };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}scrapRecipeFromAi`);
  }
};

const service = {
  createBatchFromAi,
  scrapRecipeFromAi,
};

export default service;
