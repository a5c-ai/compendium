import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stepper } from './Stepper';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  argTypes: {
    defaultValue: { control: { type: 'number' } },
    min:          { control: { type: 'number' } },
    max:          { control: { type: 'number' } },
    step:         { control: { type: 'number' } },
  },
  args: {
    defaultValue: 0,
    step: 1,
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBounds: Story = {
  args: {
    defaultValue: 5,
    min: 0,
    max: 10,
  },
};

export const Stepped: Story = {
  args: {
    defaultValue: 0,
    step: 5,
    min: -50,
    max: 50,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 4 }}>Default (no bounds)</p>
        <Stepper defaultValue={0} />
      </div>
      <div>
        <p style={{ marginBottom: 4 }}>Bounded 0–10</p>
        <Stepper defaultValue={5} min={0} max={10} />
      </div>
      <div>
        <p style={{ marginBottom: 4 }}>Step by 0.5</p>
        <Stepper defaultValue={1} step={0.5} min={0} max={5} />
      </div>
    </div>
  ),
};
