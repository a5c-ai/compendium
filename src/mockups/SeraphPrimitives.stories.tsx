import type { Meta, StoryObj } from '@storybook/react';
import {
  SeraphAside,
  SeraphCard,
  SeraphComposer,
  SeraphCrest,
  SeraphFolioBorder,
  SeraphMarginNote,
  SeraphPromptBar,
  SeraphSidebar,
  SeraphSummaryRow,
  SeraphTask,
  SeraphWindow,
} from './SeraphPrimitives';

const meta: Meta<typeof SeraphWindow> = {
  title: 'Mockups/Seraph Primitives',
  component: SeraphWindow,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SeraphWindow>;

export const WindowScaffold: Story = {
  render: () => (
    <SeraphWindow>
      <SeraphSidebar
        rail={{ sigil: '✺', topTotemClass: 'mk-seraph__totem--serpent', bottomTotemClass: 'mk-seraph__totem--relic', caption: 'folio · vii' }}
        crest={<SeraphCrest />}
        threads={[
          { title: 'Auth middleware refactor', subtitle: 'Refactor, tracing, tests', when: '10:42 AM', current: true },
          { title: 'Fix flaky tests', subtitle: 'Investigate & stabilize', when: '9:18 AM' },
          { title: 'Deploy review', subtitle: 'Staging → Production', when: 'Yesterday' },
        ]}
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
        <SeraphSummaryRow
          items={[
            { eyebrow: 'gate · i', title: 'Tests', body: '12 passed, 12 total', iconClass: 'mk-seraph__icon--torch' },
            { eyebrow: 'gate · ii', title: 'Lint', body: 'No problems found', iconClass: 'mk-seraph__icon--totem' },
            { eyebrow: 'gate · iii', title: 'Summary', body: 'Composable summary cards for page footers.', iconClass: 'mk-seraph__icon--lizard' },
          ]}
        />
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

export const ComposerOnly: Story = {
  render: () => (
    <div data-theme="void" className="void" style={{ padding: 24, background: '#0B0A0F' }}>
      <SeraphComposer
        placeholder="Dark-mode composer validation surface…"
        tools={['Web Search', 'Code Runner', 'Image Tool', 'Calendar']}
      />
    </div>
  ),
};
