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
}

export interface SeraphAsideProps {
  scribbles: string[];
  plantClass: string;
}

export interface SeraphCardProps {
  title: ReactNode;
  status?: ReactNode;
  ornament?: ReactNode;
  children: ReactNode;
}

export interface SeraphSummaryItem {
  title: string;
  body: ReactNode;
  iconClass: string;
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

export function SeraphCard({ title, status, ornament, children }: SeraphCardProps) {
  return (
    <article className="mk-seraph__card">
      <h4>{title}{status ? <span>{status}</span> : null}</h4>
      {children}
      {ornament}
    </article>
  );
}

export function SeraphTask({
  title,
  status,
  leading,
  body,
  ornament,
}: {
  title: ReactNode;
  status?: ReactNode;
  leading: ReactNode;
  body: ReactNode;
  ornament?: ReactNode;
}) {
  return (
    <article className="mk-seraph__task">
      <h4>{title}{status ? <span>{status}</span> : null}</h4>
      <div className="mk-seraph__task-copy">{leading}</div>
      {body}
      {ornament}
    </article>
  );
}

export function SeraphSummaryRow({ items }: { items: readonly SeraphSummaryItem[] }) {
  return (
    <div className="mk-seraph__summary-row">
      {items.map((item) => (
        <article key={item.title}>
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
