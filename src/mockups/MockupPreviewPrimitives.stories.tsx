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

const meta: Meta<typeof MockupGalleryControls> = {
  title: 'Mockups/Preview Primitives',
  component: MockupGalleryControls,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof MockupGalleryControls>;

export const GalleryControls: Story = {
  render: () => {
    const [mockup, setMockup] = useState<MockupSelection>('All');
    const [columnsValue, setColumnsValue] = useState('2');
    const [zoom, setZoom] = useState(0.72);
    const [frameHeight, setFrameHeight] = useState(840);
    const [showDescription, setShowDescription] = useState(true);
    const [showSources, setShowSources] = useState(true);

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
        />
        <MockupPreviews
          mockup={mockup}
          columns={columns as 1 | 2 | 3}
          zoom={zoom}
          frameHeight={frameHeight}
          showDescription={showDescription}
          showSources={showSources}
        />
      </div>
    );
  },
};

export const SpecList: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <MockupSpecList
        items={[
          { label: 'Rule of two', value: 'Use at most two grounds per surface so ornamental density stays intentional.' },
          { label: 'Contrast', value: 'Promote ink-on-vellum and bone-on-void; treat fade registers as metadata only.' },
          { label: 'Dark mode', value: 'Controls and metadata should stay legible without inheriting washed-out light-mode values.' },
        ]}
      />
    </div>
  ),
};
