"use client";
import {
  Add,
  CloudUpload,
  Delete,
  Edit,
  KeyboardBackspace,
} from "@/_components/icons";
import ClawSvg from "../icons/claw";

const Icon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "cloud":
      return <CloudUpload />;
    case "edit":
      return <Edit />;
    case "add":
      return <Add />;
    case "scrap":
      return <ClawSvg />;
    case "delete":
      return <Delete />;
    case "back":
      return <KeyboardBackspace />;
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
    <button
      title={title}
      onClick={onClick}
      className="btn btn-circle btn-neutral mr-2"
    >
      <Icon icon={icon} />
    </button>
  );
};
