import { ScrapRecipeForm } from "@/_components/forms/scrap-recipe";
import { PageLayoutComponent } from "@/_components/layout/page-layout";

export default function ScrapPage() {
  return (
    <PageLayoutComponent title="Créer une nouvelle recette par scrapping">
      <ScrapRecipeForm />
    </PageLayoutComponent>
  );
}
