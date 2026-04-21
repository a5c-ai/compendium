import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag, TagInput } from './Tag';

/* ── Tag ─────────────────────────────────────────────────── */

const tagMeta = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    children:  { control: 'text' },
    removing:  { control: 'boolean' },
    onRemove:  { action: 'removed' },
  },
  args: {
    children: 'design-system',
    removing: false,
  },
} satisfies Meta<typeof Tag>;

export default tagMeta;
type TagStory = StoryObj<typeof tagMeta>;

export const Default: TagStory = {};

export const Removable: TagStory = {
  args: {
    onRemove: () => alert('removed'),
  },
};

export const TagCloud: TagStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag>react</Tag>
      <Tag>typescript</Tag>
      <Tag onRemove={() => {}}>design-system</Tag>
      <Tag onRemove={() => {}}>storybook</Tag>
      <Tag onRemove={() => {}}>css</Tag>
    </div>
  ),
};

/* ── TagInput ─────────────────────────────────────────────── */

const tagInputMeta = {
  title: 'Components/TagInput',
  component: TagInput,
  argTypes: {
    placeholder: { control: 'text' },
  },
  args: {
    defaultValue: ['react', 'typescript'],
    placeholder: 'Add tag…',
  },
} satisfies Meta<typeof TagInput>;

export const TagInputDefault: StoryObj<typeof tagInputMeta> = {
  render: (args) => <TagInput {...args} />,
  args: tagInputMeta.args,
};

export const TagInputEmpty: StoryObj<typeof tagInputMeta> = {
  render: (args) => <TagInput {...args} />,
  args: { defaultValue: [], placeholder: 'Type and press Enter…' },
};
