import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { LoadingComponent } from "@/_components/loading";
import SkeletonItem from "@/_components/skeletons/skeleton-items";

export default function Loading() {
  return (
    <PageLayoutComponent back header={<SkeletonItem width={"96"} />}>
      <LoadingComponent />
    </PageLayoutComponent>
  );
}
