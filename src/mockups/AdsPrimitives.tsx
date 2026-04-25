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

export interface AdsSlotProps {
  index: ReactNode;
  size: ReactNode;
  name: ReactNode;
  notes?: ReactNode;
  stackClassName?: string;
  children: ReactNode;
}

export function AdsSlot({
  index,
  size,
  name,
  notes,
  stackClassName,
  children,
}: AdsSlotProps) {
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

export interface AdsSheetProps {
  label: ReactNode;
  size: ReactNode;
  children: ReactNode;
}

export function AdsSheet({
  label,
  size,
  children,
}: AdsSheetProps) {
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
      {items.map((item, index) => (
        <Fragment key={`${String(item.label)}-${index}`}>
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

export interface AdsSlotNoteSpec {
  label: ReactNode;
  value: ReactNode;
}

export interface AdsRule {
  left: ReactNode;
  right: ReactNode;
}

export interface AdsChapter {
  number: ReactNode;
  label: ReactNode;
  detail: ReactNode;
  stacked?: boolean;
}

export interface AdsCatalogCardBase {
  kind: 'mr' | 'lb' | 'sky' | 'poster';
  theme?: AdsCardTone;
  folio?: ReactNode;
}

export interface AdsMediumRectangleCard extends AdsCatalogCardBase {
  kind: 'mr';
  chapter: AdsChapter;
  headline: ReactNode;
  brandTitle: ReactNode;
  brandBody: ReactNode;
  action: ReactNode;
  tickerLeft: ReactNode;
  tickerRight: ReactNode;
}

export interface AdsLeaderboardCard extends AdsCatalogCardBase {
  kind: 'lb';
  badge: { number: ReactNode; label: ReactNode };
  eyebrow: ReactNode;
  headline: ReactNode;
  brandTitle: ReactNode;
  action: ReactNode;
}

export interface AdsSkyscraperCard extends AdsCatalogCardBase {
  kind: 'sky';
  chapter: AdsChapter;
  headline: ReactNode;
  proof: ReactNode;
  actions: readonly ReactNode[];
}

export interface AdsPosterCard extends AdsCatalogCardBase {
  kind: 'poster';
  chapter: AdsChapter;
  headline: ReactNode;
  figure: ReactNode;
  figureTone?: 'default' | 'words';
  stanzas: readonly AdsCardStanza[];
  brandTitle: ReactNode;
  brandBody: ReactNode;
  action: ReactNode;
}

export type AdsCatalogCard =
  | AdsMediumRectangleCard
  | AdsLeaderboardCard
  | AdsSkyscraperCard
  | AdsPosterCard;

export interface AdsSheetItem {
  rule: AdsRule;
  card: AdsCatalogCard;
}

export interface AdsSlotItem {
  number: ReactNode;
  size: ReactNode;
  name: ReactNode;
  orientation?: 'stack' | 'row';
  sheets: readonly AdsSheetItem[];
  note: ReactNode;
  specs?: readonly AdsSlotNoteSpec[];
}

function renderCatalogCard(card: AdsCatalogCard) {
  if (card.kind === 'mr') {
    return (
      <AdsCard variant="medium-rectangle" tone={card.theme}>
        {card.folio ? <AdsCardFolio>{card.folio}</AdsCardFolio> : null}
        <AdsChapterBand index={card.chapter.number} title={card.chapter.label} subtitle={card.chapter.detail} stacked={card.chapter.stacked} />
        <h3>{card.headline}</h3>
        <AdsCardFooter
          brand={card.brandTitle}
          body={card.brandBody}
          cta={card.action}
        />
        <AdsCardTicker left={card.tickerLeft} right={card.tickerRight} />
      </AdsCard>
    );
  }

  if (card.kind === 'lb') {
    return (
      <AdsCard variant="leaderboard" tone={card.theme}>
        <AdsLeaderboardBadge index={card.badge.number} label={card.badge.label} />
        <AdsLeaderboardBody eyebrow={card.eyebrow} title={card.headline} />
        <AdsLeaderboardDivider />
        <AdsLeaderboardCta brand={card.brandTitle} cta={card.action} />
      </AdsCard>
    );
  }

  if (card.kind === 'sky') {
    return (
      <AdsCard variant="skyscraper" tone={card.theme}>
        {card.folio ? <AdsCardFolio>{card.folio}</AdsCardFolio> : null}
        <AdsChapterBand index={card.chapter.number} title={card.chapter.label} subtitle={card.chapter.detail} stacked={card.chapter.stacked} />
        <AdsCardSpine title={card.headline} />
        <AdsCardProof>{card.proof}</AdsCardProof>
        <AdsCardActionColumn>
          {card.actions.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
        </AdsCardActionColumn>
      </AdsCard>
    );
  }

  return (
    <AdsCard variant="poster" tone={card.theme}>
      {card.folio ? <AdsCardFolio>{card.folio}</AdsCardFolio> : null}
      <AdsChapterBand index={card.chapter.number} title={card.chapter.label} subtitle={card.chapter.detail} stacked={card.chapter.stacked} />
      <h3>{card.headline}</h3>
      <AdsCardFigure label={card.figure} words={card.figureTone === 'words'} />
      <AdsCardStanzas items={card.stanzas} />
      <AdsCardFooter
        brand={card.brandTitle}
        body={card.brandBody}
        cta={card.action}
      />
    </AdsCard>
  );
}

function AdsCatalogSheet({ rule, card }: AdsSheetItem) {
  return (
    <AdsSheet label={rule.left} size={rule.right}>
      {renderCatalogCard(card)}
    </AdsSheet>
  );
}

function AdsCatalogSlot({
  number,
  size,
  name,
  orientation = 'stack',
  sheets,
  note,
  specs,
}: AdsSlotItem) {
  return (
    <AdsSlot
      index={number}
      size={size}
      name={name}
      stackClassName={orientation === 'row' ? 'mk-ads-stack--row' : undefined}
      notes={(
        <AdsNotes
          body={note}
          specs={specs?.length ? <AdsSpecs items={specs} /> : undefined}
        />
      )}
    >
      {sheets.map((sheet, index) => (
        <AdsCatalogSheet key={index} {...sheet} />
      ))}
    </AdsSlot>
  );
}

export function AdsCatalog({
  title,
  emphasis,
  meta,
  slots,
}: {
  title: ReactNode;
  emphasis: ReactNode;
  meta: readonly ReactNode[];
  slots: readonly AdsSlotItem[];
}) {
  return (
    <section className="mk-ads">
      <header className="mk-ads__head">
        <h2>
          {title} <em>{emphasis}</em>
        </h2>
        <div className="mk-ads__meta">
          {meta.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </header>
      {slots.map((slot, index) => (
        <AdsCatalogSlot key={index} {...slot} />
      ))}
    </section>
  );
}
