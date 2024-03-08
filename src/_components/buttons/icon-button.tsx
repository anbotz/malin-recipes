"use client";
import { CloudUpload, Delete, Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const Icon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "cloud":
      return <CloudUpload />;
    case "edit":
      return <Edit />;
    case "delete":
      return <Delete />;
    default:
      return;
  }
};

export const IconButtonComponent = ({
  icon,
  onClick,
  title,
}: {
  icon: string;
  onClick: () => void;
  title: string;
}) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick}>
        <Icon icon={icon} />
      </IconButton>
    </Tooltip>
  );
};
