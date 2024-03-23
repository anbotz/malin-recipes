import { CreateBatchData, UpdatedBatchData } from "@/types/batch";
import Query, { MongoId } from "@/types/query";
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
        hasEvery: recipeIds,
      },
    },
  });

const getById = async (id: MongoId): Promise<Batch | null> =>
  await db.batch.findUnique({
    where: {
      id,
    },
  });

const search = async ({
  from,
  size,
}: Query): Promise<{ data: Batch[]; total: number }> => {
  const [data, total] = await db.$transaction([
    db.batch.findMany({
      orderBy: {
        id: "desc",
      },
      skip: from * size,
      take: size,
    }),
    db.batch.count({}),
  ]);

  return { data, total };
};

const deleteById = async (id: MongoId): Promise<Batch> =>
  await db.batch.delete({
    where: {
      id,
    },
  });

const updateById = async ({
  id,
  data,
}: {
  id: MongoId;
  data: UpdatedBatchData;
}): Promise<Batch> =>
  await db.batch.update({
    where: {
      id,
    },
    data: {
      ...data,
      updatedAt: new Date(Date.now()),
    },
  });

const BatchModel = {
  create,
  getManyByRecipeIds,
  getById,
  search,
  deleteById,
  updateById,
};

export default BatchModel;
