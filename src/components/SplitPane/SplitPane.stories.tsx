import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SplitPane } from './SplitPane';

const meta = {
  title: 'Components/SplitPane',
  component: SplitPane,
  argTypes: {
    defaultSplit: { control: { type: 'range', min: 10, max: 90, step: 5 } },
    minLeft:      { control: { type: 'number' } },
    minRight:     { control: { type: 'number' } },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    defaultSplit: 50,
    minLeft: 10,
    minRight: 10,
    direction: 'horizontal',
    left:  <div style={{ padding: 16 }}><p>Left / Top panel</p><p>Drag the divider to resize.</p></div>,
    right: <div style={{ padding: 16 }}><p>Right / Bottom panel</p></div>,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ height: 360, border: '1px solid var(--tkc-rule-m, #ddd)', borderRadius: 8, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SplitPane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    left:  <div style={{ padding: 16 }}><p>Top panel</p></div>,
    right: <div style={{ padding: 16 }}><p>Bottom panel</p></div>,
  },
};

export const AsymmetricSplit: Story = {
  args: { defaultSplit: 30 },
};

export const CodeEditorLayout: Story = {
  render: () => (
    <SplitPane
      defaultSplit={25}
      direction="horizontal"
      left={
        <div style={{ padding: 12, fontFamily: 'monospace', fontSize: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Files</div>
          {['index.ts', 'Button.tsx', 'Input.tsx', 'Modal.tsx'].map((f) => (
            <div key={f} style={{ padding: '4px 8px', cursor: 'pointer' }}>{f}</div>
          ))}
        </div>
      }
      right={
        <div style={{ padding: 16, fontFamily: 'monospace', fontSize: 13 }}>
          <pre style={{ margin: 0 }}>{`import React from 'react';\n\nexport const Button = () => (\n  <button>Click me</button>\n);`}</pre>
        </div>
      }
    />
  ),
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ height: 320, border: '1px solid var(--tkc-rule-m, #ddd)', borderRadius: 8, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};
