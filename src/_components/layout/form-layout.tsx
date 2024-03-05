import { Container } from "@mui/material";
import { ButtonContainerComponent } from "../container/button-container";

export const FormLayoutComponent = ({
  submit,
  children,
  buttons,
}: {
  submit: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
  buttons: React.ReactNode;
}) => {
  return (
    <form action={submit}>
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
