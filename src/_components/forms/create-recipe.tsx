"use client";
import { FormLayoutComponent } from "../layout/form-layout";
import { useRouter } from "next/navigation";
import { TextFieldComponent } from "../inputs/text-field";
import { MultilineTextFieldComponent } from "../inputs/multiline-text-field";
import { createRecipeAction } from "@/lib/recipe/action";
import { toast } from "sonner";
import { NumberFieldComponent } from "../inputs/number-field";

export const CreateRecipeForm = () => {
  const { back, push } = useRouter();

  const create = async (formData: FormData) => {
    toast.promise(createRecipeAction(formData), {
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
        required
      />
      <NumberFieldComponent
        defaultValue={2}
        label="Personnes"
        placeholder=""
        name="qtCounter"
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
