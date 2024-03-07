import { PageLayoutComponent } from "@/_components/layout/page-layout";
import RecipesGrid from "@/_components/container/recipes-grid";
import recipeCache from "@/lib/recipe/cache";
import { Typography } from "@mui/material";
import { HomeButtons } from "@/_components/buttons/home-buttons";

export default async function Home() {
  const latestRecipes = await recipeCache.getCachedLastRecipeById();

  return (
    <PageLayoutComponent title="Home">
      <Typography variant="h4" gutterBottom>
        Latest hottest :
      </Typography>
      <RecipesGrid recipes={latestRecipes} />
      <HomeButtons />
    </PageLayoutComponent>
  );
}
