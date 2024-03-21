"use client";
import * as React from "react";
import Recipe from "@/types/recipe";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { push } = useRouter();
  const { name, imageUrl } = recipe;

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
        <h5 className="card-title text-ellipsis overflow-hidden whitespace-nowrap">
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
  );
}
