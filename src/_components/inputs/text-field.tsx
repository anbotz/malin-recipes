import { useState } from "react";

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
  const [value, setValue] = useState(defaultValue);

  return (
    <label className="form-control w-full max-w-prose">
      <div className="label">
        <span className="label-text">
          {label}
          {required && "*"}
        </span>
      </div>
      <input
        type="text"
        className="input input-bordered w-full max-w-prose"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
      />
    </label>
  );
};
