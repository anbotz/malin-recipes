import UserModel from "@/model/user.model";
import { User } from "@prisma/client";
import { MongoId, ServiceResponse } from "@/types/query";
import { getRequiredSession } from "../auth";

const ERROR_MESSAGE = "User.service :";

const getSessionUser = async (): Promise<ServiceResponse<User>> => {
  const session = await getRequiredSession();

  const user = await UserModel.getById(session.user.id);

  if (!user) {
    throw new Error(`${ERROR_MESSAGE} No user found`);
  }

  return { data: user };
};

const updateById = async (
  id: MongoId,
  data: { batch?: string[]; lockBatchExpiresAt?: Date; qt_token_used?: number }
): Promise<ServiceResponse<User>> => {
  const updatedUser = await UserModel.updateById(id, data);

  if (!updatedUser) {
    throw new Error(`${ERROR_MESSAGE} No updatedUser found`);
  }

  return { data: updatedUser };
};

const service = {
  getSessionUser,
  updateById,
};

export default service;
