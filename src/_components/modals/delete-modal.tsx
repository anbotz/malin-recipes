import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

  return (
    <ModalComponent open={open} onClose={handleClose}>
      <Typography gutterBottom>
        Are you sure to delete the recipe {deletedItemName} ?
      </Typography>
      <ButtonContainerComponent>
        <Button onClick={onValidate} color="error" variant="outlined">
          Supprimer
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Annuler
        </Button>
      </ButtonContainerComponent>
    </ModalComponent>
  );
};
