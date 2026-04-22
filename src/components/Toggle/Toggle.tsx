import React from "react";
import { useCtrl } from "../hooks";

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked,
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
      role="switch"
      aria-checked={on}
      aria-disabled={disabled || undefined}
      className="tkc-toggle tkc-focus"
      data-on={on || undefined}
      data-disabled={disabled || undefined}
      onClick={toggle}
      disabled={disabled}
    >
      <span className="tkc-toggle__knob" />
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
