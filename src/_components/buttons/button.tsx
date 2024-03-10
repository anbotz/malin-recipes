import { Button } from "@mui/material";

export const ButtonComponent = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Button variant="contained" onClick={onClick}>
      {children}
    </Button>
  );
};
