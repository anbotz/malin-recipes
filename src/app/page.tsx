import { PageLayoutComponent } from "@/_components/layout/page-layout";
import RecipesGrid from "@/_components/container/recipes-grid";
import recipeCache from "@/lib/recipe/cache";
import { HomeButtons } from "@/_components/buttons/home-buttons";

export default async function Home() {
  const latestRecipes = await recipeCache.getCachedLastRecipeById();

  return (
    <PageLayoutComponent title="Accueil">
      <h4 className="mb-4">Dernières recettes :</h4>
      <RecipesGrid recipes={latestRecipes} />
      <HomeButtons />
    </PageLayoutComponent>
  );
}
