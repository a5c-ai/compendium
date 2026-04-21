import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioGroup } from './Radio';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    disabled: { control: 'boolean' },
    defaultValue: { control: 'text' },
  },
  args: {
    options: ['Option A', 'Option B', 'Option C'],
    defaultValue: 'Option A',
    direction: 'vertical',
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
};

export const WithObjects: Story = {
  args: {
    options: [
      { value: 'xs', label: 'Extra Small' },
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large', disabled: true },
    ],
    defaultValue: 'sm',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Vertical</p>
        <RadioGroup
          options={['Apple', 'Banana', 'Cherry']}
          defaultValue="Banana"
          direction="vertical"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Horizontal</p>
        <RadioGroup
          options={['Small', 'Medium', 'Large']}
          defaultValue="Medium"
          direction="horizontal"
        />
      </div>
    </div>
  ),
};
