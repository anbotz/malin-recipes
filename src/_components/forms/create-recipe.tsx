"use client";
import { FormLayoutComponent } from "../layout/form-layout";
import { useRouter } from "next/navigation";
import { TextFieldComponent } from "../inputs/text-field";
import { MultilineTextFieldComponent } from "../inputs/multiline-text-field";
import { createRecipeAction } from "@/lib/recipe/action";
import { toast } from "sonner";
import { NumberFieldComponent } from "../inputs/number-field";
import IngredientLineFieldComponent from "../inputs/ingredient-line-field";
import { useState } from "react";
import { v4 } from "uuid";
import { IngredientLine } from "@prisma/client";
import { CreateRecipeDefaultValueType } from "@/types/recipe";
import { HealthFieldComponent } from "../inputs/health-field";

const IngredientLinesContainer = ({
  lines,
  setLines,
  onDelete,
}: {
  lines: IngredientLineUuid[];
  setLines: (uuids: IngredientLineUuid[]) => void;
  onDelete: (uuid: string) => void;
}) => {
  return (
    <div className="w-full max-w-prose ">
      <div className="label pr-0">
        <span className="label-text">Ingrédients*</span>
        <button
          onClick={() =>
            setLines([
              ...lines,
              // FIXME
              { uuid: v4(), quantity: 0, unit: "", ingredient: "" },
            ])
          }
          type="button"
          className="btn btn-circle btn-xs ml-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M4 12H20M12 4V20"
              stroke="#000000"
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
          onDelete={onDelete}
          defaultValue={line}
        />
      ))}
    </div>
  );
};

type IngredientLineUuid = IngredientLine & { uuid: string };

export const CreateRecipeForm = ({
  defaultValue,
}: {
  defaultValue?: CreateRecipeDefaultValueType;
}) => {
  const { back, push } = useRouter();

  const defaultIngredientLines: IngredientLineUuid[] | undefined =
    defaultValue?.ingredientLines?.map((v) => ({ ...v, uuid: v4() }));

  const [ingredientLinesUuid, setIngredientLinesUuid] = useState<
    IngredientLineUuid[]
  >(
    defaultIngredientLines ?? [
      { uuid: v4(), ingredient: "", quantity: 0, unit: "" },
    ]
  );

  const create = async (formData: FormData) => {
    const ingredientLines: string[] = ingredientLinesUuid.map(
      ({ uuid }) => uuid
    );

    toast.promise(createRecipeAction(formData, ingredientLines), {
      loading: "Création...",
      success: "Recette créée",
      error: "Erreur lors de la création de la recette",
    });
    return push("/recipe");
  };

  const onDeleteIngredientLine = (uuid: string) => {
    setIngredientLinesUuid((p) => p.filter((item) => item.uuid !== uuid));
  };

  return (
    <FormLayoutComponent
      action={create}
      buttons={
        <>
          <button className="btn btn-primary" type="submit">
            Ajouter
          </button>
          <button className="btn btn-neutral" onClick={back}>
            Retour
          </button>
        </>
      }
    >
      <TextFieldComponent
        label="Titre de la recette"
        placeholder="Titre de la recette"
        name="name"
        defaultValue={defaultValue?.name}
        required
      />
      <NumberFieldComponent
        defaultValue={defaultValue?.qtCounter ?? 2}
        label="Personnes"
        placeholder=""
        name="qtCounter"
        required
      />
      <IngredientLinesContainer
        lines={ingredientLinesUuid}
        setLines={setIngredientLinesUuid}
        onDelete={onDeleteIngredientLine}
      />
      <HealthFieldComponent />
      <MultilineTextFieldComponent
        label="Instructions"
        name="instructions"
        defaultValue={defaultValue?.instructions}
        placeholder=""
      />
    </FormLayoutComponent>
  );
};
