import React, { useState } from "react";
import { cx } from "../utils";
import { useCtrl } from "../hooks";
import { Icon } from "../Icon";

export interface TagProps {
  children: React.ReactNode;
  onRemove?: (e?: React.MouseEvent) => void;
  removing?: boolean;
}

export const Tag: React.FC<TagProps> = ({ children, onRemove, removing }) => (
  <span className={cx("tkc-tag", removing && "tkc-tag--removing")}>
    {children}
    {onRemove && (
      <button
        type="button"
        className="tkc-tag__x"
        onClick={onRemove}
        aria-label="remove"
      >
        <Icon name="x" size={10} />
      </button>
    )}
  </span>
);

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  value,
  defaultValue = [],
  onChange,
  placeholder = "Add tag…",
}) => {
  const [tags, set] = useCtrl(value, defaultValue, onChange);
  const [draft, setDraft] = useState("");
  const [removing, setRemoving] = useState<number | null>(null);
  const add = () => {
    const t = draft.trim();
    if (!t) return;
    if (tags.includes(t)) {
      setDraft("");
      return;
    }
    set([...tags, t]);
    setDraft("");
  };
  const removeAt = (i: number) => {
    setRemoving(i);
    setTimeout(() => {
      set(tags.filter((_, j) => j !== i));
      setRemoving(null);
    }, 200);
  };
  return (
    <div
      className="tkc-input"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        alignItems: "center",
        padding: 6,
      }}
    >
      {tags.map((t, i) => (
        <Tag key={i} removing={removing === i} onRemove={() => removeAt(i)}>
          {t}
        </Tag>
      ))}
      <input
        style={{
          border: 0,
          background: "transparent",
          outline: 0,
          flex: 1,
          minWidth: 80,
          font: "inherit",
          color: "inherit",
        }}
        placeholder={placeholder}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (
            e.key === "Backspace" &&
            draft === "" &&
            tags.length
          ) {
            removeAt(tags.length - 1);
          }
        }}
      />
    </div>
  );
};
