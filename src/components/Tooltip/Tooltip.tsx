import React, { useState, useRef } from "react";
import { Portal } from "../Portal";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TooltipProps {
  text: React.ReactNode;
  children: React.ReactElement<any>;
  placement?: "top" | "bottom";
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  placement = "top",
  delay = 250,
}) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const top =
      (placement === "bottom" ? r.bottom + 8 : r.top - 8) + window.scrollY;
    const left = r.left + r.width / 2 + window.scrollX;
    setPos({ top, left });
  };

  const on = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      update();
      setShow(true);
    }, delay);
  };
  const off = () => {
    if (timer.current) clearTimeout(timer.current);
    setShow(false);
  };

  return (
    <>
      {React.cloneElement(children, {
        ref: (el: HTMLElement | null) => {
          (ref as React.MutableRefObject<HTMLElement | null>).current = el;
          const orig = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref;
          if (typeof orig === "function") (orig as (el: HTMLElement | null) => void)(el);
          else if (orig && typeof orig === "object" && "current" in orig)
            (orig as React.MutableRefObject<HTMLElement | null>).current = el;
        },
        onMouseEnter: on,
        onMouseLeave: off,
        onFocus: on,
        onBlur: off,
      })}
      {show && (
        <Portal>
          <div
            className="tkc-tip"
            style={{
              top: pos.top,
              left: pos.left,
              transform: `translate(-50%, ${
                placement === "bottom" ? "0" : "-100%"
              })`,
            }}
          >
            {text}
          </div>
        </Portal>
      )}
    </>
  );
};
