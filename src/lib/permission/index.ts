import { PERMISSIONS } from "@/lib/permission/const";

const { RECIPE, BATCH } = PERMISSIONS;

export const getPermissions = (role: string | null | undefined) => {
  const permissions = [];

  if ((role = "admin")) {
    permissions.push(RECIPE.CREATE);
    permissions.push(RECIPE.UPDATE);
    permissions.push(RECIPE.DELETE);
    permissions.push(BATCH.COOK);
  }

  if ((role = "creator")) {
    permissions.push(RECIPE.CREATE);
  }

  return permissions;
};
