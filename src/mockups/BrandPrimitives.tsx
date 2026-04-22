import { ReactNode } from 'react';

export interface BrandSpecimen {
  label: string;
  wordmark: ReactNode;
  caption: string;
  dark?: boolean;
}

export interface BrandMonoSpecimen {
  label: string;
  icon: ReactNode;
  caption: string;
  tone?: 'default' | 'void' | 'cinnabar' | 'brass';
}

export interface BrandGlyphItem {
  label: string;
  icon: ReactNode;
}

export interface BrandVoiceColumn {
  cap: string;
  title: string;
  items: readonly string[];
  tone: 'yes' | 'no';
}

export interface BrandSealItem {
  tone: string;
  name: string;
  description: string;
}

export function BrandHero({
  cap,
  icon,
  wordmark,
  under,
  statement,
}: {
  cap: string;
  icon: ReactNode;
  wordmark: ReactNode;
  under: ReactNode;
  statement: ReactNode;
}) {
  return (
    <div className="mk-brand-hero">
      <span className="mk-brand-hero__cap">{cap}</span>
      <div className="mk-brand-hero__row">
        {icon}
        <div className="mk-brand-hero__word">{wordmark}</div>
      </div>
      <div className="mk-brand-hero__under"><i />{under}<i /></div>
      <p>{statement}</p>
    </div>
  );
}

export function BrandSpecimenGrid({ items }: { items: readonly BrandSpecimen[] }) {
  return (
    <div className="mk-brand-specimens">
      {items.map((item) => (
        <div key={item.label} className={`mk-brand-specimen ${item.dark ? 'mk-brand-specimen--dark' : ''}`}>
          <span>{item.label}</span>
          <div className="mk-brand-specimen__word">{item.wordmark}</div>
          <small>{item.caption}</small>
        </div>
      ))}
    </div>
  );
}

export function BrandMonoGrid({ items }: { items: readonly BrandMonoSpecimen[] }) {
  return (
    <div className="mk-brand-mono-grid">
      {items.map((item) => (
        <div
          key={item.label}
          className={`mk-brand-mono-cell ${item.tone === 'void' ? 'mk-brand-mono-cell--void' : ''} ${item.tone === 'cinnabar' ? 'mk-brand-mono-cell--cin' : ''} ${item.tone === 'brass' ? 'mk-brand-mono-cell--brass' : ''}`.trim()}
        >
          <span>{item.label}</span>
          {item.icon}
          <small>{item.caption}</small>
        </div>
      ))}
    </div>
  );
}

export function BrandGlyphAtlas({
  cap,
  items,
  footer,
}: {
  cap: string;
  items: readonly BrandGlyphItem[];
  footer: ReactNode;
}) {
  return (
    <>
      <div className="mk-catalog-cap">{cap}</div>
      <div className="mk-brand-alphabet-grid">
        {items.map((item) => (
          <div key={item.label} className="mk-brand-glyph-cell">
            <div className="mk-brand-glyph-cell__icon">{item.icon}</div>
            <div className="mk-brand-glyph-cell__label">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="mk-brand-alphabet-string">{footer}</div>
    </>
  );
}

export function BrandVoiceGrid({ columns }: { columns: readonly BrandVoiceColumn[] }) {
  return (
    <div className="mk-brand-voice">
      {columns.map((column) => (
        <div key={column.cap} className={`mk-brand-voice__col mk-brand-voice__col--${column.tone}`}>
          <span className="mk-brand-voice__cap">{column.cap}</span>
          <h4>{column.title}</h4>
          <div className="mk-brand-voice__list">
            {column.items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function BrandSealRow({ items }: { items: readonly BrandSealItem[] }) {
  return (
    <div className="mk-brand-seals">
      {items.map((item) => (
        <div key={item.tone} className="mk-brand-seal-col">
          <div className={`mk-brand-seal-disc mk-brand-seal-disc--${item.tone}`}>
            <span>{item.name}</span>
          </div>
          <strong>{item.name}</strong>
          <small>{item.description}</small>
        </div>
      ))}
    </div>
  );
}
