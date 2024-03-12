"use server";
import { MongoId } from "@/types/query";
import service from "./service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const cookAction = async (): Promise<void> => {
  const qt = 2;
  const { data } = await service.cook({ qt });

  if (data) {
    return redirect(`/batch/${data.id}`);
  } else {
    return console.error("Failed to cook");
  }
};
