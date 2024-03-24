"use client";
import { HeroButtonContainerComponent } from "@/_components/container/hero-button-container";
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
import { toast } from "sonner";

export const BatchButtons = ({
  size,
  lockBatchExpiresAt,
  disabledBatchButton,
}: {
  size: number;
  lockBatchExpiresAt?: Date;
  disabledBatchButton: boolean;
}) => {
  const [modalProps, setModalProps] = useState<{
    show: boolean;
    batchId?: string;
    isBatchLocked?: boolean;
  }>({ show: false });

  const { user, permissions } = useAuthSession();

  const { push } = useRouter();

  const { id } = user;

  const onBatch = useCallback(async () => {
    toast.promise(checkExistingBatchAction(), {
      loading: "Chargement...",
      success: (response) => {
        let isBatchLocked = true;

        if (response.data) {
          isBatchLocked = response.data.isBatchLocked;
        }
        if (permissions.includes(PERMISSIONS.BATCH.UNLIMITED_COOK)) {
          isBatchLocked = false;
        }

        setModalProps((previousProps) => ({
          ...previousProps,
          isBatchLocked,
          batchId: response?.data?.batchId,
          show: true,
        }));
        return response.data?.batchId
          ? "Ce batch existe déjà, vous pouvez directement y accéder"
          : "Ce batch est générable";
      },
      error: (error) => {
        console.log(error);
        return `Erreur`;
      },
    });
  }, [permissions]);

  return (
    <>
      {modalProps.show && (
        <BatchModal
          modalProps={modalProps}
          accessBatch={(bId) => push("/batch/" + bId)}
          lockBatchExpiresAt={lockBatchExpiresAt}
          handleClose={() =>
            setModalProps((previousProps) => ({
              ...previousProps,
              show: false,
            }))
          }
        />
      )}
      <HeroButtonContainerComponent>
        {permissions.includes(PERMISSIONS.BATCH.COOK) && (
          <button
            title="Génére les instructions pour réaliser le batch"
            className="btn btn-success btn-lg"
            type="submit"
            onClick={() => onBatch()}
            disabled={disabledBatchButton}
          >
            <Flatware />
            En cuisine !
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
      </HeroButtonContainerComponent>
    </>
  );
};
