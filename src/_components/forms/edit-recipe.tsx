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

export const EditRecipeForm = ({ recipe }: { recipe: Recipe }) => {
  const { back, push } = useRouter();

  const { id, name, ingredients, instructions, qtCounter, health } = recipe;

  const initialStringifiedIngredients = ingredients.join("\n");
  const initialStringifiedInstructions = instructions.join("\n");

  const update = async (formData: FormData) => {
    toast.promise(updateRecipeAction(id, formData), {
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
      <HealthFieldComponent defaultValue={health} />
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
