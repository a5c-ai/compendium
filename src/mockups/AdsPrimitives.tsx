import { Fragment, ReactNode } from 'react';

export interface AdsSlotNoteSpec {
  label: string;
  value: string;
}

export interface AdsRule {
  left: string;
  right: string;
}

export interface AdsChapter {
  number: string;
  label: string;
  detail: string;
  stacked?: boolean;
}

export interface AdsCardBase {
  kind: 'mr' | 'lb' | 'sky' | 'poster';
  theme?: 'paper' | 'blueprint' | 'ink' | 'cinnabar';
  folio?: string;
}

export interface AdsMediumRectangleCard extends AdsCardBase {
  kind: 'mr';
  chapter: AdsChapter;
  headline: ReactNode;
  brandTitle: string;
  brandBody: string;
  action: ReactNode;
  tickerLeft: string;
  tickerRight: string;
}

export interface AdsLeaderboardCard extends AdsCardBase {
  kind: 'lb';
  badge: { number: string; label: string };
  eyebrow: string;
  headline: ReactNode;
  brandTitle: string;
  action: ReactNode;
}

export interface AdsSkyscraperCard extends AdsCardBase {
  kind: 'sky';
  chapter: AdsChapter;
  headline: ReactNode;
  proof: string;
  actions: readonly ReactNode[];
}

export interface AdsPosterCard extends AdsCardBase {
  kind: 'poster';
  chapter: AdsChapter;
  headline: ReactNode;
  figure: ReactNode;
  figureTone?: 'default' | 'words';
  stanzas: readonly ReactNode[];
  brandTitle: string;
  brandBody: string;
  action: ReactNode;
}

export type AdsCard =
  | AdsMediumRectangleCard
  | AdsLeaderboardCard
  | AdsSkyscraperCard
  | AdsPosterCard;

export interface AdsSheetItem {
  rule: AdsRule;
  card: AdsCard;
}

export interface AdsSlotItem {
  number: string;
  size: string;
  name: string;
  orientation?: 'stack' | 'row';
  sheets: readonly AdsSheetItem[];
  note: string;
  specs?: readonly AdsSlotNoteSpec[];
}

function adsCardClass(card: AdsCard) {
  const themeClass =
    card.theme === 'blueprint'
      ? 'mk-ad-card--bp'
      : card.theme === 'ink'
        ? 'mk-ad-card--ink'
        : card.theme === 'cinnabar'
          ? 'mk-ad-card--cin'
          : '';
  return ['mk-ad-card', `mk-ad-card--${card.kind}`, themeClass].filter(Boolean).join(' ');
}

function AdsChapterView({ chapter }: { chapter: AdsChapter }) {
  return (
    <div className={`mk-ad-card__chapter ${chapter.stacked ? 'mk-ad-card__chapter--stack' : ''}`.trim()}>
      <b>{chapter.number}</b>
      <span>{chapter.label}<em>{chapter.detail}</em></span>
    </div>
  );
}

export function AdsSheet({ rule, card }: AdsSheetItem) {
  return (
    <div className="mk-ads-sheet">
      <div className="mk-ads-sheet__rule"><span>{rule.left}</span><i /><span>{rule.right}</span></div>
      {card.kind === 'mr' ? (
        <div className={adsCardClass(card)}>
          {card.folio ? <span className="mk-ad-card__folio">{card.folio}</span> : null}
          <AdsChapterView chapter={card.chapter} />
          <h3>{card.headline}</h3>
          <div className="mk-ad-card__bottom">
            <p><strong>{card.brandTitle}</strong>{card.brandBody}</p>
            {card.action}
          </div>
          <div className="mk-ad-card__ticker"><span>{card.tickerLeft}</span><span>{card.tickerRight}</span></div>
        </div>
      ) : null}
      {card.kind === 'lb' ? (
        <div className={adsCardClass(card)}>
          <div className="mk-ad-card__badge"><b>{card.badge.number}</b><span>{card.badge.label}</span></div>
          <div className="mk-ad-card__body"><small>{card.eyebrow}</small><h3>{card.headline}</h3></div>
          <i className="mk-ad-card__divider" />
          <div className="mk-ad-card__cta-wrap"><strong>{card.brandTitle}</strong>{card.action}</div>
        </div>
      ) : null}
      {card.kind === 'sky' ? (
        <div className={adsCardClass(card)}>
          {card.folio ? <span className="mk-ad-card__folio">{card.folio}</span> : null}
          <AdsChapterView chapter={card.chapter} />
          <div className="mk-ad-card__spine"><i /><h3>{card.headline}</h3></div>
          <p className="mk-ad-card__proof">{card.proof}</p>
          <div className="mk-ad-card__cta-column">{card.actions.map((action, index) => <div key={index}>{action}</div>)}</div>
        </div>
      ) : null}
      {card.kind === 'poster' ? (
        <div className={adsCardClass(card)}>
          {card.folio ? <span className="mk-ad-card__folio">{card.folio}</span> : null}
          <AdsChapterView chapter={card.chapter} />
          <h3>{card.headline}</h3>
          <div className={['mk-ad-card__figure', card.figureTone === 'words' ? 'mk-ad-card__figure--words' : ''].filter(Boolean).join(' ')}>{card.figure}</div>
          <div className="mk-ad-card__stanzas">{card.stanzas.map((stanza, index) => <p key={index}>{stanza}</p>)}</div>
          <div className="mk-ad-card__bottom">
            <p><strong>{card.brandTitle}</strong>{card.brandBody}</p>
            {card.action}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function AdsSlot({
  number,
  size,
  name,
  orientation = 'stack',
  sheets,
  note,
  specs,
}: AdsSlotItem) {
  return (
    <article className="mk-ads-slot">
      <div className="mk-ads-slot__title">
        <span className="num">{number}</span>
        <span className="size">{size}</span>
        <span className="name">{name}</span>
      </div>
      <div className="mk-ads-slot__row">
        <div className={`mk-ads-stack ${orientation === 'row' ? 'mk-ads-stack--row' : ''}`.trim()}>
          {sheets.map((sheet, index) => <AdsSheet key={`${sheet.rule.left}-${index}`} {...sheet} />)}
        </div>
        <aside className="mk-ads-notes">
          <p>{note}</p>
          {specs?.length ? (
            <div className="mk-ads-specs">
              {specs.map((spec) => (
                <Fragment key={spec.label}>
                  <span>{spec.label}</span>
                  <strong>{spec.value}</strong>
                </Fragment>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </article>
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
  meta: readonly string[];
  slots: readonly AdsSlotItem[];
}) {
  return (
    <section className="mk-ads">
      <header className="mk-ads__head">
        <h2>{title} <em>{emphasis}</em></h2>
        <div className="mk-ads__meta">
          {meta.map((item) => <span key={item}>{item}</span>)}
        </div>
      </header>
      {slots.map((slot) => <AdsSlot key={`${slot.number}-${slot.size}`} {...slot} />)}
    </section>
  );
}
