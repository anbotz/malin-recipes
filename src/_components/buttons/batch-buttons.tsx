"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
import { useAuthSession } from "@/_hooks/use-auth-session";
import { shuffleWholeBatch } from "@/lib/batch/action";
import { Flatware, Shuffle } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

export const BatchButtons = ({ size }: { size: number }) => {
  const {
    user: { id },
  } = useAuthSession();
  const { push } = useRouter();

  return (
    <ButtonContainerComponent
      sx={{
        marginTop: "10vh",
      }}
    >
      <Tooltip title="Génére les instructions pour réaliser le batch">
        <Button
          variant="contained"
          size="large"
          onClick={() => push("/")}
          startIcon={<Flatware />}
          color="success"
        >
          En cuisine !
        </Button>
      </Tooltip>
      <Tooltip
        title="Change l'ensemble des recettes actuelles par des autres recettes aléatoires"
        placement="top"
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => shuffleWholeBatch(id, size)}
          startIcon={<Shuffle />}
          color="secondary"
        >
          Batch au hasard
        </Button>
      </Tooltip>
    </ButtonContainerComponent>
  );
};
