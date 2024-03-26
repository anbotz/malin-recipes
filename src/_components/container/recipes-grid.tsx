import RecipeCard from "@/_components/recipe-card";
import RecipeCardSkeleton from "../skeletons/recipe-card-skeleton";
import { Recipe } from "@prisma/client";

const RecipesGrid = async ({ recipes }: { recipes: Recipe[] }) => {
  if (recipes.length === 0) return <>Aucune recette trouvée</>;

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-100 w-full place-items-center">
      {recipes.map((a) => (
        <RecipeCard recipe={a} key={a.id} />
      ))}
    </div>
  );
};

export const SkeletonRecipesGrid = ({ size }: { size: number }) => {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-100 w-full place-items-center">
      {Array(size)
        .fill(0)
        .map((a) => (
          <RecipeCardSkeleton key={a} />
        ))}
    </div>
  );
};
export default RecipesGrid;
