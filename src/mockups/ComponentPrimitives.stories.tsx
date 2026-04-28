import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';
import {
  GlyphModeForever,
  GlyphModeInteractive,
  GlyphModePlan,
  GlyphModeYolo,
} from '../icons';
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

const modeItems = [
  {
    num: '01',
    name: 'Interactive',
    icon: <GlyphModeInteractive style={{ width: 44, height: 44 }} />,
    cmd: '`/call`',
    description: 'Pause for a human when the apparatus requires judgment.',
  },
  {
    num: '02',
    name: 'Plan',
    icon: <GlyphModePlan style={{ width: 44, height: 44 }} />,
    cmd: '`/plan`',
    description: 'Write the route first, expose tradeoffs, then execute with intent.',
  },
  {
    num: '03',
    name: 'Yolo',
    icon: <GlyphModeYolo style={{ width: 44, height: 44 }} />,
    cmd: '`/yolo`',
    description: 'Non-interactive loop for bounded work that still ends in a proof.',
  },
  {
    num: '04',
    name: 'Forever',
    icon: <GlyphModeForever style={{ width: 44, height: 44 }} />,
    cmd: '`/forever`',
    description: 'Long-running steward that continues to tend the room after first seal.',
  },
] as const;

const navLinks = [
  { label: 'Product', current: true },
  { label: 'Workflow' },
  { label: 'Enterprise' },
  { label: 'Docs' },
] as const;

const gateItems = [
  { index: 'i', title: 'Plan', body: 'written and accepted', tone: 'pass' as const },
  { index: 'ii', title: 'Execute', body: 'artifact rendered', tone: 'pass' as const },
  { index: 'iii', title: 'Verify', body: 'auditor reseated', tone: 'pending' as const },
  { index: 'iv', title: 'Seal', body: 'proof when convergence holds', tone: 'sealed' as const },
] as const;

const chipItems = [
  { label: 'v0.12.1' },
  { label: 'MIT licensed' },
  { label: 'gate passed' },
  { label: 'in review' },
  { label: 'iterating' },
] as const;

const gemItems = [
  { label: 'topaz iter', color: 'var(--gem-cyan)' },
  { label: 'amethyst note', color: '#E23FB4' },
  { label: 'ruby halt', color: 'var(--gem-ruby)' },
] as const;

const gaugeItems = [
  { value: '2k+', top: 'Built-in', bottom: 'processes', needleRotation: 55 },
  { value: '5 min', top: 'Setup', bottom: 'time', needleRotation: -40 },
  { value: '0', top: 'Telemetry', bottom: 'bytes', needleRotation: -170 },
  { value: 'MIT', top: 'License', bottom: '', needleRotation: 90 },
] as const;

const tabItems = [
  {
    value: 'nav',
    label: 'Navigation',
    body: 'Primary navigation with engraved brass hierarchy and a strong centerline.',
  },
  {
    value: 'controls',
    label: 'Controls',
    body: 'Buttons, chips, inputs, and commands belong to one measured register.',
  },
  {
    value: 'gate',
    label: 'Gate Strip',
    body: 'Status stays prose first. The visual is only there to carry the written verdict.',
  },
] as const;

const meta: Meta = {
  title: 'Motifs/Component System',
  component: ComponentModeGrid,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const ModeGrid: Story = {
  args: {
    items: modeItems,
  },
  argTypes: {
    items: { control: 'object' },
  },
  render: (args) => <ComponentModeGrid items={args.items ?? modeItems} />,
};

export const NavigationAndGates: Story = {
  args: {
    brandLabel: 'a5c.ai',
    links: navLinks,
    gateItems,
    primaryActionLabel: 'Request access',
    secondaryActionLabel: 'Stable',
  },
  argTypes: {
    brandLabel: { control: 'text' },
    links: { control: 'object' },
    gateItems: { control: 'object' },
    primaryActionLabel: { control: 'text' },
    secondaryActionLabel: { control: 'text' },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 20 }}>
      <ComponentNavBar
        brand={(
          <>
            <span style={{ fontSize: 24 }}>✺</span>
            <strong>{args.brandLabel ?? 'a5c.ai'}</strong>
          </>
        )}
        links={args.links ?? navLinks}
        action={(
          <>
            <Button variant="ghost">{args.secondaryActionLabel ?? 'Stable'}</Button>
            <Button variant="primary">{args.primaryActionLabel ?? 'Request access'}</Button>
          </>
        )}
      />
      <ComponentGateStrip items={args.gateItems ?? gateItems} />
    </div>
  ),
};

export const InstallAndChips: Story = {
  args: {
    command: 'npx @a5c/babysitter init',
    copyLabel: 'Copy',
    items: chipItems,
  },
  argTypes: {
    command: { control: 'text' },
    copyLabel: { control: 'text' },
    items: { control: 'object' },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 20 }}>
      <ComponentInstallStrip
        command={args.command ?? 'npx @a5c/babysitter init'}
        action={(
          <button type="button" className="mk-components-install__copy">
            {args.copyLabel ?? 'Copy'}
          </button>
        )}
      />
      <ComponentChipBoard items={args.items ?? chipItems} />
    </div>
  ),
};

export const GemAndGaugeReadouts: Story = {
  args: {
    sealLabel: 'gate sealed',
    gemItems,
    gaugeItems,
  },
  argTypes: {
    sealLabel: { control: 'text' },
    gemItems: { control: 'object' },
    gaugeItems: { control: 'object' },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <ComponentGemRow
        seal={(
          <span>
            {(args.sealLabel ?? 'gate sealed').split(' ').join('\n')}
          </span>
        )}
        items={args.gemItems ?? gemItems}
      />
      <ComponentGaugeRow items={args.gaugeItems ?? gaugeItems} />
    </div>
  ),
};

export const NarrativeTabs: Story = {
  args: {
    defaultValue: 'nav',
    items: tabItems,
  },
  argTypes: {
    defaultValue: { control: 'text' },
    items: { control: 'object' },
  },
  render: (args) => (
    <ComponentTabNarrative
      defaultValue={args.defaultValue ?? 'nav'}
      items={(args.items ?? tabItems).map((item: { value: string; label: string; body: string }) => ({
        value: item.value,
        label: item.label,
        body: <>{item.body}</>,
      }))}
    />
  ),
};

export const Catalog: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <ComponentModeGrid items={modeItems} />
      <ComponentNavBar
        brand={<><span style={{ fontSize: 24 }}>✺</span><strong>a5c.ai</strong></>}
        links={navLinks}
        action={<><Button variant="ghost">Stable</Button><Button variant="primary">Request access</Button></>}
      />
      <ComponentGateStrip items={gateItems} />
      <ComponentChipBoard items={chipItems} />
      <ComponentInstallStrip command="npx @a5c/babysitter init" action={<button type="button" className="mk-components-install__copy">Copy</button>} />
      <ComponentGemRow
        seal={<span>gate<br />sealed</span>}
        items={gemItems}
      />
      <ComponentGaugeRow items={gaugeItems} />
      <ComponentTabNarrative
        defaultValue="nav"
        items={tabItems.map((item) => ({
          value: item.value,
          label: item.label,
          body: <>{item.body}</>,
        }))}
      />
    </div>
  ),
};
