import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export const useAuthSession = (): { user: User; permissions: string[] } => {
  const { data } = useSession();

  const user = data?.user;
  const permissions = user?.permissions ?? [];

  return { user, permissions };
};
