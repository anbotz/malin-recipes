import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { LoadingComponent } from "@/_components/loading";

export default function Loading() {
  return (
    <PageLayoutComponent back header={<div className="skeleton h-8 w-96" />}>
      <LoadingComponent />
    </PageLayoutComponent>
  );
}
