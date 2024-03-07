"use client";
import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UploadButton = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}
    >
      Upload image
      <VisuallyHiddenInput
        type="file"
        onChange={onChange}
        accept="image/jpeg,image/png"
      />
    </Button>
  );
};
