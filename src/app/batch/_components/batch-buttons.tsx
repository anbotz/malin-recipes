"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
import { BatchModal } from "@/app/batch/_components/batch-modal";
import { useAuthSession } from "@/hooks/use-auth-session";
import {
  checkExistingBatchAction,
  shuffleWholeBatchAction,
} from "@/lib/batch/action";
import { PERMISSIONS } from "@/lib/permission/const";
import { Flatware, Shuffle } from "@/_components/icons";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const BatchButtons = ({
  size,
  lockBatchExpiresAt,
}: {
  size: number;
  lockBatchExpiresAt?: Date;
}) => {
  const [modalProps, setModalProps] = useState<{
    open: boolean;
    batchId?: string;
    isBatchLocked: boolean;
  }>({
    open: false,
    isBatchLocked: true,
  });

  const { user, permissions } = useAuthSession();

  const { push } = useRouter();

  const { id } = user;

  const onBatch = useCallback(async () => {
    const serverProps = await checkExistingBatchAction();
    const isBatchLocked = permissions.includes(PERMISSIONS.BATCH.UNLIMITED_COOK)
      ? false
      : serverProps?.isBatchLocked
      ? serverProps.isBatchLocked
      : true;
    setModalProps((previousProps) => ({
      ...previousProps,
      open: true,
      isBatchLocked,
    }));
  }, [permissions]);

  return (
    <>
      <BatchModal
        setOpen={(o) =>
          setModalProps((previousProps) => ({ ...previousProps, open: o }))
        }
        modalProps={modalProps}
        accessBatch={(bId) => push("/batch/" + bId)}
        lockBatchExpiresAt={lockBatchExpiresAt}
      />
      <ButtonContainerComponent className="mt-10">
        {permissions.includes(PERMISSIONS.BATCH.COOK) && (
          <button
            title="Génére les instructions pour réaliser le batch"
            className="btn btn-success btn-lg"
            type="submit"
            onClick={() => onBatch()}
          >
            <Flatware />
            Généré le batch !
          </button>
        )}

        <button
          title="Change l'ensemble des recettes actuelles par des autres recettes aléatoires"
          className="btn btn-secondary btn-lg"
          onClick={() => shuffleWholeBatchAction(id, size)}
        >
          <Shuffle />
          Batch au hasard
        </button>
      </ButtonContainerComponent>
    </>
  );
};
