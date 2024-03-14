"use server";
import { MongoId } from "@/types/query";
import service from "./service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Batch } from "@prisma/client";

export const shuffleWholeBatchAction = async (
  id: MongoId,
  size: number
): Promise<void> => {
  const data = await service.shuffleUserBatch(id, size);

  if (data) {
    return revalidatePath("/");
  } else {
    return console.error(`Failed to shuffle whole batch for user (_id: ${id}`);
  }
};

export const shuffleOneRecipeAction = async (
  id: MongoId,
  index: number
): Promise<void> => {
  try {
    await service.updateOneRecipeFromUserBatch(index);

    return revalidatePath("/");
  } catch (e) {
    throw new Error(
      `Failed to shuffle one recipe from batch for user (_id: ${id}`
    );
  }
};

export const checkExistingBatchAction = async (): Promise<
  | {
      batchId?: string;
      isBatchLocked: boolean;
    }
  | undefined
> => {
  const { data } = await service.checkExistingBatch();

  return data;
};

export const cookAction = async (): Promise<Batch | void> => {
  const qt = 2;
  const { data } = await service.generateFromAi({ qt });

  if (data) {
    return data;
  } else {
    return console.error("Failed to cook");
  }
};
