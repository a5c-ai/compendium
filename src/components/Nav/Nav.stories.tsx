import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tree, Breadcrumbs, Sidebar } from './Nav';
import type { TreeNodeData, NavItemData, BreadcrumbItem } from './Nav';

/* ── Tree ────────────────────────────────────────────────── */

const treeData: TreeNodeData[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'button',   label: 'Button.tsx',   count: 3 },
          { id: 'input',    label: 'Input.tsx' },
          { id: 'modal',    label: 'Modal.tsx' },
        ],
      },
      {
        id: 'tokens',
        label: 'tokens',
        children: [
          { id: 'tokens-css', label: 'index.css' },
        ],
      },
      { id: 'index',  label: 'index.ts' },
    ],
  },
  { id: 'package', label: 'package.json' },
  { id: 'readme',  label: 'README.md' },
];

const treeMeta = {
  title: 'Components/Tree',
  component: Tree,
  argTypes: {
    defaultSelected: { control: 'text' },
    defaultExpanded: { control: 'object' },
  },
  args: {
    data: treeData,
    defaultExpanded: ['src', 'components'],
    defaultSelected: 'button',
  },
} satisfies Meta<typeof Tree>;

export default treeMeta;
type TreeStory = StoryObj<typeof treeMeta>;

export const Default: TreeStory = {};

export const Collapsed: TreeStory = {
  args: { defaultExpanded: [], defaultSelected: null },
};

export const DeepTree: TreeStory = {
  args: {
    data: [
      {
        id: 'root', label: 'root',
        children: [
          {
            id: 'level1', label: 'level-1',
            children: [
              {
                id: 'level2', label: 'level-2',
                children: [
                  { id: 'leaf1', label: 'leaf-a' },
                  { id: 'leaf2', label: 'leaf-b' },
                ],
              },
            ],
          },
          { id: 'sibling', label: 'sibling' },
        ],
      },
    ],
    defaultExpanded: ['root', 'level1', 'level2'],
  },
};

/* ── Breadcrumbs ─────────────────────────────────────────── */

const crumbItems: BreadcrumbItem[] = [
  { label: 'Home',       href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Button' },
];

const breadcrumbsMeta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    items: crumbItems,
  },
} satisfies Meta<typeof Breadcrumbs>;

export const BreadcrumbsDefault: StoryObj<typeof breadcrumbsMeta> = {
  render: (args) => <Breadcrumbs {...args} />,
  args: breadcrumbsMeta.args,
};

export const BreadcrumbsShort: StoryObj<typeof breadcrumbsMeta> = {
  render: (args) => <Breadcrumbs {...args} />,
  args: {
    items: [{ label: 'Home' }, { label: 'Settings' }],
  },
};

export const BreadcrumbsControlled: StoryObj<typeof breadcrumbsMeta> = {
  render: () => {
    const [current, setCurrent] = useState(2);
    const allItems = ['Home', 'Docs', 'Components', 'Button'];
    const items = allItems.slice(0, current + 1).map((label) => ({ label }));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Breadcrumbs
          items={items}
          onNavigate={(_, idx) => setCurrent(idx)}
        />
        <p style={{ fontSize: 12, margin: 0 }}>Click a crumb to navigate back</p>
      </div>
    );
  },
};

/* ── Sidebar ─────────────────────────────────────────────── */

const sidebarItems: NavItemData[] = [
  { value: 'dashboard', label: 'Dashboard',  icon: 'grid' },
  {
    value: 'components', label: 'Components', icon: 'folder',
    children: [
      { value: 'button',   label: 'Button' },
      { value: 'input',    label: 'Input' },
      { value: 'modal',    label: 'Modal' },
    ],
  },
  { value: 'tokens',    label: 'Tokens',     icon: 'sun' },
  { value: 'settings',  label: 'Settings',   icon: 'gear' },
];

const sidebarMeta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  args: {
    items: sidebarItems,
    active: 'dashboard',
  },
} satisfies Meta<typeof Sidebar>;

export const SidebarDefault: StoryObj<typeof sidebarMeta> = {
  render: (args) => (
    <div style={{ width: 220, border: '1px solid var(--tkc-rule-m, #ddd)', borderRadius: 8 }}>
      <Sidebar {...args} />
    </div>
  ),
  args: sidebarMeta.args,
};

export const SidebarControlled: StoryObj<typeof sidebarMeta> = {
  render: () => {
    const [active, setActive] = useState('dashboard');
    return (
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 220, border: '1px solid var(--tkc-rule-m, #ddd)', borderRadius: 8 }}>
          <Sidebar items={sidebarItems} active={active} onSelect={setActive} />
        </div>
        <div style={{ padding: 16 }}>
          Active: <strong>{active}</strong>
        </div>
      </div>
    );
  },
};
