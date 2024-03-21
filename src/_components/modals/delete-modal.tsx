import * as React from "react";
import { ButtonContainerComponent } from "../container/button-container";
import { ModalComponent } from "../container/modal";

export const DeleteModal = ({
  open,
  setOpen,
  onDelete,
  deletedItemName,
}: {
  open: boolean;
  setOpen: (bool: boolean) => void;
  onDelete: () => void;
  deletedItemName: string;
}) => {
  const handleClose = () => setOpen(false);

  const onValidate = () => {
    onDelete();
    handleClose();
  };

  console.log("dele", { open });

  return (
    <ModalComponent open={open} onClose={handleClose}>
      <p className="mb-5">
        Êtes vous sur de vouloir supprimer la recette : {deletedItemName} ?
      </p>
      <ButtonContainerComponent>
        <button className="btn btn-error" onClick={onValidate}>
          Supprimer
        </button>
        <button className="btn btn-neutral" onClick={handleClose}>
          Annuler
        </button>
      </ButtonContainerComponent>
    </ModalComponent>
  );
};
