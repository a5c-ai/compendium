import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Popover } from './Popover';
import { Button } from '../Button';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start'],
    },
  },
  args: {
    placement: 'bottom-start',
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover
      {...args}
      trigger={<Button>Open Popover</Button>}
    >
      <div style={{ padding: '12px 16px', minWidth: 200 }}>
        <p style={{ margin: 0, fontWeight: 600, marginBottom: 8 }}>Popover title</p>
        <p style={{ margin: 0, fontSize: 13 }}>This is some popover content that provides extra information.</p>
      </div>
    </Popover>
  ),
};

export const BottomEnd: Story = {
  args: { placement: 'bottom-end' },
  render: (args) => (
    <Popover
      {...args}
      trigger={<Button variant="primary">Align end</Button>}
    >
      <div style={{ padding: '12px 16px', minWidth: 180 }}>
        <p style={{ margin: 0 }}>Aligned to the right edge of the trigger.</p>
      </div>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Popover
      {...args}
      trigger={<Button>Filter</Button>}
    >
      <div style={{ padding: '16px', minWidth: 240, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Filter options</p>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
          Status
          <select style={{ padding: '4px 8px' }}>
            <option>All</option>
            <option>Active</option>
            <option>Archived</option>
          </select>
        </label>
        <Button variant="primary" size="sm">Apply</Button>
      </div>
    </Popover>
  ),
};
