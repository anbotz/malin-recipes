"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MongoId } from "@/types/query";
import { IconButtonComponent } from "@/_components/buttons/icon-button";
import { useAuthSession } from "@/hooks/use-auth-session";
import { PERMISSIONS } from "@/lib/permission/const";
import { CreatedBy } from "@prisma/client";

const { BATCH } = PERMISSIONS;

export const ManageBatchComponent = ({
  batchId,
  createdBy,
}: {
  batchId: MongoId;
  createdBy?: CreatedBy;
}) => {
  const { push } = useRouter();
  const {
    permissions,
    user: { id },
  } = useAuthSession();

  return (
    <>
      {(createdBy?.userId === id ||
        permissions.includes(BATCH.BASIC_UPDATE)) && (
        <IconButtonComponent
          onClick={() => push(`/batch/${batchId}?editModal=true`)}
          icon="edit"
          title="Modifier"
        />
      )}
      {(createdBy?.userId === id || permissions.includes(BATCH.DELETE)) && (
        <IconButtonComponent
          onClick={() => push(`/batch/${batchId}?deleteModal=true`)}
          icon="delete"
          title="Supprimer"
        />
      )}
    </>
  );
};
