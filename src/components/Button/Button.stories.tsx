import type { Meta, StoryObj } from '@storybook/react';
import { Button, IconButton } from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'ghost'],
    },
    size: {
      control: 'select',
      options: [undefined, 'sm'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'default',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Action',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const SmallPrimary: Story = {
  args: {
    size: 'sm',
    variant: 'primary',
    children: 'Small Primary',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="default" size="sm">Small Default</Button>
      <Button variant="primary" size="sm">Small Primary</Button>
      <Button variant="ghost" size="sm">Small Ghost</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 380 }}>
      <Button variant="default">Open the documentation workspace for custom verdict authoring</Button>
      <Button variant="primary">Create a new documentation chapter with preserved editorial metadata</Button>
      <Button variant="ghost">Review the generated side rail before publishing this section</Button>
    </div>
  ),
};

const iconMeta = {
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

export const IconButtonDefault: StoryObj<typeof iconMeta> = {
  render: (args) => <IconButton {...args} />,
  args: {
    icon: 'gear',
    label: 'Settings',
  },
};

export const IconButtonVariants: StoryObj<typeof iconMeta> = {
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

export const IconButtonStateBoard: StoryObj<typeof iconMeta> = {
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
