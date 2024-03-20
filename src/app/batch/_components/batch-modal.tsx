"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { ButtonContainerComponent } from "../../../_components/container/button-container";
import { ModalComponent } from "../../../_components/container/modal";
import { Alert, Backdrop } from "@mui/material";
import { Flatware, LockClock, Microwave } from "@mui/icons-material";
import { DateTime } from "luxon";
import { useFormStatus } from "react-dom";
import { cookAction } from "@/lib/batch/action";
import { LoadingComponent } from "@/_components/loading";

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
    <>
      <div className="tooltip tooltip-top" data-tip={title}>
        <span>
          <button
            className="btn btn-success"
            type="submit"
            disabled={pending || isBatchLocked}
          >
            {isBatchLocked ? <LockClock /> : <Flatware />}
            {pending ? "Chargement" : "Généré le batch !"}
          </button>
        </span>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: 431 }} open={pending}>
        <LoadingComponent />
      </Backdrop>
    </>
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
          <button
            className="btn btn-success"
            onClick={() => accessBatch(batchId)}
          >
            <Microwave />
            Accéder au batch
          </button>
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
          <button
            className="btn btn-success"
            onClick={() => accessBatch(generatedBatchId)}
          >
            <Microwave />
            Accéder au batch
          </button>
        )}
        <button className="btn btn-neutral" onClick={handleClose}>
          Annuler
        </button>
      </ButtonContainerComponent>
    </ModalComponent>
  );
};
