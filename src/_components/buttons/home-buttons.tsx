"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
import { Kitchen, Microwave } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const HomeButtons = () => {
  const { push } = useRouter();

  return (
    <ButtonContainerComponent
      sx={{
        marginTop: "10vh",
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={() => push("/recipe")}
        startIcon={<Kitchen />}
      >
        Découvre d&apos;autres recettes
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => push("/batch")}
        startIcon={<Microwave />}
      >
        Commence le batch
      </Button>
    </ButtonContainerComponent>
  );
};
