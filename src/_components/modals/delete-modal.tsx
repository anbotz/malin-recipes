"use client";
import * as React from "react";
import { ButtonContainerComponent } from "../container/button-container";
import { ModalComponent } from "../container/modal";
import { deleteRecipeAction } from "@/lib/recipe/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const DeleteModal = ({
  deletedItemName,
  recipeId,
}: {
  recipeId: string;
  deletedItemName: string;
}) => {
  const { push, back } = useRouter();
  const handleClose = () => back();

  const onDelete = () => {
    toast.promise(deleteRecipeAction(recipeId), {
      loading: "Chargement...",
      success: "Recette supprimée",
      error: "Erreur lors de la suppression de la recette",
    });
    push("/recipe");
  };
  const onValidate = () => {
    onDelete();
    handleClose();
  };

  return (
    <ModalComponent>
      <p className="mb-5">
        Êtes vous sur de vouloir supprimer la recette :
        <div className="truncate">{deletedItemName}</div> ?
      </p>
      <ButtonContainerComponent>
        <button className="btn btn-error" onClick={onValidate}>
          Supprimer
        </button>
        <button className="btn btn-neutral" onClick={handleClose} type="reset">
          Annuler
        </button>
      </ButtonContainerComponent>
    </ModalComponent>
  );
};
