"use client";
import { Button, Tooltip } from "@mui/material";
import { Shuffle } from "@mui/icons-material";
import { MongoId } from "@/_types/query";
import { useAuthSession } from "@/_hooks/use-auth-session";

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
      <Button
        variant="contained"
        size="large"
        color="secondary"
        startIcon={<Shuffle />}
        onClick={() => onShuffleClick(id, recipeIndex)}
      >
        Switch !
      </Button>
    </Tooltip>
  );
};
