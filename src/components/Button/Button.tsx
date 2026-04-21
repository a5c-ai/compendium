import React from "react";
import { cx } from "../utils";
import { Icon } from "../Icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | undefined;
  loading?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size,
  loading,
  disabled,
  leading,
  trailing,
  className,
  children,
  onClick,
  ...rest
}) => {
  const cls = cx(
    "tkc-btn",
    variant === "primary" && "tkc-btn--primary",
    variant === "ghost" && "tkc-btn--ghost",
    size === "sm" && "tkc-btn--sm",
    className
  );
  return (
    <button
      className={cls}
      disabled={disabled}
      data-loading={loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {loading && <span className="tkc-btn__spin" />}
      {!loading && leading}
      {children}
      {!loading && trailing}
    </button>
  );
};

export interface IconButtonProps extends ButtonProps {
  icon: string;
  label: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  ...rest
}) => (
  <Button className="tkc-btn--icon" aria-label={label} title={label} {...rest}>
    <Icon name={icon} size={14} />
  </Button>
);
