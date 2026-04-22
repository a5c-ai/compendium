import React, { useState, useRef } from "react";
import { useCtrl, useOutside, useKey, usePopoverPos } from "../hooks";
import { Icon } from "../Icon";
import { Portal } from "../Portal";

/* ── Select ──────────────────────────────────────────────── */

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: (string | SelectOption)[];
  placeholder?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  defaultValue,
  onChange,
  options,
  placeholder = "Select…",
  disabled,
}) => {
  const [v, set] = useCtrl(value, defaultValue as string, onChange);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pos = usePopoverPos(trigger, open);

  const opts = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  useOutside(panel, () => setOpen(false), open);
  useKey("Escape", () => setOpen(false), open);

  const selected = opts.find((o) => o.value === v);

  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (
        e.key === "ArrowDown" ||
        e.key === "Enter" ||
        e.key === " "
      ) {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      setActive((a) => (a + 1) % opts.length);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setActive((a) => (a - 1 + opts.length) % opts.length);
      e.preventDefault();
    } else if (e.key === "Enter") {
      set(opts[active].value);
      setOpen(false);
      e.preventDefault();
    }
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="tkc-select tkc-focus"
        data-open={open || undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKey}
      >
        <span className={selected ? "" : "tkc-select__placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="tkc-select__caret">
          <Icon name="chevronDown" size={12} />
        </span>
      </button>
      {open && (
        <Portal>
          <div
            ref={panel}
            className="tkc-pop"
            role="listbox"
            style={{ top: pos.top, left: pos.left, minWidth: pos.width }}
            onKeyDown={onKey}
          >
            {opts.map((o, i) => (
              <div
                key={o.value}
                className="tkc-pop__item"
                role="option"
                aria-selected={o.value === v}
                data-active={i === active || undefined}
                data-selected={o.value === v || undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  set(o.value);
                  setOpen(false);
                }}
              >
                <span>{o.label}</span>
                <span className="tkc-pop__check">
                  <Icon name="check" size={12} />
                </span>
              </div>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
};

/* ── Combobox ────────────────────────────────────────────── */

export interface ComboboxProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: (string | SelectOption)[];
  placeholder?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  value,
  defaultValue,
  onChange,
  options,
  placeholder = "Search…",
}) => {
  const [v, set] = useCtrl(value, defaultValue as string, onChange);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const trigger = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pos = usePopoverPos(trigger, open);

  const opts = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  const filtered = opts.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );
  const selected = opts.find((o) => o.value === v);

  useOutside(panel, () => setOpen(false), open);
  useKey("Escape", () => setOpen(false), open);

  const onKey = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key.length === 1))
      setOpen(true);
    if (e.key === "ArrowDown") {
      setActive((a) => Math.min(filtered.length - 1, a + 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setActive((a) => Math.max(0, a - 1));
      e.preventDefault();
    } else if (e.key === "Enter" && filtered[active]) {
      set(filtered[active].value);
      setQuery("");
      setOpen(false);
      e.preventDefault();
    }
  };

  return (
    <>
      <div
        ref={trigger}
        className="tkc-input tkc-focus-within"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "text",
        }}
        onClick={() => setOpen(true)}
        data-open={open || undefined}
      >
        <Icon
          name="search"
          size={13}
          style={{ color: "var(--tkc-ink-quiet)" }}
        />
        <input
          style={{
            border: 0,
            background: "transparent",
            outline: 0,
            flex: 1,
            font: "inherit",
            color: "inherit",
          }}
          placeholder={selected ? selected.label : placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKey}
        />
      </div>
      {open && (
        <Portal>
          <div
            ref={panel}
            className="tkc-pop"
            role="listbox"
            style={{ top: pos.top, left: pos.left, minWidth: pos.width }}
          >
            {filtered.length === 0 ? (
              <div className="tkc-pop__empty">No matches</div>
            ) : (
              filtered.map((o, i) => (
                <div
                  key={o.value}
                  className="tkc-pop__item"
                  role="option"
                  aria-selected={o.value === v}
                  data-active={i === active || undefined}
                  data-selected={o.value === v || undefined}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    set(o.value);
                    setQuery("");
                    setOpen(false);
                  }}
                >
                  <span>{o.label}</span>
                </div>
              ))
            )}
          </div>
        </Portal>
      )}
    </>
  );
};
