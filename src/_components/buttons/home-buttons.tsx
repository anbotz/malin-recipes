"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
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
      <Button variant="contained" size="large" onClick={() => push("/recipe")}>
        Découvre d&apos;autres recettes
      </Button>
      <Button variant="contained" size="large" onClick={() => push("/batch")}>
        Commence le batch
      </Button>
    </ButtonContainerComponent>
  );
};
