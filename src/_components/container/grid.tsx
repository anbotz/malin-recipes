import { Box } from "@mui/material";

export const GridComponent = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: object;
}) => {
  return (
    <Box
      display="flex"
      sx={{
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
