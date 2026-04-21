import React, { useState, useMemo } from "react";
import { useCtrl } from "../hooks";
import { Icon } from "../Icon";

/* ── Pagination ─────────────────────────────────────────── */

export interface PaginationProps {
  page?: number;
  defaultPage?: number;
  total: number;
  onChange?: (page: number) => void;
  siblings?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  defaultPage = 1,
  total,
  onChange,
  siblings = 1,
}) => {
  const [p, set] = useCtrl(page, defaultPage, onChange);
  const go = (n: number) => {
    if (n >= 1 && n <= total) set(n);
  };
  const visible: (number | string)[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - p) <= siblings) {
      visible.push(i);
    } else if (visible[visible.length - 1] !== "…") {
      visible.push("…");
    }
  }
  return (
    <div className="tkc-pager">
      <button type="button" onClick={() => go(p - 1)} disabled={p === 1}>
        ‹ Prev
      </button>
      {visible.map((it, i) =>
        it === "…" ? (
          <button key={i} type="button" disabled>
            …
          </button>
        ) : (
          <button
            key={i}
            type="button"
            data-active={it === p || undefined}
            onClick={() => go(it as number)}
          >
            {it}
          </button>
        )
      )}
      <button
        type="button"
        onClick={() => go(p + 1)}
        disabled={p === total}
      >
        Next ›
      </button>
    </div>
  );
};

/* ── EmptyState (internal helper) ───────────────────────── */

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "folder",
  title,
  message,
  action,
}) => (
  <div className="tkc-empty">
    <Icon name={icon} size={44} />
    <div className="tkc-empty__title">{title}</div>
    {message && <div className="tkc-empty__sub">{message}</div>}
    {action && <div style={{ marginTop: 14 }}>{action}</div>}
  </div>
);

/* ── DataTable ──────────────────────────────────────────── */

export interface DataTableColumn<R = Record<string, unknown>> {
  key: string;
  label: React.ReactNode;
  width?: string | number;
  num?: boolean;
  mono?: boolean;
  sortable?: boolean;
  accessor?: (row: R) => unknown;
  render?: (row: R) => React.ReactNode;
}

export interface DataTableProps<R = Record<string, unknown>> {
  columns: DataTableColumn<R>[];
  rows: R[];
  defaultSort?: { key: string | null; dir: "asc" | "desc" };
  pageSize?: number;
  onRowClick?: (row: R) => void;
}

export function DataTable<R extends Record<string, unknown> & { id?: string | number }>({
  columns,
  rows,
  defaultSort,
  pageSize = 10,
  onRowClick,
}: DataTableProps<R>): React.ReactElement {
  const [sort, setSort] = useState(
    defaultSort || { key: null as string | null, dir: "asc" as "asc" | "desc" }
  );
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sort.key) return rows;
    const col = columns.find((c) => c.key === sort.key);
    const get = col?.accessor || ((r: R) => r[sort.key!]);
    return [...rows].sort((a, b) => {
      const av = get(a) as string | number;
      const bv = get(b) as string | number;
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [rows, sort, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageRows = sorted.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const toggleSort = (key: string) => {
    if (sort.key === key)
      setSort({ key, dir: sort.dir === "asc" ? "desc" : "asc" });
    else setSort({ key, dir: "asc" });
  };

  return (
    <div>
      <table className="tk-ledger">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                onClick={
                  c.sortable !== false
                    ? () => toggleSort(c.key)
                    : undefined
                }
                className={c.num ? "num" : ""}
                aria-sort={
                  sort.key === c.key
                    ? sort.dir === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                style={{
                  ...(c.width ? { width: c.width } : undefined),
                  ...(c.sortable !== false
                    ? { cursor: "pointer", userSelect: "none" }
                    : undefined),
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {c.label}
                  {c.sortable !== false && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      style={{
                        color:
                          sort.key === c.key
                            ? "var(--tk-cinnabar)"
                            : "var(--tk-line-hair)",
                      }}
                    >
                      <path
                        d={
                          sort.key === c.key && sort.dir === "desc"
                            ? "M2 4h6L5 8z"
                            : "M2 6h6L5 2z"
                        }
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: 0 }}>
                <EmptyState
                  title="No records"
                  message="Nothing matches these filters."
                />
              </td>
            </tr>
          ) : (
            pageRows.map((r, i) => (
              <tr
                key={r.id ?? i}
                onClick={onRowClick ? () => onRowClick(r) : undefined}
                style={onRowClick ? { cursor: "pointer" } : undefined}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={c.num ? "num" : c.mono ? "ref" : ""}
                  >
                    {c.render ? c.render(r) : (r[c.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            borderTop: "var(--tk-rule-strong)",
            background: "var(--tk-paper-2)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "var(--tk-line-soft)",
          }}
        >
          <span>
            Showing {(page - 1) * pageSize + 1}&ndash;
            {Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </span>
          <Pagination page={page} total={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
