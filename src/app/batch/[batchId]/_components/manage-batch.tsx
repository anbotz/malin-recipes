"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MongoId } from "@/types/query";
import { IconButtonComponent } from "@/_components/buttons/icon-button";

export const ManageBatchComponent = ({
  batchId,
  permissions,
}: {
  permissions: { delete: boolean; update: boolean };
  batchId: MongoId;
}) => {
  const { push } = useRouter();

  return (
    <>
      {permissions.update && (
        <IconButtonComponent
          onClick={() => push(`/batch/${batchId}?editModal=true`)}
          icon="edit"
          title="Modifier"
        />
      )}
      {permissions.delete && (
        <IconButtonComponent
          onClick={() => push(`/batch/${batchId}?deleteModal=true`)}
          icon="delete"
          title="Supprimer"
        />
      )}
    </>
  );
};
