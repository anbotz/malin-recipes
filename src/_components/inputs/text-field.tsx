"use client";
import { useState } from "react";

export const TextFieldComponent = ({
  label,
  placeholder,
  name,
  required,
  defaultValue,
  className,
  type = "text",
}: {
  placeholder: string;
  name: string;
  label?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
  type?: string;
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <label className={`form-control w-full max-w-prose ${className}`}>
      {label && (
        <div className="label">
          <span className="label-text">
            {label}
            {required && "*"}
          </span>
        </div>
      )}
      <input
        type={type}
        className={`input input-bordered w-full`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
      />
    </label>
  );
};
