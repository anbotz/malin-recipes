import { PageLayoutComponent } from "@/_components/layout/page-layout";
import RecipesGrid from "@/_components/container/recipes-grid";
import { SearchBar } from "@/_components/search";
import recipeCache from "@/lib/recipe/cache";
import { PaginationComponent } from "@/_components/pagination";

const RecipePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const from = searchParams.page ? parseInt(searchParams.page) - 1 : 0;

  const { data: recipes, total } = await recipeCache.getCachedRecipes({
    search: searchParams.query,
    from,
  });

  return (
    <PageLayoutComponent title="Recipes" buttons={<SearchBar />}>
      <RecipesGrid recipes={recipes} />
      <PaginationComponent count={total} size={10} />
    </PageLayoutComponent>
  );
};

export default RecipePage;
