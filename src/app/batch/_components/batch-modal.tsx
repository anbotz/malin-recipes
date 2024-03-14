"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonContainerComponent } from "../../../_components/container/button-container";
import { ModalComponent } from "../../../_components/container/modal";
import { Alert, Tooltip } from "@mui/material";
import { Flatware, LockClock, Microwave } from "@mui/icons-material";
import { DateTime } from "luxon";
import { useFormStatus } from "react-dom";
import { cookAction } from "@/lib/batch/action";

const CookButton = ({
  isBatchLocked,
  lockBatchExpiresAt,
}: {
  isBatchLocked: boolean;
  lockBatchExpiresAt?: Date;
}) => {
  const { pending } = useFormStatus();

  const title: string =
    isBatchLocked && !!lockBatchExpiresAt
      ? `Prochaine génération ${DateTime.fromJSDate(
          lockBatchExpiresAt
        ).toRelativeCalendar()}`
      : "Génére les instructions pour réaliser le batch";

  return (
    <Tooltip title={title} placement="top">
      <span>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={isBatchLocked ? <LockClock /> : <Flatware />}
          color="success"
          disabled={pending || isBatchLocked}
        >
          {pending ? "Chargement" : "Généré le batch !"}
        </Button>
      </span>
    </Tooltip>
  );
};

const SubAlert = ({ isBatchLocked }: { isBatchLocked: boolean }) => {
  return isBatchLocked ? (
    <Alert severity="error">Vous avez déjà généré un batch cette semaine</Alert>
  ) : (
    <Alert severity="success">
      Vous avez une génération de batch disponible
    </Alert>
  );
};

export const BatchModal = ({
  setOpen,
  modalProps,
  accessBatch,
  lockBatchExpiresAt,
}: {
  setOpen: (bool: boolean) => void;
  modalProps: { open: boolean; batchId?: string; isBatchLocked: boolean };
  accessBatch: (e: string) => void;
  lockBatchExpiresAt?: Date;
}) => {
  const [generatedBatchId, setGeneratedBatchId] = React.useState<string>();
  const { batchId, isBatchLocked, open } = modalProps;

  const handleClose = () => setOpen(false);

  const text = batchId
    ? "Le même batch existe déjà !"
    : "Ce batch n'a pas encore été généré";

  return (
    <ModalComponent open={open} onClose={handleClose}>
      <Typography gutterBottom>{text}</Typography>
      {!batchId && <SubAlert isBatchLocked={isBatchLocked} />}
      <ButtonContainerComponent>
        {batchId && (
          <Button
            onClick={() => accessBatch(batchId)}
            color="success"
            variant="outlined"
          >
            Accéder au batch
          </Button>
        )}
        {!batchId && !generatedBatchId && (
          <form
            action={async () => {
              const data = await cookAction();
              setGeneratedBatchId(data?.id);
            }}
          >
            <CookButton
              isBatchLocked={isBatchLocked ?? true}
              lockBatchExpiresAt={lockBatchExpiresAt}
            />
          </form>
        )}
        {generatedBatchId && (
          <Button
            variant="contained"
            size="large"
            startIcon={<Microwave />}
            color="success"
            onClick={() => accessBatch(generatedBatchId)}
          >
            Accéder au batch
          </Button>
        )}
        <Button onClick={handleClose} variant="outlined">
          Annuler
        </Button>
      </ButtonContainerComponent>
    </ModalComponent>
  );
};
