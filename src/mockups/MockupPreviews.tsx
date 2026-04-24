import { CSSProperties, ReactElement, ReactNode } from 'react';
import {
  Button,
  CodeBlock,
  CodeEditor,
  DataTable,
  DiffViewer,
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
import {
  SeraphAside,
  SeraphCard,
  SeraphComposer,
  SeraphCrest,
  SeraphDivider,
  SeraphFolioBorder,
  SeraphHeroPlate,
  SeraphMarginNote,
  SeraphPromptBar,
  SeraphSectionPlate,
  SeraphSidebar,
  SeraphSpecimenPlate,
  SeraphSummaryRow,
  SeraphTask,
  SeraphWindow,
} from './SeraphPrimitives';
import {
  ChatAvatar,
  ChatBars,
  ChatBudgetFoot,
  ChatComposer,
  ChatInspector,
  ChatMemo,
  ChatMessageBody,
  ChatRail,
  ChatShell,
  ChatToolCard,
  ChatTurn,
  ChatTyping,
  ChatWall,
} from './ChatPrimitives';
import {
  AdsCatalog,
  AdsSlotItem,
} from './AdsPrimitives';
import {
  BrandGlyphAtlas,
  BrandHero,
  BrandMonoGrid,
  BrandSealRow,
  BrandSpecimenGrid,
  BrandVoiceGrid,
} from './BrandPrimitives';
import {
  ColorBrassRow,
  ColorGemShelf,
  ColorGroundGrid,
  ColorLadderGroup,
  ColorUsageGrid,
  ColorVerdictStrip,
} from './ColorPrimitives';
import {
  ComponentChipBoard,
  ComponentGaugeRow,
  ComponentGateStrip,
  ComponentGemRow,
  ComponentInstallStrip,
  ComponentModeGrid,
  ComponentNavBar,
  ComponentTabNarrative,
} from './ComponentPrimitives';
import {
  TypeAtlasGrid,
  TypeProseGrid,
  TypePairGrid,
  TypeScaleTable,
} from './TypePrimitives';
import {
  SpacingElevationRow,
  SpacingGridSheet,
  SpacingLadder,
  SpacingMeasureGrid,
  SpacingRadiusRow,
  SpacingRhythmBlock,
} from './SpacingPrimitives';
import {
  CodexChapterHeader,
  CodexDashboardChart,
  CodexDashboardCommandPalette,
  CodexDashboardFeed,
  CodexDashboardGauges,
  CodexDashboardHero,
  CodexDashboardKpis,
  CodexDashboardPanel,
  CodexDashboardRail,
  CodexDashboardShell,
  CodexDashboardToolbar,
  CodexDocsArticle,
  CodexDocsCallout,
  CodexDocsChapterMark,
  CodexDocsFigure,
  CodexDocsMargin,
  CodexDocsShell,
  CodexDocsToc,
  CodexFrame,
  CodexPlate,
} from './CodexPrimitives';
import './mockups.css';

export type MockupName =
  | 'Ads'
  | 'Brand'
  | 'Chat'
  | 'Colors'
  | 'Components'
  | 'Seraph Bestiary'
  | 'Seraph Refactor'
  | 'Dashboard'
  | 'Docs'
  | 'Spacing'
  | 'Type';

export type MockupTheme = 'vellum' | 'void';

export interface MockupDefinition {
  name: MockupName;
  slug: string;
  description: string;
  render: () => ReactElement;
  sourceLabel?: string;
}


function AdsSurface() {
  const slots: AdsSlotItem[] = [
    {
      number: 'I.',
      size: '300 × 250',
      name: 'medium rectangle',
      note: 'The medium rectangle carries the most weight in the set. Chapter numeral earns its height and the CTA stays isolated at the lower right.',
      specs: [
        { label: 'Format', value: 'JPG · 40 KB ceiling' },
        { label: 'Type stack', value: 'Cormorant · JetBrains Mono' },
        { label: 'Safe area', value: '10 px inset' },
      ],
      sheets: [
        {
          rule: { left: 'Var. A · paper ground', right: '300 × 250' },
          card: {
            kind: 'mr',
            folio: 'Leaflet Nº I · mr-01',
            chapter: { number: '03', label: 'Chapter III', detail: 'Gates & verdicts' },
            headline: <>Every agent turn ends in a <em>written verdict</em>.</>,
            brandTitle: 'a5c.ai',
            brandBody: 'The foundry for multi-agent work',
            action: <Button variant="primary">Request a demo</Button>,
            tickerLeft: 'Ed. 4.2 · Aug 26',
            tickerRight: 'Vellum ground',
          },
        },
        {
          rule: { left: 'Var. B · blueprint ground', right: '300 × 250' },
          card: {
            kind: 'mr',
            theme: 'blueprint',
            folio: 'Leaflet Nº I · mr-02',
            chapter: { number: '03', label: 'Chapter III', detail: 'Gates & verdicts' },
            headline: <>Two strangers, <em>same answer</em>. The rest is ornament.</>,
            brandTitle: 'a5c.ai',
            brandBody: 'Convergence, in plain prose',
            action: <Button variant="default">Read chapter III</Button>,
            tickerLeft: 'Ed. 4.2 · Aug 26',
            tickerRight: 'Blueprint ground',
          },
        },
      ],
    },
    {
      number: 'II.',
      size: '728 × 90',
      name: 'leaderboard',
      note: 'A leaderboard lives above the fold. The chapter badge does the identity work on the left so the headline can stay short.',
      sheets: [
        {
          rule: { left: 'Var. A · ink badge', right: '728 × 90' },
          card: {
            kind: 'lb',
            badge: { number: '§ iii', label: 'Chap. III' },
            eyebrow: 'Book I · Foundations',
            headline: <>Every run ends in a <em>written verdict</em>. Not a score.</>,
            brandTitle: 'a·5·c·ai',
            action: <Button variant="primary">Open the foundry</Button>,
          },
        },
      ],
    },
    {
      number: 'III.',
      size: '160 × 600',
      name: 'wide skyscraper',
      orientation: 'row',
      note: 'The skyscraper rewards vertical architecture. The spine acts like a dimension line so the ad reads like a measured elevation.',
      sheets: [
        {
          rule: { left: 'Var. A · paper', right: '160 × 600' },
          card: {
            kind: 'sky',
            folio: 'sky-01',
            chapter: { number: '02', label: 'Chapter II', detail: 'Agents & seats', stacked: true },
            headline: <><em>Seats</em>, not seats of software.</>,
            proof: 'An agent is a seat in a room; replay is how the room remembers.',
            actions: [<Button variant="ghost">Chapter II</Button>, <Button variant="primary">Try a5c.ai</Button>],
          },
        },
        {
          rule: { left: 'Var. B · ink', right: '160 × 600' },
          card: {
            kind: 'sky',
            theme: 'ink',
            folio: 'sky-02',
            chapter: { number: '06', label: 'Chapter VI', detail: 'Safety & seals', stacked: true },
            headline: <>Least <em>scope</em>, by default.</>,
            proof: 'Every tool an agent can reach was granted, in writing, by a human.',
            actions: [<Button variant="ghost">Chapter VI</Button>, <Button variant="default">See the seal</Button>],
          },
        },
      ],
    },
    {
      number: 'IV.',
      size: '300 × 600',
      name: 'half-page poster',
      orientation: 'row',
      note: 'The half-page is the largest surface and the only one that can carry a three-stanza proof.',
      sheets: [
        {
          rule: { left: 'Var. A · figure-driven', right: '300 × 600' },
          card: {
            kind: 'poster',
            folio: 'poster-01',
            chapter: { number: '01', label: 'Book I · Foundations', detail: 'A first acquaintance' },
            headline: <>The foundry, <em>in one page</em>.</>,
            figure: <><div className="mk-ad-card__figure-line" /><span>FIG. A · editor → artefact → verifier → human</span></>,
            stanzas: [<> <b>Seat</b> — an agent, a manifest, a room.</>, <><b>Verdict</b> — a written decision, by someone else.</>, <><b>Seal</b> — a cinnabar mark, and a replay if it cracks.</>],
            brandTitle: 'a5c.ai',
            brandBody: 'The foundry for multi-agent work',
            action: <Button variant="primary">Request a demo</Button>,
          },
        },
        {
          rule: { left: 'Var. B · cinnabar ground', right: '300 × 600' },
          card: {
            kind: 'poster',
            theme: 'cinnabar',
            folio: 'poster-02',
            chapter: { number: '03', label: 'Book I · Chapter III', detail: 'Gates & verdicts' },
            headline: <>Pass. Iterate. Fail. <em>Defer.</em></>,
            figure: <span>pass · iterate · fail · defer</span>,
            figureTone: 'words',
            stanzas: [<><b>Two strangers</b>, same answer.</>, <><b>One paragraph</b>, not a score.</>, <><b>Every seal</b>, a replay if it cracks.</>],
            brandTitle: 'a5c.ai',
            brandBody: 'Read chapter III in the encyclopedia',
            action: <Button variant="default">Open chapter III</Button>,
          },
        },
      ],
    },
  ];
  return <AdsCatalog title="Standard display" emphasis="ad set" meta={['Four IAB standard slots', 'Non-animated · legible at 100%']} slots={slots} />;
}

function BrandSurface() {
  const wordmark = <>a<span>·</span>5<span>·</span>c<span>·</span>ai</>;
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
        <CodexChapterHeader num="I" title="The wordmark" body="Hero specimen, underlines, and the engraved signature line." meta="folio i · voice" />
        <BrandHero
          cap="wordmark · master"
          icon={<LogoMonogram style={{ width: 84, height: 84 }} />}
          wordmark={wordmark}
          under="atelier for exacting multi-agent work"
          statement="Build with certainty. Done means done."
        />
        <BrandSpecimenGrid
          items={[
            { label: 'light field', wordmark, caption: 'editorial application' },
            { label: 'void field', wordmark, caption: 'product shell', dark: true },
          ]}
        />
        <CodexChapterHeader num="II" title="Monograms and mode glyphs" body="Reduced seals for rails, runbooks, and dispatch states." meta="registry" />
        <BrandMonoGrid
          items={[
            { label: 'ink', icon: <LogoMonogram style={{ width: 84 }} />, caption: 'primary seal' },
            { label: 'void', icon: <LogoMonogramDark style={{ width: 84 }} />, caption: 'night shell', tone: 'void' },
            { label: 'dispatch', icon: <GlyphModeInteractive style={{ width: 72 }} />, caption: 'interactive', tone: 'cinnabar' },
            { label: 'modes', icon: <div className="mk-brand-glyphs"><GlyphModePlan style={{ width: 48 }} /><GlyphModeYolo style={{ width: 48 }} /><GlyphModeForever style={{ width: 48 }} /></div>, caption: 'plan · yolo · forever', tone: 'brass' },
          ]}
        />
        <CodexChapterHeader num="III" title="Voice, glyphs, and seals" body="The secondary plates that make the folio read like a registry rather than a single specimen." meta="apparatus" />
        <div className="mk-plate">
          <BrandGlyphAtlas
            cap="alphabet · mode"
            items={[
              { label: 'mono', icon: <LogoMonogram style={{ width: 56, height: 56 }} /> },
              { label: 'mono dark', icon: <LogoMonogramDark style={{ width: 56, height: 56 }} /> },
              { label: 'interactive', icon: <GlyphModeInteractive style={{ width: 56, height: 56 }} /> },
              { label: 'plan', icon: <GlyphModePlan style={{ width: 56, height: 56 }} /> },
              { label: 'yolo', icon: <GlyphModeYolo style={{ width: 56, height: 56 }} /> },
              { label: 'forever', icon: <GlyphModeForever style={{ width: 56, height: 56 }} /> },
              { label: 'seal', icon: <SealGatePassed style={{ width: 56, height: 56 }} /> },
              { label: 'wordmark', icon: <LogoWordmark style={{ width: 72, height: 32 }} /> },
            ]}
            footer="⟡ ✦ ✧ ◊ ✦ ⟡ · atlas of marks"
          />
        </div>
        <BrandVoiceGrid
          columns={[
            {
              cap: 'do',
              title: 'Quiet authority',
              tone: 'yes',
              items: [
                'Say what the system does in plain prose, then prove it.',
                'Reserve italics for emphasis and utterance, not decoration.',
                'Make the seal feel earned, never theatrical.',
              ],
            },
            {
              cap: 'avoid',
              title: 'Chrome and slogans',
              tone: 'no',
              items: [
                'Do not make the product sound like a startup landing page.',
                'Do not decorate technical surfaces with arbitrary gem color.',
                'Do not overstate certainty where a gate has not yet passed.',
              ],
            },
          ]}
        />
        <div className="mk-plate">
          <div className="mk-catalog-cap">seals · row</div>
          <BrandSealRow
            items={[
              { tone: 'cinnabar', name: 'human seal', description: 'the struck verdict' },
              { tone: 'viridian', name: 'healthy run', description: 'stable and passing' },
              { tone: 'brass', name: 'mechanism', description: 'casing and apparatus' },
              { tone: 'indigo', name: 'reference', description: 'cold diagrammatic register' },
            ]}
          />
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
    <ChatShell
      theme="dark"
      rail={(
        <ChatRail
          brand="Atelier."
          pinned={pinnedThreads}
          today={todayThreads}
          foot={<ChatBudgetFoot initial="E" name="Elena Varga" role="Praxis · Ops" budget="$42.18" usage="Budget · 71%" />}
        />
      )}
      wall={(
        <ChatWall
          title={<>Freight claims <em>Oct batch review</em></>}
          subtitle="Workflow r-8841 › Iteration 5 of 5 › Gate: quality · pending"
          tools={(
            <>
              <Tag>3 agents seated</Tag>
              <Button variant="ghost">Replay</Button>
              <Button variant="ghost">Branch</Button>
              <Button variant="primary">Seal verdict</Button>
            </>
          )}
          composer={(
            <ChatComposer
              attachments={['Oct-freight-manifest.csv', 'tariff-2026-Q3.pdf']}
              placeholder="Ask archivist something, or @verifier-03 / describe a new gate…"
              footerLabel="seated · archivist · verifier-03"
            />
          )}
        >
          <ChatTurn avatar={<ChatAvatar>E</ChatAvatar>} label="Principal" timestamp="14:01" user>
            <ChatMessageBody>
              Walk the October freight-claims batch. Flag anything inconsistent with carrier tariff
              §4.2 and draft short responses for the contested ones. Cite the claim IDs and do not
              make up numbers.
            </ChatMessageBody>
          </ChatTurn>
          <ChatTurn avatar={<ChatAvatar agent>A</ChatAvatar>} label="archivist" timestamp="14:02">
            <ChatMemo
              title="Memo · 01"
              seat="archivist · ledger reconciler"
              timestamp="14:02:11 UTC"
              footnote="Seat 03 · 1.42s · ¢3.8"
              actions={[
                { label: 'Reply', variant: 'ghost' },
                { label: 'Copy', variant: 'ghost' },
                { label: 'Branch', variant: 'ghost' },
              ]}
              body={(
                <>
                  <p>
                    I walked the 42 October freight claims against tariff §4.2 and manifest records.
                    Thirty-six are internally consistent. Six need direct carrier follow-up.
                  </p>
                  <h4>Batch shape</h4>
                  <ChatBars
                    bars={Array.from({ length: 24 }).map((_, index) => ({ height: 40 + ((index * 9) % 90) }))}
                    caption="Distribution of 42 claims by invoiced amount. Right-tail bars are flagged."
                  />
                  <h4>The six flagged claims</h4>
                  <ChatToolCard
                    title="Tool"
                    meta="ledger.query · rows=6"
                    latency="412ms"
                    body={(
                      <CodeEditor
                        tone="blueprint"
                        language="text"
                        filename="ledger.query"
                        status="rows=6 · 412ms"
                        code={`CLM-10412 · surcharge 18.2% vs tariff 14.0%\nCLM-10477 · weight rounded up one bracket\nCLM-10544 · duplicate line item\nCLM-10602 · fuel surcharge applied twice`}
                      />
                    )}
                  />
                  <p>
                    Aggregate carrier overcharge: $4,511.05. Draft replies are staged under Drafts ›
                    Oct-freight-replies.
                  </p>
                </>
              )}
            />
          </ChatTurn>
          <ChatTurn avatar={<ChatAvatar>E</ChatAvatar>} label="Principal" timestamp="14:14" user>
            <ChatMessageBody>
              Pull CLM-10544 into the editor and loop in verifier-03 to confirm tariff timing
              before you seal.
            </ChatMessageBody>
          </ChatTurn>
          <ChatTurn avatar={<ChatAvatar agent>A</ChatAvatar>} label="archivist" timestamp="14:15">
            <ChatMemo
              brief
              title="Memo · 02"
              seat="archivist · seat 03"
              timestamp="14:15:03 UTC"
              body={(
                <p>
                  Opening CLM-10544 now. Duplicate line is row 4. Verifier-03 is reseating from
                  the audit pool to confirm whether the zone-3 rate applies pre-06:00 UTC.
                </p>
              )}
            />
          </ChatTurn>
          <ChatTyping>verifier-03 is reconciling the tariff table. ETA ~4 s.</ChatTyping>
        </ChatWall>
      )}
      inspector={(
        <ChatInspector
          title="Worktree · context"
          items={[
            { label: 'Seated agents', value: 'archivist · verifier-03 · editor-11' },
            { label: 'Tools in scope', value: 'ledger.query · editor.open · carrier.api' },
            { label: 'Pinned files', value: 'Oct-freight-manifest.csv · tariff-2026-Q3.pdf · policy/refund-softcap.md' },
            { label: 'Run cost', value: '8,412 input · 2,901 output · subtotal $0.049' },
          ]}
          footer={<><div className="mk-chat-seal">✓</div><p>Not yet sealed · verdict pending</p></>}
        />
      )}
    />
  );
}

function SeraphRefactorSurface() {
  const conversations = [
    ['Auth middleware refactor', 'Refactor, tracing, tests', '10:42 AM', true],
    ['Fix flaky tests', 'Investigate & stabilize', '9:18 AM', false],
    ['Deploy review', 'Staging → Production', 'Yesterday', false],
    ['TypeScript cleanup', 'Strict mode & any fixes', 'Yesterday', false],
    ['Database migration plan', 'Users table partitioning', 'Yesterday', false],
    ['API rate limiting', 'Redis + sliding window', 'May 12', false],
    ['Frontend build error', 'Vite config issue', 'May 11', false],
    ['Add dark mode', 'Theme tokens & toggle', 'May 10', false],
    ['CI pipeline optimization', 'Caching & parallel jobs', 'May 8', false],
  ] as const;

  return (
    <SeraphWindow>
      <SeraphSidebar
        rail={{ sigil: '✺', topTotemClass: 'mk-seraph__totem--serpent', bottomTotemClass: 'mk-seraph__totem--relic', caption: 'folio · vii' }}
        crest={<SeraphCrest />}
        threads={conversations.map(([title, subtitle, when, current]) => ({ title, subtitle, when, current }))}
        medallion="✺"
        planTitle="Pro Plan"
        planSubtitle="Codex Seraphinianus"
      />
      <main className="mk-seraph__main">
        <SeraphPromptBar
          seal="✺"
          time="10:42 AM"
          prompt={(
            <>
              Refactor the auth middleware, add request tracing,
              <br />
              and update the tests. Show me the changes before committing.
            </>
          )}
        />
        <p className="mk-seraph__lead">
          I&apos;ll inspect the codebase, run the tests, implement the refactor with request tracing,
          update tests, and show you the diff before committing.
        </p>
        <SeraphHeroPlate
          eyebrow="Commission · opening plate"
          title={<>Refactor, trace, and <em>show the leaves</em>.</>}
          body={<p>The brief is not only to make the middleware correct, but to leave behind a readable instrument: what changed, why it changed, and which seals were earned.</p>}
          aside={<div className="mk-seraph__hero-seal">✺<small>refactor folio</small></div>}
        />
        <SeraphDivider label="working register" />
        <div className="mk-seraph__cards mk-seraph__cards--asymmetric mk-seraph__cards--folio">
          <SeraphCard eyebrow="Inspection · I" title="Repository Inspection" status="Completed" footer="Ledger reconciled against 214 files." ornament={<div className="mk-seraph__sprout" />}>
            <p>Scanned project files and dependencies.</p>
            <small>Files scanned: 214 · Language: TypeScript</small>
          </SeraphCard>
          <SeraphCard eyebrow="Runtime path · II" title="Key Files Found" footer="Primary execution seam traced to auth middleware." ornament={<div className="mk-seraph__sprout mk-seraph__sprout--small" />}>
            <ul>
              <li>`src/middleware/auth.ts`</li>
              <li>`src/lib/requestTracing.ts`</li>
              <li>`tests/auth.test.ts`</li>
              <li>`src/server.ts`</li>
            </ul>
          </SeraphCard>
          <SeraphCard eyebrow="Action register · III" title="Plan" status="Completed" tone="botanic" footer="Outcome must remain reviewable before any seal." ornament={<div className="mk-seraph__tree" />}>
            <ol>
              <li>Analyze existing middleware</li>
              <li>Add request tracing</li>
              <li>Refactor auth parsing logic</li>
              <li>Update tests</li>
              <li>Run tests & lint</li>
              <li>Show diff</li>
            </ol>
          </SeraphCard>
          <div className="mk-seraph__cards-note">
            <div className="mk-seraph__eyebrow">folio note · iii-b</div>
            <p>Operational proof accumulates unevenly. The reference page tightens on the left first, then descends into the machine register and ledger in a deliberately hand-set sequence.</p>
          </div>
        </div>
        <div className="mk-seraph__margin-row">
          <SeraphMarginNote
            eyebrow="Marginalia · a"
            title="Review posture"
            body={<p>Three surfaces carry the proof: the terminal trace, the diff book, and the final ledger. The page should read like a bound instrument, not a generic chat shell.</p>}
            ornament={<div className="mk-seraph__icon mk-seraph__icon--vine" />}
          />
          <SeraphMarginNote
            eyebrow="Marginalia · b"
            title="Palette"
            body={<p>Brass, teal, cinnabar, and faded paper need to stay visibly separated. The reference relies on dense but disciplined contrast, especially around rails and medallions.</p>}
            ornament={<div className="mk-seraph__icon mk-seraph__icon--totem" />}
          />
        </div>
        <SeraphSectionPlate eyebrow="Mechanical trace · iv" title="Repository instrumentation" meta="terminal + worktree" tone="blueprint">
          <div className="mk-seraph__terminal">
            <div className="mk-seraph__terminal-main">
              <CodeBlock
                tone="terminal"
                language="bash"
                title="Bash / Terminal"
                meta="completed"
                code={`$ rg "authMiddleware|requestId" src tests
src/middleware/auth.ts: export function authMiddleware
src/lib/requestTracing.ts: export function requestId

$ npm test -- auth
PASS tests/auth.test.ts
  ✓ rejects missing token
  ✓ accepts valid token
  ✓ attaches user to request`}
              />
            </div>
            <div className="mk-seraph__terminal-side">
              <CodeBlock
                tone="terminal"
                language="bash"
                title="Secondary check"
                meta="lint + git state"
                code={`$ npm run lint
✔ No problems found

$ git status --porcelain
 M src/middleware/auth.ts
 A src/lib/requestTracing.ts
 M tests/auth.test.ts
 M src/server.ts`}
              />
              <div className="mk-seraph__machine" />
            </div>
          </div>
        </SeraphSectionPlate>
        <SeraphSectionPlate eyebrow="Diff folio · v" title="Changed leaves" meta="2 files shown">
          <DiffViewer
            files={[
              {
                filename: "src/middleware/auth.ts",
                before: `- export function authMiddleware(req, res, next) {\n    const token = authSplit(req);\n-   if (!token) return res.status(401).json(...)`,
                after: `+ export function authMiddleware(req, res, next) {\n+   const requestId = startRequest(req, res);\n    const token = authSplit(req);\n+   if (!token) return res.status(401).json({ error: 'Missing token', requestId })`,
                language: "diff",
              },
              {
                filename: "tests/auth.test.ts",
                after: `+ import { getRequestId } from '../lib/requestTracing';\n...\n+ expect(requestId).toMatch(/req_/);\n+ expect(res.body.requestId).toBeDefined();`,
                language: "diff",
              },
            ]}
          />
        </SeraphSectionPlate>
        <div className="mk-seraph__margin-row mk-seraph__margin-row--tail">
          <SeraphMarginNote
            eyebrow="Clerk note · c"
            title="Seal condition"
            body={<p>No seal before the diff, lint trace, and final ledger agree. This lower register should feel like a postscript tucked under the main apparatus.</p>}
            ornament={<div className="mk-seraph__icon mk-seraph__icon--lizard" />}
          />
        </div>
        <SeraphSummaryRow
          variant="staggered"
          items={[
            { eyebrow: 'gate · i', title: 'Tests / Validation', body: '12 passed, 12 total · Coverage: 92%', iconClass: 'mk-seraph__icon--torch' },
            { eyebrow: 'gate · ii', title: 'Lint', body: 'No problems found', iconClass: 'mk-seraph__icon--totem' },
            { eyebrow: 'gate · iii', title: 'Type Check', body: 'No type errors', iconClass: 'mk-seraph__icon--vine' },
            { eyebrow: 'seal · note', title: 'Summary', body: 'Refactor complete. Added request tracing, simplified token parsing, and updated 3 tests.', iconClass: 'mk-seraph__icon--lizard' },
          ]}
        />
        <SeraphDivider label="seal register" variant="orb" />
        <SeraphComposer
          placeholder="Message Codex Seraphinianus…"
          tools={['Web Search', 'Bash', 'File Reader', 'Diff', 'Tests', 'Git']}
        />
        <SeraphFolioBorder />
      </main>
      <SeraphAside
        scribbles={['ᚠ ᚨ ᚦ ᚱ ᚲ ᚷ', '⟐ ⟡ ⊹ ⊹ ⟡ ⟐', 'ᚷ ᚲ ᚱ ᚦ ᚨ ᚠ']}
        plantClass="mk-seraph__plant--circuit"
      />
    </SeraphWindow>
  );
}

function SeraphBestiarySurface() {
  const threads = [
    ['Illustrated bestiary', 'Help me research and design...', '10:42 AM', true],
    ['Garden automation', 'Schedule + soil sensors', '9:18 AM', false],
    ['Travel to the Red Isles', 'Itinerary + packing list', 'Yesterday', false],
    ['Translate manuscript', 'Strange script to English', 'Yesterday', false],
    ['Dream journal analysis', 'Recurring symbols & themes', 'May 12', false],
    ['Recipe from mushrooms', 'Foraged morels & herbs', 'May 11', false],
    ['Music theory helper', 'Fugue in D minor', 'May 10', false],
  ] as const;
  return (
    <SeraphWindow variant="mk-seraph--bestiary">
      <SeraphSidebar
        rail={{ sigil: '☼', topTotemClass: 'mk-seraph__totem--owl', bottomTotemClass: 'mk-seraph__totem--serpent', caption: 'atlas · ix' }}
        crest={<SeraphCrest className="mk-seraph__crest--orb" sunClass="mk-seraph__sun--blue" />}
        threads={threads.map(([title, subtitle, when, current]) => ({ title, subtitle, when, current }))}
        medallion="☉"
        planTitle="Anima Codex"
        planSubtitle="Pro Plan"
      />
      <main className="mk-seraph__main">
        <SeraphPromptBar
          seal="☉"
          time="10:42 AM"
          prompt={(
            <>
              I&apos;m creating a bestiary of surreal desert creatures.
              <br />
              Research real-world desert adaptations, draft 3 creature concepts,
              and illustrate one in the style of an illuminated manuscript.
            </>
          )}
        />
        <p className="mk-seraph__lead">
          A grand endeavor. I&apos;ll research desert adaptations, draft concepts, and illustrate.
        </p>
        <SeraphHeroPlate
          eyebrow="Commission · specimen plate"
          title={<>Draft three creatures, then <em>illuminate one</em>.</>}
          body={<p>The page should revolve around one chosen beast and the research that justifies it. The kit needs to support an artifact-first manuscript rhythm, not only utility cards.</p>}
          aside={<div className="mk-seraph__hero-seal mk-seraph__hero-seal--orb">☉<small>bestiary folio</small></div>}
          tone="orb"
        />
        <SeraphDivider label="field notebook" variant="orb" />
        <SeraphSectionPlate eyebrow="Bestiary folio · iii" title="Creature notebook" meta="research + synthesis">
          <SeraphSpecimenPlate
            eyebrow="specimen · dominant plate"
            title="Mirage stalker"
            description="Electrostatic dust veil, folded heat crest, and mirrored abdominal scales. The artifact needs to look pinned into the folio, with the annotation reading as a side gloss rather than a separate card."
            glossEyebrow="illumination register"
            gloss={<p>Side view · desert folio · colder teal anatomy</p>}
          >
            <div className="mk-seraph__creature mk-seraph__creature--hero">
              <div className="mk-seraph__creature-body mk-seraph__creature-body--hero" />
            </div>
          </SeraphSpecimenPlate>
          <div className="mk-seraph__task-stack">
            <SeraphTask
            title="Web Search"
            status="Completed"
            eyebrow="Source gathering · I"
            leading={<><p>Query: desert animal adaptations</p><small>Sources: 12</small></>}
            body={<ul><li>National Geographic: Desert Animals</li><li>Smithsonian: Desert Biology Overview</li><li>BBC Earth: Survivors of the Desert</li><li>… and 9 more</li></ul>}
            footer="Cross-reference with morphology notes before synthesis."
            ornament={<div className="mk-seraph__flora mk-seraph__flora--tuft" />}
          />
            <SeraphTask
            title="File Reader"
            status="Completed"
            eyebrow="Archive reading · II"
            leading={<><p>File: desert_creatures_notes.pdf</p><small>Pages: 1–14</small></>}
            body={<ul><li>Water retention strategies</li><li>Burrowing & thermoregulation</li><li>Nocturnal behaviors</li></ul>}
            footer="Marginalia copied into the illuminated notebook."
            ornament={<div className="mk-seraph__flora mk-seraph__flora--bells" />}
          />
            <SeraphTask
            title="Code Runner"
            status="Completed"
            eyebrow="Trait synthesis · III"
            leading={<><p>Language: Python</p><small>Generated 27 unique trait sets.</small></>}
            body={<ol><li>Sand-burrower, reflective plates, air sacs</li><li>Dune skimmer, electrostatic dust repellent</li><li>Mirage stalker, heat funnel crest</li></ol>}
            footer="Three candidates promoted to the sketch register."
            ornament={<div className="mk-seraph__icon mk-seraph__icon--beetle" />}
          />
            <SeraphTask
            title="Image Tool"
            status="Completed"
            eyebrow="Illumination · IV"
            tone="blueprint"
            leading={<><p>Prompt: illuminated manuscript desert creature</p><small>Style: Codex Seraphinianus</small></>}
            body={<div className="mk-seraph__bestiary-caption">Primary plate promoted above; this panel now records the prompt and rendering notes rather than competing with the hero artifact.</div>}
            footer="Plate revised toward a denser folio silhouette and colder teal anatomy."
          />
            <SeraphTask
            title="Calendar Tool"
            status="Scheduled"
            eyebrow="Review gate · V"
            leading={<><p>Event: Bestiary review</p><small>When: May 23, 2026 at 3:00 PM</small></>}
            body={<p>I&apos;ll schedule a review so we can refine the creatures and choose names and habitats.</p>}
            footer="Human review remains the final naming authority."
            ornament={<div className="mk-seraph__flora mk-seraph__flora--mushroom" />}
            />
          </div>
        </SeraphSectionPlate>
        <p className="mk-seraph__closing">
          All set! Three concepts are drafted, and one is illustrated.
          <br />
          Would you like me to show the other two concepts or refine this one?
        </p>
        <SeraphComposer
          placeholder="Message Codex Seraphinianus…"
          tools={['Web Search', 'Code Runner', 'File Reader', 'Image Tool', 'Calendar']}
        />
        <SeraphFolioBorder variant="orb" />
      </main>
      <SeraphAside
        scribbles={['ϟ Ϙ ϰ ϟ Ϙ ϰ', '⟐ ꙮ ⟡ ꙮ ⟐', 'ϰ Ϙ ϟ ϰ Ϙ ϟ']}
        plantClass="mk-seraph__plant--botanic"
      />
    </SeraphWindow>
  );
}

function ColorsSurface() {
  const grounds = [
    { label: 'Vellum', color: 'var(--ground-vellum)', meta: '#EDE3CF · ground · base', note: 'The default marketing surface. Warm ground, rests the eye.' },
    { label: 'Parchment', color: 'var(--ground-parchment)', meta: '#D9CBAE · ground · alt', note: 'The deeper leaf. Used beneath vellum for section breaks and cards.' },
    { label: 'Void', color: 'var(--ground-void)', meta: '#0B0A0F · ground · deep', note: 'The workshop at midnight. Product shell, code, and technical reference.', dark: true },
    { label: 'Ink', color: 'var(--ground-ink)', meta: '#181624 · ground · layer', note: 'A shade warmer than void. Sits beneath void for layered panels.', dark: true },
  ] as const;
  const ladder = [
    { label: 'Pigment', color: '#1B1611', note: 'body, headings — the voice' },
    { label: 'Fade', color: '#5A4E3C', note: 'captions, marginalia, hints' },
    { label: 'Ghost', color: '#8C7E65', note: 'folio numbers, hairline labels' },
    { label: 'Bone', color: '#F0E6D1', note: 'body, headings — against dark' },
    { label: 'Fade (dark)', color: '#A89980', note: 'captions on dark surfaces' },
  ] as const;
  const gems = [
    { label: 'Cinnabar', color: 'var(--accent-cinnabar)', note: 'the seal · brand · failure verdict' },
    { label: 'Emerald', color: 'var(--gem-emerald)', note: 'gate passed · verdict · healthy' },
    { label: 'Ruby', color: 'var(--gem-ruby)', note: 'halt · terminal error · unrecoverable' },
    { label: 'Amber', color: 'var(--accent-sulphur)', note: 'pending · advisory · warning' },
    { label: 'Topaz', color: 'var(--gem-cyan)', note: 'iterating · in-flight · progress' },
    { label: 'Amethyst', color: '#E23FB4', note: 'annotation · marginalia · human note' },
    { label: 'Sapphire', color: 'var(--accent-indigo)', note: 'diagrammatic · cold reference · linkage' },
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
          <ColorGroundGrid items={grounds} />
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
          <ColorLadderGroup title="on vellum" items={ladder.slice(0, 3)} />
          <ColorLadderGroup title="on void" items={ladder.slice(3)} />
        </div>
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">III</span>
          <div>
            <h3>The brass register</h3>
            <p>A six-step metal gradient used for casings, rivets, and primary buttons. Never as text.</p>
          </div>
          <span className="mk-codex-meta">brass · ring</span>
        </header>
        <ColorBrassRow items={['light · #F2C88F', 'gilt · #D9A96A', 'brass · #B37E3E', 'deep · #8E5A26', 'leather · #5B3817', 'mahogany · #2A1607']} />
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
          <ColorGemShelf items={gems} />
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
        <ColorVerdictStrip
          items={[
            { label: 'Passed', color: 'var(--gem-emerald)', body: 'Gate has cleared; proof will be issued.', meta: '#3EA676 · emerald' },
            { label: 'Halted', color: 'var(--gem-ruby)', body: 'The run has stopped; human review required.', meta: '#D81F3D · ruby' },
            { label: 'Pending', color: 'var(--accent-sulphur)', body: 'Advisory; the loop is adjusting.', meta: '#E0A63A · amber' },
            { label: 'Iterating', color: 'var(--gem-cyan)', body: 'In-flight; next gate incoming.', meta: '#16D7E6 · topaz' },
            { label: 'Sealed', color: 'var(--accent-cinnabar)', body: 'The seal has been struck. Run complete.', meta: '#C03A2B · cinnabar' },
          ]}
        />
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">VI</span>
          <div>
            <h3>Two surfaces, two moods</h3>
            <p>Example applications of the palette on editorial vellum and workshop void.</p>
          </div>
          <span className="mk-codex-meta">usage</span>
        </header>
        <ColorUsageGrid
          items={[
            {
              cap: 'light proof',
              tone: 'light',
              title: 'Proof on vellum.',
              body: 'Editorial surfaces stay warm and quiet, with brass used sparingly to carry hierarchy.',
              actions: <><Button variant="primary">Gate passed</Button><Tag>stable</Tag></>,
            },
            {
              cap: 'night shell',
              tone: 'dark',
              title: 'Proof in the workshop.',
              body: 'Dark surfaces carry brighter gems, deeper brass, and a tighter contrast floor.',
              actions: <><Button variant="default">Needs review</Button><Tag>critical</Tag></>,
            },
          ]}
        />
      </section>
    </CodexFrame>
  );
}

function ComponentsSurface() {
  return (
    <CodexFrame
      title={
        <>
          Instruments <em>&amp;</em> Artifacts
        </>
      }
      kicker="navigation, command surfaces, and gate strips"
      folio="folio ii"
      colophon="fol · ii of viii"
      activeTab="UI Components"
    >
      <section className="mk-chapter">
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">I</span>
          <div>
            <h3>Navigation, controls, and gate strips</h3>
            <p>The same brass and vellum rhythm as the preview folios, but rendered from the system components.</p>
          </div>
          <span className="mk-codex-meta">catalogue</span>
        </header>
          <div className="mk-components-stack">
          <div className="mk-plate">
            <div className="mk-catalog-cap">nav bar</div>
            <ComponentNavBar
              brand={(
                <>
                <LogoMonogram style={{ width: 28, height: 28 }} />
                <strong>a<span>·</span>5<span>·</span>c<span>·</span>ai</strong>
                </>
              )}
              links={[
                { label: 'Product', current: true },
                { label: 'Workflow' },
                { label: 'Enterprise' },
                { label: 'Docs' },
              ]}
              action={<><Tag>Stable</Tag><Button variant="primary">Request access</Button></>}
            />
          </div>
          <ComponentModeGrid
            items={[
              { num: '01', name: 'Interactive', icon: <GlyphModeInteractive style={{ width: 44, height: 44 }} />, cmd: '`/call`', description: 'Pause for a human when the apparatus requires judgment.' },
              { num: '02', name: 'Plan', icon: <GlyphModePlan style={{ width: 44, height: 44 }} />, cmd: '`/plan`', description: 'Write the route first, expose tradeoffs, then execute with intent.' },
              { num: '03', name: 'Yolo', icon: <GlyphModeYolo style={{ width: 44, height: 44 }} />, cmd: '`/yolo`', description: 'Non-interactive loop for bounded work that still ends in a proof.' },
              { num: '04', name: 'Forever', icon: <GlyphModeForever style={{ width: 44, height: 44 }} />, cmd: '`/forever`', description: 'Long-running steward that continues to tend the room after first seal.' },
            ]}
          />
          <div className="mk-plate">
            <div className="mk-catalog-cap">gate strip</div>
            <ComponentGateStrip
              items={[
                { index: 'i', title: 'Plan', body: 'written and accepted', tone: 'pass' },
                { index: 'ii', title: 'Execute', body: 'artifact rendered', tone: 'pass' },
                { index: 'iii', title: 'Verify', body: 'auditor reseated', tone: 'pending' },
                { index: 'iv', title: 'Seal', body: 'proof when convergence holds', tone: 'sealed' },
              ]}
            />
          </div>
          <div className="mk-surface-grid">
            <div className="mk-plate">
              <div className="mk-catalog-cap">command console</div>
              <div className="mk-components-console">
                <CodeBlock
                  tone="terminal"
                  language="bash"
                  code={`$ babysitter call "rebuild login using the design system"\n↻ planning · iteration 1 of 4 …\n✓ gate · lint — 0 issues\n✓ gate · test — 24 / 24 passing\n⚠ gate · audit — advisory, revising\n⟡ the seal is struck — proof-of-done issued`}
                />
              </div>
            </div>
            <div className="mk-plate">
              <div className="mk-catalog-cap">install strip</div>
              <ComponentInstallStrip command="npx @a5c/babysitter init" action={<button type="button" className="mk-components-install__copy">Copy</button>} />
            </div>
          </div>
          <div className="mk-plate">
            <div className="mk-catalog-cap">quill input</div>
            <div className="mk-components-quill">
              <Input placeholder="Describe the artifact you want, or call a named process…" />
              <div className="mk-components-quill__meta">
                <Tag>interactive</Tag>
                <Tag>stable</Tag>
              </div>
            </div>
          </div>
          <div className="mk-plate">
            <div className="mk-catalog-cap">button and chip board</div>
            <div className="mk-plate__row">
              <Button variant="primary">Primary</Button>
              <Button>Default</Button>
              <Button variant="ghost">Ghost</Button>
              <Tag>gate passed</Tag>
              <Tag>critical</Tag>
              <Tag>iterating</Tag>
            </div>
          </div>
          <div className="mk-components-artifacts">
            <div className="mk-plate">
              <div className="mk-catalog-cap">chips · gems</div>
              <ComponentChipBoard
                items={[
                  { label: 'v0.12.1' },
                  { label: 'MIT · licensed' },
                  { label: 'gate · passed' },
                  { label: 'gate · failed' },
                  { label: 'in · review' },
                  { label: 'iterating' },
                  { label: 'commentated' },
                  { label: 'claude · code' },
                ]}
              />
            </div>
            <div className="mk-plate">
              <div className="mk-catalog-cap">wax · seal</div>
              <ComponentGemRow
                seal={<span>gate<br />sealed</span>}
                items={[
                  { label: 'topaz · iter', color: 'var(--gem-cyan)' },
                  { label: 'amethyst · note', color: '#E23FB4' },
                  { label: 'ruby · halt', color: 'var(--gem-ruby)' },
                ]}
              />
            </div>
          </div>
          <div className="mk-plate">
            <div className="mk-catalog-cap">tabs</div>
            <ComponentTabNarrative
              defaultValue="nav"
              items={[
                { value: 'nav', label: 'Navigation', body: <div className="mk-components-tabcopy">Primary navigation with engraved brass hierarchy and a strong centerline.</div> },
                { value: 'controls', label: 'Controls', body: <div className="mk-components-tabcopy">Buttons, chips, inputs, and commands belong to one measured register.</div> },
                { value: 'gate', label: 'Gate Strip', body: <div className="mk-components-tabcopy">Status stays prose-first. The visual is only there to carry the written verdict.</div> },
              ]}
            />
          </div>
          <div className="mk-plate">
            <div className="mk-catalog-cap">gauges · chronometers</div>
            <ComponentGaugeRow
              items={[
                { value: '2k+', top: 'Built-in', bottom: 'processes', needleRotation: 55 },
                { value: '5 min', top: 'Setup', bottom: 'time', needleRotation: -40 },
                { value: '0', top: 'Telemetry', bottom: 'bytes', needleRotation: -170 },
                { value: 'MIT', top: 'License', bottom: '', needleRotation: 90 },
              ]}
            />
          </div>
          <div className="mk-components-pull">
            <blockquote>
              Two strangers, same answer. Everything else is ornament.
              <cite>Praxis Foundry handbook, 2024</cite>
            </blockquote>
          </div>
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
  const bars = Array.from({ length: 24 }).map((_, index) => 80 + ((index * 17) % 120));
  return (
    <CodexDashboardShell
      rail={(
        <CodexDashboardRail
          brand={<><LogoMonogram style={{ width: 28, height: 28 }} /><strong>a·5·c·ai</strong></>}
          sections={[
            {
              title: 'Foundry',
              items: [
                { label: 'Overview', current: true },
                { label: 'Runs & telemetry' },
                { label: 'Ledger' },
                { label: 'Gates & verdicts' },
              ],
            },
            {
              title: 'Agents',
              items: [
                { label: 'Roster' },
                { label: 'Seat pool' },
                { label: 'Tools & MCP' },
              ],
            },
          ]}
          footer={(
            <footer>
              <div className="mk-chat-avatar">E</div>
              <div>
                <strong>Elena Varga</strong>
                <small>Foundry · Ops</small>
              </div>
            </footer>
          )}
        />
      )}
      header={(
        <CodexDashboardHero
          crumbs="Foundry › Praxis Collective › Overview"
          title={<>Overview of <em>yesterday&apos;s convergence</em></>}
          body="A plain-spoken ledger of every agent conversation, gate verdict, and replay in the last twenty-four hours."
          dim={<><span /><i>14 AUG 2026 · 00:00 → 23:59 · UTC</i><span /></>}
          actions={(
            <>
              <div className="mk-dashboard__stamp">Live · reconciled 14:32 UTC</div>
              <div>
                <Button variant="ghost">Export</Button>
                <Button variant="default">Reconcile</Button>
                <Button variant="primary">New run</Button>
              </div>
            </>
          )}
        />
      )}
      tools={(
        <CodexDashboardToolbar
          segments={(
            <div className="mk-dashboard__segs">
              <button type="button" className="on">24 hr</button>
              <button type="button">7 d</button>
              <button type="button">30 d</button>
              <button type="button">Custom</button>
            </div>
          )}
          filters={<><Tag>Tenant: Praxis Co.</Tag><Tag>Gate: Convergence</Tag><Tag>Verdict: Any</Tag></>}
          search={(
            <div className="mk-dashboard__search">
              <span>Search runs, agents, gates…</span>
              <i>⌘K</i>
            </div>
          )}
        />
      )}
      body={(
        <div className="mk-dashboard__body">
          <div className="mk-dashboard__col-main">
            <CodexDashboardKpis
              items={[
                { label: 'Convergence rate', value: '94.2%', delta: '▲ 2.4' },
                { label: 'Gate verdicts issued', value: '1,284', delta: '▲ 18' },
                { label: 'Seat-hours consumed', value: '318.7', delta: '▼ 4.1' },
                { label: 'Median cost / run', value: '$0.47', delta: '▼ 0.11' },
              ]}
            />
            <CodexDashboardPanel
              className="mk-dashboard__chart mk-dashboard__chart--bp"
              headIndex="I."
              title="Run timeline & gate verdicts"
              actions={<><button type="button" className="on">Volume</button><button type="button">Cost</button><button type="button">Latency</button></>}
            >
              <CodexDashboardChart bars={bars} />
            </CodexDashboardPanel>
            <CodexDashboardPanel
              className="mk-dashboard__ledger"
              headIndex="II."
              title="Recent runs · ledger"
              actions={<><Button variant="ghost">Columns</Button><Button variant="ghost">Group</Button><Button variant="default">Export</Button></>}
            >
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
            </CodexDashboardPanel>
          </div>
          <aside className="mk-dashboard__col-side">
            <CodexDashboardPanel className="mk-dashboard__gauge-panel" title="III. Seat pool · utilisation">
              <CodexDashboardGauges
                items={[
                  { label: 'Editor', value: '72%', meter: <Progress value={72} /> },
                  { label: 'Verifier', value: '48%', meter: <Progress value={48} /> },
                  { label: 'Runner', value: '91%', meter: <Progress value={91} /> },
                  { label: 'Scribe', value: '24%', meter: <Progress value={24} /> },
                ]}
              />
            </CodexDashboardPanel>
            <CodexDashboardPanel className="mk-dashboard__feed" title="IV. Activity · last hour">
              <CodexDashboardFeed
                items={[
                  { index: '01', body: <><strong>verifier-03</strong> sealed `r-8842` with PASS.</>, timestamp: '14:28' },
                  { index: '02', body: <><strong>editor-11</strong> pushed iteration 5 of `r-8841`.</>, timestamp: '14:23' },
                  { index: '03', body: <><strong>concierge-02</strong> escalated `r-8840` to policy.</>, timestamp: '14:17' },
                ]}
              />
            </CodexDashboardPanel>
            <CodexDashboardCommandPalette
              icon="⌕"
              title="reseat janitor-01"
              shortcut="⌘K"
              items={[
                { label: 'Reseat janitor-01 with read-only warehouse key', current: true },
                { label: 'Open replay worktree for r-8839' },
                { label: 'Disable janitor-01 write scope' },
              ]}
            />
          </aside>
        </div>
      )}
    />
  );
}

function DocsSurface() {
  const chapterRows = [
    { num: 'I.', title: 'A first acquaintance', pages: 'pp. 3 – 18' },
    { num: 'II.', title: 'Agents & seats', pages: 'pp. 19 – 44' },
    {
      num: 'III.',
      title: 'Gates & verdicts',
      pages: 'pp. 45 – 82',
      current: true,
      items: [
        { label: 'The grammar of a gate' },
        { label: 'Convergence · the canonical gate', current: true },
        { label: 'Authoring a custom verdict' },
        { label: 'Sealing, unsealing, replay' },
      ],
    },
    { num: 'IV.', title: 'The run ledger', pages: 'pp. 83 – 112' },
  ];
  return (
    <CodexDocsShell
      runningLeft={<><span className="folio">xii</span><span>Book I · Foundations</span></>}
      title={<>Encyclopedia § <em>of the foundry and its rites</em></>}
      runningRight={<><span>Edition 4.2 · August 2026</span><span>a5c.ai</span></>}
      toc={(
        <CodexDocsToc
          searchLabel="Search the encyclopedia…"
          bookLabel="Book I · Foundations"
          title="Of the Foundry and its Rites"
          chapters={chapterRows}
        />
      )}
      article={(
        <CodexDocsArticle
          chapterMark={(
            <CodexDocsChapterMark
              num="III."
              subtitle="Chapter III · Section 2"
              context="Book I · Foundations · Gates & verdicts"
              readingTime="Reading · 14 min"
            />
          )}
          title={<>Convergence — <em>the canonical gate</em></>}
          lead="A decision, in writing, about whether a run of agents has produced something worth sealing, and the machinery that renders it impossible to skip."
          meta={<><Tag>Stable since 3.0</Tag><Tag>API reference</Tag><Tag>Tutorial</Tag><span>Last revised · 2026-08-12</span></>}
        >
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
          <CodexDocsFigure label="FIG. 3-2 · editor → artefact → verifier → human" />
          <CodexDocsCallout
            body={<><strong>If the manifest is silent on the question, defer.</strong><p>Agents that guess past their criteria are a form of drift.</p></>}
            action={<Button variant="ghost">Chap. VI</Button>}
          />
          <CodeBlock
            title="Canonical Gate"
            meta="verdict.example.ts"
            language="ts"
            lineNumbers
            code={`export const verdict = {\n  decision: "defer",\n  reason: "manifest is silent on pricing policy",\n  nextStep: "summon human reviewer",\n};`}
          />
        </CodexDocsArticle>
      )}
      margin={(
        <CodexDocsMargin
          sections={[
            {
              title: 'On this page',
              items: [
                <a>§ 1 The shape of a convergence gate</a>,
                <a className="current">§ 2 The four verdicts</a>,
                <a>§ 3 Authoring a verdict</a>,
                <a>§ 4 What the gate refuses to do</a>,
              ],
            },
            {
              title: 'Marginal gloss',
              items: [
                <p>Cinnabar seal: the vermilion mark a verifier affixes to a sealed verdict.</p>,
                <p>Replay worktree: a parallel workspace in which a retracted verdict is re-rendered.</p>,
              ],
            },
            {
              title: 'Revisions',
              items: [<p>4.2 — 12 Aug 2026</p>, <p>Rewrote § 4; added Fig. 3-2; moved tutorial to § 3.</p>],
            },
          ]}
        />
      )}
    />
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
        <SpacingLadder cap="ruler · Σ" items={ladder} />
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
        <SpacingMeasureGrid
          items={[
            { cap: 'too narrow · 32ch', mark: 'i', text: 'Babysitter wraps any coding agent in a convergent loop. Short measure chatters.' },
            { cap: 'just right · 58ch', mark: 'ii', text: 'Babysitter wraps any coding agent in a convergent loop. The measure breathes; the eye returns to the left edge without searching.', emphasis: true },
            { cap: 'too wide · 88ch', mark: 'iii', text: 'Babysitter wraps any coding agent in a convergent loop. Wide measure is a trap; the eye loses the next line.' },
          ]}
        />
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">III</span>
          <div>
            <h3>Radii — the corners</h3>
            <p>Mostly sharp. The codex prefers right angles; soft corners are for pills and gems only.</p>
          </div>
          <span className="mk-codex-meta">radii · ρ</span>
        </header>
        <SpacingRadiusRow
          items={[
            { name: 'r-0', spec: '0 · plates' },
            { name: 'r-1', spec: '2 · code, inputs' },
            { name: 'r-2', spec: '6 · buttons' },
            { name: 'r-3', spec: '12 · cartouches' },
            { name: 'r-∞', spec: 'pill · chips, gems' },
          ]}
        />
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">IV</span>
          <div>
            <h3>Elevation — plate offsets</h3>
            <p>We do not diffuse shadows. We offset the plate downward with a hard line, like a card on a table.</p>
          </div>
          <span className="mk-codex-meta">elev · Δ</span>
        </header>
        <SpacingElevationRow
          items={[
            { level: 0, mark: '—', spec: 'inline · no offset' },
            { level: 1, mark: 'i', spec: 'card · 0 2px 0 ink' },
            { level: 2, mark: 'ii', spec: 'button · 0 4px 0 ink' },
            { level: 3, mark: 'iii', spec: 'panel · 0 6px 0 ink' },
          ]}
        />
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
        <SpacingGridSheet
          numbers={Array.from({ length: 12 }, (_, index) => `${index + 1}`)}
          labels={['4 col · rail', '8 col · body']}
        />
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">VI</span>
          <div>
            <h3>Vertical rhythm — 24px baseline</h3>
            <p>Every line of type lands on a cinnabar ruling. Headings, body, and captions share one grid.</p>
          </div>
          <span className="mk-codex-meta">baseline</span>
        </header>
        <SpacingRhythmBlock
          sections={[
            {
              cap: 'baseline · 24 px',
              title: 'The recipe, not the kitchen.',
              body: [
                'AI models change; proven workflows do not. Babysitter makes the recipe a first-class artifact: plan, execute, verify, seal.',
                'Every heading sits on the 24px ruling. Body copy sits on it. Captions sit on it. When a measurement disagrees, the measurement is wrong, not the grid.',
              ],
            },
          ]}
        />
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
        <TypeScaleTable
          items={[
            { token: 'display', sample: 'Proof of done', spec: '96 / 1.0 · −.02em' },
            { token: 'h1', sample: 'The loop closes', spec: '72 / 1.02 · −.02em' },
            { token: 'h2', sample: 'Reliable workflows ship', spec: '48 / 1.1 · −.01em' },
            { token: 'h3', sample: 'Gates hold the line', spec: '32 / 1.15 · 0' },
            { token: 'h4', sample: 'Convergence is a promise', spec: '24 / 1.2 · 0' },
            { token: 'lede', sample: 'Run it, prove it, seal it — the marginalia of craft.', spec: '22 / 1.35 italic' },
            { token: 'body', sample: 'Babysitter wraps any coding agent in a convergent loop. You define what done means; the apparatus enforces it.', spec: '17 / 1.62' },
            { token: 'caption', sample: 'fig. iv — the ruby halts all further iteration.', spec: '13 / 1.45 italic' },
          ]}
        />
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">III</span>
          <div>
            <h3>EB Garamond — the body</h3>
            <p>Every long passage lives here. Wide measure, generous leading, pretty wrap, old-style figures.</p>
          </div>
          <span className="mk-codex-meta">prose · β</span>
        </header>
        <TypeProseGrid
          items={[
            {
              title: 'The recipe, not the kitchen',
              lead: 'A manifesto, in three paragraphs.',
              body: [
                <p className="mk-dropcap">AI models change. The useful thing to own is the recipe, stamped and sealed, portable across whatever oven the industry hands you next.</p>,
                <p>Babysitter was written to make those recipes first-class. Every agent call is wrapped in a convergent loop: plan, execute, verify, repeat.</p>,
                <p>The alternative is a demo. A reel. A vibe. Our alternative is the seal.</p>,
              ],
            },
            {
              title: 'Three things are never negotiable',
              lead: 'Gates, determinism, the seal.',
              body: [
                <p>Gates are hard. A failed lint is not a suggestion. A red test is not close enough.</p>,
                <p>Determinism is cultural. Same agent, same plan, same gates, same outcome, or a written reason why not.</p>,
                <p>The seal is issued exactly once per task. Anything less is theater.</p>,
              ],
            },
          ]}
        />
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
        <CodexPlate dark>
          <CodeBlock
            tone="terminal"
            language="bash"
            code={`$ babysitter call "add OAuth to /login"\n↻ planning · iteration 1 of 4 …\n✓ gate · lint — 0 issues\n✓ gate · test — 24 / 24 passing\n⚠ gate · audit — advisory, revising\n⟡ the seal is struck — proof-of-done issued`}
          />
        </CodexPlate>
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
        <TypeAtlasGrid
          items={[
            { name: 'eyebrow', demo: <div className="mk-atlas-demo mk-atlas-demo--mono">Vol. i · Chapter iii</div>, caption: 'JetBrains Mono · 11 · .28em · uppercase' },
            { name: 'folio', demo: <div className="mk-atlas-demo mk-atlas-demo--folio">fol. iii / viii</div>, caption: 'JetBrains Mono · 10 · .3em · uppercase' },
            { name: 'caption', demo: <div className="mk-atlas-demo mk-atlas-demo--caption">fig. iv — the ruby halts all further iteration.</div>, caption: 'EB Garamond italic · 13 · 1.45' },
            { name: 'glyph · string', demo: <div className="mk-atlas-demo mk-atlas-demo--glyph">⟡ ✦ ✧ ◊ ✦ ⟡</div>, caption: 'JetBrains Mono · .3em · decorative rule' },
            { name: 'code · block', demo: <CodeBlock tone="terminal" language="bash" code={`$ babysitter init`} />, caption: 'Reusable code surface · terminal tone' },
            { name: 'chip · label', demo: <div className="mk-atlas-demo"><span className="mk-inline-chip">gate · passed</span></div>, caption: 'JetBrains Mono · 10 · .22em · uppercase' },
          ]}
        />
        <header className="mk-chapter__head mk-chapter__head--wide">
          <span className="mk-chapter__num">VI</span>
          <div>
            <h3>The three correct pairings</h3>
            <p>How the voices sit beside each other. There is no fourth pairing worth discussing.</p>
          </div>
          <span className="mk-codex-meta">pair · τ</span>
        </header>
        <TypePairGrid
          items={[
            {
              tag: 'display · over · body',
              title: 'The recipes are more valuable than the kitchen.',
              body: <p>A short paragraph in EB Garamond sits beneath a Cormorant display. The italic of one answers the upright of the other.</p>,
            },
            {
              tag: 'display · over · mono',
              title: 'Proof of done',
              body: <CodeBlock tone="terminal" language="bash" code={`$ babysitter seal\n// receipt issued · 2048-bit · archive`} />,
            },
          ]}
        />
        <TypePairGrid
          wide
          items={[
            {
              tag: 'eyebrow · over · display',
              aside: <div className="mk-type-pair__eyebrow">chapter iv · convergence</div>,
              title: <span className="mk-type-pair__headline">The loop is the product.</span>,
            },
          ]}
        />
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
    name: 'Seraph Refactor',
    slug: 'seraph-refactor',
    description: 'Illuminated agent-workbench chat for code refactors, terminal traces, and diff review.',
    render: SeraphRefactorSurface,
    sourceLabel: 'provided image reference #1',
  },
  {
    name: 'Seraph Bestiary',
    slug: 'seraph-bestiary',
    description: 'Illuminated research workspace for creature ideation, tool cards, and manuscript-style illustration.',
    render: SeraphBestiarySurface,
    sourceLabel: 'provided image reference #2',
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
  theme?: MockupTheme;
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
  theme,
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
    <section
      className={`mockup-previews ${theme === 'void' ? 'void' : ''}`.trim()}
      data-theme={theme}
      style={style}
    >
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
                <span className="mockup-card__file">reference: {item.sourceLabel ?? `project/preview/${item.slug}.html`}</span>
                <span className="mockup-card__open">reconstructed with tokens + components</span>
              </footer>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
