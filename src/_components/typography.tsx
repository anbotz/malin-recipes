import { Typography, TypographyTypeMap } from "@mui/material";

export const TypographyComponent = ({
  variant,
  gutterBottom,
  children,
}: {
  variant: TypographyTypeMap["props"]["variant"];
  gutterBottom: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Typography variant={variant} gutterBottom={gutterBottom}>
      {children}
    </Typography>
  );
};
