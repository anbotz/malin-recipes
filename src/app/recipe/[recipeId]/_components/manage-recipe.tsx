"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MongoId } from "@/types/query";
import { IconButtonComponent } from "@/_components/buttons/icon-button";
import { useAuthSession } from "@/hooks/use-auth-session";
import { PERMISSIONS } from "@/lib/permission/const";
import { CreatedBy } from "@prisma/client";

const { RECIPE } = PERMISSIONS;

export const ManageRecipeComponent = ({
  recipeId,
  createdBy,
}: {
  recipeId: MongoId;
  createdBy?: CreatedBy;
}) => {
  const { push } = useRouter();
  const {
    permissions,
    user: { id },
  } = useAuthSession();

  return (
    <>
      <>
        {permissions.includes(RECIPE.UPDATE) && (
          <IconButtonComponent
            onClick={() => push(`/recipe/${recipeId}/upload-image`)}
            icon="cloud"
            title="Téléverser une image"
          />
        )}
        {(createdBy?.userId === id || permissions.includes(RECIPE.UPDATE)) && (
          <IconButtonComponent
            onClick={() => push(`/recipe/${recipeId}/edit`)}
            icon="edit"
            title="Modifier"
          />
        )}
      </>
      {(createdBy?.userId === id || permissions.includes(RECIPE.DELETE)) && (
        <IconButtonComponent
          onClick={() => push(`/recipe/${recipeId}?show=true`)}
          icon="delete"
          title="Supprimer"
        />
      )}
    </>
  );
};
