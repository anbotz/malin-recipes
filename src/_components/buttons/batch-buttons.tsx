"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
import { useAuthSession } from "@/hooks/use-auth-session";
import { shuffleWholeBatchAction } from "@/lib/batch/action";
import { PERMISSIONS } from "@/lib/permission/const";
import { Flatware, Shuffle } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useFormStatus } from "react-dom";

export const BatchButtons = ({ size }: { size: number }) => {
  const {
    user: { id },
    permissions,
  } = useAuthSession();
  const { pending } = useFormStatus();

  return (
    <ButtonContainerComponent
      sx={{
        marginTop: "10vh",
      }}
    >
      {permissions.includes(PERMISSIONS.BATCH.COOK) && (
        <Tooltip title="Génére les instructions pour réaliser le batch">
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Flatware />}
            color="success"
            disabled={pending}
          >
            {pending ? "Chargement" : "En cuisine !"}
          </Button>
        </Tooltip>
      )}
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
