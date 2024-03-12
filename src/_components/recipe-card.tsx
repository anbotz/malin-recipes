"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Tooltip } from "@mui/material";
import Recipe from "@/types/recipe";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { push } = useRouter();
  const { name, imageUrl } = recipe;

  return (
    <Tooltip title={name}>
      <Card
        sx={{
          maxWidth: 350,
          width: "19dvw",
          height: "350px",
        }}
      >
        <CardActionArea
          onClick={() => push("/recipe/" + recipe.id)}
          sx={{
            height: "100%",
          }}
        >
          <Image
            height="250"
            width="250"
            src={imageUrl ?? "/diner.png"}
            alt={`${name} image`}
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
