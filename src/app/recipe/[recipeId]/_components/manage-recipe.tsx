"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MongoId } from "@/types/query";
import { IconButtonComponent } from "@/_components/buttons/icon-button";
import { useAuthSession } from "@/hooks/use-auth-session";
import { PERMISSIONS } from "@/lib/permission/const";

const { RECIPE } = PERMISSIONS;

export const ManageRecipeComponent = ({ recipeId }: { recipeId: MongoId }) => {
  const { push } = useRouter();
  const { permissions } = useAuthSession();

  return (
    <>
      {permissions.includes(RECIPE.UPDATE) && (
        <>
          <IconButtonComponent
            onClick={() => push(`/recipe/${recipeId}/upload-image`)}
            icon="cloud"
            title="Téléverser une image"
          />
          <IconButtonComponent
            onClick={() => push(`/recipe/${recipeId}/edit`)}
            icon="edit"
            title="Modifier"
          />
        </>
      )}
      {permissions.includes(RECIPE.DELETE) && (
        <IconButtonComponent
          onClick={() => push(`/recipe/${recipeId}?show=true`)}
          icon="delete"
          title="Supprimer"
        />
      )}
    </>
  );
};
