"use client";
import { useRouter } from "next/navigation";
import CookSvg from "../icons/cook";
import { Kitchen } from "@/_components/icons";

export const DiscoverMoreRecipeButton = () => {
  const { push } = useRouter();

  return (
    <button className="btn btn-primary btn-lg" onClick={() => push("/recipe")}>
      <Kitchen /> Découvre d&apos;autres recettes
    </button>
  );
};

export const StartToBatchButton = () => {
  const { push } = useRouter();

  return (
    <button className="btn btn-primary btn-lg" onClick={() => push("/batch")}>
      <CookSvg /> Commence le batch
    </button>
  );
};
