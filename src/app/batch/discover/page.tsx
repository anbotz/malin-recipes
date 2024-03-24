import { PageLayoutComponent } from "@/_components/layout/page-layout";
import batchCache from "@/lib/batch/cache";
import BatchAccordeon from "./_components/batch-accordeon";

const DiscoverBatchPage = async () => {
  // FIXME pagination
  const { data } = await batchCache.getCachedBatchs({ from: 0 });

  return (
    <PageLayoutComponent title="Découvrir">
      <div className="flex flex-col gap-3">
        {data.map((batch) => (
          <BatchAccordeon key={batch.id} batch={batch} />
        ))}
      </div>
    </PageLayoutComponent>
  );
};

export default DiscoverBatchPage;
