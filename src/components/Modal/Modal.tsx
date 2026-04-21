import React, { useEffect } from "react";
import { useKey } from "../hooks";
import { Icon } from "../Icon";
import { Portal } from "../Portal";

/* ── Modal ───────────────────────────────────────────────── */

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
}) => {
  useKey("Escape", () => onClose && onClose(), open);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  if (!open) return null;
  return (
    <Portal>
      <div className="tkc-scrim" onClick={onClose} />
      <div className="tkc-modal" role="dialog" aria-modal="true">
        {title && (
          <div className="tkc-modal__head">
            <span style={{ flex: 1 }}>{title}</span>
            <button
              type="button"
              className="tkc-toast__x"
              onClick={onClose}
              aria-label="close"
            >
              <Icon name="x" size={14} />
            </button>
          </div>
        )}
        <div className="tkc-modal__body">{children}</div>
        {footer && <div className="tkc-modal__foot">{footer}</div>}
      </div>
    </Portal>
  );
};

/* ── Drawer ──────────────────────────────────────────────── */

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: string | number;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  width,
}) => {
  useKey("Escape", () => onClose && onClose(), open);
  if (!open) return null;
  return (
    <Portal>
      <div className="tkc-scrim" onClick={onClose} />
      <div
        className="tkc-drawer"
        style={width ? { width } : undefined}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="tkc-drawer__head">
            <span
              style={{
                flex: 1,
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              {title}
            </span>
            <button
              type="button"
              className="tkc-toast__x"
              onClick={onClose}
              aria-label="close"
            >
              <Icon name="x" size={14} />
            </button>
          </div>
        )}
        <div className="tkc-drawer__body">{children}</div>
        {footer && <div className="tkc-drawer__foot">{footer}</div>}
      </div>
    </Portal>
  );
};
