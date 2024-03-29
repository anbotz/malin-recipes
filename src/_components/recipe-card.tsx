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

  const onBasketClick = () => {
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
    <div className="indicator">
      {isNew && (
        <span className="indicator-item badge badge-accent z-20 badge-lg text-wrap">
          <NewSvg />
        </span>
      )}
      <div className="card card-compact image-full size-64">
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
        <div className="card-body flex justify-between w-64 min-w-0">
          <h5 className="card-title line-clamp-1 hover:line-clamp-none hover:text-wrap hover:overflow-hidden">
            {name}
          </h5>
          <div className="card-actions justify-end">
            <button
              className="btn btn-secondary"
              onClick={() => push("/recipe/" + recipe.id)}
            >
              Accéder
            </button>
            {permissions.includes(ADMIN) && (
              <div className="group">
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
          </div>
        </div>
      </div>
    </div>
  );
}
