import { ServiceResponse } from "../../types/query";
import { MongoId } from "@/types/query";
import { userMessage, systemMessage, createRecipeSystemMessage } from "./utils";
import { AIclient, AiClientConfig } from "./ai.client";
import batchService from "@/lib/batch/service";
import userService from "@/lib/user/service";
import { Batch, Recipe } from "@prisma/client";
import { DateTime } from "luxon";
import { CreateRecipeDefaultValueType } from "@/types/recipe";
import { getPermissions } from "../permission";
import { PERMISSIONS } from "../permission/const";
import { ingredientLinesToString } from "../utils";

const ERROR_MESSAGE = "Ai.service :";

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
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.BATCH.COOK)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to createBatchFromAi`
    );
  }

  const recipeIds = recipes.map(({ id }) => id);
  const recipeNames = recipes.map(({ name }) => name);

  const formattedRecipes = recipes.map(
    ({ name, ingredientLines, instructions, qtCounter }, index) => ({
      index,
      name,
      ingredients: ingredientLinesToString(ingredientLines),
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
    throw new Error(`${ERROR_MESSAGE} from AiClient`);
  }

  const parsedContent: { ingredients: string[]; instructions: string[] } =
    JSON.parse(completion.choices[0].message.content);

  const { instructions, ingredients } = parsedContent;

  if (!instructions.length || !ingredients.length) {
    console.error({
      instructionsLength: instructions.length,
      ingredientsLength: ingredients.length,
    });
    throw new Error(`${ERROR_MESSAGE} Wrong return from AiClient`);
  }

  const qt_token_used = completion.usage?.total_tokens;

  const { data: updatedUser } = await userService.updateById(userId, {
    lockBatchExpiresAt: DateTime.now().plus(LOCK).toJSDate(),
    qt_token_used,
  });

  const createdBy = {
    creator: updatedUser?.name ?? "Malin",
    userId: updatedUser.id,
  };

  const { data: createdBatch } = await batchService.create({
    userId,
    creator:
      user?.name
        ?.split(" ")
        .map((i) => i.charAt(0).toUpperCase())
        .join("") ?? undefined,
    recipeIds,
    ingredients,
    instructions,
    recipeNames,
    createdBy,
  });

  return { data: createdBatch };
};

const scrapRecipeFromAi = async ({
  recipe,
}: {
  recipe: string;
}): Promise<ServiceResponse<CreateRecipeDefaultValueType>> => {
  const { data: user } = await userService.getSessionUser();

  const permissions = getPermissions(user);

  if (!permissions.includes(PERMISSIONS.RECIPE.SCRAP)) {
    throw new Error(
      `${ERROR_MESSAGE} User has not the permission to scrapRecipeFromAi`
    );
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
    throw new Error(`${ERROR_MESSAGE} from AiClient`);
  }

  const parsedContent: CreateRecipeDefaultValueType = JSON.parse(
    completion.choices[0].message.content
  );

  const qt_token_used = completion.usage?.total_tokens;

  await userService.updateById(user.id, {
    lockBatchExpiresAt: DateTime.now().plus(LOCK).toJSDate(),
    qt_token_used,
  });

  return { data: parsedContent };
};

const service = {
  createBatchFromAi,
  scrapRecipeFromAi,
};

export default service;
