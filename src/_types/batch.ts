import { Batch } from "@prisma/client";

export type CreateBatchData = {
  ingredients: string[];
  instructions: string[];
  recipeIds: string[];
  userId: string;
};

export default Batch;
