import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getAuthSession = () => getServerSession(authOptions);

export const getRequiredSession = async () => {
  const session = getAuthSession();

  if (!session) {
    throw new Error("no session");
  }

  return session;
};
