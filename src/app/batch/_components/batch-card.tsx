import recipeCache from "@/lib/recipe/cache";
import { shuffleOneRecipeAction } from "@/lib/batch/action";
import { BatchButton } from "./batch-button";
import Image from "next/image";
import { v4 } from "uuid";
import DishSvg from "@/_components/icons/dish";

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

  if (!recipe)
    return (
      <div className="card card-compact image-full w-full lg:w-64 h-56 lg:h-full">
        <div className="card-body flex flex-row lg:flex-col max-w-full lg:h-full min-w-0 justify-between">
          <div className="flex flex-col justify-start w-full lg:w-56 min-w-0 h-full">
            <span className="text-end">{day}</span>
            <div className="grow flex flex-col items-center justify-center">
              <BatchButton
                onShuffleClick={shuffleOneRecipeAction}
                recipeIndex={recipeIndex}
                className="btn-lg"
              />
            </div>
          </div>
        </div>
      </div>
    );

  const { name, imageUrl, ingredients } = recipe;

  return (
    <div className="card card-compact image-full w-full lg:w-64 h-56 lg:h-full">
      <figure className="relative">
        {imageUrl ? (
          <Image
            fill
            style={{ objectFit: "contain", borderRadius: "1rem" }}
            src={imageUrl}
            alt={`${name} image`}
            sizes="(min-width: 808px) 50vw, 100vw"
          />
        ) : (
          <DishSvg size={150} />
        )}
      </figure>
      <div className="card-body flex flex-row lg:flex-col max-w-full lg:h-full min-w-0 justify-between">
        <div className="flex flex-col justify-start w-full lg:w-56 min-w-0">
          <span className="text-end">{day}</span>
          <h5 className="card-title truncate">{name}</h5>
          <p className="overflow-y-auto h-32 lg:h-full overflow-x-hidden text-ellipsis w-full">
            {ingredients.map((i) => (
              <span key={v4()}>
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
