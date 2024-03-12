import { cache } from "react";
import { MongoId } from "@/types/query";
import service from "./service";
import { Batch } from "@prisma/client";

const getCachedRecipeById = cache(
  async (id: MongoId): Promise<Batch | null> => await service.getBatchById(id)
);

const batchCache = {
  getCachedRecipeById,
};

export default batchCache;
