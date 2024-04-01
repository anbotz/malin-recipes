import { PERMISSIONS } from "@/lib/permission/const";
import { User } from "@prisma/client";

const { RECIPE, BATCH, ADMIN, BASKET } = PERMISSIONS;

export const getPermissions = (user: User | null): string[] => {
  const permissions: string[] = [];

  if (!user) {
    return permissions;
  }

  const role = user?.role;

  if (role === "admin") {
    permissions.push(RECIPE.CREATE);
    permissions.push(RECIPE.UPDATE);
    permissions.push(RECIPE.DELETE);
    permissions.push(BATCH.UNLIMITED_COOK);
    permissions.push(BATCH.BASIC_UPDATE);
    permissions.push(BATCH.DELETE);
    permissions.push(RECIPE.SCRAP);
    permissions.push(ADMIN);
  }

  if (role === "creator") {
    permissions.push(RECIPE.CREATE);
  }

  permissions.push(BATCH.COOK);
  permissions.push(BASKET.READ);
  permissions.push(BATCH.READ);

  return permissions;
};
