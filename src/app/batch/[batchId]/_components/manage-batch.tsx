"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MongoId } from "@/types/query";
import { IconButtonComponent } from "@/_components/buttons/icon-button";
import { useAuthSession } from "@/hooks/use-auth-session";
import { PERMISSIONS } from "@/lib/permission/const";

const { BATCH } = PERMISSIONS;

export const ManageBatchComponent = ({ batchId }: { batchId: MongoId }) => {
  const { push } = useRouter();
  const { permissions } = useAuthSession();

  return (
    <>
      {permissions.includes(BATCH.BASIC_UPDATE) && (
        <IconButtonComponent
          onClick={() => push(`/batch/${batchId}?editModal=true`)}
          icon="edit"
          title="Modifier"
        />
      )}
      {permissions.includes(BATCH.DELETE) && (
        <IconButtonComponent
          onClick={() => push(`/batch/${batchId}?deleteModal=true`)}
          icon="delete"
          title="Supprimer"
        />
      )}
    </>
  );
};
