import React from "react";
import { cx } from "../utils";

const clamp = (n: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, n));

export interface ProgressProps {
  value?: number;
  indeterminate?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  indeterminate,
  className,
}) => (
  <div
    className={cx(
      "tkc-progress",
      indeterminate && "tkc-progress--indeterminate",
      className
    )}
  >
    <div
      className="tkc-progress__bar"
      style={{
        width: indeterminate
          ? undefined
          : `${clamp(value ?? 0, 0, 100)}%`,
      }}
    />
  </div>
);

export interface SpinnerProps {
  gear?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ gear }) => (
  <span className={gear ? "tkc-spinner--gear" : "tkc-spinner"} />
);

export interface SkeletonProps {
  w?: string | number;
  h?: number;
  r?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  w = "100%",
  h = 12,
  r = 3,
  className,
  style,
}) => (
  <span
    className={cx("tkc-skel", className)}
    style={{ width: w, height: h, borderRadius: r, ...style }}
  />
);
