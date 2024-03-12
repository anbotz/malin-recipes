import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions, Paper } from "@mui/material";
import recipeCache from "@/lib/recipe/cache";
import { shuffleOneRecipeAction } from "@/lib/batch/action";
import { BatchButton } from "./buttons/batch-button";
import Image from "next/image";

export default async function BatchCard({
  recipeId,
  day,
  recipeIndex,
}: {
  recipeId: string;
  day: string;
  recipeIndex: number;
}) {
  const recipe = await recipeCache.getCachedRecipeById(recipeId);

  if (!recipe) throw new Error("Error on batch card RSC : No recipe found");
  const { name, imageUrl } = recipe;

  const ingredients =
    recipe.ingredients.length > 5
      ? recipe.ingredients.splice(0, 5).concat("...")
      : recipe.ingredients;

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
      <Paper sx={{ padding: "0 10px", position: "static", margin: "8px" }}>
        <Typography variant="h5">{day}</Typography>
      </Paper>
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
        {ingredients.map((i) => (
          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            noWrap
            key={i}
          >
            {i}
            <br />
          </Typography>
        ))}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <BatchButton
          onShuffleClick={shuffleOneRecipeAction}
          recipeIndex={recipeIndex}
        />
      </CardActions>
    </Card>
  );
}
