import { ListLayout } from "@/_components/layout/list-layout";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import SkeletonItem from "@/_components/skeletons/skeleton-items";

const SkeletonItems = (width: string, size = 5) =>
  Array(size).fill(<SkeletonItem width={width} />);

const RecipeResumeSkeleton = () => {
  return (
    <PageLayoutComponent back header={<SkeletonItem width={"96"} />}>
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
};

export default RecipeResumeSkeleton;
