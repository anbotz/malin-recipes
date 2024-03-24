"use client";
import * as React from "react";
import { ButtonContainerComponent } from "../../../_components/container/button-container";
import { ModalComponent } from "../../../_components/container/modal";
import { Flatware, LockClock, Microwave } from "@/_components/icons";
import { DateTime } from "luxon";
import { useFormStatus } from "react-dom";
import { cookAction } from "@/lib/batch/action";
import { toast } from "sonner";
import { Alert } from "@/_components/alert";

const BATCH_STATE = {
  EXIST: "exist",
  GENERABLE: "generable",
  CREATED: "created",
  LOCK: "lock",
};

const CookButton = ({ lock }: { lock?: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <button
      title="Génére les instructions pour réaliser le batch"
      className="btn btn-success"
      type="submit"
      disabled={pending || lock}
    >
      {lock ? <LockClock /> : <Flatware />}
      {pending ? "Chargement" : "Généré le batch !"}
    </button>
  );
};

const SubAlert = ({
  batchState,
  lockBatchExpiresAt,
}: {
  batchState: string;
  lockBatchExpiresAt?: Date;
}) => {
  switch (batchState) {
    case BATCH_STATE.LOCK:
      return (
        <Alert
          variant="error"
          message={`Vous avez déjà généré un batch cette semaine. ${
            lockBatchExpiresAt &&
            `Prochaine génération ${DateTime.fromJSDate(
              lockBatchExpiresAt
            ).toRelativeCalendar()}`
          }`}
        />
      );
    case BATCH_STATE.GENERABLE:
      return (
        <Alert
          variant="warning"
          message="Vous ne pouvez généré qu'un seul batch par semaine"
        />
      );
    case BATCH_STATE.EXIST:
      return (
        <Alert variant="success" message="Vous pouvez y accéder directement" />
      );
    default:
  }
};

export const BatchModal = ({
  modalProps,
  accessBatch,
  lockBatchExpiresAt,
  handleClose,
}: {
  modalProps: { batchId?: string; isBatchLocked?: boolean };
  accessBatch: (e: string) => void;
  lockBatchExpiresAt?: Date;
  handleClose: () => void;
}) => {
  const { batchId, isBatchLocked } = modalProps;
  const [generatedBatchId, setGeneratedBatchId] = React.useState<string>();
  const [batchState, setBatchState] = React.useState<string>(() => {
    if (batchId) {
      return BATCH_STATE.EXIST;
    }
    if (isBatchLocked) {
      return BATCH_STATE.LOCK;
    }

    return BATCH_STATE.GENERABLE;
  });

  const text = (): string => {
    switch (batchState) {
      case BATCH_STATE.EXIST:
        return "Le même batch existe déjà !";
      case BATCH_STATE.CREATED:
        return "Vous pouvez accéder au batch nouvellement créé !";
      default:
        return "Ce batch n'a pas encore été généré. Vous pouvez dépenser un crédit pour le générer.";
    }
  };

  return (
    <ModalComponent>
      <p className="mb-3">{text()}</p>
      <SubAlert
        batchState={batchState}
        lockBatchExpiresAt={lockBatchExpiresAt}
      />
      <ButtonContainerComponent>
        {batchState === BATCH_STATE.EXIST && batchId && (
          <button
            className="btn btn-success"
            onClick={() => accessBatch(batchId)}
          >
            <Microwave />
            Accéder au batch
          </button>
        )}

        {batchState === BATCH_STATE.GENERABLE && (
          <form
            action={async () => {
              toast.promise(cookAction, {
                loading: "Génération du batch ..",
                success: (response) => {
                  setGeneratedBatchId(response.data?.id);
                  setBatchState(BATCH_STATE.CREATED);
                  return "Batch généré !";
                },
                error: "Erreur lors de la génération",
              });
            }}
          >
            <CookButton />
          </form>
        )}

        {batchState === BATCH_STATE.LOCK && <CookButton lock />}

        {batchState === BATCH_STATE.CREATED && generatedBatchId && (
          <button
            className="btn btn-success"
            onClick={() => accessBatch(generatedBatchId)}
          >
            <Microwave />
            Accéder au batch
          </button>
        )}
        <button className="btn btn-neutral" onClick={handleClose} type="reset">
          Annuler
        </button>
      </ButtonContainerComponent>
    </ModalComponent>
  );
};
