import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { ListLayout } from "@/_components/layout/list-layout";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import batchCache from "@/lib/batch/cache";
import { notFound } from "next/navigation";
import { ManageBatchComponent } from "./_components/manage-batch";
import { DeleteModal } from "@/_components/modals/delete-modal";
import { deleteRecipeAction } from "@/lib/recipe/action";
import { EditModal } from "@/_components/modals/edit-modal";
import { deleteBatchAction } from "@/lib/batch/action";

export default async function RecipePage({
  params,
  searchParams,
}: {
  params: { batchId: string };
  searchParams: { editModal?: boolean; deleteModal?: boolean };
}) {
  const { batchId } = params;

  const batch = await batchCache.getCachedBatchById(batchId);

  if (batch === null) return notFound();

  const editModal = searchParams?.editModal;
  const deleteModal = searchParams?.deleteModal;

  const { name, description } = batch;

  return (
    <PageLayoutComponent
      back
      title={name ?? `Batch ${batchId}`}
      buttons={<ManageBatchComponent batchId={batchId} />}
    >
      <ProtectedContentContainer>
        {description}
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
        {editModal && (
          <EditModal batch={batch} backHref={`/batch/${batchId}`} />
        )}
        {deleteModal && (
          <DeleteModal
            deletedItemName={batch.name ?? batch.id}
            id={batchId}
            deleteAction={deleteBatchAction}
            backHref="/batch/discover"
          />
        )}
      </ProtectedContentContainer>
    </PageLayoutComponent>
  );
}
