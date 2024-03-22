import { BackButton } from "@/_components/buttons/back-button";
import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { ListLayout } from "@/_components/layout/list-layout";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import batchCache from "@/lib/batch/cache";
import { notFound } from "next/navigation";

export default async function RecipePage({
  params,
}: {
  params: { batchId: string };
}) {
  const { batchId } = params;

  const batch = await batchCache.getCachedBatchById(batchId);

  if (batch === null) return notFound();

  return (
    <PageLayoutComponent back title={`Batch ${batchId}`}>
      <ProtectedContentContainer>
        <ListLayout
          items={batch.ingredients}
          title="Ingrédients pour l'ensemble du batch :"
          noContent="Aucun ingrédient indiqué"
          isGrid
        />
        <ListLayout
          items={batch.instructions}
          title="Instructions :"
          noContent="Aucune instruction indiquée"
        />
      </ProtectedContentContainer>
    </PageLayoutComponent>
  );
}
