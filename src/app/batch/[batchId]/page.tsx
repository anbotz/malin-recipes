import { BackButton } from "@/_components/buttons/back-button";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import batchCache from "@/lib/batch/cache";
import { notFound } from "next/navigation";

export default async function RecipePage({
  params,
}: {
  params: { batchId: string };
}) {
  const { batchId } = params;

  const batch = await batchCache.getCachedRecipeById(batchId);

  if (batch === null) return notFound();

  return (
    <PageLayoutComponent
      title={
        <>
          Batch :
          <BackButton />
          {batchId}
        </>
      }
    >
      {batchId}
    </PageLayoutComponent>
  );
}
