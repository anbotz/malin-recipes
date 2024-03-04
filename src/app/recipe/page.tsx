import { PageComponent } from "@/_components/page";
import RecipesGrid from "@/_components/recipes-grid";
import recipeCache from "@/server/recipe/cache";

const RecipePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const recipes = await recipeCache.getCachedRecipes({
    search: searchParams.quer,
  });

  return (
    <PageComponent title="Recipes">
      <RecipesGrid recipes={recipes} />
    </PageComponent>
  );
};

export default RecipePage;
