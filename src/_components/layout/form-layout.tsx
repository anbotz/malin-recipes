import { Container } from "@mui/material";
import { ButtonContainerComponent } from "../container/button-container";

export const FormLayoutComponent = ({
  action,
  onSubmit,
  children,
  buttons,
}: {
  action?: (formData: FormData) => Promise<any>;
  onSubmit?: (e: any) => void;
  children: React.ReactNode;
  buttons: React.ReactNode;
}) => {
  return (
    <form action={action} onSubmit={onSubmit}>
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {children}
      </Container>
      <ButtonContainerComponent>{buttons}</ButtonContainerComponent>
    </form>
  );
};
