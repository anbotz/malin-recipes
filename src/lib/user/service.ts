import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import UserModel from "@/model/user.model";
import { User } from "@prisma/client";
import { ServiceResponse } from "@/types/query";
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
const service = {
  getSessionUser,
};

export default service;
