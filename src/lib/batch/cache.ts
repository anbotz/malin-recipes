import { cache } from "react";
import { MongoId } from "@/types/query";
import service from "./service";
import { Batch } from "@prisma/client";

const getCachedBatchById = cache(async (id: MongoId): Promise<Batch> => {
  const { data } = await service.getBatchById(id);
  if (data) {
    return data;
  } else {
    throw new Error("Error while retrieving cached batch");
  }
});

const getCachedBatchs = cache(
  async ({
    from,
  }: {
    from: number;
  }): Promise<{ data: Batch[]; total: number }> => {
    const { data } = await service.searchBatch({ from, size: 10 });

    if (data) {
      return data;
    } else {
      throw new Error("Error while retrieving cached batchs");
    }
  }
);

const batchCache = {
  getCachedBatchById,
  getCachedBatchs,
};

export default batchCache;
