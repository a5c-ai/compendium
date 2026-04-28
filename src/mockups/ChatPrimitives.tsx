import { ReactNode } from 'react';
import { Button, Input, Tag } from '../components';
import './mockups.css';

export interface ChatThreadItem {
  mark: string;
  title: string;
  preview: string;
  when: string;
  current?: boolean;
}

export interface ChatMemoAction {
  label: string;
  variant?: 'default' | 'primary' | 'ghost';
}

export interface ChatChartBar {
  height: number;
}

export interface ChatToolRecord {
  title: string;
  meta: string;
  latency: string;
  body: ReactNode;
}

export function ChatShell({
  rail,
  wall,
  inspector,
  theme = 'light',
}: {
  rail: ReactNode;
  wall: ReactNode;
  inspector: ReactNode;
  theme?: 'light' | 'dark';
}) {
  return (
    <section className={`mk-chat-app ${theme === 'dark' ? 'mk-chat-app--dark' : ''}`}>
      {rail}
      {wall}
      {inspector}
    </section>
  );
}

export function ChatRail({
  brand,
  pinned,
  today,
  foot,
}: {
  brand: string;
  pinned: readonly ChatThreadItem[];
  today: readonly ChatThreadItem[];
  foot: ReactNode;
}) {
  return (
    <aside className="mk-chat-rail">
      <header className="mk-chat-rail__head">
        <div className="mk-chat-rail__brand">{brand}</div>
        <button type="button" className="mk-chat-square" aria-label="New conversation">+</button>
      </header>
      <div className="mk-chat-rail__search">
        <span>Search conversations…</span>
        <i>⌘K</i>
      </div>
      <div className="mk-chat-rail__section">
        <span>Pinned</span>
        <i>{pinned.length}</i>
      </div>
      {pinned.map((thread) => <ChatRailItem key={thread.title} item={thread} />)}
      <div className="mk-chat-rail__section">
        <span>Today</span>
        <i>{today.length}</i>
      </div>
      {today.map((thread) => <ChatRailItem key={thread.title} item={thread} />)}
      <footer className="mk-chat-rail__foot">{foot}</footer>
    </aside>
  );
}

function ChatRailItem({ item }: { item: ChatThreadItem }) {
  return (
    <button className={`mk-chat-rail__item ${item.current ? 'current' : ''}`} type="button">
      <b>{item.mark}</b>
      <div>
        <strong>{item.title}</strong>
        <small>{item.preview}</small>
      </div>
      <span>{item.when}</span>
    </button>
  );
}

export function ChatWall({
  title,
  subtitle,
  tools,
  children,
  composer,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  tools: ReactNode;
  children: ReactNode;
  composer: ReactNode;
}) {
  return (
    <main className="mk-chat-wall">
      <header className="mk-chat-wall__head">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="mk-chat-wall__tools">{tools}</div>
      </header>
      <div className="mk-chat-stream">{children}</div>
      {composer}
    </main>
  );
}

export function ChatTurn({
  avatar,
  label,
  timestamp,
  user,
  children,
}: {
  avatar: ReactNode;
  label: string;
  timestamp: string;
  user?: boolean;
  children: ReactNode;
}) {
  return (
    <article className={`mk-chat-turn ${user ? 'mk-chat-turn--user' : ''}`}>
      <div className="mk-chat-turn__gutter">
        {avatar}
        <small>{label} · {timestamp}</small>
      </div>
      {children}
    </article>
  );
}

export function ChatMessageBody({ children }: { children: ReactNode }) {
  return <div className="mk-chat-turn__body">{children}</div>;
}

export function ChatBars({
  bars,
  caption,
}: {
  bars: readonly ChatChartBar[];
  caption: ReactNode;
}) {
  return (
    <div className="mk-chat-diagram">
      <div className="mk-chat-bars">
        {bars.map((bar, index) => (
          <i key={index} style={{ height: `${bar.height}px` }} />
        ))}
      </div>
      <span>{caption}</span>
    </div>
  );
}

export function ChatToolCard({ title, meta, latency, body }: ChatToolRecord) {
  return (
    <div className="mk-chat-tool">
      <div className="mk-chat-tool__head">
        <span>{title}</span>
        <span>{meta}</span>
        <span>{latency}</span>
      </div>
      <div className="mk-chat-tool__body">{body}</div>
    </div>
  );
}

export function ChatMemo({
  title,
  seat,
  timestamp,
  body,
  footnote,
  actions,
  brief,
}: {
  title: string;
  seat: string;
  timestamp: string;
  body: ReactNode;
  footnote?: string;
  actions?: readonly ChatMemoAction[];
  brief?: boolean;
}) {
  return (
    <div className={`mk-chat-memo ${brief ? 'mk-chat-memo--brief' : ''}`}>
      {!brief ? (
        <>
          <span className="mk-chat-memo__corner mk-chat-memo__corner--bl" />
          <span className="mk-chat-memo__corner mk-chat-memo__corner--br" />
        </>
      ) : null}
      <div className="mk-chat-memo__head">
        <span>{title}</span>
        <strong>{seat}</strong>
        <span>{timestamp}</span>
      </div>
      <div className="mk-chat-memo__body">{body}</div>
      {footnote || actions?.length ? (
        <div className="mk-chat-memo__foot">
          <span>{footnote}</span>
          <div className="mk-chat-memo__actions">
            {actions?.map((action) => (
              <Button key={action.label} variant={action.variant ?? 'ghost'}>{action.label}</Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ChatTyping({ children }: { children: ReactNode }) {
  return (
    <div className="mk-chat-typing">
      <span />
      <span />
      <span />
      <em>{children}</em>
    </div>
  );
}

export function ChatComposer({
  attachments,
  placeholder,
  footerLabel,
}: {
  attachments: readonly string[];
  placeholder: string;
  footerLabel: string;
}) {
  return (
    <div className="mk-chat-composer">
      <div className="mk-chat-composer__chips">
        <span>attached</span>
        {attachments.map((item) => <Tag key={item}>{item}</Tag>)}
      </div>
      <div className="mk-chat-composer__box">
        <Input placeholder={placeholder} />
        <div className="mk-chat-composer__bar">
          <span>{footerLabel}</span>
          <div>
            <Button variant="default">Draft</Button>
            <Button variant="primary">Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatInspector({
  title,
  items,
  footer,
}: {
  title: string;
  items: readonly { label: string; value: ReactNode }[];
  footer: ReactNode;
}) {
  return (
    <aside className="mk-chat-inspector">
      <div className="mk-chat-inspector__head">
        <span className="mk-chat-callout">i</span>
        <h3>{title}</h3>
        <button type="button" className="mk-chat-square" aria-label="Close inspector">×</button>
      </div>
      {items.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <p>{item.value}</p>
        </article>
      ))}
      <footer className="mk-chat-inspector__foot">{footer}</footer>
    </aside>
  );
}

export function ChatBudgetFoot({
  initial,
  name,
  role,
  budget,
  usage,
}: {
  initial: string;
  name: string;
  role: string;
  budget: string;
  usage: string;
}) {
  return (
    <>
      <div className="mk-chat-avatar">{initial}</div>
      <div>
        <strong>{name}</strong>
        <small>{role}</small>
      </div>
      <div className="mk-chat-rail__budget">
        <strong>{budget}</strong>
        <small>{usage}</small>
      </div>
    </>
  );
}

export function ChatAvatar({ children, agent }: { children: ReactNode; agent?: boolean }) {
  return <div className={`mk-chat-avatar ${agent ? 'mk-chat-avatar--agent' : ''}`}>{children}</div>;
}
