"use client";
import { ButtonContainerComponent } from "@/_components/container/button-container";
import { useRouter } from "next/navigation";
import CookSvg from "../icons/cook";
import FridgeSvg from "../icons/fridge";

export const HomeButtons = () => {
  const { push } = useRouter();

  return (
    <ButtonContainerComponent className="mt-10">
      <button
        className="btn btn-primary btn-lg"
        onClick={() => push("/recipe")}
      >
        <FridgeSvg /> Découvre d&apos;autres recettes
      </button>

      <button className="btn btn-primary btn-lg" onClick={() => push("/batch")}>
        <CookSvg /> Commence le batch
      </button>
    </ButtonContainerComponent>
  );
};
