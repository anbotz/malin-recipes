import { PageLayoutComponent } from "@/_components/layout/page-layout";
import RecipesGrid from "@/_components/container/recipes-grid";
import recipeCache from "@/lib/recipe/cache";
import { HomeButtons } from "@/_components/buttons/home-buttons";
import { TypographyComponent } from "@/_components/typography";

export default async function Home() {
  const latestRecipes = await recipeCache.getCachedLastRecipeById();

  return (
    <PageLayoutComponent title="Home">
      <TypographyComponent variant="h4" gutterBottom>
        Latest hottest :
      </TypographyComponent>
      <RecipesGrid recipes={latestRecipes} />
      <HomeButtons />
    </PageLayoutComponent>
  );
}
