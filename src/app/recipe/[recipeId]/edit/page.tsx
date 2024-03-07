import { EditRecipeForm } from "@/_components/forms/edit-recipe";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import recipeCache from "@/lib/recipe/cache";
import { redirect } from "next/navigation";

export default async function EditRecipePage({
  params,
}: {
  params: { recipeId: string };
}) {
  const { recipeId } = params;

  const recipe = await recipeCache.getCachedRecipeById(recipeId);

  if (recipe === null) return redirect("/recipe");

  return (
    <PageLayoutComponent title={"Modifier la recette " + recipe.name}>
      <EditRecipeForm recipeId={recipeId} />
    </PageLayoutComponent>
  );
}
