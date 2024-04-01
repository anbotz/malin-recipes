"use server";
import { MongoId, ServiceResponse } from "@/types/query";
import service from "./service";
import { revalidatePath } from "next/cache";
import { Batch } from "@prisma/client";

export const shuffleWholeBatchAction = async (
  id: MongoId,
  size: number
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await service.shuffleUserBatch(id, size);

      resolve(revalidatePath("/"));
    } catch (error: any) {
      reject(new Error(error.message + " on shuffleWholeBatchAction"));
    }
  });
};

export const shuffleOneRecipeAction = async (index: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await service.updateOneRecipeFromUserBatch(index);

      resolve(revalidatePath("/"));
    } catch (error: any) {
      reject(new Error(error.message + " on shuffleOneRecipeAction"));
    }
  });
};

export const checkExistingBatchAction = async (): Promise<
  ServiceResponse<{
    batchId?: string;
    isBatchLocked: boolean;
  }>
> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await service.checkExistingBatch();

      resolve(response);
    } catch (error: any) {
      reject(new Error(error.message + " on checkExistingBatchAction"));
    }
  });
};

export const cookAction = async (): Promise<ServiceResponse<Batch>> => {
  const qt = 2;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await service.generateFromAi({ qt });

      resolve(response);
    } catch (error: any) {
      reject(new Error(error.message + " on cookAction"));
    }
  });
};

export const deleteBatchAction = async (id: MongoId): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await service.deleteBatchById(id);

      resolve();
    } catch (error: any) {
      reject(new Error(error.message + " on deleteBatchAction"));
    }
  });
};

export const updateBatchAction = async (
  id: MongoId,
  formData: FormData
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const name = formData.get("name") as string;
      const description = formData.get("description") as string;

      await service.updateBatchById(id, {
        name,
        description,
      });
      resolve(revalidatePath("/"));
    } catch (error: any) {
      reject(new Error(error.message + " on updateBatchAction"));
    }
  });
};
