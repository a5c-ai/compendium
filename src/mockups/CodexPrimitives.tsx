import { ReactElement, ReactNode } from 'react';
import { CodeBlock, type CodeBlockProps } from '../components';
import './mockups.css';

export type CodexTabName = 'Philosophy' | 'UI Components' | 'Type' | 'Pigments' | 'Measure';

export interface CodexChapterItem {
  label: string;
  current?: boolean;
  disabled?: boolean;
}

export interface CodexDocsChapter {
  num: string;
  title: string;
  pages: string;
  current?: boolean;
  items?: readonly CodexChapterItem[];
}

export interface CodexDocsMarginSection {
  title: string;
  items: readonly ReactNode[];
}

export interface CodexKpi {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
}

export interface CodexGaugeMetric {
  label: string;
  value: ReactNode;
  meter: ReactNode;
}

export interface CodexFeedItem {
  index: string;
  body: ReactNode;
  timestamp: string;
}

export interface CodexCommandItem {
  label: string;
  current?: boolean;
}

export interface CodexSegmentedControlItem {
  label: ReactNode;
  current?: boolean;
}

export interface CodexSidebarSection {
  title: string;
  items: readonly CodexCommandItem[];
}

export function CodexFrame({
  title,
  kicker,
  folio,
  colophon,
  activeTab,
  children,
}: {
  title: ReactNode;
  kicker: string;
  folio?: string;
  colophon?: string;
  activeTab: CodexTabName;
  children: ReactElement;
}) {
  const tabs: CodexTabName[] = ['Philosophy', 'UI Components', 'Type', 'Pigments', 'Measure'];
  return (
    <div className="mk-codex">
      <nav className="mk-tabs-row">
        {tabs.map((tab) => (
          <span key={tab} className={`mk-tab ${tab === activeTab ? 'mk-tab--active' : ''}`}>
            {tab}
          </span>
        ))}
      </nav>
      <div className="mk-casing">
        <span className="mk-rivet mk-rivet--bl" />
        <span className="mk-rivet mk-rivet--br" />
        <div className="mk-page">
          <div className="mk-gears" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="mk-gears__gear mk-gears__gear--lg">
              <g fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="100" cy="100" r="70" />
                <circle cx="100" cy="100" r="54" />
                <rect x="96" y="20" width="8" height="16" />
                <rect x="96" y="164" width="8" height="16" />
                <rect x="20" y="96" width="16" height="8" />
                <rect x="164" y="96" width="16" height="8" />
                <circle cx="100" cy="100" r="14" />
              </g>
            </svg>
            <svg viewBox="0 0 200 200" className="mk-gears__gear mk-gears__gear--sm">
              <g fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="100" cy="100" r="70" />
                <circle cx="100" cy="100" r="50" />
                <circle cx="100" cy="100" r="16" />
              </g>
            </svg>
          </div>
          <header className="mk-codex-head">
            <div className="mk-codex-vol">a5c · codex · vol. i{folio ? ` · ${folio}` : ''}</div>
            <h1>{title}</h1>
            <p>{kicker}</p>
          </header>
          {children}
          {colophon ? (
            <footer className="mk-colophon">
              <span>a5c.ai · design · codex</span>
              <span className="diamond">✦ ✦ ✦</span>
              <span className="right">{colophon}</span>
            </footer>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function CodexChapterHeader({
  num,
  title,
  body,
  meta,
  wide = true,
}: {
  num: string;
  title: ReactNode;
  body: ReactNode;
  meta?: ReactNode;
  wide?: boolean;
}) {
  return (
    <header className={`mk-chapter__head ${wide ? 'mk-chapter__head--wide' : ''}`}>
      <span className="mk-chapter__num">{num}</span>
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      {wide ? <span className="mk-codex-meta">{meta}</span> : null}
    </header>
  );
}

export function CodexPlate({
  children,
  dark,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`mk-plate ${dark ? 'mk-plate--void' : ''} ${className ?? ''}`.trim()}>
      {children}
    </div>
  );
}

export function CodexDocsShell({
  runningLeft,
  title,
  runningRight,
  toc,
  article,
  margin,
}: {
  runningLeft: ReactNode;
  title: ReactNode;
  runningRight: ReactNode;
  toc: ReactNode;
  article: ReactNode;
  margin: ReactNode;
}) {
  return (
    <section className="mk-docs">
      <header className="mk-docs__running">
        <div className="mk-docs__running-left">{runningLeft}</div>
        <span>{title}</span>
        <div className="mk-docs__running-right">{runningRight}</div>
      </header>
      <div className="mk-docs__layout">
        {toc}
        {article}
        {margin}
      </div>
    </section>
  );
}

export function CodexDocsToc({
  searchLabel,
  shortcut = '/',
  bookLabel,
  title,
  chapters,
}: {
  searchLabel: string;
  shortcut?: string;
  bookLabel: string;
  title: ReactNode;
  chapters: readonly CodexDocsChapter[];
}) {
  return (
    <aside className="mk-docs__toc">
      <div className="mk-docs__search">
        <span>{searchLabel}</span>
        <i>{shortcut}</i>
      </div>
      <small>{bookLabel}</small>
      <h3>{title}</h3>
      {chapters.map((row) => (
        <div key={row.num} className={`mk-docs__chapter ${row.current ? 'current' : ''}`}>
          <div className="mk-docs__chapter-head">
            <b>{row.num}</b>
            <strong>{row.title}</strong>
            <span>{row.pages}</span>
          </div>
          {row.items?.length ? (
            <div className="mk-docs__chapter-items">
              {row.items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={item.current ? 'current' : undefined}
                  aria-current={item.current ? 'true' : undefined}
                  disabled={item.disabled}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </aside>
  );
}

export function CodexDocsArticle({
  chapterMark,
  title,
  lead,
  meta,
  children,
}: {
  chapterMark: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="mk-docs__article">
      {chapterMark}
      <h2>{title}</h2>
      <p className="lead">{lead}</p>
      {meta ? <div className="mk-docs__meta">{meta}</div> : null}
      <div className="mk-docs__columns">{children}</div>
    </article>
  );
}

export function CodexDocsChapterMark({
  num,
  subtitle,
  context,
  readingTime,
}: {
  num: ReactNode;
  subtitle: ReactNode;
  context: ReactNode;
  readingTime: ReactNode;
}) {
  return (
    <div className="mk-docs__chapter-mark">
      <b>{num}</b>
      <div>
        <small>{subtitle}</small>
        <p>{context}</p>
      </div>
      <span>{readingTime}</span>
    </div>
  );
}

export function CodexDocsFigure({ label }: { label: ReactNode }) {
  return (
    <div className="mk-docs__figure">
      <div className="mk-docs__figure-line" />
      <span>{label}</span>
    </div>
  );
}

export function CodexDocsCodeFigure({
  label,
  title,
  meta,
  language = 'ts',
  tone = 'default',
  lineNumbers = true,
  code,
}: {
  label: ReactNode;
  code: string;
  title?: CodeBlockProps['title'];
  meta?: CodeBlockProps['meta'];
  language?: CodeBlockProps['language'];
  tone?: CodeBlockProps['tone'];
  lineNumbers?: boolean;
}) {
  return (
    <div className="mk-docs__code-figure">
      <CodexDocsFigure label={label} />
      <CodeBlock
        code={code}
        title={title}
        meta={meta}
        language={language}
        tone={tone}
        lineNumbers={lineNumbers}
      />
    </div>
  );
}

export function CodexDocsDefinition({
  title = 'Definition',
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mk-docs__defbox">
      <strong>{title}</strong>
      {children}
    </div>
  );
}
export function CodexDocsCallout({
  icon = '!',
  body,
  action,
}: {
  icon?: ReactNode;
  body: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mk-docs__signpost">
      <b>{icon}</b>
      <div>{body}</div>
      {action}
    </div>
  );
}

export function CodexDocsMargin({
  sections,
}: {
  sections: readonly CodexDocsMarginSection[];
}) {
  return (
    <aside className="mk-docs__margin">
      {sections.map((section) => (
        <div key={section.title}>
          <h3>{section.title}</h3>
          {section.items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      ))}
    </aside>
  );
}

export function CodexDashboardShell({
  rail,
  header,
  tools,
  body,
}: {
  rail: ReactNode;
  header: ReactNode;
  tools: ReactNode;
  body: ReactNode;
}) {
  return (
    <section className="mk-dashboard">
      {rail}
      <div className="mk-dashboard__main">
        {header}
        {tools}
        {body}
      </div>
    </section>
  );
}

export function CodexDashboardRail({
  brand,
  sections,
  footer,
}: {
  brand: ReactNode;
  sections: readonly CodexSidebarSection[];
  footer?: ReactNode;
}) {
  return (
    <aside className="mk-dashboard__rail">
      <div className="mk-dashboard__brand">{brand}</div>
      {sections.map((section) => (
        <div key={section.title} className="mk-dashboard__nav-section">
          <small>{section.title}</small>
          {section.items.map((item) => (
            <button key={item.label} type="button" className={item.current ? 'current' : undefined}>
              {item.label}
            </button>
          ))}
        </div>
      ))}
      {footer}
    </aside>
  );
}

export function CodexDashboardHero({
  crumbs,
  title,
  body,
  dim,
  actions,
}: {
  crumbs: ReactNode;
  title: ReactNode;
  body: ReactNode;
  dim?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="mk-dashboard__hero">
      <small>{crumbs}</small>
      <div className="mk-dashboard__hero-main">
        <div>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
        {actions}
      </div>
      {dim ? <div className="mk-dashboard__dim">{dim}</div> : null}
    </header>
  );
}

export function CodexDashboardToolbar({
  segments,
  filters,
  search,
}: {
  segments?: ReactNode;
  filters?: ReactNode;
  search?: ReactNode;
}) {
  return (
    <div className="mk-dashboard__toolbar">
      <div className="mk-dashboard__toolbar-left">
        {segments}
        {filters}
      </div>
      {search}
    </div>
  );
}

export function CodexDashboardSegmentedControl({
  items,
}: {
  items: readonly CodexSegmentedControlItem[];
}) {
  return (
    <div className="mk-dashboard__segs">
      {items.map((item) => (
        <button
          key={String(item.label)}
          type="button"
          className={item.current ? 'on' : undefined}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function CodexDashboardSearch({
  label,
  shortcut,
}: {
  label: ReactNode;
  shortcut: ReactNode;
}) {
  return (
    <div className="mk-dashboard__search">
      <span>{label}</span>
      <i>{shortcut}</i>
    </div>
  );
}

export function CodexDashboardStatus({ children }: { children: ReactNode }) {
  return <div className="mk-dashboard__stamp">{children}</div>;
}

export function CodexDashboardBody({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="mk-dashboard__body">{children}</div>;
}

export function CodexDashboardColumn({
  side,
  children,
}: {
  side?: boolean;
  children: ReactNode;
}) {
  if (side) {
    return <aside className="mk-dashboard__col-side">{children}</aside>;
  }
  return <div className="mk-dashboard__col-main">{children}</div>;
}

export function CodexDashboardKpis({
  items,
}: {
  items: readonly CodexKpi[];
}) {
  return (
    <div className="mk-dashboard__kpis">
      {items.map((item) => (
        <div key={String(item.label)} className="mk-dashboard__kpi">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          {item.delta ? <i>{item.delta}</i> : null}
        </div>
      ))}
    </div>
  );
}

export function CodexDashboardPanel({
  headIndex,
  title,
  actions,
  className,
  children,
}: {
  headIndex?: ReactNode;
  title: ReactNode;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={['mk-dashboard__panel', className].filter(Boolean).join(' ')}>
      <header>
        {headIndex ? <b>{headIndex}</b> : null}
        <h3>{title}</h3>
        {actions ? <div>{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}

export function CodexDashboardChart({ bars }: { bars: readonly number[] }) {
  return (
    <div className="mk-dashboard__chart-bars">
      {bars.map((height, index) => (
        <span key={index} style={{ height }} />
      ))}
    </div>
  );
}

export function CodexDashboardGauges({
  items,
}: {
  items: readonly CodexGaugeMetric[];
}) {
  return (
    <div className="mk-dashboard__gauges">
      {items.map((item) => (
        <div key={String(item.label)} className="mk-dashboard__gauge">
          <div>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
          {item.meter}
        </div>
      ))}
    </div>
  );
}

export function CodexDashboardFeed({
  items,
}: {
  items: readonly CodexFeedItem[];
}) {
  return (
    <div className="mk-dashboard__feed-items">
      {items.map((item) => (
        <div key={`${item.index}-${item.timestamp}`} className="mk-dashboard__feed-item">
          <b>{item.index}</b>
          <div>{item.body}</div>
          <span>{item.timestamp}</span>
        </div>
      ))}
    </div>
  );
}

export function CodexDashboardCommandPalette({
  icon,
  title,
  shortcut,
  items,
}: {
  icon: ReactNode;
  title: ReactNode;
  shortcut: ReactNode;
  items: readonly CodexCommandItem[];
}) {
  return (
    <section className="mk-dashboard__palette">
      <header>
        <b>{icon}</b>
        <strong>{title}</strong>
        <span>{shortcut}</span>
      </header>
      {items.map((item) => (
        <button key={item.label} type="button" className={item.current ? 'current' : undefined}>
          {item.label}
        </button>
      ))}
    </section>
  );
}
