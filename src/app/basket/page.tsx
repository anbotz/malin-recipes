"use client";
import Badges from "@/_components/badges";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { IngredientLine } from "@prisma/client";

import { v4 } from "uuid";
import { Remove } from "@mui/icons-material";

const IngredientList = ({
  lines,
  noContent,
}: {
  lines: IngredientLine[];
  noContent: string;
}) => {
  return (
    <>
      <div className="divider" />
      <div className="flex flex-col gap-3">
        {lines.length > 0 ? (
          lines.map((line) => {
            const { ingredient, unit, quantity } = line;
            return (
              <div className="flex gap-3 line-clamp-1" key={v4()}>
                <input type="checkbox" className="checkbox" />
                {quantity} {unit} {ingredient}
              </div>
            );
          })
        ) : (
          <>{noContent}</>
        )}
      </div>
      <div className="divider" />
    </>
  );
};

const BasketPage = () => {
  const [recipes, setRecipes] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientLine[]>([]);

  useEffect(() => {
    const currentBasket: string[] = JSON.parse(
      localStorage.getItem("basket") || "[]"
    );

    axios.post("/api/basket", currentBasket).then((r) => {
      setIngredients(r.data.ingredientLines);
      setRecipes(r.data.recipeNames);
    });
  }, []);

  const onEmpty = () => {
    localStorage.setItem("basket", JSON.stringify([]));
    setIngredients([]);
    setRecipes([]);
  };

  return (
    <PageLayoutComponent
      title="Liste de course"
      buttons={
        <button
          className={"btn  btn-error"}
          onClick={onEmpty}
          disabled={!recipes.length}
        >
          <Remove />
          Vider le panier
        </button>
      }
    >
      <Badges items={recipes} />
      {ingredients && (
        <IngredientList
          lines={ingredients}
          noContent="Selectionnez des recettes pour créer une liste de course"
        />
      )}
    </PageLayoutComponent>
  );
};

export default BasketPage;
