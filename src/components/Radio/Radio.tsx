import React, { useMemo } from "react";
import { useCtrl } from "../hooks";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: (string | RadioOption)[];
  name?: string;
  disabled?: boolean;
  direction?: "vertical" | "horizontal";
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  defaultValue,
  onChange,
  options,
  name,
  disabled,
  direction = "vertical",
}) => {
  const [v, set] = useCtrl(value, defaultValue as string, onChange);
  const gid = useMemo(
    () => "rg-" + Math.random().toString(36).slice(2, 9),
    []
  );
  return (
    <div
      style={{
        display: direction === "horizontal" ? "flex" : "grid",
        gap: 10,
        flexWrap: "wrap",
      }}
      role="radiogroup"
    >
      {options.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.value;
        const lab = typeof opt === "string" ? opt : opt.label;
        const dis = disabled || (typeof opt !== "string" && opt.disabled);
        const isChecked = v === val;
        return (
          <label
            key={val}
            className="tkc-check-row"
            data-disabled={dis || undefined}
          >
            <button
              type="button"
              role="radio"
              aria-checked={isChecked}
              aria-disabled={dis || undefined}
              className="tkc-radio tkc-focus"
              data-checked={isChecked || undefined}
              onClick={() => !dis && set(val)}
              name={name || gid}
              disabled={dis}
            >
              <span className="tkc-radio__dot" />
            </button>
            <span>{lab}</span>
          </label>
        );
      })}
    </div>
  );
};
