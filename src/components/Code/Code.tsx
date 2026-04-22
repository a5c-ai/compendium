import React, { useMemo, useState } from "react";
import { cx } from "../utils";

export type CodeTone = "default" | "terminal" | "blueprint";
export type CodeLanguage = "ts" | "tsx" | "js" | "jsx" | "json" | "bash" | "diff" | "text";

export interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
  tone?: CodeTone;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  lineNumbers?: boolean;
  className?: string;
}

export interface CodeEditorProps extends CodeBlockProps {
  status?: React.ReactNode;
  filename?: string;
}

export interface DiffFile {
  filename: string;
  before?: string;
  after?: string;
  language?: CodeLanguage;
  label?: string;
}

export interface DiffViewerProps {
  files: DiffFile[];
  className?: string;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  initialFile?: string;
}

export interface DiffFileTabsProps {
  files: DiffFile[];
  activeFile: string;
  panelIdForFile?: (filename: string) => string;
  onChange: (filename: string) => void;
}

export interface DiffFileViewProps {
  file: DiffFile;
  panelId?: string;
  labelledBy?: string;
}

type TokenKind =
  | "plain"
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "command"
  | "added"
  | "removed"
  | "symbol";

interface Token {
  text: string;
  kind: TokenKind;
}

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "export", "import", "from",
  "if", "else", "for", "while", "class", "extends", "new", "async", "await",
  "type", "interface", "true", "false", "null", "undefined",
]);

function tokenizeLine(line: string, language: CodeLanguage): Token[] {
  if (language === "bash" && line.startsWith("$")) return [{ text: line, kind: "command" }];
  if (language === "diff") {
    if (line.startsWith("+")) return [{ text: line, kind: "added" }];
    if (line.startsWith("-")) return [{ text: line, kind: "removed" }];
  }

  const tokens: Token[] = [];
  const pattern =
    /(\/\/.*$|".*?"|'.*?'|`.*?`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|[{}()[\].,;:+\-*/=<>&|!?]+)/g;
  let lastIndex = 0;
  for (const match of line.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push({ text: line.slice(lastIndex, index), kind: "plain" });
    const text = match[0];
    let kind: TokenKind = "plain";
    if (text.startsWith("//")) kind = "comment";
    else if (/^["'`]/.test(text)) kind = "string";
    else if (/^\d/.test(text)) kind = "number";
    else if (KEYWORDS.has(text)) kind = "keyword";
    else if (/^[{}()[\].,;:+\-*/=<>&|!?]+$/.test(text)) kind = "symbol";
    tokens.push({ text, kind });
    lastIndex = index + text.length;
  }
  if (lastIndex < line.length) tokens.push({ text: line.slice(lastIndex), kind: "plain" });
  return tokens;
}

function renderCode(code: string, language: CodeLanguage, lineNumbers?: boolean) {
  const lines = code.split("\n");
  return (
    <div className="tkc-code__lines">
      {lines.map((line, index) => (
        <div key={`${index}-${line}`} className="tkc-code__line">
          {lineNumbers ? <span className="tkc-code__ln">{index + 1}</span> : null}
          <span className="tkc-code__content">
            {tokenizeLine(line, language).map((token, tokenIndex) => (
              <span
                key={`${tokenIndex}-${token.text}`}
                className={cx("tkc-code__tok", token.kind !== "plain" && `tkc-code__tok--${token.kind}`)}
              >
                {token.text || " "}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "text",
  tone = "default",
  title,
  meta,
  lineNumbers,
  className,
}) => (
  <section className={cx("tkc-code", `tkc-code--${tone}`, className)}>
    {title || meta ? (
      <header className="tkc-code__head">
        <strong>{title}</strong>
        <span>{meta}</span>
      </header>
    ) : null}
    {renderCode(code, language, lineNumbers)}
  </section>
);

export const CodeEditor: React.FC<CodeEditorProps> = ({
  title,
  meta,
  status,
  filename,
  ...rest
}) => (
  <section className="tkc-editor">
    <header className="tkc-editor__head">
      <div className="tkc-editor__dots"><span /><span /><span /></div>
      <strong>{title ?? filename}</strong>
      <span>{status ?? meta}</span>
    </header>
    {filename ? <div className="tkc-editor__file">{filename}</div> : null}
    <CodeBlock {...rest} className="tkc-editor__body" />
  </section>
);

function toDomId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const DiffFileTabs: React.FC<DiffFileTabsProps> = ({ files, activeFile, panelIdForFile, onChange }) => (
  <div className="tkc-diff__tabs" role="tablist" aria-label="Changed files">
    {files.map((file) => {
      const active = file.filename === activeFile;
      const tabId = `tkc-diff-tab-${toDomId(file.filename)}`;
      return (
        <button
          key={file.filename}
          id={tabId}
          type="button"
          role="tab"
          aria-selected={active}
          aria-controls={panelIdForFile?.(file.filename)}
          className={active ? "is-active" : undefined}
          onClick={() => onChange(file.filename)}
        >
          {file.label ?? file.filename}
        </button>
      );
    })}
  </div>
);

export const DiffFileView: React.FC<DiffFileViewProps> = ({ file, panelId, labelledBy }) => (
  <article className="tkc-diff__file" id={panelId} role="tabpanel" aria-labelledby={labelledBy}>
    <div className="tkc-diff__name">{file.filename}</div>
    <div className="tkc-diff__columns">
      {file.before ? (
        <CodeBlock
          code={file.before}
          language={file.language ?? "diff"}
          tone="default"
          lineNumbers
          title="Before"
        />
      ) : null}
      {file.after ? (
        <CodeBlock
          code={file.after}
          language={file.language ?? "diff"}
          tone="default"
          lineNumbers
          title={file.before ? "After" : "Changes"}
        />
      ) : null}
    </div>
  </article>
);

export const DiffViewer: React.FC<DiffViewerProps> = ({
  files,
  className,
  title = "Diff / Code Changes",
  meta,
  initialFile,
}) => {
  const defaultFile = useMemo(
    () => initialFile && files.some((file) => file.filename === initialFile) ? initialFile : files[0]?.filename,
    [files, initialFile]
  );
  const [activeFile, setActiveFile] = useState(defaultFile);
  const current = files.find((file) => file.filename === activeFile) ?? files[0];

  if (!current) return null;

  const activePanelId = `tkc-diff-panel-${toDomId(current.filename)}`;
  const activeTabId = `tkc-diff-tab-${toDomId(current.filename)}`;

  return (
    <section className={cx("tkc-diff", className)}>
      <header className="tkc-diff__head">
        <strong>{title}</strong>
        <span>{meta ?? `${files.length} files changed`}</span>
      </header>
      <DiffFileTabs
        files={files}
        activeFile={current.filename}
        panelIdForFile={(filename) => `tkc-diff-panel-${toDomId(filename)}`}
        onChange={setActiveFile}
      />
      <div className="tkc-diff__grid">
        <DiffFileView file={current} panelId={activePanelId} labelledBy={activeTabId} />
      </div>
    </section>
  );
};
