import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CommandPalette } from './CommandPalette';
import type { CommandItem } from './CommandPalette';
import { Button } from '../Button';

const sampleItems: CommandItem[] = [
  { id: 'new-file',    label: 'New File',           icon: 'file',    shortcut: '⌘N',   group: 'File' },
  { id: 'open-file',   label: 'Open File…',         icon: 'folder',  shortcut: '⌘O',   group: 'File' },
  { id: 'save',        label: 'Save',               icon: 'check',   shortcut: '⌘S',   group: 'File' },
  { id: 'search',      label: 'Find in Files',      icon: 'search',  shortcut: '⌘⇧F',  group: 'Edit' },
  { id: 'settings',    label: 'Open Settings',      icon: 'gear',    shortcut: '⌘,',   group: 'Preferences' },
  { id: 'theme',       label: 'Change Theme',       icon: 'sun',                       group: 'Preferences' },
  { id: 'close-tab',   label: 'Close Tab',          icon: 'x',       shortcut: '⌘W',   group: 'View' },
  { id: 'split-right', label: 'Split Editor Right', icon: 'columns',                   group: 'View' },
];

const meta = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  argTypes: {
    open:        { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    open:        true,
    placeholder: 'Type a command…',
    items:       sampleItems,
  },
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlwaysOpen: Story = {
  args: { open: true },
  render: (args) => (
    <div style={{ position: 'relative', height: 480 }}>
      <CommandPalette {...args} onClose={() => {}} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Command Palette (⌘K)</Button>
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          items={sampleItems}
          placeholder="Type a command…"
          onSelect={(item) => console.log('selected', item)}
        />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  args: {
    open: true,
    placeholder: 'Search actions, files, settings…',
  },
  render: (args) => (
    <div style={{ position: 'relative', height: 480 }}>
      <CommandPalette {...args} onClose={() => {}} />
    </div>
  ),
};
