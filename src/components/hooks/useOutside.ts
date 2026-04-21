import { useEffect, RefObject } from "react";

export function useOutside(
  ref: RefObject<HTMLElement | null>,
  onOut: (e: MouseEvent) => void,
  when = true
): void {
  useEffect(() => {
    if (!when) return;
    const h = (e: MouseEvent) => {
      const r = ref.current;
      if (r && !r.contains(e.target as Node)) onOut(e);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [when, onOut]);
}
