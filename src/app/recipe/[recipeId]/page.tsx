import { BackButton } from "@/_components/buttons/back-button";
import { ListLayout } from "@/_components/layout/list-layout";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { ManageRecipeComponent } from "@/app/recipe/[recipeId]/_components/manage-recipe";
import recipeCache from "@/lib/recipe/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function RecipePage({
  params,
}: {
  params: { recipeId: string };
}) {
  const { recipeId } = params;

  const recipe = await recipeCache.getCachedRecipeById(recipeId);

  if (recipe === null) return notFound();

  return (
    <PageLayoutComponent
      back
      title={recipe.name}
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
