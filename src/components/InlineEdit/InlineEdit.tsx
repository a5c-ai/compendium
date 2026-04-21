import React, { useState, useRef, useEffect } from "react";
import { useCtrl } from "../hooks";
import { Icon } from "../Icon";

export interface InlineEditProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  defaultValue = "",
  onChange,
  placeholder = "edit…",
}) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(v);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commit = () => {
    set(draft);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(v);
    setEditing(false);
  };

  if (editing) {
    return (
      <span
        className="tkc-inline"
        style={{ borderBottomColor: "var(--tkc-cinnabar)" }}
      >
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            else if (e.key === "Escape") cancel();
          }}
          style={{ width: Math.max(40, (draft.length + 1) * 8) }}
        />
      </span>
    );
  }
  return (
    <span
      className="tkc-inline"
      onClick={() => {
        setDraft(v);
        setEditing(true);
      }}
    >
      <span>
        {v || (
          <em style={{ color: "var(--tkc-ink-quiet)" }}>{placeholder}</em>
        )}
      </span>
      <Icon name="pencil" size={11} className="tkc-inline__pencil" />
    </span>
  );
};
