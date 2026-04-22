import { ReactNode } from 'react';

export interface SpacingLadderItem {
  name: string;
  token: string;
  value: number;
  note: string;
}

export interface SpacingMeasureItem {
  cap: string;
  mark: string;
  text: string;
  emphasis?: boolean;
}

export interface SpacingRadiusItem {
  name: string;
  spec: string;
}

export interface SpacingElevationItem {
  level: number;
  mark: string;
  spec: string;
}

export interface SpacingRhythmSection {
  cap: string;
  title: ReactNode;
  body: readonly string[];
}

export function SpacingLadder({
  cap,
  items,
}: {
  cap: string;
  items: readonly SpacingLadderItem[];
}) {
  return (
    <div className="mk-plate mk-ladder mk-ladder--engraved">
      <div className="mk-catalog-cap">{cap}</div>
      {items.map((item) => (
        <div key={item.name} className="mk-ladder__row">
          <div><span>{item.name}</span><small>{item.token}</small></div>
          <div className="mk-ruler-track"><i style={{ width: `${Math.max(item.value, 2)}px` }} /></div>
          <div className="mk-ruler-meta"><strong>{item.value} px</strong><small>{item.note}</small></div>
        </div>
      ))}
    </div>
  );
}

export function SpacingMeasureGrid({ items }: { items: readonly SpacingMeasureItem[] }) {
  return (
    <div className="mk-measure-grid">
      {items.map((item) => (
        <article
          key={item.cap}
          className={`mk-measure-cell ${item.emphasis ? 'mk-measure-cell--good' : ''}`.trim()}
        >
          <span className="mk-measure-cell__cap">{item.cap}</span>
          <strong className="mk-measure-cell__num">{item.mark}</strong>
          <p className="mk-measure-cell__text">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

export function SpacingRadiusRow({ items }: { items: readonly SpacingRadiusItem[] }) {
  return (
    <div className="mk-radii">
      {items.map((item, index) => (
        <div key={item.name} className="mk-radius-cell">
          <div className={`mk-radius-swatch mk-radius-swatch--${index}`} />
          <strong className="mk-radius-name">{item.name}</strong>
          <span className="mk-radius-spec">{item.spec}</span>
        </div>
      ))}
    </div>
  );
}

export function SpacingElevationRow({ items }: { items: readonly SpacingElevationItem[] }) {
  return (
    <div className="mk-elev-row">
      {items.map((item) => (
        <div key={item.level} className="mk-elev-cell">
          <div className={`mk-elev-plate mk-elev-plate--${item.level}`}>{item.mark}</div>
          <strong className="mk-elev-name">e-{item.level}</strong>
          <span className="mk-elev-spec">{item.spec}</span>
        </div>
      ))}
    </div>
  );
}

export function SpacingGridSheet({
  numbers,
  labels,
}: {
  numbers: readonly string[];
  labels: readonly string[];
}) {
  return (
    <div className="mk-grid-sheet">
      <div className="mk-grid-preview mk-grid-preview--filled">
        {numbers.map((number) => (
          <span key={number}>{number}</span>
        ))}
      </div>
      <div className="mk-grid-content">
        {labels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
    </div>
  );
}

export function SpacingRhythmBlock({
  sections,
}: {
  sections: readonly SpacingRhythmSection[];
}) {
  return (
    <div className="mk-rhythm-stack">
      {sections.map((section) => (
        <article key={section.cap} className="mk-rhythm-block">
          <span className="mk-rhythm-block__cap">{section.cap}</span>
          <h4>{section.title}</h4>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      ))}
    </div>
  );
}
