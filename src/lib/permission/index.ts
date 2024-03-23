import { PERMISSIONS } from "@/lib/permission/const";

const { RECIPE, BATCH } = PERMISSIONS;

export const getPermissions = (role: string | null | undefined) => {
  const permissions = [];

  if ((role = "admin")) {
    permissions.push(RECIPE.CREATE);
    permissions.push(RECIPE.UPDATE);
    permissions.push(RECIPE.DELETE);
    permissions.push(BATCH.COOK);
    permissions.push(BATCH.UNLIMITED_COOK);
    permissions.push(BATCH.BASIC_UPDATE);
    permissions.push(BATCH.DELETE);
  }

  if ((role = "creator")) {
    permissions.push(RECIPE.CREATE);
  }

  return permissions;
};
