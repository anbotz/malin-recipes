"use server";
import { MongoId } from "@/types/query";
import service from "./service";
import { revalidatePath } from "next/cache";

export const shuffleWholeBatch = async (
  id: MongoId,
  size: number
): Promise<void> => {
  try {
    await service.shuffleUserBatch(id, size);
    return revalidatePath("/");
  } catch (e) {
    throw new Error(`Failed to shuffle whole batch for user (_id: ${id}`);
  }
};

export const shuffleOneRecipeFromBatch = async (
  id: MongoId,
  index: number
): Promise<void> => {
  try {
    await service.updateOneRecipeFromUserBatch(id, index);

    return revalidatePath("/");
  } catch (e) {
    throw new Error(
      `Failed to shuffle one recipe from batch for user (_id: ${id}`
    );
  }
};
