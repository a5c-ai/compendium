import { ReactNode } from 'react';

export interface ColorGroundItem {
  label: string;
  color: string;
  note: string;
  meta: string;
  dark?: boolean;
}

export interface ColorLadderItem {
  label: string;
  color: string;
  note: string;
}

export interface ColorGemItem {
  label: string;
  color: string;
  note: string;
}

export interface ColorVerdictItem {
  label: string;
  color: string;
  body: string;
  meta: string;
}

export interface ColorUsagePanel {
  cap: string;
  title: ReactNode;
  body: ReactNode;
  tone: 'light' | 'dark';
  actions: ReactNode;
}

export function ColorGroundGrid({ items }: { items: readonly ColorGroundItem[] }) {
  return (
    <div className="mk-ground-grid">
      {items.map((item) => (
        <article
          key={item.label}
          className={`mk-ground-card ${item.dark ? 'mk-ground-card--dark' : ''}`}
          style={{ background: item.color }}
        >
          <strong>{item.label}</strong>
          <div>
            <p>{item.note}</p>
            <small>{item.meta}</small>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ColorLadderGroup({
  title,
  items,
}: {
  title: string;
  items: readonly ColorLadderItem[];
}) {
  return (
    <>
      <div className="mk-color-ladder__group">{title}</div>
      <div className="mk-color-ladder">
        {items.map((item) => (
          <div key={item.label} className="mk-color-ladder__row">
            <div className="mk-color-ladder__swatch" style={{ background: item.color }} />
            <div>
              <strong>{item.label}</strong>
              <p>{item.note}</p>
            </div>
            <span>{item.color}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function ColorBrassRow({ items }: { items: readonly string[] }) {
  return (
    <div className="mk-brass-row">
      {items.map((item, index) => (
        <div key={item} className={`mk-brass-step mk-brass-step--${index + 1}`}>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function ColorGemShelf({ items }: { items: readonly ColorGemItem[] }) {
  return (
    <div className="mk-gem-shelf">
      {items.map((item) => (
        <article key={item.label} className="mk-gem-cell">
          <div
            className="mk-gem-cell__stone"
            style={{
              background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.92), ${item.color} 34%, color-mix(in oklab, ${item.color} 70%, black) 100%)`,
            }}
          />
          <strong>{item.label}</strong>
          <small>{item.note}</small>
        </article>
      ))}
    </div>
  );
}

export function ColorVerdictStrip({ items }: { items: readonly ColorVerdictItem[] }) {
  return (
    <div className="mk-verdict-strip">
      {items.map((item) => (
        <div key={item.label}>
          <i style={{ background: item.color }} />
          <strong>{item.label}</strong>
          <small>{item.body}</small>
          <span>{item.meta}</span>
        </div>
      ))}
    </div>
  );
}

export function ColorUsageGrid({ items }: { items: readonly ColorUsagePanel[] }) {
  return (
    <div className="mk-usage-grid">
      {items.map((item) => (
        <div key={item.cap} className={`mk-usage mk-usage--${item.tone}`}>
          <div className="mk-usage__cap">{item.cap}</div>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
          <div className="mk-usage__row">{item.actions}</div>
        </div>
      ))}
    </div>
  );
}
