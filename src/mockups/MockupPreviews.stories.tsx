import type { Meta, StoryObj } from '@storybook/react';
import { MockupPreviewControls, MockupPreviews, MOCKUP_NAMES } from './MockupPreviews';

const meta: Meta<typeof MockupPreviews> = {
  title: 'Mockups/Project Previews',
  component: MockupPreviews,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    mockup: {
      control: { type: 'select' },
      options: ['All', ...MOCKUP_NAMES],
    },
    columns: {
      control: { type: 'inline-radio' },
      options: [1, 2, 3],
    },
    zoom: {
      control: { type: 'range', min: 0.4, max: 1.25, step: 0.02 },
    },
    frameHeight: {
      control: { type: 'range', min: 420, max: 1800, step: 20 },
    },
    showDescription: {
      control: { type: 'boolean' },
    },
    showSources: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'inline-radio' },
      options: ['vellum', 'void'],
    },
  },
  args: {
    mockup: 'All',
    columns: 2,
    zoom: 0.72,
    frameHeight: 840,
    showDescription: true,
    showSources: true,
    theme: 'vellum',
  },
};

export default meta;
type Story = StoryObj<typeof MockupPreviews>;

export const Gallery: Story = {};

export const GalleryControlsOnly: StoryObj<typeof MockupPreviewControls> = {
  render: (args) => <MockupPreviewControls {...args} />,
  args: {
    mockup: 'All',
    columns: 2,
    zoom: 0.72,
    frameHeight: 840,
    showDescription: true,
    showSources: true,
    onMockupChange: () => {},
    onColumnsChange: () => {},
    onZoomChange: () => {},
    onFrameHeightChange: () => {},
    onShowDescriptionChange: () => {},
    onShowSourcesChange: () => {},
  },
};

export const DarkGallery: Story = {
  args: { theme: 'void' },
};

export const Ads: Story = {
  args: { mockup: 'Ads', columns: 1, zoom: 0.8 },
};

export const Brand: Story = {
  args: { mockup: 'Brand', columns: 1, zoom: 0.78 },
};

export const Chat: Story = {
  args: { mockup: 'Chat', columns: 1, zoom: 0.78 },
};

export const Colors: Story = {
  args: { mockup: 'Colors', columns: 1, zoom: 0.78 },
};

export const Components: Story = {
  args: { mockup: 'Components', columns: 1, zoom: 0.78 },
};

export const SeraphRefactor: Story = {
  args: { mockup: 'Seraph Refactor', columns: 1, zoom: 0.62, frameHeight: 900 },
};

export const SeraphBestiary: Story = {
  args: { mockup: 'Seraph Bestiary', columns: 1, zoom: 0.62, frameHeight: 900 },
};

export const Dashboard: Story = {
  args: { mockup: 'Dashboard', columns: 1, zoom: 0.74 },
};

export const Docs: Story = {
  args: { mockup: 'Docs', columns: 1, zoom: 0.78 },
};

export const Spacing: Story = {
  args: { mockup: 'Spacing', columns: 1, zoom: 0.78 },
};

export const Type: Story = {
  args: { mockup: 'Type', columns: 1, zoom: 0.78 },
};
