"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DateTime } from "luxon";
import NewSvg from "./icons/new";
import { Recipe } from "@prisma/client";
import BasketSvg from "./icons/basket";
import { Add, Remove } from "@mui/icons-material";
import DishSvg from "./icons/dish";
import { useAuthSession } from "@/hooks/use-auth-session";
import { PERMISSIONS } from "@/lib/permission/const";

const { ADMIN } = PERMISSIONS;

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { push } = useRouter();
  const [isSelected, setSelected] = React.useState<boolean>(false);
  const { permissions } = useAuthSession();

  const { name, imageUrl } = recipe;

  const isNew =
    DateTime.now().diff(DateTime.fromJSDate(recipe.createdAt)).as("weeks") < 1;

  React.useEffect(() => {
    const currentBasket: string[] = JSON.parse(
      localStorage.getItem("basket") || "[]"
    );
    setSelected(currentBasket.some((cbid) => cbid === recipe.id));
  }, [recipe.id]);

  const onBasketClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const currentBasket: string[] = JSON.parse(
      localStorage.getItem("basket") || "[]"
    );
    const updatedBasket = isSelected
      ? currentBasket.filter((cbid) => cbid !== recipe.id)
      : [...currentBasket, recipe.id];
    setSelected(!isSelected);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
  };

  return (
    <div className="indicator hover:scale-105	ease-in-out duration-200 cursor-pointer">
      {isNew && (
        <span className="indicator-item badge badge-accent z-20 badge-lg text-wrap">
          <NewSvg />
        </span>
      )}
      <div
        className="card size-64 bg-base-300"
        onClick={() => push("/recipe/" + recipe.id)}
      >
        {permissions.includes(ADMIN) && (
          <div className="group absolute right-3 top-3 z-10">
            <button
              className={`btn flex group-hover:hidden ${
                isSelected ? "btn-info hover:btn-error" : "btn-neutral"
              }`}
              onClick={onBasketClick}
            >
              <BasketSvg />
            </button>
            <button
              className={`btn hidden group-hover:flex ${
                isSelected ? "btn-info hover:btn-error" : "btn-success"
              }`}
              onClick={onBasketClick}
            >
              {isSelected ? <Remove /> : <Add />}
            </button>
          </div>
        )}
        <figure className="relative h-full">
          {imageUrl ? (
            <Image
              fill
              style={{ objectFit: "cover", borderRadius: "1rem 1rem 0 0" }}
              src={imageUrl}
              alt={`${name} image`}
              sizes="(min-width: 808px) 50vw, 100vw"
            />
          ) : (
            <DishSvg size={150} />
          )}
        </figure>
        <div className="flex">
          <h5 className="font-semibold line-clamp-3 w-64 min-w-0 m-3 hover:text-wrap hover:overflow-hidden ">
            {name}
          </h5>
        </div>
      </div>
    </div>
  );
}
