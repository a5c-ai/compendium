import { Fragment, ReactNode } from 'react';
import './mockups.css';

export type AdsCardVariant =
  | 'medium-rectangle'
  | 'leaderboard'
  | 'skyscraper'
  | 'poster';

export type AdsCardTone =
  | 'paper'
  | 'blueprint'
  | 'ink'
  | 'cinnabar';

export interface AdsSpecItem {
  label: ReactNode;
  value: ReactNode;
}

export interface AdsCardStanza {
  label: ReactNode;
  body: ReactNode;
}

export function AdsSlot({
  index,
  size,
  name,
  notes,
  stackClassName,
  children,
}: {
  index: ReactNode;
  size: ReactNode;
  name: ReactNode;
  notes?: ReactNode;
  stackClassName?: string;
  children: ReactNode;
}) {
  return (
    <article className="mk-ads-slot">
      <div className="mk-ads-slot__title">
        <span className="num">{index}</span>
        <span className="size">{size}</span>
        <span className="name">{name}</span>
      </div>
      <div className="mk-ads-slot__row">
        <div className={['mk-ads-stack', stackClassName].filter(Boolean).join(' ')}>
          {children}
        </div>
        {notes}
      </div>
    </article>
  );
}

export function AdsSheet({
  label,
  size,
  children,
}: {
  label: ReactNode;
  size: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mk-ads-sheet">
      <div className="mk-ads-sheet__rule">
        <span>{label}</span>
        <i />
        <span>{size}</span>
      </div>
      {children}
    </div>
  );
}

export function AdsNotes({
  body,
  specs,
}: {
  body: ReactNode;
  specs?: ReactNode;
}) {
  return (
    <aside className="mk-ads-notes">
      <p>{body}</p>
      {specs}
    </aside>
  );
}

export function AdsSpecs({
  items,
}: {
  items: readonly AdsSpecItem[];
}) {
  return (
    <div className="mk-ads-specs">
      {items.map((item) => (
        <Fragment key={String(item.label)}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </Fragment>
      ))}
    </div>
  );
}

export function AdsChapterBand({
  index,
  title,
  subtitle,
  stacked,
}: {
  index: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  stacked?: boolean;
}) {
  return (
    <div className={`mk-ad-card__chapter ${stacked ? 'mk-ad-card__chapter--stack' : ''}`.trim()}>
      <b>{index}</b>
      <span>
        {title}
        <em>{subtitle}</em>
      </span>
    </div>
  );
}

export function AdsCardFolio({ children }: { children: ReactNode }) {
  return <span className="mk-ad-card__folio">{children}</span>;
}

export function AdsCardFooter({
  brand,
  body,
  cta,
}: {
  brand: ReactNode;
  body: ReactNode;
  cta: ReactNode;
}) {
  return (
    <div className="mk-ad-card__bottom">
      <p>
        <strong>{brand}</strong>
        {body}
      </p>
      {cta}
    </div>
  );
}

export function AdsCardTicker({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="mk-ad-card__ticker">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

export function AdsLeaderboardBadge({
  index,
  label,
}: {
  index: ReactNode;
  label: ReactNode;
}) {
  return (
    <div className="mk-ad-card__badge">
      <b>{index}</b>
      <span>{label}</span>
    </div>
  );
}

export function AdsLeaderboardBody({
  eyebrow,
  title,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
}) {
  return (
    <div className="mk-ad-card__body">
      <small>{eyebrow}</small>
      <h3>{title}</h3>
    </div>
  );
}

export function AdsLeaderboardDivider() {
  return <i className="mk-ad-card__divider" />;
}

export function AdsLeaderboardCta({
  brand,
  cta,
}: {
  brand: ReactNode;
  cta: ReactNode;
}) {
  return (
    <div className="mk-ad-card__cta-wrap">
      <strong>{brand}</strong>
      {cta}
    </div>
  );
}

export function AdsCardSpine({ title }: { title: ReactNode }) {
  return (
    <div className="mk-ad-card__spine">
      <i />
      <h3>{title}</h3>
    </div>
  );
}

export function AdsCardProof({ children }: { children: ReactNode }) {
  return <p className="mk-ad-card__proof">{children}</p>;
}

export function AdsCardActionColumn({ children }: { children: ReactNode }) {
  return <div className="mk-ad-card__cta-column">{children}</div>;
}

export function AdsCardFigure({
  label,
  words,
}: {
  label: ReactNode;
  words?: boolean;
}) {
  if (words) {
    return (
      <div className="mk-ad-card__figure mk-ad-card__figure--words">
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className="mk-ad-card__figure">
      <div className="mk-ad-card__figure-line" />
      <span>{label}</span>
    </div>
  );
}

export function AdsCardStanzas({
  items,
}: {
  items: readonly AdsCardStanza[];
}) {
  return (
    <div className="mk-ad-card__stanzas">
      {items.map((item, index) => (
        <p key={index}>
          <b>{item.label}</b>
          {' — '}
          {item.body}
        </p>
      ))}
    </div>
  );
}

function adsCardClasses(variant: AdsCardVariant, tone?: AdsCardTone) {
  const variantClass =
    variant === 'medium-rectangle'
      ? 'mk-ad-card--mr'
      : variant === 'leaderboard'
        ? 'mk-ad-card--lb'
        : variant === 'skyscraper'
          ? 'mk-ad-card--sky'
          : 'mk-ad-card--poster';

  const toneClass =
    tone === 'blueprint'
      ? 'mk-ad-card--bp'
      : tone === 'ink'
        ? 'mk-ad-card--ink'
        : tone === 'cinnabar'
          ? 'mk-ad-card--cin'
          : null;

  return ['mk-ad-card', variantClass, toneClass].filter(Boolean).join(' ');
}

export function AdsCard({
  variant,
  tone,
  children,
}: {
  variant: AdsCardVariant;
  tone?: AdsCardTone;
  children: ReactNode;
}) {
  return <div className={adsCardClasses(variant, tone)}>{children}</div>;
}
