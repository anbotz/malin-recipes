"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
import { useAuthSession } from "@/hooks/use-auth-session";
import { shuffleWholeBatchAction } from "@/lib/batch/action";
import { PERMISSIONS } from "@/lib/permission/const";
import { Flatware, Shuffle } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { DateTime } from "luxon";
import { useFormStatus } from "react-dom";

const CookButton = ({
  permissions,
  pending,
  isBatchLocked,
  lockBatchExpiresAt,
}: {
  permissions: string[];
  pending: boolean;
  isBatchLocked: boolean;
  lockBatchExpiresAt?: Date;
}) => {
  if (!permissions.includes(PERMISSIONS.BATCH.COOK)) return null;

  const title: string =
    isBatchLocked && !!lockBatchExpiresAt
      ? `Prochaine génération ${DateTime.fromJSDate(
          lockBatchExpiresAt
        ).toRelativeCalendar()}`
      : "Génére les instructions pour réaliser le batch";

  // FIXME modal
  return (
    <Tooltip title={title} placement="top">
      <span>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<Flatware />}
          color="success"
          disabled={pending || isBatchLocked}
        >
          {pending
            ? "Chargement"
            : isBatchLocked
            ? "Batch déjà généré cette semaine"
            : "Généré le batch !"}
        </Button>
      </span>
    </Tooltip>
  );
};

export const BatchButtons = ({
  size,
  isBatchLocked,
  lockBatchExpiresAt,
}: {
  size: number;
  isBatchLocked: boolean;
  lockBatchExpiresAt?: Date;
}) => {
  const { user, permissions } = useAuthSession();

  const { id } = user;
  const { pending } = useFormStatus();

  return (
    <ButtonContainerComponent
      sx={{
        marginTop: "10vh",
      }}
    >
      <CookButton
        {...{ permissions, pending, isBatchLocked, lockBatchExpiresAt }}
      />
      <Tooltip
        title="Change l'ensemble des recettes actuelles par des autres recettes aléatoires"
        placement="top"
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => shuffleWholeBatchAction(id, size)}
          startIcon={<Shuffle />}
          color="secondary"
          disabled={pending}
        >
          Batch au hasard
        </Button>
      </Tooltip>
    </ButtonContainerComponent>
  );
};
