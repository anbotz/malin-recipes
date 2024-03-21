"use client";
import {
  CloudUpload,
  Delete,
  Edit,
  KeyboardBackspace,
} from "@/_components/icons";

const Icon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "cloud":
      return <CloudUpload />;
    case "edit":
      return <Edit />;
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
    <div className="tooltip" data-tip={title}>
      <button onClick={onClick} className="btn btn-circle btn-neutral">
        <Icon icon={icon} />
      </button>
    </div>
  );
};
