"use client";
import { IconButtonComponent } from "@/_components/buttons/icon-button";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const { back } = useRouter();

  return (
    <IconButtonComponent
      icon="back"
      onClick={back}
      title="Retour à la page précédente"
    />
  );
};
