import React from "react";

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const paths: Record<string, string | [string, null]> = {
  check: "M4 8l3 3 5-7",
  dash: "M4 8h8",
  caret: "M6 4l4 4-4 4",
  x: "M4 4l8 8M12 4l-8 8",
  plus: "M8 3v10M3 8h10",
  minus: "M3 8h10",
  search: [
    "M7.5 13a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zM11.5 11.5L14 14",
    null,
  ],
  folder:
    "M2 4.5C2 3.67 2.67 3 3.5 3h2.3l1 1.5H12.5c.83 0 1.5.67 1.5 1.5V12c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 0 1 2 12z",
  file: "M4 2h5l3 3v9H4z M9 2v3h3",
  gear: "M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3",
  calendar:
    "M3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM3 7h10M5 3v2M11 3v2",
  clock: [
    "M8 2.5A5.5 5.5 0 1 0 8 13.5 5.5 5.5 0 0 0 8 2.5zM8 5v3l2 1.5",
    null,
  ],
  pencil: "M3 13l1-3 7-7 2 2-7 7-3 1z",
  upload: "M8 11V3M5 6l3-3 3 3M3 13h10",
  bell: "M4 11a4 4 0 0 1 8 0v1l1 1H3l1-1zM6 13a2 2 0 0 0 4 0",
  info: [
    "M8 1.5A6.5 6.5 0 1 0 8 14.5 6.5 6.5 0 0 0 8 1.5zM8 7v4.5M8 5h.01",
    null,
  ],
  chevronRight: "M6 3l5 5-5 5",
  chevronDown: "M3 6l5 5 5-5",
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 14,
  className = "",
  style,
}) => {
  const d = paths[name] || "";
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
    >
      {Array.isArray(d)
        ? d.map((p, i) => (p ? <path key={i} d={p} /> : null))
        : <path d={d} />}
    </svg>
  );
};
