"use client";
import { UploadButton } from "@/_components/buttons/upload-button";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DeleteModal } from "@/_components/modals/delete-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MongoId } from "@/_types/query";
import { deleteRecipeAction } from "@/lib/recipe/action";

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
      <UploadButton />
      <IconButton onClick={() => push(`/recipe/${recipeId}/edit`)}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => setDeleteModalOpen(true)}>
        <Delete />
      </IconButton>
    </>
  );
};
