import { ReactNode } from 'react';
import { Input, Tag } from '../components';

export interface SeraphThreadItem {
  title: string;
  subtitle: string;
  when: string;
  current?: boolean;
}

export interface SeraphRailProps {
  sigil: ReactNode;
  topTotemClass: string;
  bottomTotemClass: string;
  caption?: ReactNode;
}

export interface SeraphAsideProps {
  scribbles: string[];
  plantClass: string;
}

export interface SeraphCrestProps {
  sunClass?: string;
  className?: string;
}

export interface SeraphCardProps {
  title: ReactNode;
  status?: ReactNode;
  eyebrow?: ReactNode;
  footer?: ReactNode;
  tone?: 'default' | 'blueprint' | 'botanic';
  ornament?: ReactNode;
  children: ReactNode;
}

export interface SeraphSummaryItem {
  title: string;
  body: ReactNode;
  iconClass: string;
  eyebrow?: string;
}

export interface SeraphMarginNoteProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  body: ReactNode;
  ornament?: ReactNode;
}

export interface SeraphSectionPlateProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  tone?: 'default' | 'blueprint' | 'botanic';
  children: ReactNode;
}

export function SeraphWindow({
  children,
  variant,
}: {
  children: ReactNode;
  variant?: string;
}) {
  return (
    <section className={`mk-seraph ${variant ?? ''}`.trim()}>
      <header className="mk-seraph__chrome">
        <div className="mk-seraph__traffic"><span /><span /><span /></div>
        <div className="mk-seraph__title">CODEX SERAPHINIANUS · Chat AI</div>
        <div className="mk-seraph__window">─ □ ×</div>
      </header>
      {children}
    </section>
  );
}

export function SeraphSidebar({
  rail,
  crest,
  sectionTitle = 'Today',
  threads,
  medallion,
  planTitle,
  planSubtitle,
  searchShortcut = '⌘K',
}: {
  rail: SeraphRailProps;
  crest: ReactNode;
  sectionTitle?: string;
  threads: readonly SeraphThreadItem[];
  medallion: ReactNode;
  planTitle: string;
  planSubtitle: string;
  searchShortcut?: string;
}) {
  return (
    <aside className="mk-seraph__sidebar">
      <div className="mk-seraph__rail mk-seraph__rail--left">
        <div className="mk-seraph__dial" />
        <div className="mk-seraph__sigil">{rail.sigil}</div>
        <div className={`mk-seraph__totem ${rail.topTotemClass}`} />
        {rail.caption ? <div className="mk-seraph__rail-caption">{rail.caption}</div> : null}
        <div className={`mk-seraph__totem ${rail.bottomTotemClass}`} />
      </div>
      {crest}
      <button type="button" className="mk-seraph__new">+ New Conversation</button>
      <div className="mk-seraph__section-title">{sectionTitle}</div>
      <div className="mk-seraph__thread-list">
        {threads.map(({ title, subtitle, when, current }) => (
          <article key={`${title}-${when}`} className={`mk-seraph__thread ${current ? 'is-current' : ''}`}>
            <div className="mk-seraph__thread-glyph">{current ? '☼' : '✺'}</div>
            <div>
              <strong>{title}</strong>
              <p>{subtitle}</p>
            </div>
            <span>{when}</span>
          </article>
        ))}
      </div>
      <div className="mk-seraph__search">
        <span>Search conversations</span>
        <i>{searchShortcut}</i>
      </div>
      <footer className="mk-seraph__profile">
        <div className="mk-seraph__medallion">{medallion}</div>
        <div>
          <strong>{planTitle}</strong>
          <small>{planSubtitle}</small>
        </div>
      </footer>
      <div className="mk-seraph__bottom-ornament" />
    </aside>
  );
}

export function SeraphPromptBar({
  seal,
  prompt,
  time,
}: {
  seal: ReactNode;
  prompt: ReactNode;
  time: string;
}) {
  return (
    <header className="mk-seraph__prompt-bar">
      <div className="mk-seraph__seal">{seal}</div>
      <div className="mk-seraph__prompt">{prompt}</div>
      <span>{time}</span>
    </header>
  );
}

export function SeraphCrest({ sunClass, className }: SeraphCrestProps) {
  return (
    <div className={['mk-seraph__crest', className].filter(Boolean).join(' ')}>
      <div className={['mk-seraph__sun', sunClass].filter(Boolean).join(' ')} />
      <div className="mk-seraph__vine" />
    </div>
  );
}

export function SeraphCard({ title, status, eyebrow, footer, tone = 'default', ornament, children }: SeraphCardProps) {
  return (
    <article className={`mk-seraph__card ${tone !== 'default' ? `mk-seraph__card--${tone}` : ''}`.trim()}>
      {eyebrow ? <div className="mk-seraph__eyebrow">{eyebrow}</div> : null}
      <h4>{title}{status ? <span>{status}</span> : null}</h4>
      {children}
      {footer ? <div className="mk-seraph__footnote">{footer}</div> : null}
      {ornament}
    </article>
  );
}

export function SeraphTask({
  title,
  status,
  eyebrow,
  leading,
  body,
  footer,
  tone = 'default',
  ornament,
}: {
  title: ReactNode;
  status?: ReactNode;
  eyebrow?: ReactNode;
  leading: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  tone?: 'default' | 'blueprint' | 'botanic';
  ornament?: ReactNode;
}) {
  return (
    <article className={`mk-seraph__task ${tone !== 'default' ? `mk-seraph__task--${tone}` : ''}`.trim()}>
      {eyebrow ? <div className="mk-seraph__eyebrow">{eyebrow}</div> : null}
      <h4>{title}{status ? <span>{status}</span> : null}</h4>
      <div className="mk-seraph__task-copy">{leading}</div>
      {body}
      {footer ? <div className="mk-seraph__footnote">{footer}</div> : null}
      {ornament}
    </article>
  );
}

export function SeraphSummaryRow({ items }: { items: readonly SeraphSummaryItem[] }) {
  return (
    <div className="mk-seraph__summary-row">
      {items.map((item) => (
        <article key={item.title}>
          {item.eyebrow ? <div className="mk-seraph__eyebrow">{item.eyebrow}</div> : null}
          <h5>{item.title}</h5>
          <p>{item.body}</p>
          <div className={`mk-seraph__icon ${item.iconClass}`} />
        </article>
      ))}
    </div>
  );
}

export function SeraphComposer({
  placeholder,
  tools,
}: {
  placeholder: string;
  tools: readonly string[];
}) {
  return (
    <footer className="mk-seraph__composer">
      <Input placeholder={placeholder} />
      <div className="mk-seraph__tool-row">
        {tools.map((tool) => <Tag key={tool}>{tool}</Tag>)}
      </div>
    </footer>
  );
}

export function SeraphAside({ scribbles, plantClass }: SeraphAsideProps) {
  return (
    <aside className="mk-seraph__aside">
      <div className="mk-seraph__dial mk-seraph__dial--large" />
      <div className="mk-seraph__scribbles">
        {scribbles.map((line) => <span key={line}>{line}</span>)}
      </div>
      <div className={`mk-seraph__plant ${plantClass}`} />
      <div className="mk-seraph__dial mk-seraph__dial--eye" />
    </aside>
  );
}

export function SeraphMarginNote({ eyebrow, title, body, ornament }: SeraphMarginNoteProps) {
  return (
    <article className="mk-seraph__margin-note">
      {eyebrow ? <div className="mk-seraph__eyebrow">{eyebrow}</div> : null}
      <h5>{title}</h5>
      <div className="mk-seraph__margin-note-copy">{body}</div>
      {ornament}
    </article>
  );
}

export function SeraphSectionPlate({
  eyebrow,
  title,
  meta,
  tone = 'default',
  children,
}: SeraphSectionPlateProps) {
  return (
    <section className={`mk-seraph__section-plate ${tone !== 'default' ? `mk-seraph__section-plate--${tone}` : ''}`.trim()}>
      <header className="mk-seraph__section-plate-head">
        <div>
          {eyebrow ? <div className="mk-seraph__eyebrow">{eyebrow}</div> : null}
          <h4>{title}</h4>
        </div>
        {meta ? <span>{meta}</span> : null}
      </header>
      <div className="mk-seraph__section-plate-body">{children}</div>
    </section>
  );
}

export function SeraphFolioBorder({ variant }: { variant?: 'default' | 'orb' }) {
  return <div className={`mk-seraph__folio-border ${variant === 'orb' ? 'mk-seraph__folio-border--orb' : ''}`.trim()} />;
}
