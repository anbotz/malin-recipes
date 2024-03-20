"use client";
import { Tooltip } from "@mui/material";
import { Shuffle } from "@mui/icons-material";
import { MongoId } from "@/types/query";
import { useAuthSession } from "@/hooks/use-auth-session";

export const BatchButton = ({
  onShuffleClick,
  recipeIndex,
}: {
  onShuffleClick: (id: MongoId, recipeIndex: number) => void;
  recipeIndex: number;
}) => {
  const {
    user: { id },
  } = useAuthSession();

  return (
    <Tooltip title="Change cette recette par une autre recette aléatoire">
      <button
        className="btn btn-primary"
        onClick={() => onShuffleClick(id, recipeIndex)}
      >
        <Shuffle />
        Switch !
      </button>
    </Tooltip>
  );
};
