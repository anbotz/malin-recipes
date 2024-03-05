import { Container } from "@mui/material";

export const ButtonContainerComponent = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: object;
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...sx,
      }}
      maxWidth="sm"
    >
      {children}
    </Container>
  );
};
