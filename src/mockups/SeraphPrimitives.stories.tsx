import type { Meta, StoryObj } from '@storybook/react';
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

const threads = [
  { title: 'Auth middleware refactor', subtitle: 'Refactor, tracing, tests', when: '10:42 AM', current: true },
  { title: 'Fix flaky tests', subtitle: 'Investigate and stabilize', when: '9:18 AM' },
  { title: 'Deploy review', subtitle: 'Staging to production', when: 'Yesterday' },
] as const;

const summaryItems = [
  { title: 'Tests', body: '12 passed, 12 total', iconClass: 'mk-seraph__icon--torch' },
  { title: 'Lint', body: 'No problems found', iconClass: 'mk-seraph__icon--totem' },
  { title: 'Summary', body: 'Composable summary cards for page footers.', iconClass: 'mk-seraph__icon--lizard' },
] as const;

const meta: Meta = {
  title: 'Motifs/Seraph',
  component: SeraphWindow,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const WindowScaffold: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <SeraphWindow>
      <SeraphSidebar
        rail={{ sigil: '✺', topTotemClass: 'mk-seraph__totem--serpent', bottomTotemClass: 'mk-seraph__totem--relic', caption: 'folio · vii' }}
        crest={<SeraphCrest />}
        threads={threads}
        medallion="✺"
        planTitle="Pro Plan"
        planSubtitle="Codex Seraphinianus"
      />
      <main className="mk-seraph__main">
        <SeraphPromptBar
          seal="✺"
          time="10:42 AM"
          prompt="Reusable prompt bar with configurable seal, copy, and timestamp."
        />
        <div className="mk-seraph__cards">
          <SeraphCard eyebrow="Inspection · I" title="Repository Inspection" status="Completed" footer="Scaffolded as a reusable manuscript card." ornament={<div className="mk-seraph__sprout" />}>
            <p>Scanned project files and dependencies.</p>
            <small>Files scanned: 214 · Language: TypeScript</small>
          </SeraphCard>
          <SeraphCard eyebrow="Inventory · II" title="Key Files Found" tone="botanic" footer="Footer copy is configurable too." ornament={<div className="mk-seraph__sprout mk-seraph__sprout--small" />}>
            <ul>
              <li>`src/middleware/auth.ts`</li>
              <li>`src/lib/requestTracing.ts`</li>
              <li>`tests/auth.test.ts`</li>
            </ul>
          </SeraphCard>
        </div>
        <SeraphTask
          eyebrow="Task register"
          title="Task Section"
          status="Completed"
          leading={<><p>Leading copy block</p><small>Configurable detail</small></>}
          body={<ul><li>Reusable item one</li><li>Reusable item two</li></ul>}
          footer="Task cards can carry a manuscript footnote."
          ornament={<div className="mk-seraph__flora mk-seraph__flora--bells" />}
        />
        <div className="mk-seraph__margin-row">
          <SeraphMarginNote
            eyebrow="Marginalia"
            title="Margin note"
            body={<p>Reusable side-note primitive for fidelity-heavy manuscript layouts.</p>}
            ornament={<div className="mk-seraph__icon mk-seraph__icon--vine" />}
          />
        </div>
        <SeraphSummaryRow items={summaryItems} />
        <SeraphComposer placeholder="Compose from a reusable footer…" tools={['Web Search', 'Bash', 'Diff']} />
        <SeraphFolioBorder />
      </main>
      <SeraphAside
        scribbles={['ᚠ ᚨ ᚦ ᚱ ᚲ ᚷ', '⟐ ⟡ ⊹ ⊹ ⟡ ⟐', 'ᚷ ᚲ ᚱ ᚦ ᚨ ᚠ']}
        plantClass="mk-seraph__plant--circuit"
      />
    </SeraphWindow>
  ),
};

export const SidebarPlayground: Story = {
  args: {
    sectionTitle: 'Today',
    threads,
    medallion: '✺',
    planTitle: 'Pro Plan',
    planSubtitle: 'Codex Seraphinianus',
    searchShortcut: '⌘K',
  },
  argTypes: {
    sectionTitle: { control: 'text' },
    threads: { control: 'object' },
    medallion: { control: 'text' },
    planTitle: { control: 'text' },
    planSubtitle: { control: 'text' },
    searchShortcut: { control: 'text' },
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <SeraphSidebar
        rail={{ sigil: '✺', topTotemClass: 'mk-seraph__totem--serpent', bottomTotemClass: 'mk-seraph__totem--relic' }}
        crest={<SeraphCrest />}
        sectionTitle={args.sectionTitle ?? 'Today'}
        threads={args.threads ?? threads}
        medallion={args.medallion ?? '✺'}
        planTitle={args.planTitle ?? 'Pro Plan'}
        planSubtitle={args.planSubtitle ?? 'Codex Seraphinianus'}
        searchShortcut={args.searchShortcut ?? '⌘K'}
      />
    </div>
  ),
};

export const PromptAndCrest: Story = {
  args: {
    seal: '✺',
    prompt: 'Reusable prompt bar with configurable seal, copy, and timestamp.',
    time: '10:42 AM',
    sunClass: 'mk-seraph__sun--eclipse',
  },
  argTypes: {
    seal: { control: 'text' },
    prompt: { control: 'text' },
    time: { control: 'text' },
    sunClass: { control: 'text' },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 20 }}>
      <SeraphCrest sunClass={args.sunClass ?? 'mk-seraph__sun--eclipse'} />
      <SeraphPromptBar
        seal={args.seal ?? '✺'}
        prompt={args.prompt ?? 'Reusable prompt bar with configurable seal, copy, and timestamp.'}
        time={args.time ?? '10:42 AM'}
      />
    </div>
  ),
};

export const CardsAndTaskStates: Story = {
  args: {
    cardTitle: 'Repository Inspection',
    cardStatus: 'Completed',
    taskTitle: 'Task Section',
    taskStatus: 'Pending',
  },
  argTypes: {
    cardTitle: { control: 'text' },
    cardStatus: { control: 'text' },
    taskTitle: { control: 'text' },
    taskStatus: { control: 'text' },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 20 }}>
      <div className="mk-seraph__cards">
        <SeraphCard title={args.cardTitle ?? 'Repository Inspection'} status={args.cardStatus ?? 'Completed'} ornament={<div className="mk-seraph__sprout" />}>
          <p>Scanned project files and dependencies.</p>
          <small>Files scanned: 214 · Language: TypeScript</small>
        </SeraphCard>
        <SeraphCard title="Key Files Found" ornament={<div className="mk-seraph__sprout mk-seraph__sprout--small" />}>
          <ul>
            <li>`src/middleware/auth.ts`</li>
            <li>`src/lib/requestTracing.ts`</li>
            <li>`tests/auth.test.ts`</li>
          </ul>
        </SeraphCard>
      </div>
      <SeraphTask
        title={args.taskTitle ?? 'Task Section'}
        status={args.taskStatus ?? 'Pending'}
        leading={<><p>Leading copy block</p><small>Configurable detail</small></>}
        body={<ul><li>Reusable item one</li><li>Reusable item two</li></ul>}
        ornament={<div className="mk-seraph__flora mk-seraph__flora--bells" />}
      />
    </div>
  ),
};

export const SummaryAndOrnaments: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <SeraphSummaryRow items={summaryItems} />
      <div style={{ minHeight: 320, position: 'relative' }}>
        <SeraphAside
          scribbles={['ᚠ ᚨ ᚦ ᚱ ᚲ ᚷ', '⟐ ⟡ ⊹ ⊹ ⟡ ⟐', 'ᚷ ᚲ ᚱ ᚦ ᚨ ᚠ']}
          plantClass="mk-seraph__plant--circuit"
        />
      </div>
      <SeraphFolioBorder />
    </div>
  ),
};

export const MarginAndBorders: Story = {
  render: () => (
    <div style={{ padding: 24, background: '#efe3cc' }}>
      <div className="mk-seraph__task-stack" style={{ maxWidth: 720 }}>
        <SeraphMarginNote
          eyebrow="Marginalia · i"
          title="Margin note"
          body={<p>Use for small illuminated annotations, glossary panels, and manuscript asides.</p>}
          ornament={<div className="mk-seraph__icon mk-seraph__icon--totem" />}
        />
        <SeraphFolioBorder />
        <SeraphFolioBorder variant="orb" />
      </div>
    </div>
  ),
};

export const KitMotifs: Story = {
  render: () => (
    <div style={{ padding: 24, background: '#efe3cc', display: 'grid', gap: 16 }}>
      <SeraphHeroPlate
        eyebrow="Hero plate"
        title={<>A reusable <em>opening slab</em>.</>}
        body={<p>Use for page commissions, specimen summaries, and illuminated openings that need stronger hierarchy than a plain prompt bar.</p>}
        aside={<div className="mk-seraph__hero-seal">✺<small>folio start</small></div>}
      />
      <SeraphDivider label="divider register" />
      <SeraphSectionPlate eyebrow="Section plate" title="Bound notebook section" meta="framed + reusable">
        <p style={{ margin: 0 }}>This plate houses denser subsections such as diffs, traces, or notebook stacks while keeping the page rhythm consistent.</p>
      </SeraphSectionPlate>
      <SeraphDivider label="orb divider" variant="orb" />
      <SeraphHeroPlate
        eyebrow="Orb tone"
        title={<>A second <em>hero treatment</em>.</>}
        body={<p>Use for bestiary, atlas, and more mystical surfaces that need a colder focal accent and a distinct badge treatment.</p>}
        aside={<div className="mk-seraph__hero-seal mk-seraph__hero-seal--orb">☉<small>atlas</small></div>}
        tone="orb"
      />
    </div>
  ),
};

export const HeroFrameCalibration: Story = {
  render: () => (
    <div style={{ padding: 24, background: '#efe3cc', display: 'grid', gap: 18 }}>
      <SeraphHeroPlate
        eyebrow="Calibration"
        title={<>Hero and frame <em>language</em>.</>}
        body={<p>This isolates the heading slab, divider rhythm, and marginal frame balance so the Seraph kit can be reused in new flows without copying the full page compositions.</p>}
        aside={<div className="mk-seraph__hero-seal">✺<small>calibration</small></div>}
      />
      <SeraphDivider label="frame rhythm" />
      <div className="mk-seraph__margin-row">
        <SeraphMarginNote
          eyebrow="Margin"
          title="Left gloss"
          body={<p>Use for clarifying notes, evidence glosses, or editorial sidebars.</p>}
          ornament={<div className="mk-seraph__icon mk-seraph__icon--vine" />}
        />
        <SeraphMarginNote
          eyebrow="Frame"
          title="Right gloss"
          body={<p>Use for secondary explanations that should still sit inside the illuminated system.</p>}
          ornament={<div className="mk-seraph__icon mk-seraph__icon--totem" />}
        />
      </div>
      <SeraphFolioBorder />
    </div>
  ),
};

export const SpecimenPlateMotif: Story = {
  render: () => (
    <div style={{ padding: 24, background: '#efe3cc', display: 'grid', gap: 18 }}>
      <SeraphSectionPlate eyebrow="Specimen motif" title="Dominant illuminated artifact" meta="bestiary + atlas">
        <SeraphSpecimenPlate
          eyebrow="specimen · dominant plate"
          title="Mirage stalker"
          description="A reusable manuscript specimen surface for bestiary, atlas, and editorial artifact-first layouts."
          glossEyebrow="illumination register"
          gloss={<p>Side view · desert folio · colder teal anatomy</p>}
        >
          <div className="mk-seraph__creature mk-seraph__creature--hero">
            <div className="mk-seraph__creature-body mk-seraph__creature-body--hero" />
          </div>
        </SeraphSpecimenPlate>
      </SeraphSectionPlate>
      <SeraphFolioBorder variant="orb" />
    </div>
  ),
};

export const LedgerVariants: Story = {
  render: () => {
    const items = [
      { eyebrow: 'gate · i', title: 'Tests / Validation', body: '12 passed, 12 total · Coverage: 92%', iconClass: 'mk-seraph__icon--torch' },
      { eyebrow: 'gate · ii', title: 'Lint', body: 'No problems found', iconClass: 'mk-seraph__icon--totem' },
      { eyebrow: 'gate · iii', title: 'Type Check', body: 'No type errors', iconClass: 'mk-seraph__icon--vine' },
      { eyebrow: 'seal · note', title: 'Summary', body: 'Reusable ledger cadence for footers and proof bands.', iconClass: 'mk-seraph__icon--lizard' },
    ] as const;

    return (
      <div style={{ padding: 24, background: '#efe3cc', display: 'grid', gap: 20 }}>
        <SeraphSummaryRow items={items} />
        <SeraphSummaryRow items={items} variant="staggered" />
      </div>
    );
  },
};

export const ComposerDark: Story = {
  globals: {
    theme: 'void',
  },
  render: () => (
    <div data-theme="void" className="void" style={{ padding: 24, background: '#0B0A0F' }}>
      <SeraphComposer
        placeholder="Dark-mode composer validation surface…"
        tools={['Web Search', 'Code Runner', 'Image Tool', 'Calendar']}
      />
    </div>
  ),
};
