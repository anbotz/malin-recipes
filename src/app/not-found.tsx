"use client";
import { ButtonComponent } from "@/_components/buttons/button";
import { GridComponent } from "@/_components/container/grid";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { push } = useRouter();

  return (
    <PageLayoutComponent title="404 Not Found">
      <GridComponent
        sx={{
          height: "20%",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <ButtonComponent onClick={() => push("/")}>Accueil</ButtonComponent>
      </GridComponent>
    </PageLayoutComponent>
  );
}
