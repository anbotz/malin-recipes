"use client";

import { v4 } from "uuid";
import { IngredientLine } from "@prisma/client";
import IngredientLineFieldComponent from "./ingredient-line-field";

export type IngredientLineUuid = IngredientLine & { uuid: string };

export const IngredientsFieldComponent = ({
  lines,
  setLines,
}: {
  lines: IngredientLineUuid[];
  setLines: (uuids: IngredientLineUuid[]) => void;
}) => {
  const onDeleteIngredientLine = (uuid: string) =>
    setLines(lines.filter((item) => item.uuid !== uuid));

  return (
    <div className="w-full max-w-prose ">
      <div className="label pr-0">
        <span className="label-text">Ingrédients*</span>
        <button
          onClick={() =>
            setLines([
              ...lines,
              { uuid: v4(), quantity: 0, unit: "", ingredient: "" },
            ])
          }
          type="button"
          className="btn btn-xs  "
        >
          Ajouter
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 12H20M12 4V20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {lines.map((line) => (
        <IngredientLineFieldComponent
          key={line.uuid}
          index={line.uuid}
          onDelete={onDeleteIngredientLine}
          defaultValue={line}
        />
      ))}
    </div>
  );
};
