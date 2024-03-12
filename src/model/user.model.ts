import { MongoId } from "../types/query";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

const getById = async (id: MongoId): Promise<User | null> => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};
const updateById = async (
  id: MongoId,
  data: { batch?: string[]; lockBatchExpiresAt?: Date }
): Promise<User> =>
  await db.user.update({
    where: {
      id,
    },
    data,
  });

const UserModel = {
  getById,
  updateById,
};

export default UserModel;
