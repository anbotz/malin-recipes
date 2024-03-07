"use client";
import { Button } from "@mui/material";
import { FormLayoutComponent } from "../layout/form-layout";
import { useRouter } from "next/navigation";
import { MultilineTextFieldComponent } from "../inputs/multiline-text-field";
import { TextFieldComponent } from "../inputs/text-field";
import { updateRecipeAction } from "@/lib/recipe/action";

export const EditRecipeForm = ({ recipeId }: { recipeId: string }) => {
  const { back } = useRouter();
  const submit = async (formData: FormData) =>
    updateRecipeAction(recipeId, formData);

  return (
    <FormLayoutComponent
      action={submit}
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
        required
      />
      <MultilineTextFieldComponent
        label="Ingrédients"
        name="ingredients"
        placeholder=""
        required
      />
      <MultilineTextFieldComponent
        label="Instructions"
        name="instructions"
        placeholder=""
      />
    </FormLayoutComponent>
  );
};
