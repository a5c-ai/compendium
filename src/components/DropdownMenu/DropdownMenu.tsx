import React, { useState, useRef } from "react";
import { useOutside, useKey, usePopoverPos } from "../hooks";
import type { Placement } from "../hooks";
import { Icon } from "../Icon";
import { Portal } from "../Portal";

export interface MenuItem {
  type?: "group" | "sep";
  label?: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DropdownMenuProps {
  trigger: React.ReactElement<any>;
  items: MenuItem[];
  placement?: Placement;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
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
            {items.map((it, i) =>
              it.type === "group" ? (
                <div key={i} className="tkc-pop__group">
                  {it.label}
                </div>
              ) : it.type === "sep" ? (
                <div
                  key={i}
                  style={{
                    height: 1,
                    background: "var(--tkc-rule-m)",
                    margin: "4px 0",
                  }}
                />
              ) : (
                <div
                  key={i}
                  className="tkc-pop__item"
                  data-disabled={it.disabled || undefined}
                  onClick={() => {
                    if (!it.disabled) {
                      it.onClick && it.onClick();
                      setOpen(false);
                    }
                  }}
                >
                  {it.icon && <Icon name={it.icon} size={13} />}
                  <span>{it.label}</span>
                  {it.shortcut && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: ".1em",
                        color: "var(--tkc-ink-quiet)",
                      }}
                    >
                      {it.shortcut}
                    </span>
                  )}
                </div>
              )
            )}
          </div>
        </Portal>
      )}
    </>
  );
};

/* ── ContextMenu ─────────────────────────────────────────── */

export interface ContextMenuProps {
  children: React.ReactElement<any>;
  items: MenuItem[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
}) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const panel = useRef<HTMLDivElement>(null);
  useOutside(panel, () => setOpen(false), open);
  useKey("Escape", () => setOpen(false), open);

  const onContext = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({
      top: e.clientY + window.scrollY,
      left: e.clientX + window.scrollX,
    });
    setOpen(true);
  };

  return (
    <>
      {React.cloneElement(children, { onContextMenu: onContext })}
      {open && (
        <Portal>
          <div
            ref={panel}
            className="tkc-pop"
            style={{ top: pos.top, left: pos.left }}
          >
            {items.map((it, i) =>
              it.type === "group" ? (
                <div key={i} className="tkc-pop__group">
                  {it.label}
                </div>
              ) : it.type === "sep" ? (
                <div
                  key={i}
                  style={{
                    height: 1,
                    background: "var(--tkc-rule-m)",
                    margin: "4px 0",
                  }}
                />
              ) : (
                <div
                  key={i}
                  className="tkc-pop__item"
                  data-disabled={it.disabled || undefined}
                  onClick={() => {
                    if (!it.disabled) {
                      it.onClick && it.onClick();
                      setOpen(false);
                    }
                  }}
                >
                  {it.icon && <Icon name={it.icon} size={13} />}
                  <span>{it.label}</span>
                  {it.shortcut && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: ".1em",
                        color: "var(--tkc-ink-quiet)",
                      }}
                    >
                      {it.shortcut}
                    </span>
                  )}
                </div>
              )
            )}
          </div>
        </Portal>
      )}
    </>
  );
};
