import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CodeBlock, CodeEditor, DiffViewer } from './Code';

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

  it('renders terminal and empty block states from the story matrix', () => {
    const terminalHtml = renderToStaticMarkup(
      <CodeBlock
        tone="terminal"
        language="bash"
        title="Bash / Terminal"
        lineNumbers
        code={`$ npm test -- auth\nPASS tests/auth.test.ts`}
      />,
    );
    const emptyHtml = renderToStaticMarkup(
      <CodeBlock
        tone="blueprint"
        language="text"
        code="   "
        emptyLabel="No snippet available for this figure"
      />,
    );

    expect(terminalHtml).toContain('tkc-code--terminal');
    expect(terminalHtml).toContain('$ npm test -- auth');
    expect(terminalHtml).toContain('tkc-code__ln');
    expect(emptyHtml).toContain('No snippet available for this figure');
    expect(emptyHtml).toContain('tkc-code--blueprint');
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

  it('honors docs variant and initial-file selection for multi-file diffs', () => {
    const html = renderToStaticMarkup(
      <DiffViewer
        variant="docs"
        initialFile="src/mockups/MockupGallery.tsx"
        files={[
          {
            filename: 'src/mockups/CodexPrimitives.tsx',
            meta: 'docs shell',
            after: `+ export function CodexDocsMargin({ sections, tone = 'default' }) { ... }`,
            language: 'diff',
          },
          {
            filename: 'src/mockups/MockupGallery.tsx',
            meta: 'added file',
            beforeEmptyLabel: 'Brand-new shared export',
            after: `+ export function MockupGalleryControls(props) { return null; }`,
            language: 'diff',
          },
        ]}
      />,
    );

    expect(html).toContain('tkc-diff--docs');
    expect(html).toContain('tkc-diff__columns--after');
    expect(html).toContain('>Added<');
    expect(html).toContain('MockupGalleryControls');
    expect(html).not.toContain(`CodexDocsMargin({ sections, tone = 'default' })`);
  });
});
