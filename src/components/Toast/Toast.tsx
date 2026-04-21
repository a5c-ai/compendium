import React, { useState, useCallback, createContext, useContext } from "react";
import { cx } from "../utils";
import { Icon } from "../Icon";

export interface ToastOptions {
  title?: string;
  message?: string;
  kind?: "info" | "success" | "warn" | "error";
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

export interface ToastContextValue {
  push: (t: string | ToastOptions) => string;
  close: (id: string) => void;
}

const ToastCtx = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [list, setList] = useState<ToastItem[]>([]);
  const [closing, setClosing] = useState<Record<string, boolean>>({});

  const close = useCallback((id: string) => {
    setClosing((c) => ({ ...c, [id]: true }));
    setTimeout(() => {
      setList((l) => l.filter((t) => t.id !== id));
      setClosing((c) => {
        const n = { ...c };
        delete n[id];
        return n;
      });
    }, 220);
  }, []);

  const push = useCallback(
    (t: string | ToastOptions) => {
      const id = Math.random().toString(36).slice(2, 9);
      const item: ToastItem = {
        id,
        kind: "info",
        duration: 4500,
        ...(typeof t === "string" ? { title: t } : t),
      };
      setList((l) => [...l, item]);
      if (item.duration) setTimeout(() => close(id), item.duration);
      return id;
    },
    [close]
  );

  return (
    <ToastCtx.Provider value={{ push, close }}>
      {children}
      <div className="tkc-toasts">
        {list.map((t, i) => (
          <div
            key={t.id}
            className={cx("tkc-toast", t.kind && `tkc-toast--${t.kind}`)}
            data-closing={closing[t.id] || undefined}
          >
            <span className="tkc-toast__num">
              {t.kind === "success"
                ? "✓"
                : t.kind === "warn"
                  ? "!"
                  : t.kind === "error"
                    ? "×"
                    : i + 1}
            </span>
            <div className="tkc-toast__body">
              {t.title && <div className="t">{t.title}</div>}
              {t.message && <div className="s">{t.message}</div>}
            </div>
            <button
              type="button"
              className="tkc-toast__x"
              onClick={() => close(t.id)}
              aria-label="dismiss"
            >
              <Icon name="x" size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};

export const useToasts = (): ToastContextValue => {
  const ctx = useContext(ToastCtx);
  if (!ctx)
    throw new Error("useToasts must be used within a ToastProvider");
  return ctx;
};
