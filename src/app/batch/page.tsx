import { BatchButtons } from "@/app/batch/_components/batch-buttons";
import BatchGrid from "@/app/batch/_components/batch-grid";
import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
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
        <BatchButtons
          size={days.length}
          lockBatchExpiresAt={data?.lockBatchExpiresAt}
        />
      </ProtectedContentContainer>
    </PageLayoutComponent>
  );
};

export default BatchPage;
