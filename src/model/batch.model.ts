import { CreateBatchData } from "@/types/batch";
import { MongoId } from "@/types/query";
import { db } from "@/lib/db";
import { Batch } from "@prisma/client";

const create = async (data: CreateBatchData): Promise<Batch> =>
  await db.batch.create({
    data,
  });

const getManyByRecipeIds = async (
  recipeIds: string[]
): Promise<Batch[] | null> =>
  await db.batch.findMany({
    where: {
      recipeIds: {
        equals: recipeIds,
      },
    },
  });

const getById = async (id: MongoId): Promise<Batch | null> =>
  await db.batch.findUnique({
    where: {
      id,
    },
  });

const BatchModel = {
  create,
  getManyByRecipeIds,
  getById,
};

export default BatchModel;
