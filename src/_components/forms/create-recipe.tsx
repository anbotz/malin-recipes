"use client";
import { Button } from "@mui/material";
import { FormLayoutComponent } from "../layout/form-layout";
import { useRouter } from "next/navigation";
import { TextFieldComponent } from "../inputs/text-field";
import { MultilineTextFieldComponent } from "../inputs/multiline-text-field";
import { createRecipeAction } from "@/lib/recipe/action";

export const CreateRecipeForm = () => {
  const { back, push } = useRouter();

  const create = async (formData: FormData) => {
    createRecipeAction(formData);

    return push("/recipe");
  };

  return (
    <FormLayoutComponent
      action={create}
      buttons={
        <>
          <Button variant="contained" type="submit">
            Ajouter
          </Button>
          <Button variant="contained" color="secondary" onClick={back}>
            Retour
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
