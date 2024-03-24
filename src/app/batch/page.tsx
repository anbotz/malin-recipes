import { BatchButtons } from "@/app/batch/_components/batch-buttons";
import BatchGrid from "@/app/batch/_components/batch-grid";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import batchService from "@/lib/batch/service";
import { DiscoverButton } from "./_components/browse-button";
import { hasDuplicates } from "@/lib/utils";

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const BatchPage = async () => {
  const { data } = await batchService.getUserBatch(DAYS.length);
  const hasDuplicatesRecipes = data?.batch && hasDuplicates(data.batch);

  return (
    <PageLayoutComponent title="Batch" buttons={<DiscoverButton />}>
      <div className="flex flex-col items-center justify-between flex-1">
        {data && data.batch && data.batch?.length > 0 && (
          <BatchGrid days={DAYS} batch={data.batch} />
        )}
        <BatchButtons
          size={DAYS.length}
          lockBatchExpiresAt={data?.lockBatchExpiresAt}
          disabledBatchButton={hasDuplicatesRecipes ?? true}
        />
      </div>
    </PageLayoutComponent>
  );
};

export default BatchPage;
