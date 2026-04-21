import { useEffect } from "react";

export function useKey(
  key: string,
  handler: (e: KeyboardEvent) => void,
  when = true
): void {
  useEffect(() => {
    if (!when) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === key) handler(e);
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [key, when, handler]);
}
