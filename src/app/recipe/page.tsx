import { PageLayoutComponent } from "@/_components/layout/page-layout";
import RecipesGrid from "@/_components/container/recipes-grid";
import { SearchBar } from "@/_components/search";
import recipeCache from "@/lib/recipe/cache";

const RecipePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const recipes = await recipeCache.getCachedRecipes({
    search: searchParams.query,
  });

  return (
    <PageLayoutComponent title="Recipes">
      <SearchBar />
      <RecipesGrid recipes={recipes} />
    </PageLayoutComponent>
  );
};

export default RecipePage;
