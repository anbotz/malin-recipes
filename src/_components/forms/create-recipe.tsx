"use client";
import { FormLayoutComponent } from "../layout/form-layout";
import { useRouter } from "next/navigation";
import { TextFieldComponent } from "../inputs/text-field";
import { MultilineTextFieldComponent } from "../inputs/multiline-text-field";
import { createRecipeAction } from "@/lib/recipe/action";
import { toast } from "sonner";
import { NumberFieldComponent } from "../inputs/number-field";
import { useState } from "react";
import { v4 } from "uuid";
import { CreateRecipeDefaultValueType } from "@/types/recipe";
import { HealthFieldComponent } from "../inputs/health-field";
import {
  IngredientLineUuid,
  IngredientsFieldComponent,
} from "../inputs/ingredients-field";

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

  const defaultInstructions = defaultValue?.instructions.join("\n");

  const create = async (formData: FormData) => {
    const uuids: string[] = ingredientLinesUuid.map(({ uuid }) => uuid);

    toast.promise(createRecipeAction(formData, uuids), {
      loading: "Création...",
      success: "Recette créée",
      error: "Erreur lors de la création de la recette",
    });
    return push("/recipe");
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
      <IngredientsFieldComponent
        lines={ingredientLinesUuid}
        setLines={setIngredientLinesUuid}
      />
      <HealthFieldComponent />
      <MultilineTextFieldComponent
        label="Instructions"
        name="instructions"
        defaultValue={defaultInstructions ?? undefined}
        placeholder=""
      />
    </FormLayoutComponent>
  );
};
