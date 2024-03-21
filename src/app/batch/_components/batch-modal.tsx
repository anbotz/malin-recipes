"use client";
import * as React from "react";
import { ButtonContainerComponent } from "../../../_components/container/button-container";
import { ModalComponent } from "../../../_components/container/modal";
import { Flatware, LockClock, Microwave } from "@/_components/icons";
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

  // FIXME TOAST LOADING
  const title: string =
    isBatchLocked && !!lockBatchExpiresAt
      ? `Prochaine génération ${DateTime.fromJSDate(
          lockBatchExpiresAt
        ).toRelativeCalendar()}`
      : "Génére les instructions pour réaliser le batch";

  return (
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
  );
};

const SubAlert = ({ isBatchLocked }: { isBatchLocked: boolean }) => {
  return isBatchLocked ? (
    <div role="alert" className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Vous avez déjà généré un batch cette semaine</span>
    </div>
  ) : (
    <div role="alert" className="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Vous avez une génération de batch disponible</span>
    </div>
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
      <p className="mb-3">{text}</p>
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