import { useState, useCallback } from "react";

export function useCtrl<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (v: T) => void
): [T, (v: T) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isCtrl = value !== undefined;
  const v = isCtrl ? value : internal;
  const set = useCallback(
    (nv: T) => {
      if (!isCtrl) setInternal(nv);
      onChange && onChange(nv);
    },
    [isCtrl, onChange]
  );
  return [v, set];
}
