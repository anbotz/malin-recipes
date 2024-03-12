import { BatchButtons } from "@/_components/buttons/batch-buttons";
import BatchGrid from "@/_components/container/batch-grid";
import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { cookAction } from "@/lib/batch/action";
import batchService from "@/lib/batch/service";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const BatchPage = async () => {
  const { data } = await batchService.getUserBatch(days.length);

  return (
    <PageLayoutComponent title="Batch">
      <ProtectedContentContainer>
        {data && data.batch && data.batch?.length > 0 && (
          <BatchGrid days={days} batch={data.batch} />
        )}
        <form action={cookAction}>
          <BatchButtons
            size={days.length}
            isBatchLocked={data?.isBatchLocked ?? true}
            lockBatchExpiresAt={data?.lockBatchExpiresAt}
          />
        </form>
      </ProtectedContentContainer>
    </PageLayoutComponent>
  );
};

export default BatchPage;
