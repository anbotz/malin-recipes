"use client";
import { HEALTHS } from "@/lib/const";

const JoinInput = ({ label, name }: { label: string; name: string }) => {
  return (
    <div>
      <input
        className="join-item btn btn-xs"
        type="checkbox"
        name={name}
        aria-label={label}
      />
    </div>
  );
};

export const HealthFieldComponent = ({}: {}) => {
  const healths = HEALTHS.map((h) => ({ name: `health.${h}`, label: h }));

  return (
    <label className={` w-full max-w-prose`}>
      <div className="label">
        <span className="label-text">Régime</span>
      </div>
      <div className="join flex justify-center">
        {healths.map((h) => (
          <JoinInput key={h.name} name={h.name} label={h.label} />
        ))}
      </div>
    </label>
  );
};
