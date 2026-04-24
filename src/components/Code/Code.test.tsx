import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CodeEditor, DiffViewer } from './Code';

describe('Code surfaces', () => {
  it('renders metadata-heavy editor facts and footer', () => {
    const html = renderToStaticMarkup(
      <CodeEditor
        tone="default"
        language="tsx"
        filename="docs/snippets/quality-gate.tsx"
        fileMeta="handbook / chapter-3"
        status="verified"
        facts={[
          { label: 'surface', value: 'docs' },
          { label: 'a11y', value: 'AA+', tone: 'success' },
        ]}
        footer={<><span>docs embed</span><span>scroll-safe</span></>}
        code={`export function QualityGateNotice() { return null; }`}
      />,
    );

    expect(html).toContain('tkc-code__facts');
    expect(html).toContain('handbook / chapter-3');
    expect(html).toContain('scroll-safe');
  });

  it('renders placeholders for one-sided and empty diff states', () => {
    const html = renderToStaticMarkup(
      <DiffViewer
        title="Code changes"
        files={[
          {
            filename: 'src/mockups/MockupGallery.tsx',
            meta: 'new',
            after: `+ export const MOCKUP_COLUMN_OPTIONS = [];`,
            language: 'diff',
          },
        ]}
      />,
    );

    expect(html).toContain('No previous revision');
    expect(html).toContain('MOCKUP_COLUMN_OPTIONS');
  });

  it('renders the empty diff surface when no files are present', () => {
    const html = renderToStaticMarkup(
      <DiffViewer files={[]} emptyLabel="No diff available for this specimen yet" />,
    );

    expect(html).toContain('No diff available for this specimen yet');
    expect(html).toContain('0 files changed');
  });
});
