import { ReactNode } from 'react';

export interface ComponentModeItem {
  num: string;
  name: string;
  icon: ReactNode;
  cmd: ReactNode;
  description: string;
}

export interface ComponentGateItem {
  index: string;
  title: string;
  body: string;
  tone: 'pass' | 'pending' | 'sealed';
}

export interface ComponentGemItem {
  label: string;
  color: string;
}

export interface ComponentGaugeItem {
  value: string;
  top: string;
  bottom: string;
  needleRotation: number;
}

export function ComponentModeGrid({ items }: { items: readonly ComponentModeItem[] }) {
  return (
    <div className="mk-components-modes">
      {items.map((item) => (
        <article key={item.name} className="mk-components-mode">
          <span className="mk-components-mode__num">{item.num}</span>
          <div className="mk-components-mode__glyph">{item.icon}</div>
          <strong className="mk-components-mode__name">{item.name}</strong>
          <span className="mk-components-mode__cmd">{item.cmd}</span>
          <p className="mk-components-mode__desc">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

export function ComponentGateStrip({ items }: { items: readonly ComponentGateItem[] }) {
  return (
    <div className="mk-components-gates">
      {items.map((item) => (
        <article key={item.index} className={`mk-components-gate mk-components-gate--${item.tone}`}>
          <span>{item.index}</span>
          <strong>{item.title}</strong>
          <small>{item.body}</small>
        </article>
      ))}
    </div>
  );
}

export function ComponentInstallStrip({
  command,
  action,
}: {
  command: ReactNode;
  action: ReactNode;
}) {
  return (
    <div className="mk-components-install">
      <div className="mk-components-install__cmd">
        <span className="mk-components-install__sigil">$</span>
        <span>{command}</span>
      </div>
      {action}
    </div>
  );
}

export function ComponentGemRow({
  seal,
  items,
}: {
  seal: ReactNode;
  items: readonly ComponentGemItem[];
}) {
  return (
    <div className="mk-components-seal-row">
      <div className="mk-components-wax">{seal}</div>
      <div className="mk-components-gems">
        {items.map((item) => (
          <figure key={item.label}>
            <div
              className="mk-components-gem"
              style={{
                background: `radial-gradient(circle at 35% 28%, rgba(255,255,255,.9), ${item.color} 34%, color-mix(in oklab, ${item.color} 70%, black) 100%)`,
              }}
            />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function ComponentGaugeRow({ items }: { items: readonly ComponentGaugeItem[] }) {
  return (
    <div className="mk-components-gauge-row">
      {items.map((item) => (
        <div key={`${item.value}-${item.top}`} className="mk-components-gauge">
          <div className="mk-components-gauge__dial">
            <div
              className="mk-components-gauge__needle"
              style={{ transform: `translate(-50%, -10px) rotate(${item.needleRotation}deg)` }}
            />
            <div className="mk-components-gauge__pivot" />
            <div className="mk-components-gauge__value">{item.value}</div>
          </div>
          <div className="mk-components-gauge__label">
            {item.top}
            <br />
            {item.bottom}
          </div>
        </div>
      ))}
    </div>
  );
}
