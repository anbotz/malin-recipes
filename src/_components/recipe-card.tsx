"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DateTime } from "luxon";
import NewSvg from "./icons/new";
import { Recipe } from "@prisma/client";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { push } = useRouter();
  const { name, imageUrl } = recipe;

  const isNew =
    DateTime.now().diff(DateTime.fromJSDate(recipe.createdAt)).as("weeks") < 1;

  return (
    <div className="indicator">
      {isNew && (
        <span className="indicator-item badge badge-accent z-20 badge-lg text-wrap">
          <NewSvg />
        </span>
      )}
      <div className="card card-compact image-full size-64">
        <figure>
          <Image
            fill
            style={{ objectFit: "contain", borderRadius: "1rem" }}
            src={imageUrl ?? "/diner.png"}
            alt={`${name} image`}
          />
        </figure>
        <div className="card-body flex justify-between w-64 min-w-0">
          <h5 className="card-title line-clamp-1 hover:line-clamp-none hover:text-wrap hover:overflow-hidden">
            {name}
          </h5>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => push("/recipe/" + recipe.id)}
            >
              Accéder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
