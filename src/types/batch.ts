import { Batch } from "@prisma/client";

export type CreateBatchData = {
  ingredients: string[];
  instructions: string[];
  recipeIds: string[];
  userId: string;
};

export type UpdatedBatchData = {
  name?: string;
  description?: string;
};

export default Batch;
