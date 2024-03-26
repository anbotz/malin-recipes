"use server";
import { MongoId, ServiceResponse } from "@/types/query";
import service from "./service";
import { revalidatePath } from "next/cache";
import { Batch } from "@prisma/client";
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

export const checkExistingBatchAction = async (): Promise<
  ServiceResponse<{
    batchId?: string;
    isBatchLocked: boolean;
  }>
> => {
  return new Promise(async (resolve, reject) => {
    const response = await service.checkExistingBatch();

    if (response.error) {
      return reject(response.error);
    }
    return resolve(response);
  });
};

export const cookAction = async (): Promise<ServiceResponse<Batch>> => {
  const qt = 2;

  return new Promise(async (resolve, reject) => {
    const response = await service.generateFromAi({ qt });

    if (response.error) {
      return reject(response);
    }
    return resolve(response);
  });
};

export const deleteBatchAction = async (id: MongoId) => {
  const data = await service.deleteBatchById(id);

  if (data) {
    return redirect("/discover");
  } else {
    return console.error(`Failed to delete batch`);
  }
};

export const updateBatchAction = async (id: MongoId, formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const data = await service.updateBatchById(id, {
    name,
    description,
  });

  if (data) {
    return revalidatePath("/");
  } else {
    return console.error(`Failed to update batch`);
  }
};
