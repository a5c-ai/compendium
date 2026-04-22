import { useMemo, useState } from 'react';
import '@a5c-ai/compendium/css';
import './App.css';

import {
  MockupPreviews,
  MOCKUP_NAMES,
  Select,
  Slider,
  Toggle,
  type MockupSelection,
} from '@a5c-ai/compendium/react';
import { Button, LogoMonogram, LogoWordmark } from '@a5c-ai/compendium';

const mockupOptions = [
  { label: 'All Mockups', value: 'All' },
  ...MOCKUP_NAMES.map((name) => ({ label: name, value: name })),
];

const columnOptions = [
  { label: '1 column', value: '1' },
  { label: '2 columns', value: '2' },
  { label: '3 columns', value: '3' },
];

export default function App() {
  const [mockup, setMockup] = useState<MockupSelection>('All');
  const [theme, setTheme] = useState<'vellum' | 'void'>('vellum');
  const [columnsValue, setColumnsValue] = useState('2');
  const [zoom, setZoom] = useState(0.72);
  const [frameHeight, setFrameHeight] = useState(840);
  const [showDescription, setShowDescription] = useState(true);
  const [showSources, setShowSources] = useState(true);

  const columns = useMemo(() => {
    const parsed = Number(columnsValue);
    if (parsed === 1 || parsed === 2 || parsed === 3) {
      return parsed;
    }
    return 2;
  }, [columnsValue]);

  return (
    <div className={`mockup-app mockup-app--${theme}`} data-theme={theme}>
      <header className="mockup-app__header">
        <div className="mockup-app__brand">
          <LogoMonogram style={{ width: 30, height: 30 }} />
          <div className="mockup-app__labels">
            <span className="mockup-app__eyebrow">a5c.ai Compendium</span>
            <LogoWordmark style={{ width: 126, height: 17 }} />
          </div>
        </div>
        <p className="mockup-app__summary">
          Shared Mockup surfaces used in Storybook and examples, wired to the `project/preview` references.
        </p>
        <div className="mockup-app__theme">
          <span>Theme</span>
          <div className="mockup-app__theme-actions" role="group" aria-label="Theme">
            <Button
              variant={theme === 'vellum' ? 'primary' : 'default'}
              size="sm"
              onClick={() => setTheme('vellum')}
            >
              Vellum
            </Button>
            <Button
              variant={theme === 'void' ? 'primary' : 'default'}
              size="sm"
              onClick={() => setTheme('void')}
            >
              Void
            </Button>
          </div>
        </div>
      </header>

      <main className="mockup-app__main">
        <section className="mockup-controls">
          <h1>Mockup Preview Gallery</h1>
          <p>
            Tune controls to inspect each reference page and compare fidelity against the preview set.
          </p>
          <div className="mockup-controls__grid">
            <label className="mockup-controls__field">
              <span>Mockup surface</span>
              <Select
                value={mockup}
                options={mockupOptions}
                onChange={(value: string) => setMockup(value as MockupSelection)}
              />
            </label>
            <label className="mockup-controls__field">
              <span>Columns</span>
              <Select
                value={columnsValue}
                options={columnOptions}
                onChange={(value: string) => setColumnsValue(value)}
              />
            </label>
            <label className="mockup-controls__field">
              <span>Show descriptions</span>
              <Toggle checked={showDescription} onChange={setShowDescription} />
            </label>
            <label className="mockup-controls__field">
              <span>Show source links</span>
              <Toggle checked={showSources} onChange={setShowSources} />
            </label>
          </div>
          <label className="mockup-controls__slider">
            <span>Zoom ({Math.round(zoom * 100)}%)</span>
            <Slider
              value={Math.round(zoom * 100)}
              min={40}
              max={125}
              ticks={18}
              onChange={(value) => setZoom(value / 100)}
            />
          </label>
          <label className="mockup-controls__slider">
            <span>Frame height ({frameHeight}px)</span>
            <Slider
              value={frameHeight}
              min={420}
              max={1800}
              ticks={15}
              onChange={setFrameHeight}
            />
          </label>
        </section>

        <MockupPreviews
          mockup={mockup}
          columns={columns}
          zoom={zoom}
          frameHeight={frameHeight}
          showDescription={showDescription}
          showSources={showSources}
        />
      </main>
    </div>
  );
}
