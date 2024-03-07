import { TextField } from "@mui/material";

export const TextFieldComponent = ({
  label,
  placeholder,
  name,
  required,
  defaultValue,
}: {
  label: string;
  placeholder: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
}) => {
  return (
    <TextField
      {...{ label, placeholder, name, required, defaultValue }}
      variant="outlined"
      margin="dense"
      fullWidth
    />
  );
};
