export const UploadButton = ({
  onChange,
  accept,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
}) => {
  return (
    <input
      type="file"
      className="file-input file-input-bordered"
      onChange={onChange}
      accept={accept}
    />
  );
};
