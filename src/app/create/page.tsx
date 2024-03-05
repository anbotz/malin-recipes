import { CreateRecipeForm } from "@/_components/forms/create-recipe";
import { PageLayoutComponent } from "@/_components/layout/page-layout";

export default function CreatePage() {
  return (
    <PageLayoutComponent title="Créer une nouvelle recette">
      <CreateRecipeForm />
    </PageLayoutComponent>
  );
}
