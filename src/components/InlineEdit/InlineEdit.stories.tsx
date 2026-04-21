import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { InlineEdit } from './InlineEdit';

const meta = {
  title: 'Components/InlineEdit',
  component: InlineEdit,
  argTypes: {
    defaultValue: { control: 'text' },
    placeholder:  { control: 'text' },
  },
  args: {
    defaultValue: 'Untitled document',
    placeholder:  'Click to edit…',
  },
} satisfies Meta<typeof InlineEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { defaultValue: '', placeholder: 'Enter a title…' },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('My project name');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <InlineEdit value={value} onChange={setValue} placeholder="Project name" />
        <p style={{ margin: 0, fontSize: 12 }}>Current value: <strong>{value || '(empty)'}</strong></p>
      </div>
    );
  },
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8, fontSize: 20 }}>
        <InlineEdit defaultValue="My Dashboard" placeholder="Dashboard name" />
      </h2>
      <p style={{ margin: 0, fontSize: 13 }}>
        Description:{' '}
        <InlineEdit defaultValue="A helpful overview of your data." placeholder="Add a description…" />
      </p>
    </div>
  ),
};
