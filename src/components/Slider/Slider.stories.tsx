import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Slider, RangeSlider } from './Slider';

/* ── Slider ──────────────────────────────────────────────── */

const sliderMeta = {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    defaultValue: { control: { type: 'number' } },
    min:          { control: { type: 'number' } },
    max:          { control: { type: 'number' } },
    step:         { control: { type: 'number' } },
    ticks:        { control: { type: 'number' } },
  },
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ padding: '24px 40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default sliderMeta;
type SliderStory = StoryObj<typeof sliderMeta>;

export const Default: SliderStory = {};

export const WithTicks: SliderStory = {
  args: { ticks: 5, defaultValue: 25 },
};

export const WithFormat: SliderStory = {
  args: {
    defaultValue: 70,
    format: (v: number) => `${v}%`,
  },
};

export const Stepped: SliderStory = {
  args: { step: 10, defaultValue: 40, ticks: 11 },
};

/* ── RangeSlider ─────────────────────────────────────────── */

const rangeMeta = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  argTypes: {
    min:  { control: { type: 'number' } },
    max:  { control: { type: 'number' } },
    step: { control: { type: 'number' } },
  },
  args: {
    defaultValue: [20, 80] as [number, number],
    min: 0,
    max: 100,
    step: 1,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ padding: '24px 40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RangeSlider>;

export const RangeDefault: StoryObj<typeof rangeMeta> = {
  render: (args) => <RangeSlider {...args} />,
  args: rangeMeta.args,
};

export const RangeWithFormat: StoryObj<typeof rangeMeta> = {
  render: (args) => <RangeSlider {...args} />,
  args: {
    ...rangeMeta.args,
    defaultValue: [30, 70] as [number, number],
    format: (v: number) => `$${v}`,
  },
};

export const NarrowRange: StoryObj<typeof rangeMeta> = {
  render: (args) => <RangeSlider {...args} />,
  args: {
    defaultValue: [40, 60] as [number, number],
    min: 0,
    max: 100,
    step: 5,
  },
};
