import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export const PageLayoutComponent = ({
  title,
  children,
  buttons,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  buttons?: React.ReactNode;
}) => {
  const MARGIN = 8;
  return (
    <Grid display="flex" flexDirection="column" margin={`${MARGIN}px`}>
      <Grid display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexGrow={1}
        />
        <Box>{buttons}</Box>
      </Grid>
      <Grid
        height={`calc(100vh - 150px - ${2 * MARGIN}px)`} // 2*75px for appheader and h3, 2*8px for margin
      >
        {children}
      </Grid>
    </Grid>
  );
};
