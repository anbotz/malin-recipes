import { useState } from "react";

export const NumberFieldComponent = ({
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
  defaultValue?: number;
}) => {
  const [value, setValue] = useState<number | undefined>(defaultValue);

  return (
    <label className="form-control w-full max-w-prose">
      <div className="label">
        <span className="label-text">
          {label}
          {required && "*"}
        </span>
      </div>
      <input
        type="number"
        className="input input-bordered  max-w-prose"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        name={name}
        min={1}
        max={10}
      />
    </label>
  );
};
