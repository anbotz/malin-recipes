"use client";
import { Shuffle } from "@/_components/icons";
import { MongoId } from "@/types/query";
import { useAuthSession } from "@/hooks/use-auth-session";

export const BatchButton = ({
  onShuffleClick,
  recipeIndex,
  className,
}: {
  onShuffleClick: (recipeIndex: number) => void;
  recipeIndex: number;
  className?: string;
}) => {
  const {
    user: { id },
  } = useAuthSession();

  return (
    <button
      title="Change cette recette par une autre recette aléatoire"
      className={`btn btn-primary ${className}`}
      onClick={() => onShuffleClick(recipeIndex)}
    >
      <Shuffle />
      Switch !
    </button>
  );
};
