import { LoadingComponent } from "@/_components/loading";

export default function Loading() {
  // FIXME better loading is possible
  return (
    <div className="flex-1 flex justify-center items-center">
      <LoadingComponent />
    </div>
  );
}
