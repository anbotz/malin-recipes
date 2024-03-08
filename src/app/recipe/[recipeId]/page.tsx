import { ListLayout } from "@/_components/layout/list-layout";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { ManageRecipeComponent } from "@/app/recipe/[recipeId]/manage-recipe";
import recipeCache from "@/lib/recipe/cache";
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
      <ListLayout
        items={recipe.ingredients}
        title="Ingredients :"
        noContent="No ingredient listed"
      />
      <ListLayout
        items={recipe.instructions}
        title="Instructions :"
        noContent="No instructions listed"
      />
    </PageLayoutComponent>
  );
}
