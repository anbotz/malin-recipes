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
  showBatchModal,
  disabledBatchButton,
}: {
  size: number;
  lockBatchExpiresAt?: Date;
  showBatchModal: boolean;
  disabledBatchButton: boolean;
}) => {
  const [modalProps, setModalProps] = useState<{
    batchId?: string;
    isBatchLocked: boolean;
  }>({
    isBatchLocked: true,
  });

  const { user, permissions } = useAuthSession();

  const { push } = useRouter();

  const { id } = user;

  const onBatch = useCallback(async () => {
    toast.promise(checkExistingBatchAction(), {
      loading: "Chargement...",
      success: (response) => {
        const isBatchLocked = permissions.includes(
          PERMISSIONS.BATCH.UNLIMITED_COOK
        )
          ? false
          : response.data?.isBatchLocked
          ? response.data.isBatchLocked
          : true;
        setModalProps((previousProps) => ({
          ...previousProps,
          isBatchLocked,
          batchId: response?.data?.batchId,
        }));
        push("?show=true");
        return response.data?.batchId
          ? "Ce batch existe déjà, vous pouvez directement y accéder"
          : "Ce batch est générable";
      },
      error: (error) => {
        console.log(error);
        return `Erreur`;
      },
    });
  }, [permissions, push]);

  return (
    <>
      {showBatchModal && (
        <BatchModal
          modalProps={modalProps}
          accessBatch={(bId) => push("/batch/" + bId)}
          lockBatchExpiresAt={lockBatchExpiresAt}
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
      </HeroButtonContainerComponent>
    </>
  );
};
