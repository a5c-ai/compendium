import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';
import {
  GlyphModeForever,
  GlyphModeInteractive,
  GlyphModePlan,
  GlyphModeYolo,
} from '../icons';
import {
  ComponentGaugeRow,
  ComponentGateStrip,
  ComponentGemRow,
  ComponentInstallStrip,
  ComponentModeGrid,
} from './ComponentPrimitives';

const meta: Meta<typeof ComponentModeGrid> = {
  title: 'Mockups/Component Primitives',
  component: ComponentModeGrid,
};

export default meta;
type Story = StoryObj<typeof ComponentModeGrid>;

export const Catalog: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <ComponentModeGrid
        items={[
          { num: '01', name: 'Interactive', icon: <GlyphModeInteractive style={{ width: 44, height: 44 }} />, cmd: '`/call`', description: 'Pause for a human when the apparatus requires judgment.' },
          { num: '02', name: 'Plan', icon: <GlyphModePlan style={{ width: 44, height: 44 }} />, cmd: '`/plan`', description: 'Write the route first, expose tradeoffs, then execute with intent.' },
          { num: '03', name: 'Yolo', icon: <GlyphModeYolo style={{ width: 44, height: 44 }} />, cmd: '`/yolo`', description: 'Non-interactive loop for bounded work that still ends in a proof.' },
          { num: '04', name: 'Forever', icon: <GlyphModeForever style={{ width: 44, height: 44 }} />, cmd: '`/forever`', description: 'Long-running steward that continues to tend the room after first seal.' },
        ]}
      />
      <ComponentGateStrip
        items={[
          { index: 'i', title: 'Plan', body: 'written and accepted', tone: 'pass' },
          { index: 'ii', title: 'Execute', body: 'artifact rendered', tone: 'pass' },
          { index: 'iii', title: 'Verify', body: 'auditor reseated', tone: 'pending' },
          { index: 'iv', title: 'Seal', body: 'proof when convergence holds', tone: 'sealed' },
        ]}
      />
      <ComponentInstallStrip command="npx @a5c/babysitter init" action={<button type="button" className="mk-components-install__copy">Copy</button>} />
      <ComponentGemRow
        seal={<span>gate<br />sealed</span>}
        items={[
          { label: 'topaz · iter', color: 'var(--gem-cyan)' },
          { label: 'amethyst · note', color: '#E23FB4' },
          { label: 'ruby · halt', color: 'var(--gem-ruby)' },
        ]}
      />
      <ComponentGaugeRow
        items={[
          { value: '2k+', top: 'Built-in', bottom: 'processes', needleRotation: 55 },
          { value: '5 min', top: 'Setup', bottom: 'time', needleRotation: -40 },
          { value: '0', top: 'Telemetry', bottom: 'bytes', needleRotation: -170 },
          { value: 'MIT', top: 'License', bottom: '', needleRotation: 90 },
        ]}
      />
      <div>
        <Button variant="primary">Request access</Button>
      </div>
    </div>
  ),
};
