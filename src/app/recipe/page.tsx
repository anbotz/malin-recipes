import { PageLayoutComponent } from "@/_components/layout/page-layout";
import RecipesGrid from "@/_components/container/recipes-grid";
import { SearchBar } from "@/_components/search";
import recipeCache from "@/lib/recipe/cache";
import { PaginationComponent } from "@/_components/pagination";
import { GridComponent } from "@/_components/container/grid";

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
      <GridComponent>
        <RecipesGrid recipes={recipes} />
        <PaginationComponent count={total} size={10} />
      </GridComponent>
    </PageLayoutComponent>
  );
};

export default RecipePage;
