import { useMemo, useState } from 'react';
import '@a5c-ai/compendium/css';
import './App.css';

import {
  MockupPreviews,
  MockupPreviewControls,
  type MockupTheme,
  type MockupSelection,
} from '@a5c-ai/compendium/react';
import { Button, LogoMonogram, LogoMonogramDark, LogoWordmark, LogoWordmarkDark } from '@a5c-ai/compendium';

export default function App() {
  const [mockup, setMockup] = useState<MockupSelection>('All');
  const [theme, setTheme] = useState<MockupTheme>('vellum');
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
          {theme === 'void' ? (
            <LogoMonogramDark style={{ width: 30, height: 30 }} />
          ) : (
            <LogoMonogram style={{ width: 30, height: 30 }} />
          )}
          <div className="mockup-app__labels">
            <span className="mockup-app__eyebrow">a5c.ai Compendium</span>
            {theme === 'void' ? (
              <LogoWordmarkDark style={{ width: 126, height: 17 }} />
            ) : (
              <LogoWordmark style={{ width: 126, height: 17 }} />
            )}
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
        <MockupPreviewControls
          mockup={mockup}
          columns={columns}
          zoom={zoom}
          frameHeight={frameHeight}
          showDescription={showDescription}
          showSources={showSources}
          onMockupChange={setMockup}
          onColumnsChange={(value) => setColumnsValue(String(value))}
          onZoomChange={setZoom}
          onFrameHeightChange={setFrameHeight}
          onShowDescriptionChange={setShowDescription}
          onShowSourcesChange={setShowSources}
        />

        <MockupPreviews
          mockup={mockup}
          columns={columns}
          zoom={zoom}
          frameHeight={frameHeight}
          showDescription={showDescription}
          showSources={showSources}
          theme={theme}
        />
      </main>
    </div>
  );
}
