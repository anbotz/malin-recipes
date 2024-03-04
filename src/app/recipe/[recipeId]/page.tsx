import { PageComponent } from "@/_components/page";
import recipeCache from "@/server/recipe/cache";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export default async function Page({
  params,
}: {
  params: { recipeId: string };
}) {
  const { recipeId } = params;
  const recipe = await recipeCache.getCachedRecipeById(recipeId);

  if (recipe === null) return null;

  return (
    <PageComponent title={recipe.name}>
      <Typography variant="h5" gutterBottom>
        Ingredients :
      </Typography>
      <Divider />
      <List dense>
        {recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((ingredient) => (
            <ListItem key={ingredient}>{ingredient}</ListItem>
          ))
        ) : (
          <>No ingredient listed</>
        )}
      </List>
      <Divider />
      <Typography variant="h5" gutterBottom>
        Instructions :
      </Typography>
      <Divider />

      <List dense>
        {recipe.instructions.length > 0 ? (
          recipe.instructions.map((instruction) => (
            <ListItem key={instruction}>{instruction}</ListItem>
          ))
        ) : (
          <>No instruction listed</>
        )}
      </List>
    </PageComponent>
  );
}
