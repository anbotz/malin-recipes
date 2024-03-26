"use client";
import { FormLayoutComponent } from "../layout/form-layout";
import { useRouter } from "next/navigation";
import { MultilineTextFieldComponent } from "../inputs/multiline-text-field";
import { toast } from "sonner";
import { useState } from "react";
import { scrapRecipeAction } from "@/lib/ai/action";
import { CreateRecipeForm } from "./create-recipe";
import { CreateRecipeDefaultValueType } from "@/types/recipe";

export const ScrapRecipeForm = () => {
  const { back } = useRouter();

  const [scrap, setScrap] = useState<CreateRecipeDefaultValueType>();

  const scrapAction = async (formData: FormData) => {
    toast.promise(scrapRecipeAction(formData), {
      loading: "Chargement...",
      success: (response) => {
        setScrap(response.data);
        return "Recette créée";
      },
      error: "Erreur lors de la création de la recette",
    });
  };

  return (
    <div className="grow">
      {!scrap ? (
        <FormLayoutComponent
          action={scrapAction}
          buttons={
            <>
              <button className="btn btn-primary" type="submit">
                Scrap
              </button>
              <button className="btn btn-neutral" onClick={back}>
                Retour
              </button>
            </>
          }
        >
          <MultilineTextFieldComponent
            label="Recette"
            name="recipe"
            placeholder="Scrappez une recette. La recette doit contenir une liste d'ingrédients et d'instructions, un nom, et un nombre de personne."
            required
          />
        </FormLayoutComponent>
      ) : (
        <>
          Verifier le scrapping <CreateRecipeForm defaultValue={scrap} />
        </>
      )}
    </div>
  );
};
