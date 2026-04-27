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
    frame: {
      control: "inline-radio",
      options: ["default", "embedded", "parchment"],
    },
    density: {
      control: "inline-radio",
      options: ["default", "compact"],
    },
    lineNumbers: {
      control: "boolean",
    },
  },
  args: {
    tone: "default",
    language: "ts",
    frame: "default",
    density: "default",
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

export const EmbeddedDocsBlock: Story = {
  args: {
    frame: "embedded",
    density: "compact",
    title: "Canonical Gate",
    meta: "docs embed · verdict.example.ts",
    footer: <><span>embedded in article flow</span><span>vellum / void aware</span></>,
    code: `export const verdict = {\n  decision: "defer",\n  reason: "manifest is silent on pricing policy",\n  nextStep: "summon human reviewer",\n};`,
  },
};

export const BlueprintEditor: StoryObj<typeof CodeEditor> = {
  render: (args) => <CodeEditor {...args} />,
  args: {
    tone: "blueprint",
    language: "text",
    density: "compact",
    filename: "ledger.query",
    fileMeta: "warehouse/eu-west-2",
    status: "rows=6 · 412ms",
    fileFacts: [
      { label: "mode", value: "read only" },
      { label: "latency", value: "412ms" },
    ],
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
      frame="embedded"
      density="compact"
      language="tsx"
      title="docs/snippets/quality-gate.tsx"
      filename="docs/snippets/quality-gate.tsx"
      fileMeta="source · handbook / chapter-3"
      status="verified · 2026-04-24"
      fileFacts={[
        { label: "surface", value: "docs embed" },
        { label: "theme", value: "vellum / void" },
        { label: "sync", value: "storybook", tone: "success" },
      ]}
      facts={[
        { label: "owner", value: "editor-11" },
        { label: "a11y", value: "AA+", tone: "success" },
        { label: "open threads", value: "2", tone: "warning" },
      ]}
      footer={<><span>Inline in docs and Storybook MDX</span><span>scroll-safe</span></>}
      code={`export function QualityGateNotice() {\n  return <aside data-tone="pass">Proof required before seal.</aside>;\n}`}
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

export const AlternateFrameDiff: StoryObj<typeof DiffViewer> = {
  render: () => (
    <DiffViewer
      frame="parchment"
      title="Refactor diff · request tracing"
      meta="2 files · auth flow"
      files={[
        {
          filename: "src/middleware/auth.ts",
          meta: "middleware",
          note: "Auth failures now carry the same request id used by the tracing helper and downstream docs examples.",
          facts: [
            { label: "impact", value: "api + docs" },
            { label: "risk", value: "low", tone: "success" },
          ],
          before: `- export function authMiddleware(req, res, next) {\n    const token = authSplit(req);\n-   if (!token) return res.status(401).json(...)`,
          after: `+ export function authMiddleware(req, res, next) {\n+   const requestId = startRequest(req, res);\n    const token = authSplit(req);\n+   if (!token) return res.status(401).json({ error: 'Missing token', requestId })`,
          language: "diff",
        },
        {
          filename: "tests/auth.test.ts",
          meta: "vitest",
          layout: "after",
          after: `+ import { getRequestId } from '../lib/requestTracing';\n...\n+ expect(requestId).toMatch(/req_/);\n+ expect(res.body.requestId).toBeDefined();`,
          language: "diff",
        },
      ]}
    />
  ),
};

export const OneSidedAndAsymmetricDiffs: StoryObj<typeof DiffViewer> = {
  render: () => (
    <div className="tkc-demo__grid-2">
      <DiffViewer
        variant="chat"
        frame="embedded"
        density="compact"
        title="Chat attachment diff"
        meta="one-sided states"
        files={[
          {
            filename: "src/mockups/MockupGallery.tsx",
            meta: "new",
            layout: "after",
            afterEmptyLabel: "Current revision is the source of truth",
            after: `+ export const MOCKUP_COLUMN_OPTIONS = ['All', 'Docs', 'Chat'];`,
            language: "diff",
          },
          {
            filename: "src/legacy/exampleShell.tsx",
            meta: "removed",
            layout: "before",
            before: `- export function ExampleShell() { return null }`,
            beforeEmptyLabel: "Archived for migration notes",
            language: "diff",
          },
          {
            filename: "src/components/Code/Code.tsx",
            meta: "modified",
            before: `- export interface DiffFile { filename: string }`,
            after: `+ export interface DiffFile { filename: string; layout?: DiffFileLayout }`,
            language: "diff",
          },
        ]}
      />
      <DiffViewer
        frame="parchment"
        title="Focused after-state"
        meta="explicit asymmetric layout"
        files={[
          {
            filename: "src/components/Code/Code.tsx",
            meta: "after emphasis",
            layout: "after",
            before: `- export interface CodeEditorProps extends CodeBlockProps { fileMeta?: React.ReactNode }`,
            after: `+ export interface CodeEditorProps extends CodeBlockProps { fileMeta?: React.ReactNode; fileFacts?: readonly CodeFactItem[] }`,
            language: "diff",
          },
        ]}
      />
    </div>
  ),
};

export const EmptyStates: StoryObj<typeof DiffViewer> = {
  render: () => (
    <div className="tkc-demo__grid-2">
      <CodeEditor
        frame="embedded"
        density="compact"
        language="tsx"
        filename="docs/snippets/pending.tsx"
        fileMeta="awaiting first draft"
        status="empty"
        fileFacts={[
          { label: "surface", value: "docs" },
          { label: "state", value: "queued", tone: "warning" },
        ]}
        emptyLabel="Snippet body has not been authored yet"
        code=""
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

export const DarkModeAudit: StoryObj<typeof DiffViewer> = {
  globals: {
    theme: 'void',
  },
  render: () => (
    <div data-theme="void" className="void" style={{ display: "grid", gap: 16 }}>
      <CodeEditor
        tone="default"
        frame="embedded"
        density="compact"
        language="tsx"
        title="docs/snippets/quality-gate.tsx"
        filename="docs/snippets/quality-gate.tsx"
        fileMeta="source · handbook / chapter-3"
        status="verified · 2026-04-24"
        fileFacts={[
          { label: "surface", value: "docs embed" },
          { label: "theme", value: "void audit" },
          { label: "sync", value: "storybook", tone: "success" },
        ]}
        facts={[
          { label: "owner", value: "editor-11" },
          { label: "a11y", value: "AA+", tone: "success" },
          { label: "open threads", value: "2", tone: "warning" },
        ]}
        footer={<><span>Inline in docs and Storybook MDX</span><span>scroll-safe</span></>}
        code={`export function QualityGateNotice() {\n  return <aside data-tone="pass">Proof required before seal.</aside>;\n}`}
        lineNumbers
      />
      <DiffViewer
        variant="chat"
        frame="embedded"
        density="compact"
        title="Chat attachment diff"
        meta="selected tab + metadata audit"
        files={[
          {
            filename: "src/mockups/MockupGallery.tsx",
            meta: "new",
            layout: "after",
            facts: [
              { label: "contrast", value: "verified", tone: "success" },
              { label: "risk", value: "dense", tone: "warning" },
            ],
            afterEmptyLabel: "Current revision is the source of truth",
            after: `+ export const MOCKUP_COLUMN_OPTIONS = ['All', 'Docs', 'Chat'];`,
            language: "diff",
          },
          {
            filename: "src/components/Code/Code.tsx",
            meta: "modified",
            before: `- export interface DiffFile { filename: string }`,
            after: `+ export interface DiffFile { filename: string; layout?: DiffFileLayout }`,
            language: "diff",
          },
        ]}
      />
    </div>
  ),
};
