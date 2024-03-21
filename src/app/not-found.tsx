"use client";
import { ButtonComponent } from "@/_components/buttons/button";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { push } = useRouter();

  return (
    <PageLayoutComponent title="404 Not Found">
      <ButtonComponent onClick={() => push("/")}>Accueil</ButtonComponent>
    </PageLayoutComponent>
  );
}
