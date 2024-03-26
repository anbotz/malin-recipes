import { PageLayoutComponent } from "@/_components/layout/page-layout";
import batchCache from "@/lib/batch/cache";
import BatchAccordeon from "./_components/batch-accordeon";
import { PaginationComponent } from "@/_components/pagination";

const SIZE = 7;

const DiscoverBatchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const from = searchParams.page ? parseInt(searchParams.page) - 1 : 0;

  const { data, total } = await batchCache.getCachedBatchs({
    from,
    size: SIZE,
  });

  return (
    <PageLayoutComponent
      title="Découvrir"
      footer={<PaginationComponent count={total} size={SIZE} />}
    >
      <div className="flex flex-col gap-3">
        {data.map((batch) => (
          <BatchAccordeon key={batch.id} batch={batch} />
        ))}
      </div>
    </PageLayoutComponent>
  );
};

export default DiscoverBatchPage;
