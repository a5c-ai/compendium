import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock, CodeEditor, DiffViewer } from "./Code";

const diffFiles = [
  {
    filename: "src/middleware/auth.ts",
    label: "auth.ts",
    meta: "M · middleware",
    note: "Request tracing is being threaded into auth failures so docs, chat, and API consumers all see the same request id.",
    before: `- export function authMiddleware(req, res, next) {\n    const token = authSplit(req);\n-   if (!token) return res.status(401).json(...)`,
    after: `+ export function authMiddleware(req, res, next) {\n+   const requestId = startRequest(req, res);\n    const token = authSplit(req);\n+   if (!token) return res.status(401).json({ error: 'Missing token', requestId })`,
    language: "diff" as const,
  },
  {
    filename: "tests/auth.test.ts",
    label: "auth.test.ts",
    meta: "A · tests",
    note: "Regression coverage for request-id propagation.",
    after: `+ import { getRequestId } from '../lib/requestTracing';\n...\n+ expect(requestId).toMatch(/req_/);\n+ expect(res.body.requestId).toBeDefined();`,
    language: "diff" as const,
  },
  {
    filename: "src/lib/requestTracing.ts",
    label: "requestTracing.ts",
    meta: "A · library",
    after: `+ export function startRequest(req, res) {\n+   const requestId = crypto.randomUUID();\n+   res.setHeader(\"x-request-id\", requestId);\n+   return requestId;\n+ }`,
    language: "diff" as const,
  },
] as const;

const meta: Meta<typeof CodeBlock> = {
  title: "Components/Code",
  component: CodeBlock,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["default", "terminal", "blueprint"],
    },
    language: {
      control: "select",
      options: ["ts", "tsx", "js", "jsx", "json", "bash", "diff", "text"],
    },
    lineNumbers: {
      control: "boolean",
    },
  },
  args: {
    tone: "default",
    language: "ts",
    lineNumbers: true,
    title: "Code Block",
    meta: "theme aware",
    code: `export function startRequest(req: Request, res: Response) {\n  const requestId = crypto.randomUUID();\n  res.setHeader("x-request-id", requestId);\n  return requestId;\n}`,
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Playground: Story = {};

export const Terminal: Story = {
  args: {
    tone: "terminal",
    language: "bash",
    title: "Bash / Terminal",
    code: `$ npm run lint\n✔ No problems found\n\n$ npm test -- auth\nPASS tests/auth.test.ts`,
  },
};

export const BlueprintEditor: StoryObj<typeof CodeEditor> = {
  render: (args) => <CodeEditor {...args} />,
  args: {
    tone: "blueprint",
    language: "text",
    filename: "ledger.query",
    fileMeta: "warehouse/eu-west-2",
    status: "rows=6 · 412ms",
    facts: [
      { label: "owner", value: "archivist-04" },
      { label: "confidence", value: "high", tone: "success" },
      { label: "requires review", value: "2 lines", tone: "warning" },
    ],
    code: `CLM-10412 · surcharge 18.2% vs tariff 14.0%\nCLM-10477 · weight rounded up one bracket\nCLM-10544 · duplicate line item`,
  },
};

export const MetadataHeavyEditor: StoryObj<typeof CodeEditor> = {
  render: () => (
    <CodeEditor
      tone="default"
      language="tsx"
      title="docs/snippets/quality-gate.tsx"
      filename="docs/snippets/quality-gate.tsx"
      fileMeta="source · handbook / chapter-3"
      status="verified · 2026-04-24"
      facts={[
        { label: "surface", value: "docs embed" },
        { label: "theme", value: "vellum" },
        { label: "a11y", value: "AA+", tone: "success" },
      ]}
      footer={<><span>Inline in docs and Storybook MDX</span><span>scroll-safe</span></>}
      code={`export function QualityGateNotice() {\n  return <aside data-tone=\"pass\">Proof required before seal.</aside>;\n}`}
      lineNumbers
    />
  ),
};
export const SideBySideDiff: StoryObj<typeof DiffViewer> = {
  argTypes: {
    initialFile: {
      control: "select",
      options: diffFiles.map((file) => file.filename),
    },
    title: {
      control: "text",
    },
    meta: {
      control: "text",
    },
  },
  args: {
    initialFile: "src/middleware/auth.ts",
    title: "Diff / Code Changes",
    meta: "3 files changed",
  },
  render: (args) => (
    <DiffViewer
      {...args}
      files={[...diffFiles]}
    />
  ),
};

export const DocsEmbeddedDiff: StoryObj<typeof DiffViewer> = {
  render: () => (
    <DiffViewer
      variant="docs"
      title="Documentation figure · multi-surface diff"
      meta="2 files · metadata-heavy"
      files={[
        {
          filename: "src/mockups/CodexPrimitives.tsx",
          label: "Codex docs frame",
          meta: "docs shell",
          note: "Adds an explicit metadata rail so the same frame can host long-form docs and dense preview explanations without wrapper markup.",
          before: `- export function CodexDocsMargin({ sections }) { ... }`,
          after: `+ export function CodexDocsMargin({ sections, tone = 'default' }) { ... }`,
          language: "diff",
        },
        {
          filename: "src/mockups/MockupGallery.tsx",
          label: "New gallery control surface",
          meta: "added file",
          beforeEmptyLabel: "Brand-new shared export",
          after: `+ export function MockupGalleryControls(props) {\n+   return <section className=\"mk-gallery-controls\">…</section>;\n+ }`,
          language: "diff",
        },
      ]}
    />
  ),
};

export const EmptyAndOneSidedStates: StoryObj<typeof DiffViewer> = {
  render: () => (
    <div className="tkc-demo__grid-2">
      <DiffViewer
        variant="chat"
        title="Chat attachment diff"
        meta="one-sided states"
        files={[
          {
            filename: "src/components/Code/Code.tsx",
            meta: "modified",
            before: `- export interface DiffFile { filename: string }`,
            after: `+ export interface DiffFile { filename: string; meta?: ReactNode }`,
            language: "diff",
          },
          {
            filename: "src/mockups/MockupGallery.tsx",
            meta: "new",
            beforeEmptyLabel: "Introduced in this revision",
            after: `+ export const MOCKUP_COLUMN_OPTIONS = [...]`,
            language: "diff",
          },
          {
            filename: "src/legacy/exampleShell.tsx",
            meta: "removed",
            before: `- export function ExampleShell() { return null }`,
            afterEmptyLabel: "Removed after shared extraction",
            language: "diff",
          },
        ]}
      />
      <DiffViewer
        title="Empty diff surface"
        meta="no files"
        files={[]}
        emptyLabel="No diff available for this specimen yet"
      />
    </div>
  ),
};
