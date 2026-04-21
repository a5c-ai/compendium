import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '.';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    defaultChecked: false,
    disabled: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const CheckedWithLabel: Story = {
  args: {
    defaultChecked: true,
    label: 'Dark mode',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Cannot change',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: 'Locked on',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle label="Unchecked" />
      <Toggle label="Checked" defaultChecked />
      <Toggle label="Disabled off" disabled />
      <Toggle label="Disabled on" disabled defaultChecked />
      <Toggle />
    </div>
  ),
};
