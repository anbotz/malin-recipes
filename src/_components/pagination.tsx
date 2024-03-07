"use client";
import { Box, Pagination } from "@mui/material";
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

  const handleSearch = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("page", `${value}`);
    } else {
      params.delete("page");
    }
    replace(`/recipe?${params.toString()}`);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Pagination
        count={Math.ceil(count / size)}
        page={
          searchParams.get("page") !== null
            ? parseInt(searchParams.get("page") as string)
            : 1
        }
        onChange={handleSearch}
      />
    </Box>
  );
};
