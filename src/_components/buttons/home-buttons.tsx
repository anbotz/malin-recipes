"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
import { Kitchen, Microwave } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const HomeButtons = () => {
  const { push } = useRouter();

  return (
    <ButtonContainerComponent className="mt-10">
      <button
        className="btn btn-primary btn-lg"
        onClick={() => push("/recipe")}
      >
        <Kitchen /> Découvre d&apos;autres recettes
      </button>

      <button className="btn btn-primary btn-lg" onClick={() => push("/batch")}>
        <Microwave /> Commence le batch
      </button>
    </ButtonContainerComponent>
  );
};
