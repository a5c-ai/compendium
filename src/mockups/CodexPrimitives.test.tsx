import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CodexDocsToc, CodexFrame, CodexPlate } from './CodexPrimitives';

describe('Codex primitive surfaces', () => {
  it('renders the active tab and optional colophon in the frame surface', () => {
    const html = renderToStaticMarkup(
      <CodexFrame
        title={<>Measure</>}
        kicker="Twelve columns, 16px gutters."
        folio="folio-xii"
        colophon="Edition 4.2"
        activeTab="Measure"
      >
        <div>body</div>
      </CodexFrame>,
    );

    expect(html).toContain('mk-tab mk-tab--active">Measure<');
    expect(html).toContain('folio-xii');
    expect(html).toContain('Edition 4.2');
  });

  it('renders the dark plate variant as a stable export', () => {
    const html = renderToStaticMarkup(
      <CodexPlate dark className="specimen">
        <p>Plate contents</p>
      </CodexPlate>,
    );

    expect(html).toContain('class="mk-plate mk-plate--void specimen"');
  });

  it('marks current chapter and current item states in the docs toc', () => {
    const html = renderToStaticMarkup(
      <CodexDocsToc
        searchLabel="Search the encyclopedia…"
        bookLabel="Book I · Foundations"
        title="Of the Foundry and its Rites"
        chapters={[
          {
            num: 'III.',
            title: 'Gates & verdicts',
            pages: 'pp. 45 – 82',
            current: true,
            items: [
              { label: 'Convergence · the canonical gate', current: true },
              { label: 'Authoring a custom verdict' },
            ],
          },
        ]}
      />,
    );

    expect(html).toContain('mk-docs__chapter current');
    expect(html).toContain('class="current" aria-current="true">Convergence · the canonical gate<');
    expect(html).toContain('type="button"');
    expect(html).toContain('Authoring a custom verdict');
  });
});
