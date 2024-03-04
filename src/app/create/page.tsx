import { CreateRecipeForm } from "@/_components/forms/create-recipe";
import { PageComponent } from "@/_components/page";

export default function CreatePage() {
  return (
    <PageComponent title="Créer une nouvelle recette">
      <CreateRecipeForm />
    </PageComponent>
  );
}
