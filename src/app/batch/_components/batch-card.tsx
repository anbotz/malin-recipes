import recipeCache from "@/lib/recipe/cache";
import { shuffleOneRecipeAction } from "@/lib/batch/action";
import { BatchButton } from "./batch-button";
import Image from "next/image";

export default async function BatchCard({
  recipeId,
  day,
  recipeIndex,
}: {
  recipeId: string;
  day: string;
  recipeIndex: number;
}) {
  const recipe = await recipeCache.getCachedRecipeById(recipeId);

  if (!recipe) throw new Error("Error on batch card RSC : No recipe found");
  const { name, imageUrl } = recipe;

  const ingredients =
    recipe.ingredients.length > 5
      ? recipe.ingredients.splice(0, 5).concat("...")
      : recipe.ingredients;

  return (
    <div className="card card-compact image-full w-full lg:w-64 h-56 lg:h-full">
      <figure>
        <Image
          fill
          style={{ objectFit: "contain" }}
          src={imageUrl ?? "/diner.png"}
          alt={`${name} image`}
        />
      </figure>
      <div className="card-body flex flex-row lg:flex-col max-w-full min-w-0 justify-between  ">
        <div className="flex flex-col justify-start lg:w-56 min-w-0 ">
          {day}
          <h5 className="card-title truncate">{name}</h5>
          <p className=" truncate">
            {ingredients.map((i) => (
              <span key={i}>
                {i}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="absolute bottom-5 right-5">
          <BatchButton
            onShuffleClick={shuffleOneRecipeAction}
            recipeIndex={recipeIndex}
          />
        </div>
      </div>
    </div>
  );
}
