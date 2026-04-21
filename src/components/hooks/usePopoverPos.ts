import { useState, useLayoutEffect, RefObject } from "react";

export type Placement = "bottom-start" | "bottom-end" | "top-start";

export interface PopoverPos {
  top: number;
  left: number;
  width: number;
}

export function usePopoverPos(
  triggerRef: RefObject<HTMLElement | null>,
  open: boolean,
  placement: Placement = "bottom-start"
): PopoverPos {
  const [pos, setPos] = useState<PopoverPos>({ top: 0, left: 0, width: 0 });
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const update = () => {
      const r = triggerRef.current!.getBoundingClientRect();
      let top = r.bottom + 4;
      let left = r.left;
      if (placement === "bottom-end") left = r.right;
      if (placement === "top-start") top = r.top - 4;
      setPos({
        top: top + window.scrollY,
        left: left + window.scrollX,
        width: r.width,
      });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, placement]);
  return pos;
}
