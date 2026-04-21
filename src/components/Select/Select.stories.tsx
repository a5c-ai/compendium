import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '.';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragonfruit' },
  { value: 'elderberry', label: 'Elderberry' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    options: fruitOptions,
    placeholder: 'Select a fruit...',
    disabled: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'cherry',
  },
};

export const WithStringOptions: Story = {
  args: {
    options: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'],
    placeholder: 'Pick a color...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'banana',
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `item-${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    placeholder: 'Choose from many...',
  },
};
