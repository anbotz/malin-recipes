import { Typography } from "@mui/material";
import React from "react";

export const PageLayoutComponent = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      {children}
    </>
  );
};
