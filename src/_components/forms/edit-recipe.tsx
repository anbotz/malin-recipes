"use client";
import { FormLayoutComponent } from "../layout/form-layout";
import { useRouter } from "next/navigation";
import { MultilineTextFieldComponent } from "../inputs/multiline-text-field";
import { TextFieldComponent } from "../inputs/text-field";
import { updateRecipeAction } from "@/lib/recipe/action";
import { toast } from "sonner";
import { NumberFieldComponent } from "../inputs/number-field";
import { Recipe } from "@prisma/client";
import { HealthFieldComponent } from "../inputs/health-field";
import { useState } from "react";
import {
  IngredientLineUuid,
  IngredientsFieldComponent,
} from "../inputs/ingredients-field";
import { v4 } from "uuid";

export const EditRecipeForm = ({ recipe }: { recipe: Recipe }) => {
  const { back, push } = useRouter();

  const { id, name, instructions, qtCounter, health, ingredientLines } = recipe;

  const [ingredientLinesUuid, setIngredientLinesUuid] = useState<
    IngredientLineUuid[]
  >(ingredientLines?.map((v) => ({ ...v, uuid: v4() })));

  const initialStringifiedInstructions = instructions.join("\n");

  const update = async (formData: FormData) => {
    const uuids: string[] = ingredientLinesUuid.map(({ uuid }) => uuid);

    toast.promise(updateRecipeAction(id, formData, uuids), {
      loading: "Modification...",
      success: "Recette modifiée",
      error: "Erreur lors de la modification de la recette",
    });

    return push(`/recipe/${id}`);
  };

  return (
    <FormLayoutComponent
      action={update}
      buttons={
        <>
          <button className="btn btn-primary" type="submit">
            Modifier
          </button>
          <button className="btn btn-neutral" onClick={back} type="reset">
            Annuler
          </button>
        </>
      }
    >
      <TextFieldComponent
        label="Titre de la recette"
        placeholder="Titre de la recette"
        name="name"
        defaultValue={name}
        required
      />
      <NumberFieldComponent
        defaultValue={qtCounter}
        label="Personnes"
        placeholder=""
        name="qtCounter"
        required
      />
      <IngredientsFieldComponent
        lines={ingredientLinesUuid}
        setLines={setIngredientLinesUuid}
      />
      <HealthFieldComponent defaultValue={health} />
      <MultilineTextFieldComponent
        label="Instructions"
        name="instructions"
        placeholder=""
        defaultValue={initialStringifiedInstructions}
      />
    </FormLayoutComponent>
  );
};
