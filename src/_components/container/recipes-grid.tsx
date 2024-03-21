import RecipeCard from "@/_components/recipe-card";
import Recipe from "@/types/recipe";

const RecipesGrid = async ({ recipes }: { recipes: Recipe[] }) => {
  if (recipes.length === 0) return <>Aucune recette trouvée</>;

  return (
    <div className="flex-1 grid grid-cols-5 gap-2 h-100">
      {recipes.map((a) => (
        <RecipeCard recipe={a} key={a.id} />
      ))}
    </div>
  );
};

export default RecipesGrid;
