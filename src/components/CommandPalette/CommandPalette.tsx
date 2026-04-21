import React, { useState, useRef, useEffect } from "react";
import { useKey } from "../hooks";
import { Icon } from "../Icon";
import { Portal } from "../Portal";

export interface CommandItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  group?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose?: () => void;
  items: CommandItem[];
  placeholder?: string;
  onSelect?: (item: CommandItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  items,
  placeholder = "Type a command…",
  onSelect,
}) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useKey("Escape", () => onClose && onClose(), open);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const filtered = items.filter((it) =>
    it.label.toLowerCase().includes(query.toLowerCase())
  );

  const pick = (item: CommandItem) => {
    item.onSelect && item.onSelect();
    onSelect && onSelect(item);
    onClose && onClose();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActive((a) => Math.min(filtered.length - 1, a + 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setActive((a) => Math.max(0, a - 1));
      e.preventDefault();
    } else if (e.key === "Enter" && filtered[active]) {
      pick(filtered[active]);
      e.preventDefault();
    }
  };

  if (!open) return null;

  return (
    <Portal>
      <div className="tkc-scrim" onClick={onClose} />
      <div
        className="tkc-modal"
        role="dialog"
        aria-modal="true"
        style={{ width: "min(520px, 92vw)", padding: 0 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            borderBottom: "1.5px solid var(--tkc-rule-m)",
          }}
        >
          <Icon
            name="search"
            size={15}
            style={{ color: "var(--tkc-ink-quiet)" }}
          />
          <input
            ref={inputRef}
            style={{
              border: 0,
              background: "transparent",
              outline: 0,
              flex: 1,
              font: "inherit",
              fontSize: 15,
              color: "var(--tkc-ink)",
            }}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKey}
          />
        </div>
        <div style={{ maxHeight: 320, overflow: "auto", padding: 4 }}>
          {filtered.length === 0 ? (
            <div className="tkc-pop__empty">No commands found</div>
          ) : (
            filtered.map((it, i) => (
              <div
                key={it.id}
                className="tkc-pop__item"
                data-active={i === active || undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(it)}
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
            ))
          )}
        </div>
      </div>
    </Portal>
  );
};
