export const UploadButton = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="file"
      className="file-input file-input-bordered"
      onChange={onChange}
      accept="image/jpeg,image/png"
    />
  );
};
