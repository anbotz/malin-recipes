import { Typography } from "@mui/material";
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
      <Typography variant="h3" gutterBottom>
        {title}
        {buttons}
      </Typography>
      {children}
    </>
  );
};
