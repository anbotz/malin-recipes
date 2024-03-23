"use client";
import { useRouter } from "next/navigation";

export const EnterButton = ({ batchId }: { batchId: string }) => {
  const { push } = useRouter();

  return (
    <button
      title="Accéder à ce batch"
      className="btn btn-accent"
      onClick={() => push(`/batch/${batchId}`)}
    >
      Accéder
    </button>
  );
};
