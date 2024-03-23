import { Batch } from "@prisma/client";

export type CreateBatchData = {
  ingredients: string[];
  instructions: string[];
  recipeIds: string[];
  recipeNames: string[];
  userId: string;
  creator?: string;
};

export type UpdatedBatchData = {
  name?: string;
  description?: string;
};

export default Batch;
