import React, { useState, useRef, useEffect, useCallback } from "react";

export interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSplit?: number;
  minLeft?: number;
  minRight?: number;
  direction?: "horizontal" | "vertical";
}

export const SplitPane: React.FC<SplitPaneProps> = ({
  left,
  right,
  defaultSplit = 50,
  minLeft = 10,
  minRight = 10,
  direction = "horizontal",
}) => {
  const [split, setSplit] = useState(defaultSplit);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = (n: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, n));

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setDragging(true);
    },
    []
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let pct: number;
      if (direction === "horizontal") {
        pct = ((e.clientX - rect.left) / rect.width) * 100;
      } else {
        pct = ((e.clientY - rect.top) / rect.height) * 100;
      }
      setSplit(clamp(pct, minLeft, 100 - minRight));
    };
    const up = () => setDragging(false);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
  }, [dragging, direction, minLeft, minRight]);

  const isHoriz = direction === "horizontal";

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: isHoriz ? "row" : "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          [isHoriz ? "width" : "height"]: `${split}%`,
          overflow: "auto",
          flexShrink: 0,
        }}
      >
        {left}
      </div>
      <div
        onMouseDown={onMouseDown}
        style={{
          [isHoriz ? "width" : "height"]: 6,
          flexShrink: 0,
          cursor: isHoriz ? "col-resize" : "row-resize",
          background: "var(--tkc-rule-m)",
          transition: dragging ? "none" : "background 120ms",
        }}
      />
      <div style={{ flex: 1, overflow: "auto" }}>{right}</div>
    </div>
  );
};
