import React, { useRef, useState, useEffect, useCallback } from "react";
import { useCtrl } from "../hooks";

const clamp = (n: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, n));

export { clamp };

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  ticks?: number;
  format?: (value: number) => React.ReactNode;
  ariaLabel?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  ticks,
  format,
  ariaLabel,
}) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const ref = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(false);

  const toPct = (n: number) => ((n - min) / (max - min)) * 100;
  const fromEvt = useCallback(
    (clientX: number) => {
      const r = ref.current!.getBoundingClientRect();
      const pct = clamp((clientX - r.left) / r.width, 0, 1);
      const raw = min + pct * (max - min);
      const stepped = Math.round(raw / step) * step;
      return clamp(stepped, min, max);
    },
    [min, max, step]
  );

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDrag(true);
    const clientX =
      "clientX" in e ? e.clientX : e.touches[0].clientX;
    set(fromEvt(clientX));
  };

  useEffect(() => {
    if (!drag) return;
    const move = (e: MouseEvent | TouchEvent) => {
      const x =
        "clientX" in e
          ? e.clientX
          : e.touches && e.touches[0] && e.touches[0].clientX;
      if (x != null) set(fromEvt(x));
    };
    const up = () => setDrag(false);
    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", move);
    document.addEventListener("mouseup", up);
    document.addEventListener("touchend", up);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchend", up);
    };
  }, [drag, fromEvt, set]);

  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      set(clamp(v - step, min, max));
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      set(clamp(v + step, min, max));
      e.preventDefault();
    }
  };

  const pct = toPct(v);
  return (
    <div
      className="tkc-slider"
      ref={ref}
      data-dragging={drag || undefined}
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      {ticks && (
        <div className="tkc-slider__ticks">
          {Array.from({ length: ticks }).map((_, i) => (
            <div
              key={i}
              className="tkc-slider__tick"
              style={{ left: `${(i / (ticks - 1)) * 100}%` }}
            />
          ))}
        </div>
      )}
      <div className="tkc-slider__track" />
      <div
        className="tkc-slider__fill"
        style={{ left: 0, width: `${pct}%` }}
      />
      <div
        className="tkc-slider__thumb tkc-focus"
        style={{ left: `${pct}%` }}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={v}
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={key}
      >
        <span className="tkc-slider__value" style={{ left: "50%" }}>
          {format ? format(v) : v}
        </span>
      </div>
    </div>
  );
};

export interface RangeSliderProps {
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: (value: number) => React.ReactNode;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  defaultValue = [20, 80],
  onChange,
  min = 0,
  max = 100,
  step = 1,
  format,
}) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const ref = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<number | null>(null);

  const toPct = (n: number) => ((n - min) / (max - min)) * 100;
  const fromEvt = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    const pct = clamp((clientX - r.left) / r.width, 0, 1);
    const raw = min + pct * (max - min);
    return clamp(Math.round(raw / step) * step, min, max);
  };

  const onDown =
    (idx: number) => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDrag(idx);
    };

  useEffect(() => {
    if (drag == null) return;
    const move = (e: MouseEvent | TouchEvent) => {
      const x =
        "clientX" in e
          ? e.clientX
          : e.touches && e.touches[0] && e.touches[0].clientX;
      if (x == null) return;
      const n = fromEvt(x);
      const nv: [number, number] = [...v] as [number, number];
      nv[drag] = n;
      if (nv[0] > nv[1]) nv.reverse();
      set(nv);
    };
    const up = () => setDrag(null);
    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", move);
    document.addEventListener("mouseup", up);
    document.addEventListener("touchend", up);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchend", up);
    };
  }, [drag, v]);

  const [a, b] = v;
  return (
    <div
      className="tkc-slider"
      ref={ref}
      data-dragging={drag != null || undefined}
    >
      <div className="tkc-slider__track" />
      <div
        className="tkc-slider__fill"
        style={{
          left: `${toPct(a)}%`,
          width: `${toPct(b) - toPct(a)}%`,
        }}
      />
      {([a, b] as number[]).map((val, i) => (
        <div
          key={i}
          className="tkc-slider__thumb tkc-focus"
          style={{ left: `${toPct(val)}%`, zIndex: 2 + i }}
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          onMouseDown={onDown(i)}
          onTouchStart={onDown(i)}
        >
          <span className="tkc-slider__value" style={{ left: "50%" }}>
            {format ? format(val) : val}
          </span>
        </div>
      ))}
    </div>
  );
};
