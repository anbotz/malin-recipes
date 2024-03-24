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
      <div className="flex flex-col items-center w-full">{children}</div>
      <ButtonContainerComponent>{buttons}</ButtonContainerComponent>
    </form>
  );
};
