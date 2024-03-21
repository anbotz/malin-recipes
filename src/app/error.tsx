"use client";
import { ButtonComponent } from "@/_components/buttons/button";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
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
    <PageLayoutComponent title="Quelque chose s'est mal passé !">
        <ButtonComponent onClick={() => reset()}>Réessayer</ButtonComponent>
    </PageLayoutComponent>
  );
}
