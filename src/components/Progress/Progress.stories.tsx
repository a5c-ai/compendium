import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Progress, Spinner, Skeleton } from './Progress';

/* ── Progress ────────────────────────────────────────────── */

const progressMeta = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    value:         { control: { type: 'range', min: 0, max: 100, step: 1 } },
    indeterminate: { control: 'boolean' },
  },
  args: {
    value: 60,
    indeterminate: false,
  },
} satisfies Meta<typeof Progress>;

export default progressMeta;
type ProgressStory = StoryObj<typeof progressMeta>;

export const Default: ProgressStory = {};

export const Empty: ProgressStory = {
  args: { value: 0 },
};

export const Complete: ProgressStory = {
  args: { value: 100 },
};

export const Indeterminate: ProgressStory = {
  args: { indeterminate: true, value: undefined },
};

export const AllVariants: ProgressStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 4, fontSize: 12 }}>0%</p>
        <Progress value={0} />
      </div>
      <div>
        <p style={{ marginBottom: 4, fontSize: 12 }}>45%</p>
        <Progress value={45} />
      </div>
      <div>
        <p style={{ marginBottom: 4, fontSize: 12 }}>100%</p>
        <Progress value={100} />
      </div>
      <div>
        <p style={{ marginBottom: 4, fontSize: 12 }}>Indeterminate</p>
        <Progress indeterminate />
      </div>
    </div>
  ),
};

/* ── Spinner ─────────────────────────────────────────────── */

const spinnerMeta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    gear: { control: 'boolean' },
  },
  args: {
    gear: false,
  },
} satisfies Meta<typeof Spinner>;

export const SpinnerDefault: StoryObj<typeof spinnerMeta> = {
  render: (args) => <Spinner {...args} />,
  args: spinnerMeta.args,
};

export const SpinnerGear: StoryObj<typeof spinnerMeta> = {
  render: (args) => <Spinner {...args} />,
  args: { gear: true },
};

export const BothSpinners: StoryObj<typeof spinnerMeta> = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner />
        <span style={{ fontSize: 11 }}>Default</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner gear />
        <span style={{ fontSize: 11 }}>Gear</span>
      </div>
    </div>
  ),
};

/* ── Skeleton ─────────────────────────────────────────────── */

const skeletonMeta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    w: { control: 'text' },
    h: { control: { type: 'number' } },
    r: { control: { type: 'number' } },
  },
  args: {
    w: '100%',
    h: 12,
    r: 3,
  },
} satisfies Meta<typeof Skeleton>;

export const SkeletonDefault: StoryObj<typeof skeletonMeta> = {
  render: (args) => <Skeleton {...args} />,
  args: skeletonMeta.args,
};

export const SkeletonCard: StoryObj<typeof skeletonMeta> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 320 }}>
      <Skeleton w={64} h={64} r={32} />
      <Skeleton w="60%" h={16} />
      <Skeleton w="100%" h={12} />
      <Skeleton w="80%" h={12} />
      <Skeleton w="90%" h={12} />
    </div>
  ),
};
