"use client";
import { DeleteModal } from "@/_components/modals/delete-modal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MongoId } from "@/_types/query";
import { deleteRecipeAction } from "@/lib/recipe/action";
import { IconButtonComponent } from "@/_components/buttons/icon-button";

export const ManageRecipeComponent = ({
  deletedItemName,
  recipeId,
}: {
  deletedItemName: string;
  recipeId: MongoId;
}) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { push } = useRouter();

  const onDelete = () => {
    deleteRecipeAction(recipeId);
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
      <IconButtonComponent
        onClick={() => setDeleteModalOpen(true)}
        icon="delete"
        title="Supprimer"
      />
    </>
  );
};
