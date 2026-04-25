import React, { useEffect, useMemo, useState } from "react";
import { cx } from "../utils";

export type CodeTone = "default" | "terminal" | "blueprint";
export type CodeLanguage = "ts" | "tsx" | "js" | "jsx" | "json" | "bash" | "diff" | "text";
export type CodeFrame = "default" | "embedded" | "parchment";
export type CodeDensity = "default" | "compact";
export type CodeFactTone = "default" | "success" | "warning" | "danger";
export type DiffViewerVariant = "default" | "docs" | "chat";
export type DiffFileLayout = "auto" | "split" | "before" | "after";

export interface CodeFactItem {
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: CodeFactTone;
}

export interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
  tone?: CodeTone;
  frame?: CodeFrame;
  density?: CodeDensity;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  facts?: readonly CodeFactItem[];
  footer?: React.ReactNode;
  emptyLabel?: React.ReactNode;
  lineNumbers?: boolean;
  className?: string;
}

export interface CodeEditorProps extends CodeBlockProps {
  status?: React.ReactNode;
  filename?: string;
  fileMeta?: React.ReactNode;
  fileFacts?: readonly CodeFactItem[];
}

export interface DiffFile {
  filename: string;
  before?: string;
  after?: string;
  language?: CodeLanguage;
  label?: string;
  meta?: React.ReactNode;
  note?: React.ReactNode;
  facts?: readonly CodeFactItem[];
  beforeLabel?: React.ReactNode;
  afterLabel?: React.ReactNode;
  beforeEmptyLabel?: React.ReactNode;
  afterEmptyLabel?: React.ReactNode;
  tone?: CodeTone;
  layout?: DiffFileLayout;
}

export interface DiffViewerProps {
  files: DiffFile[];
  className?: string;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  initialFile?: string;
  variant?: DiffViewerVariant;
  frame?: CodeFrame;
  density?: CodeDensity;
  emptyLabel?: React.ReactNode;
}

export interface DiffFileTabsProps {
  files: DiffFile[];
  activeFile: string;
  panelIdForFile?: (filename: string) => string;
  onChange: (filename: string) => void;
}

export interface DiffFileViewProps {
  file: DiffFile;
  frame?: CodeFrame;
  density?: CodeDensity;
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

function renderEmptyState(label?: React.ReactNode) {
  return <div className="tkc-code__empty">{label ?? "No content available"}</div>;
}

function surfaceClasses(baseClassName: string, tone: CodeTone, frame: CodeFrame, density: CodeDensity, className?: string) {
  return cx(
    baseClassName,
    `tkc-code--${tone}`,
    `${baseClassName}--frame-${frame}`,
    `${baseClassName}--density-${density}`,
    className,
  );
}

function CodeFacts({
  facts,
  className,
  density = "default",
}: {
  facts: readonly CodeFactItem[];
  className?: string;
  density?: CodeDensity;
}) {
  return (
    <div className={cx("tkc-code__facts", density === "compact" && "tkc-code__facts--compact", className)}>
      {facts.map((fact, index) => (
        <div key={`${index}-${String(fact.label)}`} className={cx("tkc-code__fact", fact.tone && `tkc-code__fact--${fact.tone}`)}>
          <span>{fact.label}</span>
          <strong>{fact.value}</strong>
        </div>
      ))}
    </div>
  );
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "text",
  tone = "default",
  frame = "default",
  density = "default",
  title,
  meta,
  facts,
  footer,
  emptyLabel,
  lineNumbers,
  className,
}) => (
  <section className={surfaceClasses("tkc-code", tone, frame, density, className)}>
    {title || meta ? (
      <header className="tkc-code__head">
        <strong>{title}</strong>
        <span>{meta}</span>
      </header>
    ) : null}
    {facts?.length ? <CodeFacts facts={facts} density={density} /> : null}
    {code.trim().length ? renderCode(code, language, lineNumbers) : renderEmptyState(emptyLabel)}
    {footer ? <footer className="tkc-code__foot">{footer}</footer> : null}
  </section>
);

export const CodeEditor: React.FC<CodeEditorProps> = ({
  tone = "default",
  frame = "default",
  density = "default",
  className,
  title,
  meta,
  status,
  filename,
  fileMeta,
  fileFacts,
  ...rest
}) => (
  <section className={surfaceClasses("tkc-editor", tone, frame, density, className)}>
    <header className="tkc-editor__head">
      <div className="tkc-editor__dots"><span /><span /><span /></div>
      <strong>{title ?? filename}</strong>
      <span>{status ?? meta}</span>
    </header>
    {filename || fileMeta ? (
      <div className="tkc-editor__file">
        <span>{filename}</span>
        {fileMeta ? <em>{fileMeta}</em> : null}
      </div>
    ) : null}
    {fileFacts?.length ? <CodeFacts facts={fileFacts} density="compact" className="tkc-editor__file-facts" /> : null}
    <CodeBlock {...rest} tone={tone} frame="embedded" density={density} className="tkc-editor__body" />
  </section>
);

function toDomId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function resolveDiffLayout(file: DiffFile) {
  if (file.layout && file.layout !== "auto") return file.layout;
  if (typeof file.before === "string" && typeof file.after === "string") return "split";
  if (typeof file.before === "string") return "before";
  return "after";
}

function resolveSideTitle(file: DiffFile, side: "before" | "after", layout: Exclude<DiffFileLayout, "auto">) {
  if (side === "before") {
    if (file.beforeLabel) return file.beforeLabel;
    return layout === "before" && typeof file.after !== "string" ? "Removed" : "Before";
  }
  if (file.afterLabel) return file.afterLabel;
  return layout === "after" && typeof file.before !== "string" ? "Added" : "After";
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
          <strong>{file.label ?? file.filename}</strong>
          {file.meta ? <span>{file.meta}</span> : null}
        </button>
      );
    })}
  </div>
);

export const DiffFileView: React.FC<DiffFileViewProps> = ({ file, frame = "default", density = "default", panelId, labelledBy }) => {
  const tone = file.tone ?? "default";
  const language = file.language ?? "diff";
  const hasBefore = typeof file.before === "string";
  const hasAfter = typeof file.after === "string";
  const layout = resolveDiffLayout(file);
  const panelFrame = frame === "default" ? "default" : "embedded";

  return (
    <article className="tkc-diff__file" id={panelId} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="tkc-diff__file-head">
        <div className="tkc-diff__name">{file.filename}</div>
        {file.meta ? <div className="tkc-diff__meta">{file.meta}</div> : null}
      </div>
      {file.note ? <p className="tkc-diff__note">{file.note}</p> : null}
      {file.facts?.length ? <CodeFacts facts={file.facts} density="compact" className="tkc-diff__facts" /> : null}
      <div className={cx("tkc-diff__columns", `tkc-diff__columns--${layout}`)}>
        {layout !== "after" ? (
          <CodeBlock
            code={file.before ?? ""}
            language={language}
            tone={tone}
            frame={panelFrame}
            density={density}
            lineNumbers={hasBefore}
            title={resolveSideTitle(file, "before", layout)}
            emptyLabel={file.beforeEmptyLabel ?? "No previous revision"}
          />
        ) : null}
        {layout !== "before" ? (
          <CodeBlock
            code={file.after ?? ""}
            language={language}
            tone={tone}
            frame={panelFrame}
            density={density}
            lineNumbers={hasAfter}
            title={resolveSideTitle(file, "after", layout)}
            emptyLabel={file.afterEmptyLabel ?? "No current revision"}
          />
        ) : null}
      </div>
    </article>
  );
};

export const DiffViewer: React.FC<DiffViewerProps> = ({
  files,
  className,
  title = "Diff / Code Changes",
  meta,
  initialFile,
  variant = "default",
  frame = "default",
  density = "default",
  emptyLabel,
}) => {
  const defaultFile = useMemo(
    () => initialFile && files.some((file) => file.filename === initialFile) ? initialFile : files[0]?.filename,
    [files, initialFile]
  );
  const [activeFile, setActiveFile] = useState(defaultFile);

  useEffect(() => {
    setActiveFile(defaultFile);
  }, [defaultFile]);

  const current = files.find((file) => file.filename === activeFile) ?? files[0];

  if (!current) {
    return (
      <section className={cx("tkc-diff", `tkc-diff--${variant}`, `tkc-diff--frame-${frame}`, `tkc-diff--density-${density}`, className)}>
        <header className="tkc-diff__head">
          <strong>{title}</strong>
          <span>{meta ?? "0 files changed"}</span>
        </header>
        {renderEmptyState(emptyLabel ?? "No changed files to display")}
      </section>
    );
  }

  const activePanelId = `tkc-diff-panel-${toDomId(current.filename)}`;
  const activeTabId = `tkc-diff-tab-${toDomId(current.filename)}`;

  return (
    <section className={cx("tkc-diff", `tkc-diff--${variant}`, `tkc-diff--frame-${frame}`, `tkc-diff--density-${density}`, className)}>
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
        <DiffFileView file={current} frame={frame} density={density} panelId={activePanelId} labelledBy={activeTabId} />
      </div>
    </section>
  );
};
