import { TextField } from "@mui/material";

export const TextFieldComponent = ({
  label,
  placeholder,
  name,
  required,
}: {
  label: string;
  placeholder: string;
  name: string;
  required?: boolean;
}) => {
  return (
    <TextField
      {...{ label, placeholder, name, required }}
      variant="outlined"
      margin="dense"
      fullWidth
    />
  );
};
