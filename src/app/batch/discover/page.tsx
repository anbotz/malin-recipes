import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import batchCache from "@/lib/batch/cache";
import { Batch } from "@prisma/client";
import { DateTime } from "luxon";
import { EnterButton } from "./_components/enter-button";

const BatchAccordeon = ({ batch }: { batch: Batch }) => {
  const { id, createdAt, creator, name, recipesName, recipeIds, description } =
    batch;
  const createAtLocalString = DateTime.fromJSDate(createdAt).toLocaleString();
  const week = DateTime.fromJSDate(createdAt).weekNumber;

  const subtitle = `Créé par ${creator ?? "Malin"} le ${createAtLocalString}`;
  // FIXME
  const recipes = recipesName.length === 0 ? recipeIds : recipesName;

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-1" />
      <div className="collapse-title text-xl font-medium flex flex-row">
        <div className="avatar placeholder mr-3">
          <div className="bg-neutral text-neutral-content rounded-full w-12">
            <span>{week}</span>
          </div>
        </div>
        <div className="flex flex-col">
          {name ?? subtitle}
          <div className="italic text-base">{description}</div>
        </div>
      </div>
      <div className="collapse-content flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="badge badge-neutral mb-3">{subtitle}</span>
          <div className="flex flex-wrap gap-2">
            {recipes.map((r) => (
              // FIXME line-clamp-1
              <div key={r} className="badge badge-secondary">
                {r}
              </div>
            ))}
          </div>
        </div>
        <EnterButton batchId={id} />
      </div>
    </div>
  );
};

const DiscoverBatchPage = async ({
  searchParams,
}: {
  searchParams: { show: string };
}) => {
  const show = searchParams?.show;

  const { data } = await batchCache.getCachedBatchs({ from: 0 });

  return (
    <PageLayoutComponent title="Découvrir">
      <ProtectedContentContainer>
        <div className="flex flex-col gap-3">
          {data.map((batch) => (
            <BatchAccordeon key={batch.id} batch={batch} />
          ))}
        </div>
      </ProtectedContentContainer>
    </PageLayoutComponent>
  );
};

export default DiscoverBatchPage;
