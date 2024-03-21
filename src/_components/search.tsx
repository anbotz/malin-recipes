"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export const SearchBar = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const titou = searchParams.get("query") as string;
  const [search, setsearch] = useState(titou);

  const handleSearch = (formData: FormData) => {
    const term = formData.get("search") as string;

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", search);
    } else {
      params.delete("query");
    }
    replace(`/recipe?${params.toString()}`);
  };

  return (
    <form action={handleSearch}>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Recherche ..."
          name="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </form>
  );
};
