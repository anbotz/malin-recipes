import { PageLayoutComponent } from "@/_components/layout/page-layout";
import recipeCache from "@/lib/recipe/cache";
import RecipeCard from "@/_components/recipe-card";
import {
  DiscoverMoreRecipeButton,
  StartToBatchButton,
} from "@/_components/buttons/home-buttons";

export default async function Home() {
  const latestRecipes = await recipeCache.getCachedLastRecipeById();

  return (
    <PageLayoutComponent>
      <div className="flex flex-col lg:flex-row h-full">
        <div className="hero lg:w-1/2 m-3 bg-base-200 ">
          <div className="max-w-md flex items-center  flex-col">
            <h1 className="text-5xl font-bold text-center mb-5">
              Découvrez les dernières recettes
            </h1>
            <div className="flex-1 flex flex-col sm:flex-row gap-4 h-100 w-full items-center justify-center mb-5">
              {latestRecipes.map((a) => (
                <RecipeCard recipe={a} key={a.id} />
              ))}
            </div>
            <DiscoverMoreRecipeButton />
          </div>
        </div>
        <div className="hero  lg:w-1/2 m-3 bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">
                Démarrez votre batch cooking
              </h1>
              <p className="py-6">
                Préparez tous vos repas de la semaine, rapidement, malin.
              </p>
              <StartToBatchButton />
            </div>
          </div>
        </div>
      </div>
      {/* <HomeButtons /> */}
    </PageLayoutComponent>
  );
}
