import { cache } from "react";
import { MongoId } from "@/types/query";
import service from "./service";
import { Batch } from "@prisma/client";

const getCachedBatchById = cache(async (id: MongoId): Promise<Batch> => {
  const { data } = await service.getBatchById(id);
  if (data) {
    return data;
  } else {
    throw new Error("Error while retrieving cached recipe");
  }
});

const batchCache = {
   getCachedBatchById,
};

export default batchCache;
