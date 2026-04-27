import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '.';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    icon: { control: 'text' },
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'ghost'],
    },
    size: {
      control: 'select',
      options: [undefined, 'sm'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    icon: 'gear',
    label: 'Settings',
    variant: 'default',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'gear',
    label: 'Settings',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton icon="gear" label="Settings" variant="default" />
      <IconButton icon="pencil" label="Edit" variant="primary" />
      <IconButton icon="x" label="Close" variant="ghost" />
      <IconButton icon="plus" label="Add" variant="default" size="sm" />
      <IconButton icon="search" label="Search" disabled />
    </div>
  ),
};

export const StateBoard: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <IconButton icon="pencil" label="Edit" variant="primary" />
        <IconButton icon="gear" label="Settings" variant="default" />
        <IconButton icon="search" label="Search" variant="ghost" />
      </div>
      <p style={{ margin: 0, fontSize: 12, color: 'var(--fg-2)' }}>
        Review hover, focus, and active states here with special attention to icon contrast.
      </p>
    </div>
  ),
};
