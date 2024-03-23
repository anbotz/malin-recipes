"use client";
import { HeroButtonContainerComponent } from "@/_components/container/hero-button-container";
import { useRouter } from "next/navigation";
import CookSvg from "../icons/cook";
import { Kitchen } from "@/_components/icons";

export const HomeButtons = () => {
  const { push } = useRouter();

  return (
    <HeroButtonContainerComponent>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => push("/recipe")}
      >
        <Kitchen /> Découvre d&apos;autres recettes
      </button>

      <button className="btn btn-primary btn-lg" onClick={() => push("/batch")}>
        <CookSvg /> Commence le batch
      </button>
    </HeroButtonContainerComponent>
  );
};
