"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Tooltip } from "@mui/material";
import Recipe from "@/_types/recipe";
import { useRouter } from "next/navigation";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { push } = useRouter();
  const { name } = recipe;
  return (
    <Tooltip title={name}>
      <Card sx={{ maxWidth: 350, width: "15vw", height: "30vh" }}>
        <CardActionArea onClick={() => push("/recipe/" + recipe.id)}>
          <CardMedia
            component="img"
            height="150"
            image="diner.png"
            alt="default diner"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" noWrap>
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  );
}
