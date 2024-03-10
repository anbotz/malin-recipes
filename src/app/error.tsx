"use client";
import { ButtonComponent } from "@/_components/buttons/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Quelque chose s&apos;est mal passé !</h2>
      <ButtonComponent onClick={() => reset()}>Réessayer</ButtonComponent>
    </div>
  );
}
