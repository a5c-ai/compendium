import { CSSProperties, ReactElement, ReactNode } from 'react';
import {
  Button,
  DataTable,
  Input,
  Progress,
  Tabs,
  Tag,
} from '../components';
import {
  GlyphModeForever,
  GlyphModeInteractive,
  GlyphModePlan,
  GlyphModeYolo,
  LogoMonogram,
  LogoMonogramDark,
  LogoWordmark,
  SealGatePassed,
} from '../icons';
import './mockups.css';

export type MockupName =
  | 'Ads'
  | 'Brand'
  | 'Chat'
  | 'Colors'
  | 'Components'
  | 'Dashboard'
  | 'Docs'
  | 'Spacing'
  | 'Type';

export interface MockupDefinition {
  name: MockupName;
  slug: string;
  description: string;
  render: () => ReactElement;
}

function CodexFrame({
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
  activeTab: 'Philosophy' | 'UI Components' | 'Type' | 'Pigments' | 'Measure';
  children: ReactElement;
}) {
  const tabs: Array<'Philosophy' | 'UI Components' | 'Type' | 'Pigments' | 'Measure'> = [
    'Philosophy',
    'UI Components',
    'Type',
    'Pigments',
    'Measure',
  ];
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

function AdsSurface() {
  return (
    <section className="mk-ads">
      <header className="mk-ads__head">
        <h2>
          Standard display <em>ad set</em>
        </h2>
        <div className="mk-ads__meta">
          <span>Four IAB standard slots</span>
          <span>Non-animated · legible at 100%</span>
        </div>
      </header>
      <article className="mk-ads-slot">
        <div className="mk-ads-slot__title">
          <span className="num">I.</span>
          <span className="size">300 × 250</span>
          <span className="name">medium rectangle</span>
        </div>
        <div className="mk-ads-slot__row">
          <div className="mk-ads-stack">
            <div className="mk-ads-sheet">
              <div className="mk-ads-sheet__rule"><span>Var. A · paper ground</span><i /><span>300 × 250</span></div>
              <div className="mk-ad-card mk-ad-card--mr">
                <span className="mk-ad-card__folio">Leaflet Nº I · mr-01</span>
                <div className="mk-ad-card__chapter"><b>03</b><span>Chapter III<em>Gates & verdicts</em></span></div>
                <h3>Every agent turn ends in a <em>written verdict</em>.</h3>
                <div className="mk-ad-card__bottom">
                  <p><strong>a5c.ai</strong>The foundry for multi-agent work</p>
                  <Button variant="primary">Request a demo</Button>
                </div>
                <div className="mk-ad-card__ticker"><span>Ed. 4.2 · Aug 26</span><span>Vellum ground</span></div>
              </div>
            </div>
            <div className="mk-ads-sheet">
              <div className="mk-ads-sheet__rule"><span>Var. B · blueprint ground</span><i /><span>300 × 250</span></div>
              <div className="mk-ad-card mk-ad-card--mr mk-ad-card--bp">
                <span className="mk-ad-card__folio">Leaflet Nº I · mr-02</span>
                <div className="mk-ad-card__chapter"><b>03</b><span>Chapter III<em>Gates & verdicts</em></span></div>
                <h3>Two strangers, <em>same answer</em>. The rest is ornament.</h3>
                <div className="mk-ad-card__bottom">
                  <p><strong>a5c.ai</strong>Convergence, in plain prose</p>
                  <Button variant="default">Read chapter III</Button>
                </div>
                <div className="mk-ad-card__ticker"><span>Ed. 4.2 · Aug 26</span><span>Blueprint ground</span></div>
              </div>
            </div>
          </div>
          <aside className="mk-ads-notes">
            <p>The medium rectangle carries the most weight in the set. Chapter numeral earns its height and the CTA stays isolated at the lower right.</p>
            <div className="mk-ads-specs">
              <span>Format</span><strong>JPG · 40 KB ceiling</strong>
              <span>Type stack</span><strong>Cormorant · JetBrains Mono</strong>
              <span>Safe area</span><strong>10 px inset</strong>
            </div>
          </aside>
        </div>
      </article>
      <article className="mk-ads-slot">
        <div className="mk-ads-slot__title">
          <span className="num">II.</span>
          <span className="size">728 × 90</span>
          <span className="name">leaderboard</span>
        </div>
        <div className="mk-ads-slot__row">
          <div className="mk-ads-stack">
            <div className="mk-ads-sheet">
              <div className="mk-ads-sheet__rule"><span>Var. A · ink badge</span><i /><span>728 × 90</span></div>
              <div className="mk-ad-card mk-ad-card--lb">
                <div className="mk-ad-card__badge"><b>§ iii</b><span>Chap. III</span></div>
                <div className="mk-ad-card__body"><small>Book I · Foundations</small><h3>Every run ends in a <em>written verdict</em>. Not a score.</h3></div>
                <i className="mk-ad-card__divider" />
                <div className="mk-ad-card__cta-wrap"><strong>a·5·c·ai</strong><Button variant="primary">Open the foundry</Button></div>
              </div>
            </div>
          </div>
          <aside className="mk-ads-notes">
            <p>A leaderboard lives above the fold. The chapter badge does the identity work on the left so the headline can stay short.</p>
          </aside>
        </div>
      </article>
      <article className="mk-ads-slot">
        <div className="mk-ads-slot__title">
          <span className="num">III.</span>
          <span className="size">160 × 600</span>
          <span className="name">wide skyscraper</span>
        </div>
        <div className="mk-ads-slot__row">
          <div className="mk-ads-stack mk-ads-stack--row">
            <div className="mk-ads-sheet">
              <div className="mk-ads-sheet__rule"><span>Var. A · paper</span><i /><span>160 × 600</span></div>
              <div className="mk-ad-card mk-ad-card--sky">
                <span className="mk-ad-card__folio">sky-01</span>
                <div className="mk-ad-card__chapter mk-ad-card__chapter--stack"><b>02</b><span>Chapter II<em>Agents & seats</em></span></div>
                <div className="mk-ad-card__spine"><i /><h3><em>Seats</em>, not seats of software.</h3></div>
                <p className="mk-ad-card__proof">An agent is a seat in a room; replay is how the room remembers.</p>
                <div className="mk-ad-card__cta-column"><Button variant="ghost">Chapter II</Button><Button variant="primary">Try a5c.ai</Button></div>
              </div>
            </div>
            <div className="mk-ads-sheet">
              <div className="mk-ads-sheet__rule"><span>Var. B · ink</span><i /><span>160 × 600</span></div>
              <div className="mk-ad-card mk-ad-card--sky mk-ad-card--ink">
                <span className="mk-ad-card__folio">sky-02</span>
                <div className="mk-ad-card__chapter mk-ad-card__chapter--stack"><b>06</b><span>Chapter VI<em>Safety & seals</em></span></div>
                <div className="mk-ad-card__spine"><i /><h3>Least <em>scope</em>, by default.</h3></div>
                <p className="mk-ad-card__proof">Every tool an agent can reach was granted, in writing, by a human.</p>
                <div className="mk-ad-card__cta-column"><Button variant="ghost">Chapter VI</Button><Button variant="default">See the seal</Button></div>
              </div>
            </div>
          </div>
          <aside className="mk-ads-notes">
            <p>The skyscraper rewards vertical architecture. The spine acts like a dimension line so the ad reads like a measured elevation.</p>
          </aside>
        </div>
      </article>
      <article className="mk-ads-slot">
        <div className="mk-ads-slot__title">
          <span className="num">IV.</span>
          <span className="size">300 × 600</span>
          <span className="name">half-page poster</span>
        </div>
        <div className="mk-ads-slot__row">
          <div className="mk-ads-stack mk-ads-stack--row">
            <div className="mk-ads-sheet">
              <div className="mk-ads-sheet__rule"><span>Var. A · figure-driven</span><i /><span>300 × 600</span></div>
              <div className="mk-ad-card mk-ad-card--poster">
                <span className="mk-ad-card__folio">poster-01</span>
                <div className="mk-ad-card__chapter"><b>01</b><span>Book I · Foundations<em>A first acquaintance</em></span></div>
                <h3>The foundry, <em>in one page</em>.</h3>
                <div className="mk-ad-card__figure"><div className="mk-ad-card__figure-line" /><span>FIG. A · editor → artefact → verifier → human</span></div>
                <div className="mk-ad-card__stanzas"><p><b>Seat</b> — an agent, a manifest, a room.</p><p><b>Verdict</b> — a written decision, by someone else.</p><p><b>Seal</b> — a cinnabar mark, and a replay if it cracks.</p></div>
                <div className="mk-ad-card__bottom"><p><strong>a5c.ai</strong>The foundry for multi-agent work</p><Button variant="primary">Request a demo</Button></div>
              </div>
            </div>
            <div className="mk-ads-sheet">
              <div className="mk-ads-sheet__rule"><span>Var. B · cinnabar ground</span><i /><span>300 × 600</span></div>
              <div className="mk-ad-card mk-ad-card--poster mk-ad-card--cin">
                <span className="mk-ad-card__folio">poster-02</span>
                <div className="mk-ad-card__chapter"><b>03</b><span>Book I · Chapter III<em>Gates & verdicts</em></span></div>
                <h3>Pass. Iterate. Fail. <em>Defer.</em></h3>
                <div className="mk-ad-card__figure mk-ad-card__figure--words"><span>pass · iterate · fail · defer</span></div>
                <div className="mk-ad-card__stanzas"><p><b>Two strangers</b>, same answer.</p><p><b>One paragraph</b>, not a score.</p><p><b>Every seal</b>, a replay if it cracks.</p></div>
                <div className="mk-ad-card__bottom"><p><strong>a5c.ai</strong>Read chapter III in the encyclopedia</p><Button variant="default">Open chapter III</Button></div>
              </div>
            </div>
          </div>
          <aside className="mk-ads-notes">
            <p>The half-page is the largest surface and the only one that can carry a three-stanza proof.</p>
          </aside>
        </div>
      </article>
    </section>
  );
}

function BrandSurface() {
  return (
    <CodexFrame
      title={
        <>
          Sigils <em>&amp;</em> Voice
        </>
      }
      kicker="wordmarks, monograms, and dispatch glyphs"
      folio="folio i"
      colophon="fol · i of viii"
      activeTab="Philosophy"
    >
      <section className="mk-chapter">
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">I</span>
          <div>
            <h3>The wordmark</h3>
            <p>Hero specimen, underlines, and the engraved signature line.</p>
          </div>
          <span className="mk-codex-meta">folio i · voice</span>
        </header>
        <div className="mk-brand-hero">
          <span className="mk-brand-hero__cap">wordmark · master</span>
          <div className="mk-brand-hero__row">
            <LogoMonogram style={{ width: 84, height: 84 }} />
            <div className="mk-brand-hero__word">a<span>·</span>5<span>·</span>c<span>·</span>ai</div>
          </div>
          <div className="mk-brand-hero__under"><i />atelier for exacting multi-agent work<i /></div>
          <p>Build with certainty. Done means done.</p>
        </div>
        <div className="mk-brand-specimens">
          <div className="mk-brand-specimen">
            <span>light field</span>
            <div className="mk-brand-specimen__word">a<span>·</span>5<span>·</span>c<span>·</span>ai</div>
            <small>editorial application</small>
          </div>
          <div className="mk-brand-specimen mk-brand-specimen--dark">
            <span>void field</span>
            <div className="mk-brand-specimen__word">a<span>·</span>5<span>·</span>c<span>·</span>ai</div>
            <small>product shell</small>
          </div>
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">II</span>
          <div>
            <h3>Monograms and mode glyphs</h3>
            <p>Reduced seals for rails, runbooks, and dispatch states.</p>
          </div>
          <span className="mk-codex-meta">registry</span>
        </header>
        <div className="mk-brand-mono-grid">
          <div className="mk-brand-mono-cell"><span>ink</span><LogoMonogram style={{ width: 84 }} /><small>primary seal</small></div>
          <div className="mk-brand-mono-cell mk-brand-mono-cell--void"><span>void</span><LogoMonogramDark style={{ width: 84 }} /><small>night shell</small></div>
          <div className="mk-brand-mono-cell mk-brand-mono-cell--cin"><span>dispatch</span><GlyphModeInteractive style={{ width: 72 }} /><small>interactive</small></div>
          <div className="mk-brand-mono-cell mk-brand-mono-cell--brass"><span>modes</span><div className="mk-brand-glyphs"><GlyphModePlan style={{ width: 48 }} /><GlyphModeYolo style={{ width: 48 }} /><GlyphModeForever style={{ width: 48 }} /></div><small>plan · yolo · forever</small></div>
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">III</span>
          <div>
            <h3>Voice, glyphs, and seals</h3>
            <p>The secondary plates that make the folio read like a registry rather than a single specimen.</p>
          </div>
          <span className="mk-codex-meta">apparatus</span>
        </header>
        <div className="mk-plate">
          <div className="mk-catalog-cap">alphabet · mode</div>
          <div className="mk-brand-alphabet-grid">
            {[
              { label: 'mono', icon: <LogoMonogram style={{ width: 56, height: 56 }} /> },
              { label: 'mono dark', icon: <LogoMonogramDark style={{ width: 56, height: 56 }} /> },
              { label: 'interactive', icon: <GlyphModeInteractive style={{ width: 56, height: 56 }} /> },
              { label: 'plan', icon: <GlyphModePlan style={{ width: 56, height: 56 }} /> },
              { label: 'yolo', icon: <GlyphModeYolo style={{ width: 56, height: 56 }} /> },
              { label: 'forever', icon: <GlyphModeForever style={{ width: 56, height: 56 }} /> },
              { label: 'seal', icon: <SealGatePassed style={{ width: 56, height: 56 }} /> },
              { label: 'wordmark', icon: <LogoWordmark style={{ width: 72, height: 32 }} /> },
            ].map(({ label, icon }) => (
              <div key={label} className="mk-brand-glyph-cell">
                <div className="mk-brand-glyph-cell__icon">{icon}</div>
                <div className="mk-brand-glyph-cell__label">{label}</div>
              </div>
            ))}
          </div>
          <div className="mk-brand-alphabet-string">⟡ ✦ ✧ ◊ ✦ ⟡ · atlas of marks</div>
        </div>
        <div className="mk-brand-voice">
          <div className="mk-brand-voice__col mk-brand-voice__col--yes">
            <span className="mk-brand-voice__cap">do</span>
            <h4>Quiet authority</h4>
            <div className="mk-brand-voice__list">
              <p>Say what the system does in plain prose, then prove it.</p>
              <p>Reserve italics for emphasis and utterance, not decoration.</p>
              <p>Make the seal feel earned, never theatrical.</p>
            </div>
          </div>
          <div className="mk-brand-voice__col mk-brand-voice__col--no">
            <span className="mk-brand-voice__cap">avoid</span>
            <h4>Chrome and slogans</h4>
            <div className="mk-brand-voice__list">
              <p>Do not make the product sound like a startup landing page.</p>
              <p>Do not decorate technical surfaces with arbitrary gem color.</p>
              <p>Do not overstate certainty where a gate has not yet passed.</p>
            </div>
          </div>
        </div>
        <div className="mk-plate">
          <div className="mk-catalog-cap">seals · row</div>
          <div className="mk-brand-seals">
            {[
              ['cinnabar', 'human seal', 'the struck verdict'],
              ['viridian', 'healthy run', 'stable and passing'],
              ['brass', 'mechanism', 'casing and apparatus'],
              ['indigo', 'reference', 'cold diagrammatic register'],
            ].map(([tone, name, desc]) => (
              <div key={tone} className="mk-brand-seal-col">
                <div className={`mk-brand-seal-disc mk-brand-seal-disc--${tone}`}>
                  <span>{name}</span>
                </div>
                <strong>{name}</strong>
                <small>{desc}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CodexFrame>
  );
}

function ChatSurface() {
  const pinnedThreads = [
    {
      mark: '★',
      title: 'Freight claims · Oct batch review',
      preview: 'archivist: Six claims flagged against carrier tariff §4.2.',
      when: '14:32',
      current: true,
    },
    {
      mark: '★',
      title: 'Draft: SOC-2 evidence narrative',
      preview: 'scribe-04: Section 3 expanded with gate-verdict citations.',
      when: 'yest.',
      current: false,
    },
  ];
  const todayThreads = [
    {
      mark: '1',
      title: 'Customer escalation r-8840',
      preview: 'concierge-02: Refund exceeds soft-cap; requires policy review.',
      when: '14:17',
    },
    {
      mark: '2',
      title: 'Nightly hygiene FAIL · janitor-01',
      preview: 'auditor-02: Write occurred on protected table prod.customer_events.',
      when: '14:09',
    },
    {
      mark: '3',
      title: 'Q3 pitch synthesis · scribe-04',
      preview: 'editor-11: Reduced length from 412 → 287 words; voice diff.',
      when: '14:02',
    },
  ];
  return (
    <section className="mk-chat-app">
      <aside className="mk-chat-rail">
        <header className="mk-chat-rail__head">
          <div className="mk-chat-rail__brand">Atelier.</div>
          <button type="button" className="mk-chat-square">
            +
          </button>
        </header>
        <div className="mk-chat-rail__search">
          <span>Search conversations…</span>
          <i>⌘K</i>
        </div>
        <div className="mk-chat-rail__section">
          <span>Pinned</span>
          <i>2</i>
        </div>
        {pinnedThreads.map((thread) => (
          <button
            key={thread.title}
            className={`mk-chat-rail__item ${thread.current ? 'current' : ''}`}
            type="button"
          >
            <b>{thread.mark}</b>
            <div>
              <strong>{thread.title}</strong>
              <small>{thread.preview}</small>
            </div>
            <span>{thread.when}</span>
          </button>
        ))}
        <div className="mk-chat-rail__section">
          <span>Today</span>
          <i>5</i>
        </div>
        {todayThreads.map((thread) => (
          <button key={thread.title} className="mk-chat-rail__item" type="button">
            <b>{thread.mark}</b>
            <div>
              <strong>{thread.title}</strong>
              <small>{thread.preview}</small>
            </div>
            <span>{thread.when}</span>
          </button>
        ))}
        <footer className="mk-chat-rail__foot">
          <div className="mk-chat-avatar">E</div>
          <div>
            <strong>Elena Varga</strong>
            <small>Praxis · Ops</small>
          </div>
          <div className="mk-chat-rail__budget">
            <strong>$42.18</strong>
            <small>Budget · 71%</small>
          </div>
        </footer>
      </aside>
      <main className="mk-chat-wall">
        <header className="mk-chat-wall__head">
          <div>
            <h2>
              Freight claims <em>Oct batch review</em>
            </h2>
            <p>Workflow r-8841 › Iteration 5 of 5 › Gate: quality · pending</p>
          </div>
          <div className="mk-chat-wall__tools">
            <Tag>3 agents seated</Tag>
            <Button variant="ghost">Replay</Button>
            <Button variant="ghost">Branch</Button>
            <Button variant="primary">Seal verdict</Button>
          </div>
        </header>
        <div className="mk-chat-stream">
          <article className="mk-chat-turn mk-chat-turn--user">
            <div className="mk-chat-turn__gutter">
              <div className="mk-chat-avatar">E</div>
              <small>Principal · 14:01</small>
            </div>
            <div className="mk-chat-turn__body">
              Walk the October freight-claims batch. Flag anything inconsistent with carrier tariff
              §4.2 and draft short responses for the contested ones. Cite the claim IDs and do not
              make up numbers.
            </div>
          </article>
          <article className="mk-chat-turn">
            <div className="mk-chat-turn__gutter">
              <div className="mk-chat-avatar mk-chat-avatar--agent">A</div>
              <small>archivist · 14:02</small>
            </div>
            <div className="mk-chat-memo">
              <span className="mk-chat-memo__corner mk-chat-memo__corner--bl" />
              <span className="mk-chat-memo__corner mk-chat-memo__corner--br" />
              <div className="mk-chat-memo__head">
                <span>Memo · 01</span>
                <strong>archivist · ledger reconciler</strong>
                <span>14:02:11 UTC</span>
              </div>
              <div className="mk-chat-memo__body">
                <p>
                  I walked the 42 October freight claims against tariff §4.2 and manifest records.
                  Thirty-six are internally consistent. Six need direct carrier follow-up.
                </p>
                <h4>Batch shape</h4>
                <div className="mk-chat-diagram">
                  <div className="mk-chat-bars">
                    {Array.from({ length: 24 }).map((_, index) => (
                      <i key={index} style={{ height: `${40 + ((index * 9) % 90)}px` }} />
                    ))}
                  </div>
                  <span>Distribution of 42 claims by invoiced amount. Right-tail bars are flagged.</span>
                </div>
                <h4>The six flagged claims</h4>
                <div className="mk-chat-tool">
                  <div className="mk-chat-tool__head">
                    <span>Tool</span>
                    <span>ledger.query · rows=6</span>
                    <span>412ms</span>
                  </div>
                  <div className="mk-chat-tool__body">
                    <p>CLM-10412 · surcharge 18.2% vs tariff 14.0%</p>
                    <p>CLM-10477 · weight rounded up one bracket</p>
                    <p>CLM-10544 · duplicate line item</p>
                    <p>CLM-10602 · fuel surcharge applied twice</p>
                  </div>
                </div>
                <p>
                  Aggregate carrier overcharge: $4,511.05. Draft replies are staged under Drafts ›
                  Oct-freight-replies.
                </p>
              </div>
              <div className="mk-chat-memo__foot">
                <span>Seat 03 · 1.42s · ¢3.8</span>
                <div className="mk-chat-memo__actions">
                  <Button variant="ghost">Reply</Button>
                  <Button variant="ghost">Copy</Button>
                  <Button variant="ghost">Branch</Button>
                </div>
              </div>
            </div>
          </article>
          <article className="mk-chat-turn mk-chat-turn--user">
            <div className="mk-chat-turn__gutter">
              <div className="mk-chat-avatar">E</div>
              <small>Principal · 14:14</small>
            </div>
            <div className="mk-chat-turn__body">
              Pull CLM-10544 into the editor and loop in verifier-03 to confirm tariff timing
              before you seal.
            </div>
          </article>
          <article className="mk-chat-turn">
            <div className="mk-chat-turn__gutter">
              <div className="mk-chat-avatar mk-chat-avatar--agent">A</div>
              <small>archivist · 14:15</small>
            </div>
            <div className="mk-chat-memo mk-chat-memo--brief">
              <div className="mk-chat-memo__head">
                <span>Memo · 02</span>
                <strong>archivist · seat 03</strong>
                <span>14:15:03 UTC</span>
              </div>
              <div className="mk-chat-memo__body">
                <p>
                  Opening CLM-10544 now. Duplicate line is row 4. Verifier-03 is reseating from
                  the audit pool to confirm whether the zone-3 rate applies pre-06:00 UTC.
                </p>
              </div>
            </div>
          </article>
          <div className="mk-chat-typing">
            <span />
            <span />
            <span />
            <em>verifier-03 is reconciling the tariff table. ETA ~4 s.</em>
          </div>
        </div>
        <div className="mk-chat-composer">
          <div className="mk-chat-composer__chips">
            <span>attached</span>
            <Tag>Oct-freight-manifest.csv</Tag>
            <Tag>tariff-2026-Q3.pdf</Tag>
          </div>
          <div className="mk-chat-composer__box">
            <Input placeholder="Ask archivist something, or @verifier-03 / describe a new gate…" />
            <div className="mk-chat-composer__bar">
              <span>seated · archivist · verifier-03</span>
              <div>
                <Button variant="default">Draft</Button>
                <Button variant="primary">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <aside className="mk-chat-inspector">
        <div className="mk-chat-inspector__head">
          <span className="mk-chat-callout">i</span>
          <h3>Worktree · context</h3>
          <button type="button" className="mk-chat-square">
            ×
          </button>
        </div>
        <article>
          <span>Seated agents</span>
          <p>archivist · verifier-03 · editor-11</p>
        </article>
        <article>
          <span>Tools in scope</span>
          <p>ledger.query · editor.open · carrier.api</p>
        </article>
        <article>
          <span>Pinned files</span>
          <p>Oct-freight-manifest.csv · tariff-2026-Q3.pdf · policy/refund-softcap.md</p>
        </article>
        <article>
          <span>Run cost</span>
          <p>8,412 input · 2,901 output · subtotal $0.049</p>
        </article>
        <footer className="mk-chat-inspector__foot">
          <div className="mk-chat-seal">✓</div>
          <p>Not yet sealed · verdict pending</p>
        </footer>
      </aside>
    </section>
  );
}

function ColorsSurface() {
  const grounds = [
    ['Vellum', 'var(--ground-vellum)', '#EDE3CF · ground · base', 'The default marketing surface. Warm ground, rests the eye.'],
    ['Parchment', 'var(--ground-parchment)', '#D9CBAE · ground · alt', 'The deeper leaf. Used beneath vellum for section breaks and cards.'],
    ['Void', 'var(--ground-void)', '#0B0A0F · ground · deep', 'The workshop at midnight. Product shell, code, and technical reference.'],
    ['Ink', 'var(--ground-ink)', '#181624 · ground · layer', 'A shade warmer than void. Sits beneath void for layered panels.'],
  ] as const;
  const ladder = [
    ['Pigment', '#1B1611', 'body, headings — the voice'],
    ['Fade', '#5A4E3C', 'captions, marginalia, hints'],
    ['Ghost', '#8C7E65', 'folio numbers, hairline labels'],
    ['Bone', '#F0E6D1', 'body, headings — against dark'],
    ['Fade (dark)', '#A89980', 'captions on dark surfaces'],
  ] as const;
  const gems = [
    ['Cinnabar', 'var(--accent-cinnabar)', 'the seal · brand · failure verdict'],
    ['Emerald', 'var(--gem-emerald)', 'gate passed · verdict · healthy'],
    ['Ruby', 'var(--gem-ruby)', 'halt · terminal error · unrecoverable'],
    ['Amber', 'var(--accent-sulphur)', 'pending · advisory · warning'],
    ['Topaz', 'var(--gem-cyan)', 'iterating · in-flight · progress'],
    ['Amethyst', '#E23FB4', 'annotation · marginalia · human note'],
    ['Sapphire', 'var(--accent-indigo)', 'diagrammatic · cold reference · linkage'],
  ] as const;
  return (
    <CodexFrame
      title={
        <>
          Pigments <em>&amp;</em> Grounds
        </>
      }
      kicker="four surfaces, one ink, seven jewels"
      folio="folio iv"
      colophon="fol · iv of viii"
      activeTab="Pigments"
    >
      <section className="mk-chapter">
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">I</span>
          <div>
            <h3>The four grounds</h3>
            <p>Vellum and parchment for editorial surfaces; void and ink for the workshop at night.</p>
          </div>
          <span className="mk-codex-meta">grounds</span>
        </header>
        <div className="mk-plate">
          <div className="mk-catalog-cap">grounds · α</div>
          <div className="mk-ground-grid">
            {grounds.map(([label, color, hex, note]) => (
              <article key={label} className={`mk-ground-card ${label === 'Void' || label === 'Ink' ? 'mk-ground-card--dark' : ''}`} style={{ background: color }}>
                <strong>{label}</strong>
                <div>
                  <p>{note}</p>
                  <small>{hex}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
        <dl className="mk-specs">
          <dt>Rule of two</dt><dd>Any page uses at most two grounds: vellum + parchment, or void + ink. Never mix registers.</dd>
          <dt>Contrast</dt><dd>Ink on vellum and bone on void remain the primary readable pairs. Fade registers are secondary only.</dd>
        </dl>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">II</span>
          <div>
            <h3>The ink ladder</h3>
            <p>Three registers of text on vellum; two on void. No free-styling past this ladder.</p>
          </div>
          <span className="mk-codex-meta">register</span>
        </header>
        <div className="mk-plate">
          <div className="mk-catalog-cap">ladder · β</div>
          <div className="mk-color-ladder__group">on vellum</div>
          <div className="mk-color-ladder">
            {ladder.slice(0, 3).map(([label, color, note]) => (
              <div key={label} className="mk-color-ladder__row">
                <div className="mk-color-ladder__swatch" style={{ background: color }} />
                <div>
                  <strong>{label}</strong>
                  <p>{note}</p>
                </div>
                <span>{color}</span>
              </div>
            ))}
          </div>
          <div className="mk-color-ladder__group">on void</div>
          <div className="mk-color-ladder">
            {ladder.slice(3).map(([label, color, note]) => (
              <div key={label} className="mk-color-ladder__row">
                <div className="mk-color-ladder__swatch" style={{ background: color }} />
                <div>
                  <strong>{label}</strong>
                  <p>{note}</p>
                </div>
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">III</span>
          <div>
            <h3>The brass register</h3>
            <p>A six-step metal gradient used for casings, rivets, and primary buttons. Never as text.</p>
          </div>
          <span className="mk-codex-meta">brass · ring</span>
        </header>
        <div className="mk-brass-row">
          {[
            'light · #F2C88F',
            'gilt · #D9A96A',
            'brass · #B37E3E',
            'deep · #8E5A26',
            'leather · #5B3817',
            'mahogany · #2A1607',
          ].map((step, index) => (
            <div key={step} className={`mk-brass-step mk-brass-step--${index + 1}`}>
              <span>{step}</span>
            </div>
          ))}
        </div>
        <dl className="mk-specs">
          <dt>Use</dt><dd>Casings, navigation, primary buttons, rivets, compass rings, and watch-dial surfaces.</dd>
          <dt>Never</dt><dd>No gradients on text and no brass as decorative plate fill.</dd>
        </dl>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">IV</span>
          <div>
            <h3>The seven gemstones</h3>
            <p>Semantic color. Each stone has exactly one meaning; none of them are decorative.</p>
          </div>
          <span className="mk-codex-meta">gemstones · α</span>
        </header>
        <div className="mk-plate mk-plate--void">
          <div className="mk-catalog-cap">gem shelf · γ</div>
          <div className="mk-gem-shelf">
            {gems.map(([label, color, note]) => (
              <article key={label} className="mk-gem-cell">
                <div className="mk-gem-cell__stone" style={{ background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.92), ${color} 34%, color-mix(in oklab, ${color} 70%, black) 100%)` }} />
                <strong>{label}</strong>
                <small>{note}</small>
              </article>
            ))}
          </div>
        </div>
        <dl className="mk-specs">
          <dt>Rule</dt><dd>A gemstone only appears when it means something. Emerald decorates nothing; it verifies.</dd>
          <dt>Density</dt><dd>No more than three distinct gems per surface.</dd>
        </dl>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">V</span>
          <div>
            <h3>Verdict colors in context</h3>
            <p>How each gem shows up in chips, banners, and gate strips. The dot leads; the word follows.</p>
          </div>
          <span className="mk-codex-meta">verdicts · strip</span>
        </header>
        <div className="mk-verdict-strip">
          <div><i style={{ background: 'var(--gem-emerald)' }} /><strong>Passed</strong><small>Gate has cleared; proof will be issued.</small><span>#3EA676 · emerald</span></div>
          <div><i style={{ background: 'var(--gem-ruby)' }} /><strong>Halted</strong><small>The run has stopped; human review required.</small><span>#D81F3D · ruby</span></div>
          <div><i style={{ background: 'var(--accent-sulphur)' }} /><strong>Pending</strong><small>Advisory; the loop is adjusting.</small><span>#E0A63A · amber</span></div>
          <div><i style={{ background: 'var(--gem-cyan)' }} /><strong>Iterating</strong><small>In-flight; next gate incoming.</small><span>#16D7E6 · topaz</span></div>
          <div><i style={{ background: 'var(--accent-cinnabar)' }} /><strong>Sealed</strong><small>The seal has been struck. Run complete.</small><span>#C03A2B · cinnabar</span></div>
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">VI</span>
          <div>
            <h3>Two surfaces, two moods</h3>
            <p>Example applications of the palette on editorial vellum and workshop void.</p>
          </div>
          <span className="mk-codex-meta">usage</span>
        </header>
        <div className="mk-usage-grid">
          <div className="mk-usage mk-usage--light">
            <div className="mk-usage__cap">light proof</div>
            <h4>Proof on vellum.</h4>
            <p>Editorial surfaces stay warm and quiet, with brass used sparingly to carry hierarchy.</p>
            <div className="mk-usage__row">
              <Button variant="primary">Gate passed</Button>
              <Tag>stable</Tag>
            </div>
          </div>
          <div className="mk-usage mk-usage--dark">
            <div className="mk-usage__cap">night shell</div>
            <h4>Proof in the workshop.</h4>
            <p>Dark surfaces carry brighter gems, deeper brass, and a tighter contrast floor.</p>
            <div className="mk-usage__row">
              <Button variant="default">Needs review</Button>
              <Tag>critical</Tag>
            </div>
          </div>
        </div>
      </section>
    </CodexFrame>
  );
}

function ComponentsSurface() {
  return (
    <CodexFrame
      title="Instruments And Artifacts"
      kicker="navigation, command surfaces, and gate strips"
      activeTab="UI Components"
    >
      <section className="mk-chapter">
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">II</span>
          <div>
            <h3>Navigation, controls, and gate strips</h3>
            <p>The same brass and vellum rhythm as the preview folios, but rendered from the system components.</p>
          </div>
          <span className="mk-codex-meta">catalogue</span>
        </header>
        <div className="mk-components-stack">
          <div className="mk-plate">
            <div className="mk-catalog-cap">nav bar</div>
            <div className="mk-plate__row">
              <Button variant="ghost">Product</Button>
              <Button variant="ghost">Workflow</Button>
              <Button variant="ghost">Enterprise</Button>
              <Button variant="ghost">Docs</Button>
            </div>
          </div>
          <div className="mk-surface-grid">
            <div className="mk-plate">
              <div className="mk-catalog-cap">buttons</div>
              <div className="mk-plate__row">
                <Button variant="primary">Primary</Button>
                <Button>Default</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div className="mk-plate">
              <div className="mk-catalog-cap">tags</div>
              <div className="mk-plate__row">
                <Tag>Gemstone</Tag>
                <Tag>Critical</Tag>
                <Tag>Pending</Tag>
              </div>
            </div>
          </div>
          <div className="mk-plate">
            <div className="mk-catalog-cap">gate strip</div>
            <Progress value={94} />
            <p>Gate confidence 94% · replay aligned · seal pending confirmation.</p>
          </div>
          <Tabs
            defaultValue="nav"
            items={[
              { value: 'nav', label: 'Navigation', body: <div className="mk-components-tabcopy">Primary navigation with engraved brass hierarchy.</div> },
              { value: 'controls', label: 'Controls', body: <div className="mk-components-tabcopy">Buttons, tags, and command inputs share a measured baseline.</div> },
              { value: 'gate', label: 'Gate Strip', body: <div className="mk-components-tabcopy">Status panels remain prose-first, with progress second.</div> },
            ]}
          />
        </div>
      </section>
    </CodexFrame>
  );
}

function DashboardSurface() {
  const rows = [
    { id: 'r-8842', workflow: 'Invoice reconciliation · Oct batch', agents: 'L · V · R', verdict: 'pass', cost: '$0.38', sealed: '14:28:04' },
    { id: 'r-8841', workflow: 'Procurement triage · freight claims', agents: 'O', verdict: 'iterate', cost: '$0.64', sealed: '14:22:51' },
    { id: 'r-8840', workflow: 'Customer escalation · tier 2', agents: 'C · R', verdict: 'sealed', cost: '$0.19', sealed: '14:17:30' },
    { id: 'r-8839', workflow: 'Nightly data hygiene · warehouse', agents: 'J', verdict: 'fail', cost: '$1.04', sealed: '14:09:12' },
  ];
  return (
    <section className="mk-dashboard">
      <aside className="mk-dashboard__side-rail">
        <div className="mk-dashboard__brand">
          <LogoMonogram style={{ width: 28, height: 28 }} />
          <strong>a·5·c·ai</strong>
        </div>
        <span>Foundry</span>
        <button type="button" className="current">Overview</button>
        <button type="button">Runs & telemetry</button>
        <button type="button">Ledger</button>
        <button type="button">Gates & verdicts</button>
        <span>Agents</span>
        <button type="button">Roster</button>
        <button type="button">Seat pool</button>
        <button type="button">Tools & MCP</button>
        <footer>
          <div className="mk-chat-avatar">E</div>
          <div>
            <strong>Elena Varga</strong>
            <small>Foundry · Ops</small>
          </div>
        </footer>
      </aside>
      <div className="mk-dashboard__main">
        <header className="mk-dashboard__hero">
          <div>
            <div className="mk-dashboard__crumbs">Foundry › Praxis Collective › Overview</div>
            <h2>
              Overview of <em>yesterday&apos;s convergence</em>
            </h2>
            <p>
              A plain-spoken ledger of every agent conversation, gate verdict, and replay in the
              last twenty-four hours.
            </p>
            <div className="mk-dashboard__dim">
              <span />
              <i>14 AUG 2026 · 00:00 → 23:59 · UTC</i>
              <span />
            </div>
          </div>
          <div className="mk-dashboard__hero-actions">
            <div className="mk-dashboard__stamp">Live · reconciled 14:32 UTC</div>
            <div>
              <Button variant="ghost">Export</Button>
              <Button variant="default">Reconcile</Button>
              <Button variant="primary">New run</Button>
            </div>
          </div>
        </header>
        <div className="mk-dashboard__tools">
          <div className="mk-dashboard__segs">
            <button type="button" className="on">24 hr</button>
            <button type="button">7 d</button>
            <button type="button">30 d</button>
            <button type="button">Custom</button>
          </div>
          <div className="mk-dashboard__filters">
            <Tag>Tenant: Praxis Co.</Tag>
            <Tag>Gate: Convergence</Tag>
            <Tag>Verdict: Any</Tag>
          </div>
          <div className="mk-dashboard__search">
            <span>Search runs, agents, gates…</span>
            <i>⌘K</i>
          </div>
        </div>
        <div className="mk-dashboard__body">
          <div className="mk-dashboard__col-main">
            <div className="mk-dashboard__kpis">
              <article><span>Convergence rate</span><strong>94.2%</strong><small>▲ 2.4</small></article>
              <article><span>Gate verdicts issued</span><strong>1,284</strong><small>▲ 18</small></article>
              <article><span>Seat-hours consumed</span><strong>318.7</strong><small>▼ 4.1</small></article>
              <article><span>Median cost / run</span><strong>$0.47</strong><small>▼ 0.11</small></article>
            </div>
            <section className="mk-dashboard__chart mk-dashboard__chart--bp">
              <header>
                <span>I.</span>
                <strong>Run timeline & gate verdicts</strong>
                <div>
                  <button type="button" className="on">Volume</button>
                  <button type="button">Cost</button>
                  <button type="button">Latency</button>
                </div>
              </header>
              <div className="mk-dashboard__chart-body">
                <div className="mk-dashboard__gridlines">
                  {Array.from({ length: 24 }).map((_, index) => (
                    <i key={index} style={{ height: `${80 + ((index * 17) % 120)}px` }} />
                  ))}
                </div>
              </div>
            </section>
            <section className="mk-dashboard__ledger">
              <header>
                <span>II.</span>
                <strong>Recent runs · ledger</strong>
                <div>
                  <Button variant="ghost">Columns</Button>
                  <Button variant="ghost">Group</Button>
                  <Button variant="default">Export</Button>
                </div>
              </header>
              <DataTable
                columns={[
                  { key: 'id', label: 'No.' },
                  { key: 'workflow', label: 'Workflow' },
                  { key: 'agents', label: 'Agents' },
                  { key: 'verdict', label: 'Verdict' },
                  { key: 'cost', label: 'Cost' },
                  { key: 'sealed', label: 'Sealed' },
                ]}
                rows={rows}
                pageSize={4}
              />
            </section>
          </div>
          <aside className="mk-dashboard__col-side">
            <section className="mk-dashboard__gauge-panel">
              <header>III. Seat pool · utilisation</header>
              <div className="mk-dashboard__gauges">
                <div><span>Editor</span><strong>72%</strong><Progress value={72} /></div>
                <div><span>Verifier</span><strong>48%</strong><Progress value={48} /></div>
                <div><span>Runner</span><strong>91%</strong><Progress value={91} /></div>
                <div><span>Scribe</span><strong>24%</strong><Progress value={24} /></div>
              </div>
            </section>
            <section className="mk-dashboard__feed">
              <header>IV. Activity · last hour</header>
              <article><b>01</b><p><strong>verifier-03</strong> sealed `r-8842` with PASS.</p><span>14:28</span></article>
              <article><b>02</b><p><strong>editor-11</strong> pushed iteration 5 of `r-8841`.</p><span>14:23</span></article>
              <article><b>03</b><p><strong>concierge-02</strong> escalated `r-8840` to policy.</p><span>14:17</span></article>
            </section>
            <section className="mk-dashboard__cmd">
              <header>
                <span>⌕</span>
                <strong>reseat janitor-01</strong>
                <i>⌘K</i>
              </header>
              <div>
                <button type="button" className="current">Reseat janitor-01 with read-only warehouse key</button>
                <button type="button">Open replay worktree for r-8839</button>
                <button type="button">Disable janitor-01 write scope</button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function DocsSurface() {
  const chapterRows = [
    { num: 'I.', title: 'A first acquaintance', pages: 'pp. 3 – 18' },
    { num: 'II.', title: 'Agents & seats', pages: 'pp. 19 – 44' },
    { num: 'III.', title: 'Gates & verdicts', pages: 'pp. 45 – 82', current: true },
    { num: 'IV.', title: 'The run ledger', pages: 'pp. 83 – 112' },
  ];
  return (
    <section className="mk-docs">
      <header className="mk-docs__running">
        <div className="mk-docs__running-left"><span className="folio">xii</span><span>Book I · Foundations</span></div>
        <span>Encyclopedia § <em>of the foundry and its rites</em></span>
        <div className="mk-docs__running-right"><span>Edition 4.2 · August 2026</span><span>a5c.ai</span></div>
      </header>
      <div className="mk-docs__layout">
        <aside className="mk-docs__toc">
          <div className="mk-docs__search"><span>Search the encyclopedia…</span><i>/</i></div>
          <small>Book I · Foundations</small>
          <h4>Of the Foundry and its Rites</h4>
          {chapterRows.map((row) => (
            <div key={row.num} className={`mk-docs__chapter ${row.current ? 'current' : ''}`}>
              <div className="mk-docs__chapter-head">
                <b>{row.num}</b>
                <strong>{row.title}</strong>
                <span>{row.pages}</span>
              </div>
              {row.current ? (
                <div className="mk-docs__chapter-items">
                  <a>The grammar of a gate</a>
                  <a className="current">Convergence · the canonical gate</a>
                  <a>Authoring a custom verdict</a>
                  <a>Sealing, unsealing, replay</a>
                </div>
              ) : null}
            </div>
          ))}
        </aside>
        <article className="mk-docs__article">
          <div className="mk-docs__chapter-mark">
            <b>III.</b>
            <div><small>Chapter III · Section 2</small><p>Book I · Foundations · Gates & verdicts</p></div>
            <span>Reading · 14 min</span>
          </div>
          <h2>
            Convergence — <em>the canonical gate</em>
          </h2>
          <p className="lead">
            A decision, in writing, about whether a run of agents has produced something worth sealing, and the machinery that renders it impossible to skip.
          </p>
          <div className="mk-docs__meta">
            <Tag>Stable since 3.0</Tag>
            <Tag>API reference</Tag>
            <Tag>Tutorial</Tag>
            <span>Last revised · 2026-08-12</span>
          </div>
          <div className="mk-docs__columns">
            <p>Every run the foundry produces ends with a written verdict. The convergence gate is the canonical shape against which every other gate is measured.</p>
            <h3><span>§ 1</span>The shape of a convergence gate</h3>
            <p>A convergence gate takes three inputs: the artefact, the criteria written into the role manifest, and the history of prior iterations.</p>
            <div className="mk-docs__defbox">
              <strong>Definition</strong>
              <p>Convergence: a written statement, by an agent not party to production, that an artefact is indistinguishable in its salient properties from what a second agent would have produced.</p>
            </div>
            <blockquote>“Two strangers, same answer. Everything else is ornament.”<cite>Praxis Foundry handbook, 2024</cite></blockquote>
            <h3><span>§ 2</span>The four verdicts, in order of appetite</h3>
            <ol>
              <li>Pass. The run is sealed; the ledger updates; downstream seals cascade.</li>
              <li>Iterate. The verifier can name what must change for a pass.</li>
              <li>Fail. The artefact is not of the kind the criteria describe.</li>
              <li>Defer. A human is summoned because the criteria are silent.</li>
            </ol>
            <div className="mk-docs__figure"><div className="mk-docs__figure-line" /><span>FIG. 3-2 · editor → artefact → verifier → human</span></div>
            <div className="mk-docs__signpost">
              <b>!</b>
              <div><strong>If the manifest is silent on the question, defer.</strong><p>Agents that guess past their criteria are a form of drift.</p></div>
              <Button variant="ghost">Chap. VI</Button>
            </div>
          </div>
        </article>
        <aside className="mk-docs__margin">
          <div>
            <h4>On this page</h4>
            <a>§ 1 The shape of a convergence gate</a>
            <a className="current">§ 2 The four verdicts</a>
            <a>§ 3 Authoring a verdict</a>
            <a>§ 4 What the gate refuses to do</a>
          </div>
          <div>
            <h4>Marginal gloss</h4>
            <p>Cinnabar seal: the vermilion mark a verifier affixes to a sealed verdict.</p>
            <p>Replay worktree: a parallel workspace in which a retracted verdict is re-rendered.</p>
          </div>
          <div>
            <h4>Revisions</h4>
            <p>4.2 — 12 Aug 2026</p>
            <p>Rewrote § 4; added Fig. 3-2; moved tutorial to § 3.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function SpacingSurface() {
  const ladder = [
    { name: 's-1', token: 'hair', value: 4, note: 'chip interior, icon offset' },
    { name: 's-2', token: 'fine', value: 8, note: 'inline gap, gem-to-label' },
    { name: 's-3', token: 'short', value: 12, note: 'form rows, chip padding' },
    { name: 's-4', token: 'step', value: 16, note: 'default padding, gutters' },
    { name: 's-5', token: 'line', value: 24, note: 'paragraphs, card interiors' },
    { name: 's-6', token: 'rule', value: 32, note: 'plate padding, section stacks' },
    { name: 's-7', token: 'stride', value: 48, note: 'page gutters, block breaks' },
    { name: 's-8', token: 'span', value: 64, note: 'between chapters on a page' },
    { name: 's-9', token: 'hall', value: 96, note: 'hero margins, major rests' },
    { name: 's-10', token: 'gate', value: 128, note: 'top of hero; rarely below' },
  ];
  return (
    <CodexFrame
      title={
        <>
          Measure <em>&amp;</em> Rule
        </>
      }
      kicker="spacing, radii, elevation — the engraver's bench"
      folio="folio v"
      colophon="fol · v of viii"
      activeTab="Measure"
    >
      <section className="mk-chapter">
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">I</span>
          <div>
            <h3>The spacing ladder</h3>
            <p>Ten steps, measured in brass. Use the smallest step that still reads as separation.</p>
          </div>
          <span className="mk-codex-meta">ruler · Σ</span>
        </header>
        <div className="mk-plate mk-ladder mk-ladder--engraved">
          <div className="mk-catalog-cap">ruler · Σ</div>
          {ladder.map((item) => (
            <div key={item.name} className="mk-ladder__row">
              <div><span>{item.name}</span><small>{item.token}</small></div>
              <div className="mk-ruler-track"><i style={{ width: `${Math.max(item.value, 2)}px` }} /></div>
              <div className="mk-ruler-meta"><strong>{item.value} px</strong><small>{item.note}</small></div>
            </div>
          ))}
        </div>
        <dl className="mk-specs">
          <dt>Base unit</dt><dd>4 px. Every value on the ladder is a multiple. No 5px, 15px, or 20px.</dd>
          <dt>Rhythm</dt><dd>Vertical stacks prefer s-4 → s-5 → s-6. Never skip two steps.</dd>
        </dl>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">II</span>
          <div>
            <h3>The measure — column widths</h3>
            <p>A column of type is legible at 58 characters. Below 45 it chatters; above 75 it loses the reader.</p>
          </div>
          <span className="mk-codex-meta">measure</span>
        </header>
        <div className="mk-measure-grid">
          <article className="mk-measure-cell">
            <span className="mk-measure-cell__cap">too narrow · 32ch</span>
            <strong className="mk-measure-cell__num">i</strong>
            <p className="mk-measure-cell__text">Babysitter wraps any coding agent in a convergent loop. Short measure chatters.</p>
          </article>
          <article className="mk-measure-cell mk-measure-cell--good">
            <span className="mk-measure-cell__cap">just right · 58ch</span>
            <strong className="mk-measure-cell__num">ii</strong>
            <p className="mk-measure-cell__text">Babysitter wraps any coding agent in a convergent loop. The measure breathes; the eye returns to the left edge without searching.</p>
          </article>
          <article className="mk-measure-cell">
            <span className="mk-measure-cell__cap">too wide · 88ch</span>
            <strong className="mk-measure-cell__num">iii</strong>
            <p className="mk-measure-cell__text">Babysitter wraps any coding agent in a convergent loop. Wide measure is a trap; the eye loses the next line.</p>
          </article>
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">III</span>
          <div>
            <h3>Radii — the corners</h3>
            <p>Mostly sharp. The codex prefers right angles; soft corners are for pills and gems only.</p>
          </div>
          <span className="mk-codex-meta">radii · ρ</span>
        </header>
        <div className="mk-radii">
          {[['r-0', '0 · plates'], ['r-1', '2 · code, inputs'], ['r-2', '6 · buttons'], ['r-3', '12 · cartouches'], ['r-∞', 'pill · chips, gems']].map(([name, spec], index) => (
            <div key={name} className="mk-radius-cell">
              <div className={`mk-radius-swatch mk-radius-swatch--${index}`} />
              <strong className="mk-radius-name">{name}</strong>
              <span className="mk-radius-spec">{spec}</span>
            </div>
          ))}
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">IV</span>
          <div>
            <h3>Elevation — plate offsets</h3>
            <p>We do not diffuse shadows. We offset the plate downward with a hard line, like a card on a table.</p>
          </div>
          <span className="mk-codex-meta">elev · Δ</span>
        </header>
        <div className="mk-elev-row">
          {[0, 1, 2, 3].map((level) => (
            <div key={level} className="mk-elev-cell">
              <div className={`mk-elev-plate mk-elev-plate--${level}`}>{level === 0 ? '—' : ['i', 'ii', 'iii'][level - 1]}</div>
              <strong className="mk-elev-name">e-{level}</strong>
              <span className="mk-elev-spec">{level === 0 ? 'inline · no offset' : level === 1 ? 'card · 0 2px 0 ink' : level === 2 ? 'button · 0 4px 0 ink' : 'panel · 0 6px 0 ink'}</span>
            </div>
          ))}
        </div>
        <dl className="mk-specs">
          <dt>Rule</dt><dd>No diffuse browser shadows. Use a hard offset in ink.</dd>
          <dt>Hover</dt><dd>Increment by one register on hover: e-1 → e-2. Never invert.</dd>
        </dl>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">V</span>
          <div>
            <h3>The 12-column grid</h3>
            <p>Max width 1200. Twelve columns, 16px gutters. Type aligns to a 24px baseline.</p>
          </div>
          <span className="mk-codex-meta">grid · 12</span>
        </header>
        <div className="mk-grid-sheet">
          <div className="mk-grid-preview mk-grid-preview--filled">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>
          <div className="mk-grid-content">
            <div>4 col · rail</div>
            <div>8 col · body</div>
          </div>
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">VI</span>
          <div>
            <h3>Vertical rhythm — 24px baseline</h3>
            <p>Every line of type lands on a cinnabar ruling. Headings, body, and captions share one grid.</p>
          </div>
          <span className="mk-codex-meta">baseline</span>
        </header>
        <div className="mk-rhythm-block">
          <span className="mk-rhythm-block__cap">baseline · 24 px</span>
          <h4>The recipe, not the kitchen.</h4>
          <p>AI models change; proven workflows do not. Babysitter makes the recipe a first-class artifact: plan, execute, verify, seal.</p>
          <p>Every heading sits on the 24px ruling. Body copy sits on it. Captions sit on it. When a measurement disagrees, the measurement is wrong, not the grid.</p>
        </div>
      </section>
    </CodexFrame>
  );
}

function TypeSurface() {
  return (
    <CodexFrame
      title={
        <>
          Type <em>&amp;</em> Specimen
        </>
      }
      kicker="three voices, one register"
      folio="folio iii"
      colophon="fol · iii of viii"
      activeTab="Type"
    >
      <section className="mk-chapter">
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">I</span>
          <div>
            <h3>Cormorant Garamond — the voice</h3>
            <p>Display and headline register. Italic is reserved for emphasis and utterance, not decoration.</p>
          </div>
          <span className="mk-codex-meta">folio iii</span>
        </header>
        <div className="mk-plate mk-type-hero">
          <div className="mk-catalog-cap">specimen · a</div>
          <p className="mk-type-display">
            Done <em>means</em> done.
          </p>
          <p className="mk-type-alphabet">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
          <p className="mk-type-alphabet mk-type-alphabet--alt">a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
          <p className="mk-type-numerals">0 1 2 3 4 5 6 7 8 9 · &amp; · ¶ · † · ‡</p>
        </div>
        <dl className="mk-specs">
          <dt>Family</dt><dd><code>Cormorant Garamond</code> · weights 400, 500, 600 · italic 400, 500.</dd>
          <dt>Use</dt><dd>Headlines, display, pull quotes, and section titles. Never below 20px.</dd>
          <dt>Tracking</dt><dd>Display at -.02em, headings at -.01em. Never letter-space the display weight.</dd>
        </dl>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">II</span>
          <div>
            <h3>The scale</h3>
            <p>A modular register. Each tier has a job; use the smallest tier that still holds the meaning.</p>
          </div>
          <span className="mk-codex-meta">scale · Σ</span>
        </header>
        <div className="mk-plate">
          <table className="mk-scale-table">
            <tbody>
              {[
                ['display', 'Proof of done', '96 / 1.0 · −.02em'],
                ['h1', 'The loop closes', '72 / 1.02 · −.02em'],
                ['h2', 'Reliable workflows ship', '48 / 1.1 · −.01em'],
                ['h3', 'Gates hold the line', '32 / 1.15 · 0'],
                ['h4', 'Convergence is a promise', '24 / 1.2 · 0'],
                ['lede', 'Run it, prove it, seal it — the marginalia of craft.', '22 / 1.35 italic'],
                ['body', 'Babysitter wraps any coding agent in a convergent loop. You define what done means; the apparatus enforces it.', '17 / 1.62'],
                ['caption', 'fig. iv — the ruby halts all further iteration.', '13 / 1.45 italic'],
              ].map(([token, sample, spec]) => (
                <tr key={token}>
                  <td className="mk-scale-token">{token}</td>
                  <td className="mk-scale-sample">{sample}</td>
                  <td className="mk-scale-specs">{spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">III</span>
          <div>
            <h3>EB Garamond — the body</h3>
            <p>Every long passage lives here. Wide measure, generous leading, pretty wrap, old-style figures.</p>
          </div>
          <span className="mk-codex-meta">prose · β</span>
        </header>
        <div className="mk-type-prose">
          <div className="mk-plate">
            <h4>The recipe, not the kitchen</h4>
            <p className="mk-type-lede">A manifesto, in three paragraphs.</p>
            <p className="mk-dropcap">AI models change. The useful thing to own is the recipe, stamped and sealed, portable across whatever oven the industry hands you next.</p>
            <p>Babysitter was written to make those recipes first-class. Every agent call is wrapped in a convergent loop: plan, execute, verify, repeat.</p>
            <p>The alternative is a demo. A reel. A vibe. Our alternative is the seal.</p>
          </div>
          <div className="mk-plate">
            <h4>Three things are never negotiable</h4>
            <p className="mk-type-lede">Gates, determinism, the seal.</p>
            <p>Gates are hard. A failed lint is not a suggestion. A red test is not close enough.</p>
            <p>Determinism is cultural. Same agent, same plan, same gates, same outcome, or a written reason why not.</p>
            <p>The seal is issued exactly once per task. Anything less is theater.</p>
          </div>
        </div>
        <dl className="mk-specs">
          <dt>Family</dt><dd><code>EB Garamond</code> · 400, 500, italic 400.</dd>
          <dt>Measure</dt><dd>Target 58ch. Never below 45ch and never above 75ch.</dd>
          <dt>Leading</dt><dd>1.62 at 17px. Increase to 1.7 for long-form reading.</dd>
          <dt>Figures</dt><dd>Old-style figures on by default.</dd>
        </dl>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">IV</span>
          <div>
            <h3>JetBrains Mono — the apparatus</h3>
            <p>Commands, gate names, folio numbers, timestamps. The mechanical tongue.</p>
          </div>
          <span className="mk-codex-meta">mono · ⧉</span>
        </header>
        <div className="mk-plate mk-plate--void">
          <div className="mk-mono-strip">
            <span><span className="mk-mono-strip__prompt">$</span> babysitter call &quot;add OAuth to /login&quot;</span>
            <span className="muted">↻ planning · iteration 1 of 4 …</span>
            <span>✓ gate · lint <span className="muted">— 0 issues</span></span>
            <span>✓ gate · test <span className="muted">— 24 / 24 passing</span></span>
            <span>⚠ gate · audit <span className="muted">— advisory, revising</span></span>
            <span className="mk-mono-strip__seal">⟡ the seal is struck — proof-of-done issued</span>
          </div>
        </div>
        <dl className="mk-specs">
          <dt>Family</dt><dd><code>JetBrains Mono</code> · 400, 500, 700.</dd>
          <dt>Use</dt><dd>Code, commands, gate chips, folio numbers, and figure labels.</dd>
          <dt>Tracking</dt><dd>Labels at .24em to .3em uppercase. Code at 0.</dd>
        </dl>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">V</span>
          <div>
            <h3>An atlas of small type</h3>
            <p>The marginalia: eyebrows, folios, captions, glyph strings. Their job is to be exact and nearly invisible.</p>
          </div>
          <span className="mk-codex-meta">atlas · μ</span>
        </header>
        <div className="mk-type-atlas">
          <article className="mk-atlas-item"><span className="mk-atlas-name">eyebrow</span><div className="mk-atlas-demo mk-atlas-demo--mono">Vol. i · Chapter iii</div><div className="mk-atlas-caption">JetBrains Mono · 11 · .28em · uppercase</div></article>
          <article className="mk-atlas-item"><span className="mk-atlas-name">folio</span><div className="mk-atlas-demo mk-atlas-demo--folio">fol. iii / viii</div><div className="mk-atlas-caption">JetBrains Mono · 10 · .3em · uppercase</div></article>
          <article className="mk-atlas-item"><span className="mk-atlas-name">caption</span><div className="mk-atlas-demo mk-atlas-demo--caption">fig. iv — the ruby halts all further iteration.</div><div className="mk-atlas-caption">EB Garamond italic · 13 · 1.45</div></article>
          <article className="mk-atlas-item"><span className="mk-atlas-name">glyph · string</span><div className="mk-atlas-demo mk-atlas-demo--glyph">⟡ ✦ ✧ ◊ ✦ ⟡</div><div className="mk-atlas-caption">JetBrains Mono · .3em · decorative rule</div></article>
          <article className="mk-atlas-item"><span className="mk-atlas-name">code · inline</span><div className="mk-atlas-demo">Run <code>babysitter init</code> to begin.</div><div className="mk-atlas-caption">JetBrains Mono · .92em inherit</div></article>
          <article className="mk-atlas-item"><span className="mk-atlas-name">chip · label</span><div className="mk-atlas-demo"><span className="mk-inline-chip">gate · passed</span></div><div className="mk-atlas-caption">JetBrains Mono · 10 · .22em · uppercase</div></article>
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">VI</span>
          <div>
            <h3>The three correct pairings</h3>
            <p>How the voices sit beside each other. There is no fourth pairing worth discussing.</p>
          </div>
          <span className="mk-codex-meta">pair · τ</span>
        </header>
        <div className="mk-type-pair">
          <div>
            <span className="mk-type-pair__tag">display · over · body</span>
            <h4>The recipes are more valuable than the kitchen.</h4>
            <p>A short paragraph in EB Garamond sits beneath a Cormorant display. The italic of one answers the upright of the other.</p>
          </div>
          <div>
            <span className="mk-type-pair__tag">display · over · mono</span>
            <h4>Proof of done</h4>
            <p className="mk-type-pair__mono"><span className="mk-mono-strip__prompt">$</span> babysitter seal<br /><span className="muted">// receipt issued · 2048-bit · archive</span></p>
          </div>
        </div>
        <div className="mk-type-pair mk-type-pair--wide">
          <div>
            <span className="mk-type-pair__tag">eyebrow · over · display</span>
            <div className="mk-type-pair__eyebrow">chapter iv · convergence</div>
            <h4 className="mk-type-pair__headline">The loop is the product.</h4>
          </div>
        </div>
      </section>
    </CodexFrame>
  );
}

export const MOCKUP_DEFINITIONS: MockupDefinition[] = [
  {
    name: 'Ads',
    slug: 'ads',
    description: 'Dark ad-sheet presentation with brass register and slot compositions.',
    render: AdsSurface,
  },
  {
    name: 'Brand',
    slug: 'brand',
    description: 'Sigils, monograms, and glyph systems in codex sheet framing.',
    render: BrandSurface,
  },
  {
    name: 'Chat',
    slug: 'chat',
    description: 'Atelier tri-pane chat aesthetic with dark rail and blueprint memo center.',
    render: ChatSurface,
  },
  {
    name: 'Colors',
    slug: 'colors',
    description: 'Pigment atlas matching codex tabs, casing, and vellum plate language.',
    render: ColorsSurface,
  },
  {
    name: 'Components',
    slug: 'components',
    description: 'Component chapter layout with tabbed plate content and gate strip.',
    render: ComponentsSurface,
  },
  {
    name: 'Dashboard',
    slug: 'dashboard',
    description: 'Foundry dashboard with hero strip, KPI row, and ledger panel.',
    render: DashboardSurface,
  },
  {
    name: 'Docs',
    slug: 'docs',
    description: 'Encyclopedia running head with TOC rail and canonical article body.',
    render: DocsSurface,
  },
  {
    name: 'Spacing',
    slug: 'spacing',
    description: 'Measure page with spacing ladder and 12-column demonstration.',
    render: SpacingSurface,
  },
  {
    name: 'Type',
    slug: 'type',
    description: 'Specimen page for display, body, and seal pairings.',
    render: TypeSurface,
  },
];

export const MOCKUP_NAMES = MOCKUP_DEFINITIONS.map((item) => item.name);
export type MockupSelection = MockupName | 'All';

export interface MockupPreviewsProps {
  mockup?: MockupSelection;
  columns?: 1 | 2 | 3;
  frameHeight?: number;
  zoom?: number;
  showDescription?: boolean;
  showSources?: boolean;
}

function clampZoom(value: number): number {
  if (value < 0.4) return 0.4;
  if (value > 1.25) return 1.25;
  return value;
}

function clampHeight(value: number): number {
  if (value < 420) return 420;
  if (value > 1800) return 1800;
  return value;
}

export function MockupPreviews({
  mockup = 'All',
  columns = 2,
  frameHeight = 840,
  zoom = 0.72,
  showDescription = true,
  showSources = true,
}: MockupPreviewsProps) {
  const safeZoom = clampZoom(zoom);
  const safeHeight = clampHeight(frameHeight);
  const visible =
    mockup === 'All'
      ? MOCKUP_DEFINITIONS
      : MOCKUP_DEFINITIONS.filter((item) => item.name === mockup);

  const style = {
    '--mockup-columns': String(columns),
  } as CSSProperties;

  return (
    <section className="mockup-previews" style={style}>
      {visible.map((item) => {
        const viewportHeight = Math.round(safeHeight / safeZoom);
        const viewportWidth = Math.round(100 / safeZoom);
        return (
          <article key={item.name} className="mockup-card">
            <header className="mockup-card__header">
              <h3 className="mockup-card__title">{item.name}</h3>
              {showDescription ? (
                <p className="mockup-card__description">{item.description}</p>
              ) : null}
            </header>
            <div className="mockup-card__viewport" style={{ height: safeHeight }}>
              <div
                className="mockup-card__canvas"
                style={{
                  transform: `scale(${safeZoom})`,
                  width: `${viewportWidth}%`,
                }}
              >
                <div style={{ minHeight: `${viewportHeight}px` }}>{item.render()}</div>
              </div>
            </div>
            {showSources ? (
              <footer className="mockup-card__footer">
                <span className="mockup-card__file">reference: project/preview/{item.slug}.html</span>
                <span className="mockup-card__open">reconstructed with tokens + components</span>
              </footer>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
