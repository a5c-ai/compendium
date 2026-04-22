import { ReactNode } from 'react';
import { Tabs, Tag } from '../components';

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

export interface ComponentNavLinkItem {
  label: string;
  current?: boolean;
}

export interface ComponentChipItem {
  label: string;
}

export interface ComponentTabCopyItem {
  value: string;
  label: string;
  body: ReactNode;
}

export function ComponentNavBar({
  brand,
  links,
  action,
}: {
  brand: ReactNode;
  links: readonly ComponentNavLinkItem[];
  action: ReactNode;
}) {
  return (
    <div className="mk-components-nav">
      <div className="mk-components-nav__brand">{brand}</div>
      <div className="mk-components-nav__links">
        {links.map((link) => <a key={link.label} className={link.current ? 'current' : undefined}>{link.label}</a>)}
      </div>
      <div className="mk-components-nav__cta">{action}</div>
    </div>
  );
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

export function ComponentChipBoard({ items }: { items: readonly ComponentChipItem[] }) {
  return (
    <div className="mk-components-chips">
      {items.map((item) => <Tag key={item.label}>{item.label}</Tag>)}
    </div>
  );
}

export function ComponentTabNarrative({
  items,
  defaultValue,
}: {
  items: readonly ComponentTabCopyItem[];
  defaultValue: string;
}) {
  return (
    <Tabs
      defaultValue={defaultValue}
      items={items.map((item) => ({
        value: item.value,
        label: item.label,
        body: <div className="mk-components-tabcopy">{item.body}</div>,
      }))}
    />
  );
}
