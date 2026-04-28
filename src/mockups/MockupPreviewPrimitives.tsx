import { Fragment, ReactNode } from 'react';
import { Select, Slider, Toggle } from '../components';
import type {
  MockupControlOption,
  MockupName,
  MockupSelection,
} from './MockupPreviews';

export interface MockupSpecItem {
  label: ReactNode;
  value: ReactNode;
}

export interface MockupGalleryControlsProps {
  mockup: MockupSelection;
  mockupNames?: readonly MockupName[];
  columnsValue: string;
  showDescription: boolean;
  showSources: boolean;
  zoom: number;
  frameHeight: number;
  onMockupChange: (value: MockupSelection) => void;
  onColumnsValueChange: (value: string) => void;
  onShowDescriptionChange: (value: boolean) => void;
  onShowSourcesChange: (value: boolean) => void;
  onZoomChange: (value: number) => void;
  onFrameHeightChange: (value: number) => void;
  title?: ReactNode;
  description?: ReactNode;
}

export const MOCKUP_COLUMN_OPTIONS: readonly MockupControlOption[] = [
  { label: '1 column', value: '1' },
  { label: '2 columns', value: '2' },
  { label: '3 columns', value: '3' },
];

export function MockupSpecList({
  items,
}: {
  items: readonly MockupSpecItem[];
}) {
  return (
    <dl className="mk-specs">
      {items.map((item) => (
        <Fragment key={String(item.label)}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

export function MockupGalleryControls({
  mockup,
  mockupNames = [],
  columnsValue,
  showDescription,
  showSources,
  zoom,
  frameHeight,
  onMockupChange,
  onColumnsValueChange,
  onShowDescriptionChange,
  onShowSourcesChange,
  onZoomChange,
  onFrameHeightChange,
  title = 'Mockup Preview Gallery',
  description = 'Tune controls to inspect each reference page and compare fidelity against the preview set.',
}: MockupGalleryControlsProps) {
  const mockupOptions: readonly MockupControlOption[] = [
    { label: 'All Mockups', value: 'All' },
    ...mockupNames.map((name) => ({ label: name, value: name })),
  ];

  return (
    <section className="mk-gallery-controls" aria-label="Mockup gallery controls">
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="mk-gallery-controls__grid">
        <label className="mk-gallery-controls__field">
          <span>Mockup surface</span>
          <Select
            value={mockup}
            options={[...mockupOptions]}
            onChange={(value: string) => onMockupChange(value as MockupSelection)}
          />
        </label>
        <label className="mk-gallery-controls__field">
          <span>Columns</span>
          <Select
            value={columnsValue}
            options={[...MOCKUP_COLUMN_OPTIONS]}
            onChange={onColumnsValueChange}
          />
        </label>
        <label className="mk-gallery-controls__field">
          <span>Show descriptions</span>
          <Toggle checked={showDescription} onChange={onShowDescriptionChange} />
        </label>
        <label className="mk-gallery-controls__field">
          <span>Show source links</span>
          <Toggle checked={showSources} onChange={onShowSourcesChange} />
        </label>
      </div>
      <label className="mk-gallery-controls__slider">
        <span>Zoom ({Math.round(zoom * 100)}%)</span>
        <Slider
          value={Math.round(zoom * 100)}
          min={40}
          max={125}
          ticks={18}
          ariaLabel="Zoom"
          onChange={(value) => onZoomChange(value / 100)}
        />
      </label>
      <label className="mk-gallery-controls__slider">
        <span>Frame height ({frameHeight}px)</span>
        <Slider
          value={frameHeight}
          min={420}
          max={1800}
          ticks={15}
          ariaLabel="Frame height"
          onChange={onFrameHeightChange}
        />
      </label>
    </section>
  );
}
