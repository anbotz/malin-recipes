"use client";
import { DeleteModal } from "@/_components/modals/delete-modal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MongoId } from "@/types/query";
import { deleteRecipeAction } from "@/lib/recipe/action";
import { IconButtonComponent } from "@/_components/buttons/icon-button";
import { useAuthSession } from "@/hooks/use-auth-session";
import { PERMISSIONS } from "@/lib/permission/const";
import { toast } from "sonner";

const { RECIPE } = PERMISSIONS;

export const ManageRecipeComponent = ({
  deletedItemName,
  recipeId,
}: {
  deletedItemName: string;
  recipeId: MongoId;
}) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { push } = useRouter();
  const { permissions } = useAuthSession();

  const onDelete = () => {
    toast.promise(deleteRecipeAction(recipeId), {
      loading: "Chargement...",
      success: "Recette supprimée",
      error: "Erreur lors de la suppression de la recette",
    });
    push("/recipe");
  };

  return (
    <>
      <DeleteModal
        open={isDeleteModalOpen}
        setOpen={setDeleteModalOpen}
        onDelete={onDelete}
        deletedItemName={deletedItemName}
      />
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
          onClick={() => setDeleteModalOpen(true)}
          icon="delete"
          title="Supprimer"
        />
      )}
    </>
  );
};
