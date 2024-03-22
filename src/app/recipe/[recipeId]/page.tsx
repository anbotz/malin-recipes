import { ListLayout } from "@/_components/layout/list-layout";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { DeleteModal } from "@/_components/modals/delete-modal";
import { ManageRecipeComponent } from "@/app/recipe/[recipeId]/_components/manage-recipe";
import recipeCache from "@/lib/recipe/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function RecipePage({
  params,
  searchParams,
}: {
  params: { recipeId: string };
  searchParams: { show?: true };
}) {
  const { recipeId } = params;
  const show = searchParams?.show;

  const recipe = await recipeCache.getCachedRecipeById(recipeId);

  if (recipe === null) return notFound();

  return (
    <PageLayoutComponent
      back
      title={recipe.name}
      buttons={<ManageRecipeComponent recipeId={recipeId} />}
    >
      {recipe.imageUrl && (
        <Image
          className="absolute right-0 mr-3"
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
        isGrid
      />
      <ListLayout
        items={recipe.instructions}
        title="Instructions :"
        noContent="Aucune instruction indiquée"
      />
      {show && (
        <DeleteModal deletedItemName={recipe.name} recipeId={recipeId} />
      )}
    </PageLayoutComponent>
  );
}
