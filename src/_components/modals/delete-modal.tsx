"use client";
import * as React from "react";
import { ButtonContainerComponent } from "../container/button-container";
import { ModalComponent } from "../container/modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const DeleteModal = ({
  deletedItemName,
  id,
  deleteAction,
}: {
  id: string;
  deletedItemName: string;
  deleteAction: (id: string) => Promise<void>;
}) => {
  const { back } = useRouter();
  const handleClose = () => back();

  const onDelete = () => {
    toast.promise(deleteAction(id), {
      loading: "Chargement...",
      success: "Suppression réussie",
      error: `Erreur lors de la suppression`,
    });
  };

  return (
    <ModalComponent>
      <p className="mb-5">
        Êtes vous sur de vouloir supprimer :
        <div className="truncate">{deletedItemName}</div> ?
      </p>
      <ButtonContainerComponent>
        <button className="btn btn-error" onClick={onDelete}>
          Supprimer
        </button>
        <button className="btn btn-neutral" onClick={handleClose} type="reset">
          Annuler
        </button>
      </ButtonContainerComponent>
    </ModalComponent>
  );
};
