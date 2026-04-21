import React, { useState } from "react";
import { Icon } from "../Icon";

const roman = (n: number): string => {
  const map: [string, number][] = [
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let r = "";
  for (const [s, v] of map) {
    while (n >= v) {
      r += s;
      n -= v;
    }
  }
  return r;
};

export { roman };

export interface AccordionItem {
  title: React.ReactNode;
  body: React.ReactNode;
  num?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number | number[] | null;
  type?: "single" | "multiple";
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpen = null,
  type = "single",
}) => {
  const [open, setOpen] = useState<number | null | number[]>(
    type === "single"
      ? defaultOpen != null
        ? (defaultOpen as number)
        : null
      : Array.isArray(defaultOpen)
        ? defaultOpen
        : []
  );

  const isOpen = (i: number) =>
    type === "single"
      ? open === i
      : (open as number[]).includes(i);

  const toggle = (i: number) => {
    if (type === "single") {
      setOpen(open === i ? null : i);
    } else {
      setOpen(
        (open as number[]).includes(i)
          ? (open as number[]).filter((x) => x !== i)
          : [...(open as number[]), i]
      );
    }
  };

  return (
    <div className="tkc-acc">
      {items.map((it, i) => (
        <div
          key={i}
          className="tkc-acc__item"
          data-open={isOpen(i) || undefined}
        >
          <button
            type="button"
            className="tkc-acc__trigger"
            onClick={() => toggle(i)}
          >
            <span className="tkc-acc__num">{it.num || roman(i + 1)}</span>
            <span>{it.title}</span>
            <span className="tkc-acc__caret">
              <Icon name="chevronRight" size={12} />
            </span>
          </button>
          <div className="tkc-acc__panel">
            <div className="tkc-acc__body">{it.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
