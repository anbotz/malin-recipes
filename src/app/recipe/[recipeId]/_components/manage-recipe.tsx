"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MongoId } from "@/types/query";
import { IconButtonComponent } from "@/_components/buttons/icon-button";

export const ManageRecipeComponent = ({
  recipeId,
  permissions,
}: {
  recipeId: MongoId;
  permissions: { delete: boolean; update: boolean; uploadImage: boolean };
}) => {
  const { push } = useRouter();

  return (
    <>
      <>
        {permissions.uploadImage && (
          <IconButtonComponent
            onClick={() => push(`/recipe/${recipeId}/upload-image`)}
            icon="cloud"
            title="Téléverser une image"
          />
        )}
        {permissions.update && (
          <IconButtonComponent
            onClick={() => push(`/recipe/${recipeId}/edit`)}
            icon="edit"
            title="Modifier"
          />
        )}
      </>
      {permissions.delete && (
        <IconButtonComponent
          onClick={() => push(`/recipe/${recipeId}?show=true`)}
          icon="delete"
          title="Supprimer"
        />
      )}
    </>
  );
};
