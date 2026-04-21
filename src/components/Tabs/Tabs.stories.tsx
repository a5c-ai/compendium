import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '.';
import type { TabItem } from '.';

const sampleTabs: TabItem[] = [
  {
    value: 'overview',
    label: 'Overview',
    body: <p>This is the overview panel. It provides a high-level summary of the current context.</p>,
  },
  {
    value: 'details',
    label: 'Details',
    body: <p>The details panel shows granular information about the selected item.</p>,
  },
  {
    value: 'history',
    label: 'History',
    body: <p>View the complete change history and audit trail here.</p>,
  },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    defaultValue: { control: 'text' },
  },
  args: {
    items: sampleTabs,
    defaultValue: 'overview',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondTabActive: Story = {
  args: {
    defaultValue: 'details',
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { value: 'all', label: 'All', badge: 42, body: <p>Showing all items.</p> },
      { value: 'active', label: 'Active', badge: 12, body: <p>Showing active items only.</p> },
      { value: 'archived', label: 'Archived', badge: 30, body: <p>Showing archived items.</p> },
    ],
    defaultValue: 'all',
  },
};

export const TwoTabs: Story = {
  args: {
    items: [
      { value: 'code', label: 'Code', body: <pre style={{ margin: 0 }}>{'const x = 42;'}</pre> },
      { value: 'preview', label: 'Preview', body: <p>Rendered output appears here.</p> },
    ],
    defaultValue: 'code',
  },
};

export const ManyTabs: Story = {
  args: {
    items: Array.from({ length: 7 }, (_, i) => ({
      value: `tab-${i}`,
      label: `Tab ${i + 1}`,
      body: <p>Content for Tab {i + 1}.</p>,
    })),
    defaultValue: 'tab-0',
  },
};
