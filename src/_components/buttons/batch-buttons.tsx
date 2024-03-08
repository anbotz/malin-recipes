"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
import { Flatware, Shuffle } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

export const BatchButtons = () => {
  //  const { push } = useRouter();

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
          onClick={() => {}}
          startIcon={<Flatware />}
          color="success"
        >
          En cuisine !
        </Button>
      </Tooltip>
      <Tooltip title="Change l'ensemble des recettes actuelles par des autres recettes aléatoires">
        <Button
          variant="contained"
          size="large"
          onClick={() => {}}
          startIcon={<Shuffle />}
          color="secondary"
        >
          Batch au hasard
        </Button>
      </Tooltip>
    </ButtonContainerComponent>
  );
};
