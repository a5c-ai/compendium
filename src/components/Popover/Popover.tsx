import React, { useState, useRef } from "react";
import { useOutside, useKey, usePopoverPos } from "../hooks";
import type { Placement } from "../hooks";
import { Portal } from "../Portal";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PopoverProps {
  trigger: React.ReactElement<any>;
  children: React.ReactNode;
  placement?: Placement;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  placement = "bottom-start",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pos = usePopoverPos(ref, open, placement);
  useOutside(panel, () => setOpen(false), open);
  useKey("Escape", () => setOpen(false), open);

  return (
    <>
      {React.cloneElement(trigger, {
        ref,
        onClick: (e: React.MouseEvent) => {
          trigger.props.onClick && trigger.props.onClick(e);
          setOpen((o) => !o);
        },
      })}
      {open && (
        <Portal>
          <div
            ref={panel}
            className="tkc-pop"
            style={{ top: pos.top, left: pos.left }}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};
