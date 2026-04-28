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
      aria-busy={loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {loading && <span className="tkc-btn__spin" />}
      {!loading && leading}
      <span className="tkc-btn__label">{children}</span>
      {!loading && trailing}
    </button>
  );
};

export interface IconButtonProps extends ButtonProps {
  icon: string;
  label: string;
  iconSize?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  iconSize = 15,
  ...rest
}) => (
  <Button className="tkc-btn--icon" aria-label={label} title={label} {...rest}>
    <Icon className="tkc-btn__icon" name={icon} size={iconSize} strokeWidth={1.75} />
  </Button>
);
