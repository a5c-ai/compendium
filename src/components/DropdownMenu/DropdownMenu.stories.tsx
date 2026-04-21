import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DropdownMenu, ContextMenu } from './DropdownMenu';
import type { MenuItem } from './DropdownMenu';
import { Button } from '../Button';

const sampleItems: MenuItem[] = [
  { type: 'group', label: 'Actions' },
  { label: 'Edit',   icon: 'pencil',  shortcut: '⌘E', onClick: () => alert('edit') },
  { label: 'Duplicate', icon: 'copy', onClick: () => alert('duplicate') },
  { type: 'sep' },
  { type: 'group', label: 'Danger zone' },
  { label: 'Delete', icon: 'trash', disabled: false, onClick: () => alert('delete') },
];

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start'],
    },
  },
  args: {
    items: sampleItems,
    placement: 'bottom-start',
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args} trigger={<Button>Open Menu</Button>} />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu
      placement="bottom-start"
      trigger={<Button variant="primary">Actions</Button>}
      items={[
        { label: 'New File',   icon: 'file',   shortcut: '⌘N' },
        { label: 'Open',       icon: 'folder', shortcut: '⌘O' },
        { type: 'sep' },
        { label: 'Save',       icon: 'check',  shortcut: '⌘S' },
        { label: 'Save As…',   icon: 'copy' },
        { type: 'sep' },
        { label: 'Close',      icon: 'x',      shortcut: '⌘W' },
      ]}
    />
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <DropdownMenu
      placement="bottom-start"
      trigger={<Button>More</Button>}
      items={[
        { label: 'Rename',   icon: 'pencil' },
        { label: 'Move to…', icon: 'folder', disabled: true },
        { type: 'sep' },
        { label: 'Archive',  icon: 'archive', disabled: true },
        { label: 'Delete',   icon: 'trash' },
      ]}
    />
  ),
};

export const ContextMenuExample: Story = {
  render: () => (
    <ContextMenu
      items={[
        { label: 'Cut',   icon: 'scissors', shortcut: '⌘X' },
        { label: 'Copy',  icon: 'copy',     shortcut: '⌘C' },
        { label: 'Paste', icon: 'clipboard',shortcut: '⌘V' },
        { type: 'sep' },
        { label: 'Select All', shortcut: '⌘A' },
      ]}
    >
      <div
        style={{
          padding: 32,
          border: '2px dashed var(--tkc-rule-m, #ccc)',
          borderRadius: 8,
          textAlign: 'center',
          cursor: 'context-menu',
          userSelect: 'none',
        }}
      >
        Right-click me
      </div>
    </ContextMenu>
  ),
};
