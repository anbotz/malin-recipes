"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Container, Tooltip } from "@mui/material";
import Recipe from "@/_types/recipe";
import { Shuffle } from "@mui/icons-material";

export default function BatchCard({
  recipe,
  day,
}: {
  recipe: Recipe;
  day: string;
}) {
  const { name, imageUrl } = recipe;

  return (
    <Card
      sx={{
        maxWidth: 350,
        width: "19dvw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "visible",
      }}
    >
      <div className="floatting-day">
        <Typography gutterBottom variant="h5">
          {day}
        </Typography>
      </div>
      <CardMedia
        component="img"
        height="250"
        image={imageUrl ?? "diner.png"}
        alt="default diner"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary" noWrap>
          {recipe.ingredients.map((i) => (
            <div key={i}>
              {i}
              <br />
            </div>
          ))}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Tooltip title="Change cette recette par une autre recette aléatoire">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<Shuffle />}
          >
            Switch !
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
