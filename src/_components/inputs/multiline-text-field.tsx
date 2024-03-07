import { TextField } from "@mui/material";

export const MultilineTextFieldComponent = ({
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
      multiline
      maxRows={10}
      minRows={4}
      {...{ label, placeholder, name, required, defaultValue }}
      variant="outlined"
      margin="dense"
      fullWidth
    />
  );
};
