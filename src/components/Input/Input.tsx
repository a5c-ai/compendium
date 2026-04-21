import React, { forwardRef } from "react";
import { cx } from "../utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...rest }, ref) => (
    <input
      ref={ref}
      className={cx("tkc-input", invalid && "tkc-input--invalid", className)}
      {...rest}
    />
  )
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, rows = 3, ...rest }, ref) => (
    <textarea
      ref={ref}
      className={cx(
        "tkc-textarea",
        invalid && "tkc-input--invalid",
        className
      )}
      rows={rows}
      style={{ resize: "vertical" }}
      {...rest}
    />
  )
);
Textarea.displayName = "Textarea";

export interface FieldProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  children?: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  label,
  hint,
  error,
  children,
}) => (
  <label className="tkc-field">
    {label && <span className="tkc-field__label">{label}</span>}
    {children}
    {error ? (
      <span className="tkc-field__error">{error}</span>
    ) : hint ? (
      <span className="tkc-field__hint">{hint}</span>
    ) : null}
  </label>
);
