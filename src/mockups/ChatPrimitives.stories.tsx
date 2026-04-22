import type { Meta, StoryObj } from '@storybook/react';
import { Button, CodeEditor, Tag } from '../components';
import {
  ChatAvatar,
  ChatBudgetFoot,
  ChatComposer,
  ChatInspector,
  ChatMemo,
  ChatMessageBody,
  ChatRail,
  ChatShell,
  ChatTurn,
  ChatTyping,
  ChatWall,
} from './ChatPrimitives';

const meta: Meta<typeof ChatShell> = {
  title: 'Mockups/Chat Primitives',
  component: ChatShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ChatShell>;

export const WorkspaceScaffold: Story = {
  render: () => (
    <ChatShell
      rail={(
        <ChatRail
          brand="Atelier."
          pinned={[
            { mark: '★', title: 'Freight claims · Oct batch review', preview: 'archivist: Six claims flagged against carrier tariff §4.2.', when: '14:32', current: true },
            { mark: '★', title: 'Draft: SOC-2 evidence narrative', preview: 'scribe-04: Section 3 expanded with gate-verdict citations.', when: 'yest.' },
          ]}
          today={[
            { mark: '1', title: 'Customer escalation r-8840', preview: 'concierge-02: Refund exceeds soft-cap; requires policy review.', when: '14:17' },
            { mark: '2', title: 'Nightly hygiene FAIL · janitor-01', preview: 'auditor-02: Write occurred on protected table prod.customer_events.', when: '14:09' },
          ]}
          foot={<ChatBudgetFoot initial="E" name="Elena Varga" role="Praxis · Ops" budget="$42.18" usage="Budget · 71%" />}
        />
      )}
      wall={(
        <ChatWall
          title={<>Freight claims <em>Oct batch review</em></>}
          subtitle="Workflow r-8841 › Iteration 5 of 5 › Gate: quality · pending"
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
                  <CodeEditor
                    tone="blueprint"
                    language="text"
                    filename="ledger.query"
                    status="rows=6 · 412ms"
                    code={`CLM-10412 · surcharge 18.2% vs tariff 14.0%\nCLM-10477 · weight rounded up one bracket\nCLM-10544 · duplicate line item`}
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
          items={[
            { label: 'Seated agents', value: 'archivist · verifier-03 · editor-11' },
            { label: 'Tools in scope', value: 'ledger.query · editor.open · carrier.api' },
            { label: 'Run cost', value: '8,412 input · 2,901 output · subtotal $0.049' },
          ]}
          footer={<><div className="mk-chat-seal">✓</div><p>Not yet sealed · verdict pending</p></>}
        />
      )}
    />
  ),
};
