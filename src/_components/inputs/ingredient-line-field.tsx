"use client";
import React from "react";
import { TextFieldComponent } from "./text-field";
import { IngredientLine } from "@prisma/client";

export const IngredientLineFieldComponent = ({
  index,
  defaultValue,
  onDelete,
}: {
  index: string;
  onDelete: (uuid: string) => void;
  defaultValue?: IngredientLine;
}) => {
  return (
    <div className="flex flex-row items-center max-w-prose">
      <TextFieldComponent
        defaultValue={defaultValue?.quantity?.toString() ?? undefined}
        name={`quantity-${index}`}
        placeholder="Quantité"
        className="w-24"
        type="number"
      />
      <TextFieldComponent
        defaultValue={defaultValue?.unit ?? undefined}
        name={`unit-${index}`}
        placeholder="Unité"
        className="w-24"
      />
      <TextFieldComponent
        defaultValue={defaultValue?.ingredient}
        name={`ingredient-${index}`}
        placeholder="Ingrédient"
      />
      <button
        className="btn btn-circle btn-xs ml-1"
        onClick={() => onDelete(index)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
export default IngredientLineFieldComponent;
