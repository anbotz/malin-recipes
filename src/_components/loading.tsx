import { CircularProgress, Box } from "@mui/material";

export const LoadingComponent = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height={`calc(100vh - 75px)`} // 75px for appheader
  >
    <CircularProgress size={50} />
  </Box>
);
