import type { Meta, StoryObj } from '@storybook/react';
import {
  SeraphAside,
  SeraphCard,
  SeraphComposer,
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
        rail={{ sigil: '✺', topTotemClass: 'mk-seraph__totem--serpent', bottomTotemClass: 'mk-seraph__totem--relic' }}
        crest={<div className="mk-seraph__crest"><div className="mk-seraph__sun" /><div className="mk-seraph__vine" /></div>}
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
          <SeraphCard title="Repository Inspection" status="Completed" ornament={<div className="mk-seraph__sprout" />}>
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
          title="Task Section"
          status="Completed"
          leading={<><p>Leading copy block</p><small>Configurable detail</small></>}
          body={<ul><li>Reusable item one</li><li>Reusable item two</li></ul>}
          ornament={<div className="mk-seraph__flora mk-seraph__flora--bells" />}
        />
        <SeraphSummaryRow
          items={[
            { title: 'Tests', body: '12 passed, 12 total', iconClass: 'mk-seraph__icon--torch' },
            { title: 'Lint', body: 'No problems found', iconClass: 'mk-seraph__icon--totem' },
            { title: 'Summary', body: 'Composable summary cards for page footers.', iconClass: 'mk-seraph__icon--lizard' },
          ]}
        />
        <SeraphComposer placeholder="Compose from a reusable footer…" tools={['Web Search', 'Bash', 'Diff']} />
        <div className="mk-seraph__folio-border" />
      </main>
      <SeraphAside
        scribbles={['ᚠ ᚨ ᚦ ᚱ ᚲ ᚷ', '⟐ ⟡ ⊹ ⊹ ⟡ ⟐', 'ᚷ ᚲ ᚱ ᚦ ᚨ ᚠ']}
        plantClass="mk-seraph__plant--circuit"
      />
    </SeraphWindow>
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
