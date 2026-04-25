import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CodeEditor, DiffViewer } from './Code';

describe('Code surfaces', () => {
  it('renders metadata-heavy editor file facts and embedded framing', () => {
    const html = renderToStaticMarkup(
      <CodeEditor
        frame="embedded"
        density="compact"
        tone="default"
        language="tsx"
        filename="docs/snippets/quality-gate.tsx"
        fileMeta="handbook / chapter-3"
        status="verified"
        fileFacts={[
          { label: 'surface', value: 'docs' },
          { label: 'theme', value: 'vellum / void' },
        ]}
        facts={[
          { label: 'a11y', value: 'AA+', tone: 'success' },
        ]}
        footer={<><span>docs embed</span><span>scroll-safe</span></>}
        code={`export function QualityGateNotice() { return null; }`}
      />,
    );

    expect(html).toContain('tkc-editor--frame-embedded');
    expect(html).toContain('tkc-editor__file-facts');
    expect(html).toContain('handbook / chapter-3');
    expect(html).toContain('scroll-safe');
  });

  it('renders one-sided diff layouts without the redundant opposite column', () => {
    const html = renderToStaticMarkup(
      <DiffViewer
        frame="parchment"
        files={[
          {
            filename: 'src/mockups/MockupGallery.tsx',
            meta: 'new',
            layout: 'after',
            after: `+ export const MOCKUP_COLUMN_OPTIONS = [];`,
            language: 'diff',
          },
        ]}
      />,
    );

    expect(html).toContain('tkc-diff--frame-parchment');
    expect(html).toContain('tkc-diff__columns--after');
    expect(html).toContain('MOCKUP_COLUMN_OPTIONS');
    expect(html).not.toContain('No previous revision');
  });

  it('renders explicit before-only diffs and preserves file metadata', () => {
    const html = renderToStaticMarkup(
      <DiffViewer
        files={[
          {
            filename: 'src/legacy/exampleShell.tsx',
            meta: 'removed',
            layout: 'before',
            facts: [{ label: 'reason', value: 'shared extraction' }],
            before: `- export function ExampleShell() { return null }`,
            language: 'diff',
          },
        ]}
      />,
    );

    expect(html).toContain('tkc-diff__columns--before');
    expect(html).toContain('shared extraction');
    expect(html).not.toContain('No current revision');
  });

  it('renders the empty diff surface when no files are present', () => {
    const html = renderToStaticMarkup(
      <DiffViewer files={[]} emptyLabel="No diff available for this specimen yet" />,
    );

    expect(html).toContain('No diff available for this specimen yet');
    expect(html).toContain('0 files changed');
  });
});
