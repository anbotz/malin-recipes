import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { ManageRecipeComponent } from "@/app/recipe/[recipeId]/manage-recipe";
import recipeCache from "@/lib/recipe/cache";
import { Divider, List, ListItem, Typography } from "@mui/material";
import { redirect } from "next/navigation";

export default async function RecipePage({
  params,
}: {
  params: { recipeId: string };
}) {
  const { recipeId } = params;

  // FIXME diner again
  const recipe = await recipeCache.getCachedRecipeById(recipeId);

  if (recipe === null) return redirect("/recipe");

  return (
    <PageLayoutComponent
      title={recipe.name}
      buttons={
        <ManageRecipeComponent
          deletedItemName={recipe.name}
          recipeId={recipeId}
        />
      }
    >
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
    </PageLayoutComponent>
  );
}
