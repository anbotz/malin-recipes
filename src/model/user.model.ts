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
  data: { batch?: string[]; lockBatchExpiresAt?: Date; qt_token_used?: number }
): Promise<User> => {
  const { qt_token_used, ...rest } = data;

  const updateData = qt_token_used
    ? { ...rest, qt_token_used: { increment: qt_token_used } }
    : rest;

  return await db.user.update({
    where: {
      id,
    },
    data: updateData,
  });
};

const UserModel = {
  getById,
  updateById,
};

export default UserModel;
