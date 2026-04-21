import React from "react";
import { useCtrl } from "../hooks";

const DEFAULT_COLORS = [
  "#C03A2B",
  "#B37E3E",
  "#2F6F5E",
  "#2B2A6B",
  "#8E1B1B",
  "#D9A96A",
  "#2E7C8A",
  "#1B1611",
  "#F0E6D1",
];

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  colors?: string[];
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  defaultValue,
  onChange,
  colors = DEFAULT_COLORS,
}) => {
  const [v, set] = useCtrl(value, defaultValue || colors[0], onChange);
  return (
    <div className="tkc-swatches">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          className="tkc-swatch"
          style={{ background: c }}
          data-selected={v === c || undefined}
          aria-label={c}
          onClick={() => set(c)}
        />
      ))}
    </div>
  );
};
