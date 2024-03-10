import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export const getAuthSession = () => getServerSession(authOptions);

export const getRequiredSession = async () => {
  const session = getAuthSession();

  if (!session) {
    throw new Error("no session");
  }

  return session;
};
