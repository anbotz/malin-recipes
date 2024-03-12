"use client";
import { Button } from "@mui/material";
import { FormLayoutComponent } from "../layout/form-layout";
import { useRouter } from "next/navigation";
import { MultilineTextFieldComponent } from "../inputs/multiline-text-field";
import { TextFieldComponent } from "../inputs/text-field";
import { updateRecipeAction } from "@/lib/recipe/action";
import Recipe from "@/types/recipe";

export const EditRecipeForm = ({ recipe }: { recipe: Recipe }) => {
  const { back, push } = useRouter();

  const { id, name, ingredients, instructions } = recipe;

  const initialStringifiedIngredients = ingredients.join("\n");
  const initialStringifiedInstructions = instructions.join("\n");

  const update = async (formData: FormData) => {
    updateRecipeAction(id, formData);
    return push(`/recipe/${id}`);
  };

  return (
    <FormLayoutComponent
      action={update}
      buttons={
        <>
          <Button variant="contained" type="submit">
            Modifier
          </Button>
          <Button variant="contained" color="secondary" onClick={back}>
            Annuler
          </Button>
        </>
      }
    >
      <TextFieldComponent
        label="Nom de la recette"
        placeholder="Nom de la recette"
        name="name"
        defaultValue={name}
        required
      />
      <MultilineTextFieldComponent
        label="Ingrédients"
        name="ingredients"
        placeholder=""
        defaultValue={initialStringifiedIngredients}
        required
      />
      <MultilineTextFieldComponent
        label="Instructions"
        name="instructions"
        placeholder=""
        defaultValue={initialStringifiedInstructions}
      />
    </FormLayoutComponent>
  );
};
