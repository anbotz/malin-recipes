import { SkeletonRecipesGrid } from "@/_components/container/recipes-grid";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { SearchBar } from "@/_components/search";

export default function Loading() {
  return (
    <PageLayoutComponent title="Recipes" buttons={<SearchBar />}>
      <div className="flex flex-col items-center justify-between flex-1">
        <SkeletonRecipesGrid size={12} />
      </div>
    </PageLayoutComponent>
  );
}
