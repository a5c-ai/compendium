import React from "react";
import { useCtrl } from "../hooks";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  badge?: React.ReactNode;
  body?: React.ReactNode;
}

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  items: TabItem[];
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  defaultValue,
  onChange,
  items = [],
}) => {
  const [v, set] = useCtrl(
    value,
    defaultValue || (items && items[0]?.value),
    onChange
  );
  return (
    <div>
      <div className="tkc-tabs" role="tablist">
        {items.map((it) => (
          <button
            key={it.value}
            type="button"
            role="tab"
            className="tkc-tab"
            data-active={v === it.value || undefined}
            onClick={() => set(it.value)}
          >
            {it.label}
            {it.badge != null && (
              <span className="tkc-badge" style={{ marginLeft: 8 }}>
                {it.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {items.map((it) =>
        v === it.value ? (
          <div key={it.value} role="tabpanel" style={{ paddingTop: 16 }}>
            {it.body}
          </div>
        ) : null
      )}
    </div>
  );
};
