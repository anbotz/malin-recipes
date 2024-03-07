import { TextField } from "@mui/material";

export const MultilineTextFieldComponent = ({
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
      multiline
      maxRows={10}
      minRows={4}
      {...{ label, placeholder, name, required }}
      variant="outlined"
      margin="dense"
      fullWidth
    />
  );
};
