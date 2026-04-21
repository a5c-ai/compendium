import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    text:      { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom'] },
    delay:     { control: { type: 'number' } },
  },
  args: {
    text: 'Helpful information here',
    placement: 'top',
    delay: 250,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { placement: 'bottom', text: 'Appears below' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover for bottom tooltip</Button>
    </Tooltip>
  ),
};

export const LongText: Story = {
  args: { text: 'This is a longer tooltip with more context about what the button does.' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primary">More info</Button>
    </Tooltip>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Tooltip text="Save your work" placement="top">
        <Button>Save</Button>
      </Tooltip>
      <Tooltip text="Undo the last action" placement="top">
        <Button variant="ghost">Undo</Button>
      </Tooltip>
      <Tooltip text="Permanently delete this item" placement="bottom">
        <Button>Delete</Button>
      </Tooltip>
    </div>
  ),
};
