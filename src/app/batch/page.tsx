import { BatchButtons } from "@/app/batch/_components/batch-buttons";
import BatchGrid from "@/app/batch/_components/batch-grid";
import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import batchService from "@/lib/batch/service";
import { BatchModal } from "./_components/batch-modal";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const BatchPage = async ({
  searchParams,
}: {
  searchParams: { show: string };
}) => {
  const show = searchParams?.show;

  const { data } = await batchService.getUserBatch(days.length);

  return (
    <PageLayoutComponent title="Batch">
      <ProtectedContentContainer>
        <div className="flex flex-col items-center justify-between flex-1">
          {data && data.batch && data.batch?.length > 0 && (
            <BatchGrid days={days} batch={data.batch} />
          )}
          <BatchButtons
            size={days.length}
            lockBatchExpiresAt={data?.lockBatchExpiresAt}
            showBatchModal={!!show}
          />
        </div>
      </ProtectedContentContainer>
    </PageLayoutComponent>
  );
};

export default BatchPage;
