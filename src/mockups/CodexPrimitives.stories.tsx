import type { Meta, StoryObj } from '@storybook/react';
import { Button, Progress, Tag } from '../components';
import { LogoMonogram } from '../icons';
import {
  CodexDashboardBody,
  CodexDashboardChart,
  CodexDashboardColumn,
  CodexDashboardCommandPalette,
  CodexDashboardFeed,
  CodexDashboardGauges,
  CodexDashboardHero,
  CodexDashboardKpis,
  CodexDashboardPanel,
  CodexDashboardRail,
  CodexDashboardSearch,
  CodexDashboardShell,
  CodexDashboardSegmentedControl,
  CodexDashboardStatus,
  CodexDashboardToolbar,
  CodexDocsArticle,
  CodexDocsCallout,
  CodexDocsChapterMark,
  CodexDocsDefinition,
  CodexDocsCodeFigure,
  CodexDocsDefinition,
  CodexDocsFigure,
  CodexDocsMargin,
  CodexDocsShell,
  CodexDocsToc,
  CodexFrame,
} from './CodexPrimitives';

const meta: Meta<typeof CodexFrame> = {
  title: 'Mockups/Codex Primitives',
  component: CodexFrame,
};

export default meta;
type Story = StoryObj<typeof CodexFrame>;

export const DocsShell: Story = {
  render: () => (
    <CodexDocsShell
      runningLeft={<><span className="folio">xii</span><span>Book I · Foundations</span></>}
      title={<>Encyclopedia § <em>of the foundry and its rites</em></>}
      runningRight={<><span>Edition 4.2 · August 2026</span><span>a5c.ai</span></>}
      toc={<CodexDocsToc searchLabel="Search the encyclopedia…" bookLabel="Book I · Foundations" title="Of the Foundry and its Rites" chapters={[{ num: 'III.', title: 'Gates & verdicts', pages: 'pp. 45 – 82', current: true, items: [{ label: 'Convergence · the canonical gate', current: true }, { label: 'Authoring a custom verdict' }] }]} />}
      article={(
        <CodexDocsArticle
          chapterMark={<CodexDocsChapterMark num="III." subtitle="Chapter III · Section 2" context="Book I · Foundations · Gates & verdicts" readingTime="Reading · 14 min" />}
          title={<>Convergence — <em>the canonical gate</em></>}
          lead="A decision, in writing, about whether a run has produced something worth sealing."
          meta={<><Tag>Stable since 3.0</Tag><span>Last revised · 2026-08-12</span></>}
        >
          <p>Every run ends with a written verdict.</p>
          <CodexDocsDefinition>
            <p>Convergence is a written determination by a non-producing agent that a second independent agent would land on the same salient answer.</p>
          </CodexDocsDefinition>
          <CodexDocsFigure label="FIG. 3-2 · editor → artefact → verifier → human" />
          <CodexDocsCallout body={<><strong>If the manifest is silent on the question, defer.</strong><p>Agents that guess past criteria are drift.</p></>} action={<Button variant="ghost">Chap. VI</Button>} />
          <CodexDocsCodeFigure
            label="FIG. 3-3 · canonical verdict object"
            title="Canonical Gate"
            meta="verdict.example.ts"
            language="ts"
            code={`export const verdict = {\n  decision: "defer",\n  reason: "manifest is silent on pricing policy",\n  nextStep: "summon human reviewer",\n};`}
          />
        </CodexDocsArticle>
      )}
      margin={<CodexDocsMargin sections={[{ title: 'On this page', items: [<a className="current">§ 2 The four verdicts</a>] }]} />}
    />
  ),
};

export const DocsCodeFigure: Story = {
  render: () => (
    <div style={{ padding: 24, background: '#f2ecdf' }}>
      <CodexDocsCodeFigure
        label="FIG. 1-1 · replay-worktree payload"
        title="Replay Payload"
        meta="payload.json"
        language="json"
        code={`{\n  "runId": "r-8842",\n  "decision": "iterate",\n  "nextStep": "open replay worktree",\n  "requestedBy": "verifier-03"\n}`}
      />
    </div>
  ),
};

export const DashboardShell: Story = {
  render: () => (
    <CodexDashboardShell
      rail={<CodexDashboardRail brand={<><LogoMonogram style={{ width: 28, height: 28 }} /><strong>a·5·c·ai</strong></>} sections={[{ title: 'Foundry', items: [{ label: 'Overview', current: true }, { label: 'Ledger' }] }]} />}
      header={<CodexDashboardHero crumbs="Foundry › Praxis Collective › Overview" title={<>Overview of <em>yesterday&apos;s convergence</em></>} body="A plain-spoken ledger of every agent conversation and replay." dim={<><span /><i>14 AUG 2026 · UTC</i><span /></>} actions={<><CodexDashboardStatus>Live · reconciled 14:32 UTC</CodexDashboardStatus><div><Button variant="ghost">Export</Button><Button variant="primary">New run</Button></div></>} />}
      tools={<CodexDashboardToolbar segments={<CodexDashboardSegmentedControl items={[{ label: '24 hr', current: true }, { label: '7 d' }]} />} filters={<><Tag>Tenant: Praxis Co.</Tag></>} search={<CodexDashboardSearch label="Search runs…" shortcut="⌘K" />} />}
      body={<CodexDashboardBody><CodexDashboardColumn><CodexDashboardKpis items={[{ label: 'Convergence rate', value: '94.2%', delta: '▲ 2.4' }]} /><CodexDashboardPanel className="mk-dashboard__chart mk-dashboard__chart--bp" headIndex="I." title="Run timeline & gate verdicts"><CodexDashboardChart bars={[120, 140, 110, 150, 170, 132]} /></CodexDashboardPanel></CodexDashboardColumn><CodexDashboardColumn side><CodexDashboardPanel className="mk-dashboard__gauge-panel" title="III. Seat pool · utilisation"><CodexDashboardGauges items={[{ label: 'Editor', value: '72%', meter: <Progress value={72} /> }, { label: 'Verifier', value: '48%', meter: <Progress value={48} /> }]} /></CodexDashboardPanel><CodexDashboardPanel className="mk-dashboard__feed" title="IV. Activity · last hour"><CodexDashboardFeed items={[{ index: '01', body: <><strong>verifier-03</strong> sealed `r-8842` with PASS.</>, timestamp: '14:28' }]} /></CodexDashboardPanel><CodexDashboardCommandPalette icon="⌕" title="reseat janitor-01" shortcut="⌘K" items={[{ label: 'Reseat janitor-01 with read-only warehouse key', current: true }]} /></CodexDashboardColumn></CodexDashboardBody>}
    />
  ),
};
