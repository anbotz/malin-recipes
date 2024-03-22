import { ListLayout } from "@/_components/layout/list-layout";
import { PageLayoutComponent } from "@/_components/layout/page-layout";

const SkeletonItems = (width: string, size = 5) =>
  Array(size).fill(<div className={`skeleton h-5 w-${width}`} />);

export default function Loading() {
  return (
    <PageLayoutComponent back header={<div className="skeleton h-8 w-96" />}>
      <ListLayout
        items={SkeletonItems("full")}
        title="Ingrédients :"
        noContent="Aucun ingrédient indiqué"
        isGrid
      />
      <ListLayout
        items={SkeletonItems("full")}
        title="Instructions :"
        noContent="Aucune instruction indiquée"
      />
    </PageLayoutComponent>
  );
}
