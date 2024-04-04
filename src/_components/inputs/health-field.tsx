"use client";
import { HEALTHS } from "@/lib/const";
import { Health } from "@prisma/client";
import { useState } from "react";

const JoinInput = ({
  label,
  name,
  checked,
}: {
  label: string;
  name: string;
  checked: boolean;
}) => {
  const [selected, setSelected] = useState<boolean>(checked);
  return (
    <div>
      <input
        className="join-item btn btn-xs"
        type="checkbox"
        name={name}
        aria-label={label}
        checked={selected}
        onClick={() => setSelected(!selected)}
      />
    </div>
  );
};

export const HealthFieldComponent = ({
  defaultValue,
}: {
  defaultValue?: Health[];
}) => {
  const healths = HEALTHS.map((h) => ({
    name: `health.${h}`,
    label: h,
    checked: defaultValue?.some((df) => df === h) ?? false,
  }));

  return (
    <label className={` w-full max-w-prose`}>
      <div className="label">
        <span className="label-text">Régime</span>
      </div>
      <div className="join flex justify-center">
        {healths.map((h) => (
          <JoinInput
            key={h.name}
            name={h.name}
            label={h.label}
            checked={h.checked}
          />
        ))}
      </div>
    </label>
  );
};
