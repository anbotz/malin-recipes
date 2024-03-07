import { UploadImageForm } from "@/_components/forms/upload-image";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import recipeCache from "@/lib/recipe/cache";
import { redirect } from "next/navigation";

export default async function UploadImagePage({
  params,
}: {
  params: { recipeId: string };
}) {
  const { recipeId } = params;

  const recipe = await recipeCache.getCachedRecipeById(recipeId);

  if (recipe === null) return redirect("/recipe");

  return (
    <PageLayoutComponent title={"Ajouter une image pour la recette " + recipe.name}>
      <UploadImageForm recipe={recipe} />
    </PageLayoutComponent>
  );
}
