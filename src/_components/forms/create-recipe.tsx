"use client";
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
