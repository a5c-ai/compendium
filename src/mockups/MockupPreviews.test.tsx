import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MockupPreviews } from './MockupPreviews';
import { MockupGalleryControls, MockupSpecList } from './MockupPreviewPrimitives';

describe('MockupPreviews theme support', () => {
  it('adds void theme markers when requested', () => {
    const html = renderToStaticMarkup(
      <MockupPreviews
        mockup="Brand"
        columns={1}
        frameHeight={420}
        zoom={0.72}
        showDescription={false}
        showSources={false}
        theme="void"
      />,
    );

    expect(html).toContain('class="mockup-previews void"');
    expect(html).toContain('data-theme="void"');
  });

  it('preserves the pre-theme default markup when theme is omitted', () => {
    const html = renderToStaticMarkup(
      <MockupPreviews
        mockup="Brand"
        columns={1}
        frameHeight={420}
        zoom={0.72}
        showDescription={false}
        showSources={false}
      />,
    );

    expect(html).toContain('class="mockup-previews"');
    expect(html).not.toContain('data-theme=');
  });

  it('renders shared gallery controls as an exported surface', () => {
    const html = renderToStaticMarkup(
      <MockupGalleryControls
        mockup="All"
        columnsValue="2"
        showDescription
        showSources
        zoom={0.72}
        frameHeight={840}
        onMockupChange={() => {}}
        onColumnsValueChange={() => {}}
        onShowDescriptionChange={() => {}}
        onShowSourcesChange={() => {}}
        onZoomChange={() => {}}
        onFrameHeightChange={() => {}}
      />,
    );

    expect(html).toContain('Mockup Preview Gallery');
    expect(html).toContain('Mockup surface');
    expect(html).toContain('Frame height (840px)');
  });

  it('renders the extracted spec list primitive', () => {
    const html = renderToStaticMarkup(
      <MockupSpecList
        items={[
          { label: 'Rule of two', value: 'Use two grounds at most.' },
          { label: 'Contrast', value: 'Bone on void; ink on vellum.' },
        ]}
      />,
    );

    expect(html).toContain('<dt>Rule of two</dt>');
    expect(html).toContain('<dd>Bone on void; ink on vellum.</dd>');
  });
});
