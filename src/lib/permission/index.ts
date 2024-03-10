import { PERMISSIONS } from "@/lib/permission/const";

const { RECIPE } = PERMISSIONS;

export const getPermissions = (role: string | null | undefined) => {
  const permissions = [];

  if ((role = "admin")) {
    permissions.push(RECIPE.CREATE);
    permissions.push(RECIPE.UPDATE);
    permissions.push(RECIPE.DELETE);
  }

  if ((role = "creator")) {
    permissions.push(RECIPE.CREATE);
  }

  return permissions;
};
