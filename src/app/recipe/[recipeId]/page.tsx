import { BackButton } from "@/_components/buttons/back-button";
import { ListLayout } from "@/_components/layout/list-layout";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { ManageRecipeComponent } from "@/app/recipe/[recipeId]/manage-recipe";
import recipeCache from "@/lib/recipe/cache";
import Image from "next/image";
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
      title={
        <>
          <BackButton />
          {recipe.name}
        </>
      }
      buttons={
        <ManageRecipeComponent
          deletedItemName={recipe.name}
          recipeId={recipeId}
        />
      }
    >
      {recipe.imageUrl && (
        <Image
          className="floatting-image"
          src={recipe.imageUrl}
          alt="recipe image"
          width="200"
          height="200"
        />
      )}
      <ListLayout
        items={recipe.ingredients}
        title="Ingrédients :"
        noContent="Aucun ingrédient indiqué"
      />
      <ListLayout
        items={recipe.instructions}
        title="Instructions :"
        noContent="Aucune instruction indiquée"
      />
    </PageLayoutComponent>
  );
}
