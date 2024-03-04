import { Divider, Typography } from "@mui/material";
import React from "react";

export const PageComponent = ({
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
