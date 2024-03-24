import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import { User } from "@prisma/client";

export const getSession = async () => await getServerSession(authOptions);

export const getRequiredSession = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("no session");
  }

  return session;
};

export const getAuthSession = async (): Promise<{
  user: User;
  permissions: string[];
}> => {
  const session = await getSession();

  const user = session?.user;
  const permissions = user?.permissions ?? [];

  return { user, permissions };
};
