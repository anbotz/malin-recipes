"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const PaginationComponent = ({
  size = 10,
  count,
}: {
  size: number;
  count: number;
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const page =
    searchParams.get("page") !== null
      ? parseInt(searchParams.get("page") as string)
      : 1;

  const handleSearch = (value: number) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("page", `${value}`);
    } else {
      params.delete("page");
    }
    replace(`/recipe?${params.toString()}`);
  };

  return (
    <div className="join">
      <button
        className={`join-item btn ${page === 1 && "btn-disabled"}`}
        onClick={() => handleSearch(page - 1)}
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        className={`join-item btn ${page * size > count && "btn-disabled"}`}
        onClick={() => handleSearch(page + 1)}
      >
        »
      </button>
    </div>
  );
};
