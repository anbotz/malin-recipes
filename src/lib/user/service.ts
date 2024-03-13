import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import UserModel from "@/model/user.model";
import { User } from "@prisma/client";
import { MongoId, ServiceResponse } from "@/types/query";
import { errorMessage } from "../utils";

const ERROR_MESSAGE = "Error on user.service.";

const getSessionUser = async (): Promise<ServiceResponse<User>> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("No session found");
    }

    const user = await UserModel.getById(session.user.id);

    if (!user) {
      throw new Error("No user found");
    }

    return { data: user };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}getSessionUser`);
  }
};

const updateById = async (
  id: MongoId,
  data: { batch?: string[]; lockBatchExpiresAt?: Date }
): Promise<ServiceResponse<User>> => {
  try {
    const updatedUser = await UserModel.updateById(id, data);

    return { data: updatedUser };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}updateUserById`);
  }
};

const service = {
  getSessionUser,
  updateById,
};

export default service;