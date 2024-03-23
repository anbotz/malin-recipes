"use client";
import { useRouter } from "next/navigation";

export const DiscoverButton = () => {
  const { push } = useRouter();

  return (
    <button
      title="Découvrez des batchs déjà réalisés"
      className="btn btn-accent"
      onClick={() => push("/batch/discover")}
    >
      Explorer
    </button>
  );
};
