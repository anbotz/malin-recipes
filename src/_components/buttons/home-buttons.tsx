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
        Discover more Recipe
      </Button>
      <Button variant="contained" size="large" onClick={() => push("/batch")}>
        Start to batch
      </Button>
    </ButtonContainerComponent>
  );
};
