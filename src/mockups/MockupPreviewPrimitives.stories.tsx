import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MockupGalleryControls,
  MockupSpecList,
} from './MockupPreviewPrimitives';
import {
  MOCKUP_NAMES,
  MockupPreviews,
  type MockupSelection,
} from './MockupPreviews';

const specItems = [
  {
    label: 'Rule of two',
    value: 'Use at most two grounds per surface so ornamental density stays intentional.',
  },
  {
    label: 'Contrast',
    value: 'Promote ink on vellum and bone on void. Fade registers are metadata only.',
  },
  {
    label: 'Dark mode',
    value: 'Controls and metadata should stay legible without inheriting washed-out light values.',
  },
] as const;

function InteractiveGallerySurface(args: {
  initialMockup?: MockupSelection;
  initialColumnsValue?: string;
  initialShowDescription?: boolean;
  initialShowSources?: boolean;
  initialZoom?: number;
  initialFrameHeight?: number;
  title?: string;
  description?: string;
}) {
  const [mockup, setMockup] = useState<MockupSelection>(args.initialMockup ?? 'All');
  const [columnsValue, setColumnsValue] = useState(args.initialColumnsValue ?? '2');
  const [zoom, setZoom] = useState(args.initialZoom ?? 0.72);
  const [frameHeight, setFrameHeight] = useState(args.initialFrameHeight ?? 840);
  const [showDescription, setShowDescription] = useState(args.initialShowDescription ?? true);
  const [showSources, setShowSources] = useState(args.initialShowSources ?? true);

  const columns = useMemo(() => {
    const parsed = Number(columnsValue);
    return parsed === 1 || parsed === 2 || parsed === 3 ? parsed : 2;
  }, [columnsValue]);

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <MockupGalleryControls
        mockup={mockup}
        mockupNames={MOCKUP_NAMES}
        columnsValue={columnsValue}
        showDescription={showDescription}
        showSources={showSources}
        zoom={zoom}
        frameHeight={frameHeight}
        onMockupChange={setMockup}
        onColumnsValueChange={setColumnsValue}
        onShowDescriptionChange={setShowDescription}
        onShowSourcesChange={setShowSources}
        onZoomChange={setZoom}
        onFrameHeightChange={setFrameHeight}
        title={args.title}
        description={args.description}
      />
      <MockupPreviews
        mockup={mockup}
        columns={columns}
        zoom={zoom}
        frameHeight={frameHeight}
        showDescription={showDescription}
        showSources={showSources}
      />
    </div>
  );
}

const meta: Meta = {
  title: 'Motifs/Preview Controls',
  component: MockupGalleryControls,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const GalleryControls: Story = {
  args: {
    mockup: 'All',
    columnsValue: '2',
    showDescription: true,
    showSources: true,
    zoom: 0.72,
    frameHeight: 840,
    title: 'Mockup Preview Gallery',
    description: 'Tune controls to inspect each reference page and compare fidelity against the preview set.',
  },
  argTypes: {
    mockup: {
      control: { type: 'select' },
      options: ['All', ...MOCKUP_NAMES],
    },
    columnsValue: {
      control: { type: 'inline-radio' },
      options: ['1', '2', '3'],
    },
    showDescription: { control: 'boolean' },
    showSources: { control: 'boolean' },
    zoom: {
      control: { type: 'range', min: 0.4, max: 1.25, step: 0.01 },
    },
    frameHeight: {
      control: { type: 'range', min: 420, max: 1800, step: 20 },
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  render: (args) => (
    <MockupGalleryControls
      mockup={(args.mockup as MockupSelection) ?? 'All'}
      mockupNames={MOCKUP_NAMES}
      columnsValue={args.columnsValue ?? '2'}
      showDescription={args.showDescription ?? true}
      showSources={args.showSources ?? true}
      zoom={args.zoom ?? 0.72}
      frameHeight={args.frameHeight ?? 840}
      title={args.title}
      description={args.description}
      onMockupChange={() => undefined}
      onColumnsValueChange={() => undefined}
      onShowDescriptionChange={() => undefined}
      onShowSourcesChange={() => undefined}
      onZoomChange={() => undefined}
      onFrameHeightChange={() => undefined}
    />
  ),
};

export const GalleryControlsDark: Story = {
  ...GalleryControls,
  globals: {
    theme: 'void',
  },
  args: {
    ...GalleryControls.args,
    mockup: 'Chat',
    showSources: false,
  },
};

export const InteractiveGallery: Story = {
  args: {
    initialMockup: 'All',
    initialColumnsValue: '2',
    initialShowDescription: true,
    initialShowSources: true,
    initialZoom: 0.72,
    initialFrameHeight: 840,
    title: 'Interactive Preview Gallery',
    description: 'Use the live controls to inspect mockup framing, density, and reference metadata.',
  },
  argTypes: {
    initialMockup: {
      control: { type: 'select' },
      options: ['All', ...MOCKUP_NAMES],
    },
    initialColumnsValue: {
      control: { type: 'inline-radio' },
      options: ['1', '2', '3'],
    },
    initialShowDescription: { control: 'boolean' },
    initialShowSources: { control: 'boolean' },
    initialZoom: {
      control: { type: 'range', min: 0.4, max: 1.25, step: 0.01 },
    },
    initialFrameHeight: {
      control: { type: 'range', min: 420, max: 1800, step: 20 },
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  render: (args) => <InteractiveGallerySurface {...args} />,
};

export const SpecList: Story = {
  args: {
    items: specItems,
  },
  argTypes: {
    items: { control: 'object' },
  },
  render: (args) => (
    <div style={{ maxWidth: 720 }}>
      <MockupSpecList items={args.items ?? specItems} />
    </div>
  ),
};
