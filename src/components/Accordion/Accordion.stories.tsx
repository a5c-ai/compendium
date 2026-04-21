import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '.';
import type { AccordionItem } from '.';

const sampleItems: AccordionItem[] = [
  {
    title: 'What is Compendium?',
    body: 'Compendium is a design system built for the Codex aesthetic. It provides components, tokens, and icons for building rich medieval-inspired interfaces.',
  },
  {
    title: 'How do I install it?',
    body: 'Install via npm: npm install @a5c-ai/compendium. Then import the CSS tokens and components you need.',
  },
  {
    title: 'Is it accessible?',
    body: 'Yes. All components follow WAI-ARIA patterns and are keyboard navigable. We test with axe-core and manual screen reader testing.',
  },
  {
    title: 'Can I customize the theme?',
    body: 'Absolutely. Override CSS custom properties in your own stylesheet. All colors, fonts, and spacing use design tokens.',
  },
];

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    defaultOpen: { control: 'number' },
  },
  args: {
    items: sampleItems,
    type: 'single',
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstOpen: Story = {
  args: {
    defaultOpen: 0,
  },
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultOpen: [0, 2],
  },
};

export const CustomNumbers: Story = {
  args: {
    items: sampleItems.map((item, i) => ({
      ...item,
      num: `§${i + 1}`,
    })),
  },
};

export const TwoItems: Story = {
  args: {
    items: sampleItems.slice(0, 2),
    defaultOpen: 0,
  },
};
