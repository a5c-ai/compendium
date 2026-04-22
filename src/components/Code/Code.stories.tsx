import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock, CodeEditor, DiffViewer } from "./Code";

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
    status: "rows=6 · 412ms",
    code: `CLM-10412 · surcharge 18.2% vs tariff 14.0%\nCLM-10477 · weight rounded up one bracket\nCLM-10544 · duplicate line item`,
  },
};

export const SideBySideDiff: StoryObj<typeof DiffViewer> = {
  render: () => (
    <DiffViewer
      files={[
        {
          filename: "src/middleware/auth.ts",
          before: `- export function authMiddleware(req, res, next) {\n    const token = authSplit(req);\n-   if (!token) return res.status(401).json(...)`,
          after: `+ export function authMiddleware(req, res, next) {\n+   const requestId = startRequest(req, res);\n    const token = authSplit(req);\n+   if (!token) return res.status(401).json({ error: 'Missing token', requestId })`,
          language: "diff",
        },
        {
          filename: "tests/auth.test.ts",
          after: `+ import { getRequestId } from '../lib/requestTracing';\n...\n+ expect(requestId).toMatch(/req_/);\n+ expect(res.body.requestId).toBeDefined();`,
          language: "diff",
        },
      ]}
    />
  ),
};
