import { PageComponent } from "@/_components/page";
import RecipesGrid from "@/_components/recipes-grid";
import recipe from "@/server/recipe";

export default async function Home() {
  const latestRecipes = await recipe.getLatestRecipes();

  return (
    <PageComponent title="Home">
      <RecipesGrid recipes={latestRecipes} />
    </PageComponent>
  );
}
