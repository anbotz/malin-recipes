import IceCreamSvg from "@/_components/icons/ice-cream";
import VeganSvg from "@/_components/icons/vegan";
import VegetarianSvg from "@/_components/icons/vegetarian";
import { ListLayout } from "@/_components/layout/list-layout";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { DeleteModal } from "@/_components/modals/delete-modal";
import { ManageRecipeComponent } from "@/app/recipe/[recipeId]/_components/manage-recipe";
import { deleteRecipeAction } from "@/lib/recipe/action";
import recipeCache from "@/lib/recipe/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function RecipePage({
  params,
  searchParams,
}: {
  params: { recipeId: string };
  searchParams: { show?: boolean };
}) {
  const { recipeId } = params;
  const show = searchParams?.show;

  const recipe = await recipeCache.getCachedRecipeById(recipeId);

  if (recipe === null) return notFound();

  return (
    <PageLayoutComponent
      back
      title={recipe.name}
      buttons={
        <ManageRecipeComponent
          recipeId={recipeId}
          createdBy={recipe?.createdBy ?? undefined}
        />
      }
    >
      <div className="relative">
        {recipe.imageUrl && (
          <Image
            className="absolute hidden lg:block right-0 mr-3"
            src={recipe.imageUrl}
            alt="recipe image"
            width="200"
            height="200"
          />
        )}
        <div className="flex -flex-row">
          {recipe.health.includes("vegan") && <VeganSvg />}
          {recipe.health.includes("vegetarian") && <VegetarianSvg />}
          {recipe.health.includes("dessert") && <IceCreamSvg />}
        </div>

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
          <DeleteModal
            deletedItemName={recipe.name}
            id={recipeId}
            deleteAction={deleteRecipeAction}
          />
        )}
      </div>
    </PageLayoutComponent>
  );
}
