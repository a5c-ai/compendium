import React from "react";
import { useCtrl } from "../hooks";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  indeterminate,
  onChange,
  disabled,
  label,
}) => {
  const [on, set] = useCtrl(checked, !!defaultChecked, onChange);
  const toggle = () => {
    if (!disabled) set(!on);
  };
  const control = (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : on}
      aria-disabled={disabled || undefined}
      className="tkc-check tkc-focus"
      data-checked={(on && !indeterminate) || undefined}
      data-indeterminate={indeterminate || undefined}
      onClick={toggle}
      disabled={disabled}
    >
      {indeterminate ? (
        <svg
          className="tkc-check__mark tkc-check__mark--dash"
          width="12"
          height="12"
          viewBox="0 0 16 16"
        >
          <path d="M4 8h8" />
        </svg>
      ) : (
        <svg
          className="tkc-check__mark"
          width="12"
          height="12"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 8l3 3 6-7" />
        </svg>
      )}
    </button>
  );
  if (label) {
    return (
      <label className="tkc-check-row" data-disabled={disabled || undefined}>
        {control}
        <span>{label}</span>
      </label>
    );
  }
  return control;
};
