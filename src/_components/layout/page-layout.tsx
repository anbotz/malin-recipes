import { Box, Typography } from "@mui/material";
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
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
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
      </Box>
      {children}
    </>
  );
};
