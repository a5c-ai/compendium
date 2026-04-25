import type { Meta, StoryObj } from '@storybook/react';
import { Button, CodeEditor, Tag } from '../components';
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

const pinnedThreads = [
  {
    mark: '★',
    title: 'Freight claims Oct batch review',
    preview: 'archivist: Six claims flagged against carrier tariff 4.2.',
    when: '14:32',
    current: true,
  },
  {
    mark: '★',
    title: 'Draft: SOC-2 evidence narrative',
    preview: 'scribe-04: Section 3 expanded with gate-verdict citations.',
    when: 'yest.',
  },
] as const;

const todayThreads = [
  {
    mark: '1',
    title: 'Customer escalation r-8840',
    preview: 'concierge-02: Refund exceeds soft-cap and needs policy review.',
    when: '14:17',
  },
  {
    mark: '2',
    title: 'Nightly hygiene fail janitor-01',
    preview: 'auditor-02: Write occurred on protected table prod.customer_events.',
    when: '14:09',
  },
] as const;

const inspectorItems = [
  { label: 'Seated agents', value: 'archivist · verifier-03 · editor-11' },
  { label: 'Tools in scope', value: 'ledger.query · editor.open · carrier.api' },
  { label: 'Run cost', value: '8,412 input · 2,901 output · subtotal $0.049' },
] as const;

const composerAttachments = ['Oct-freight-manifest.csv', 'carrier-tariff.pdf', 'claims-audit.md'] as const;

const meta: Meta = {
  title: 'Motifs/Chat',
  component: ChatShell,
  parameters: {
    layout: 'padded',
  },
  globals: {
    theme: 'void',
  },
};

export default meta;

type Story = StoryObj;

export const WorkspaceScaffold: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
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
          subtitle="Workflow r-8841 › Iteration 5 of 5 › Gate: quality pending"
          tools={
            <>
              <Tag>3 agents seated</Tag>
              <Button variant="ghost">Replay</Button>
              <Button variant="primary">Seal verdict</Button>
            </>
          }
          composer={<ChatComposer attachments={['Oct-freight-manifest.csv']} placeholder="Ask archivist something…" footerLabel="seated · archivist · verifier-03" />}
        >
          <ChatTurn avatar={<ChatAvatar>E</ChatAvatar>} label="Principal" timestamp="14:01" user>
            <ChatMessageBody>
              Walk the October freight-claims batch. Cite the claim IDs and do not make up numbers.
            </ChatMessageBody>
          </ChatTurn>
          <ChatTurn avatar={<ChatAvatar agent>A</ChatAvatar>} label="archivist" timestamp="14:02">
            <ChatMemo
              title="Memo · 01"
              seat="archivist · ledger reconciler"
              timestamp="14:02:11 UTC"
              footnote="Seat 03 · 1.42s · ¢3.8"
              actions={[{ label: 'Reply' }, { label: 'Copy' }, { label: 'Branch' }]}
              body={
                <>
                  <p>Thirty-six are internally consistent. Six need direct carrier follow-up.</p>
                  <ChatBars
                    bars={Array.from({ length: 12 }).map((_, index) => ({ height: 46 + ((index * 13) % 68) }))}
                    caption="Flagged claims cluster on the right tail."
                  />
                  <ChatToolCard
                    title="Tool"
                    meta="ledger.query · rows=6"
                    latency="412ms"
                    body={(
                      <CodeEditor
                        tone="blueprint"
                        language="text"
                        filename="ledger.query"
                        fileMeta="carrier tariff · queue a"
                        status="rows=6 · 412ms"
                        facts={[
                          { label: 'review', value: '6 flagged' },
                          { label: 'confidence', value: 'high', tone: 'success' },
                          { label: 'manual follow-up', value: '2', tone: 'warning' },
                        ]}
                        footer={<><span>workspace · claims/oct</span><span>read-only query</span></>}
                        code={`CLM-10412 · surcharge 18.2% vs tariff 14.0%\nCLM-10477 · weight rounded up one bracket\nCLM-10544 · duplicate line item`}
                      />
                    )}
                  />
                </>
              }
            />
          </ChatTurn>
          <ChatTyping>verifier-03 is reconciling the tariff table. ETA ~4 s.</ChatTyping>
        </ChatWall>
      )}
      inspector={(
        <ChatInspector
          title="Worktree · context"
          items={inspectorItems}
          footer={<><div className="mk-chat-seal">✓</div><p>Not yet sealed · verdict pending</p></>}
        />
      )}
    />
  ),
};

export const RailStates: Story = {
  args: {
    brand: 'Atelier.',
    pinned: pinnedThreads,
    today: todayThreads,
    initial: 'E',
    name: 'Elena Varga',
    role: 'Praxis · Ops',
    budget: '$42.18',
    usage: 'Budget · 71%',
  },
  argTypes: {
    brand: { control: 'text' },
    pinned: { control: 'object' },
    today: { control: 'object' },
    initial: { control: 'text' },
    name: { control: 'text' },
    role: { control: 'text' },
    budget: { control: 'text' },
    usage: { control: 'text' },
  },
  render: (args) => (
    <div style={{ maxWidth: 340 }}>
      <ChatRail
        brand={args.brand ?? 'Atelier.'}
        pinned={args.pinned ?? pinnedThreads}
        today={args.today ?? todayThreads}
        foot={(
          <ChatBudgetFoot
            initial={args.initial ?? 'E'}
            name={args.name ?? 'Elena Varga'}
            role={args.role ?? 'Praxis · Ops'}
            budget={args.budget ?? '$42.18'}
            usage={args.usage ?? 'Budget · 71%'}
          />
        )}
      />
    </div>
  ),
};

export const ConversationParts: Story = {
  args: {
    userMessage: 'Walk the October freight-claims batch and cite every flagged claim.',
    agentMessage: 'Six claims need direct carrier follow-up. The rest reconcile cleanly.',
    memoTitle: 'Memo · 02',
    memoSeat: 'archivist · ledger reconciler',
    memoTimestamp: '14:08:44 UTC',
    toolMeta: 'ledger.query · rows=6',
    toolLatency: '412ms',
  },
  argTypes: {
    userMessage: { control: 'text' },
    agentMessage: { control: 'text' },
    memoTitle: { control: 'text' },
    memoSeat: { control: 'text' },
    memoTimestamp: { control: 'text' },
    toolMeta: { control: 'text' },
    toolLatency: { control: 'text' },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 18, maxWidth: 860 }}>
      <ChatTurn avatar={<ChatAvatar>P</ChatAvatar>} label="Principal" timestamp="14:01" user>
        <ChatMessageBody>{args.userMessage ?? 'Walk the October freight-claims batch and cite every flagged claim.'}</ChatMessageBody>
      </ChatTurn>
      <ChatTurn avatar={<ChatAvatar agent>A</ChatAvatar>} label="archivist" timestamp="14:02">
        <ChatMemo
          title={args.memoTitle ?? 'Memo · 02'}
          seat={args.memoSeat ?? 'archivist · ledger reconciler'}
          timestamp={args.memoTimestamp ?? '14:08:44 UTC'}
          footnote="Seat 03 · 1.42s · ¢3.8"
          actions={[{ label: 'Reply' }, { label: 'Branch' }]}
          body={
            <>
              <p>{args.agentMessage ?? 'Six claims need direct carrier follow-up. The rest reconcile cleanly.'}</p>
              <ChatBars
                bars={Array.from({ length: 9 }).map((_, index) => ({ height: 36 + ((index * 11) % 58) }))}
                caption="Flagged claims cluster on the right tail."
              />
              <ChatToolCard
                title="Tool"
                meta={args.toolMeta ?? 'ledger.query · rows=6'}
                latency={args.toolLatency ?? '412ms'}
                body={(
                  <CodeEditor
                    tone="blueprint"
                    language="text"
                    filename="ledger.query"
                    fileMeta="carrier tariff · queue a"
                    status="rows=6 · 412ms"
                    facts={[
                      { label: 'review', value: '6 flagged' },
                      { label: 'confidence', value: 'high', tone: 'success' },
                    ]}
                    footer={<><span>workspace · claims/oct</span><span>read-only query</span></>}
                    code={`CLM-10412 · surcharge 18.2% vs tariff 14.0%\nCLM-10477 · weight rounded up one bracket\nCLM-10544 · duplicate line item`}
                  />
                )}
              />
            </>
          }
        />
      </ChatTurn>
      <ChatTyping>verifier-03 is reconciling the tariff table. ETA ~4 s.</ChatTyping>
    </div>
  ),
};

export const MemoStates: Story = {
  args: {
    title: 'Memo · 03',
    seat: 'verifier-03 · tariff checker',
    timestamp: '14:11:09 UTC',
    footnote: 'Seat 04 · 0.82s · ¢1.7',
    actionLabels: ['Reply', 'Copy', 'Branch'],
    body: 'The surcharge spike tracks two carriers and one rounding rule.',
  },
  argTypes: {
    title: { control: 'text' },
    seat: { control: 'text' },
    timestamp: { control: 'text' },
    footnote: { control: 'text' },
    actionLabels: { control: 'object' },
    body: { control: 'text' },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 18, maxWidth: 880 }}>
      <ChatMemo
        title={args.title ?? 'Memo · 03'}
        seat={args.seat ?? 'verifier-03 · tariff checker'}
        timestamp={args.timestamp ?? '14:11:09 UTC'}
        footnote={args.footnote ?? 'Seat 04 · 0.82s · ¢1.7'}
        actions={(args.actionLabels ?? ['Reply', 'Copy', 'Branch']).map((label: string, index: number) => ({
          label,
          variant: index === 0 ? 'primary' : 'ghost',
        }))}
        body={<p>{args.body ?? 'The surcharge spike tracks two carriers and one rounding rule.'}</p>}
      />
      <ChatMemo
        title={args.title ?? 'Memo · 03'}
        seat={args.seat ?? 'verifier-03 · tariff checker'}
        timestamp={args.timestamp ?? '14:11:09 UTC'}
        brief
        body={<p>{args.body ?? 'The surcharge spike tracks two carriers and one rounding rule.'}</p>}
      />
    </div>
  ),
};

export const ComposerStates: Story = {
  args: {
    placeholder: 'Ask archivist something…',
    footerLabel: 'seated · archivist · verifier-03',
    attachments: composerAttachments,
  },
  argTypes: {
    placeholder: { control: 'text' },
    footerLabel: { control: 'text' },
    attachments: { control: 'object' },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 18, maxWidth: 860 }}>
      <ChatComposer attachments={[]} placeholder={args.placeholder ?? 'Ask archivist something…'} footerLabel={args.footerLabel ?? 'seated · archivist · verifier-03'} />
      <ChatComposer attachments={[(args.attachments ?? composerAttachments)[0]]} placeholder={args.placeholder ?? 'Ask archivist something…'} footerLabel={args.footerLabel ?? 'seated · archivist · verifier-03'} />
      <ChatComposer attachments={args.attachments ?? composerAttachments} placeholder={args.placeholder ?? 'Ask archivist something…'} footerLabel={args.footerLabel ?? 'seated · archivist · verifier-03'} />
    </div>
  ),
};

export const InspectorDark: Story = {
  args: {
    title: 'Worktree · context',
    items: inspectorItems,
    footerLabel: 'Not yet sealed · verdict pending',
  },
  argTypes: {
    title: { control: 'text' },
    items: { control: 'object' },
    footerLabel: { control: 'text' },
  },
  render: (args) => (
    <div style={{ maxWidth: 340 }}>
      <ChatInspector
        title={args.title ?? 'Worktree · context'}
        items={args.items ?? inspectorItems}
        footer={<><div className="mk-chat-seal">✓</div><p>{args.footerLabel ?? 'Not yet sealed · verdict pending'}</p></>}
      />
    </div>
  ),
};
