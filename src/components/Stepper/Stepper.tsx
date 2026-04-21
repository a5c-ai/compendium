import React from "react";
import { useCtrl } from "../hooks";
import { Icon } from "../Icon";

const clamp = (n: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, n));

export interface StepperProps {
  value?: number | string;
  defaultValue?: number;
  onChange?: (value: number | string) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const Stepper: React.FC<StepperProps> = ({
  value,
  defaultValue = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
}) => {
  const [v, set] = useCtrl<number | string>(value, defaultValue, onChange);
  const numV = typeof v === "number" ? v : parseFloat(v as string) || 0;
  const dec = () => set(clamp(numV - step, min, max));
  const inc = () => set(clamp(numV + step, min, max));
  return (
    <div className="tkc-stepper">
      <button
        type="button"
        onClick={dec}
        disabled={numV <= min}
        aria-label="decrease"
      >
        <Icon name="minus" size={12} />
      </button>
      <input
        type="text"
        value={v}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          if (!Number.isNaN(n)) set(clamp(n, min, max));
          else if (e.target.value === "" || e.target.value === "-")
            set(e.target.value);
        }}
        onBlur={(e) => {
          const n = parseFloat(e.target.value);
          set(Number.isNaN(n) ? 0 : clamp(n, min, max));
        }}
      />
      <button
        type="button"
        onClick={inc}
        disabled={numV >= max}
        aria-label="increase"
      >
        <Icon name="plus" size={12} />
      </button>
    </div>
  );
};
