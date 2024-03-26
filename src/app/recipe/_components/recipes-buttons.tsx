"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IconButtonComponent } from "@/_components/buttons/icon-button";
import { useAuthSession } from "@/hooks/use-auth-session";
import { PERMISSIONS } from "@/lib/permission/const";

const { RECIPE } = PERMISSIONS;

export const ManageRecipesButtonsComponent = () => {
  const { push } = useRouter();
  const { permissions } = useAuthSession();

  return (
    <>
      {permissions.includes(RECIPE.CREATE) && (
        <IconButtonComponent
          onClick={() => push(`/create`)}
          icon="add"
          title="Créer une recette"
        />
      )}
      {permissions.includes(RECIPE.SCRAP) && (
        <IconButtonComponent
          onClick={() => push(`/scrap`)}
          icon="scrap"
          title="Scrapper une recette"
        />
      )}
    </>
  );
};
