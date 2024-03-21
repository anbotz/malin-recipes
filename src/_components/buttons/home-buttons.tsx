"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
import { useRouter } from "next/navigation";
import CookSvg from "../icons/cook";
import { Kitchen } from "@/_components/icons";

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
        <CookSvg /> Commence le batch
      </button>
    </ButtonContainerComponent>
  );
};
