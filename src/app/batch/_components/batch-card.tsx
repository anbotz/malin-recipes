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
    <div className="card card-compact image-full">
      <figure>
        <Image
          fill
          style={{ objectFit: "contain" }}
          src={imageUrl ?? "/diner.png"}
          alt={`${name} image`}
        />
      </figure>
      <div className="card-body flex justify-between">
        <div>{day}</div>
        <h5 className="card-title text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </h5>
        {ingredients.map((i) => (
          <div className="" key={i}>
            {i}
          </div>
        ))}
        <div className="card-actions justify-end">
          <BatchButton
            onShuffleClick={shuffleOneRecipeAction}
            recipeIndex={recipeIndex}
          />
        </div>
      </div>
    </div>
  );
}
