/* eslint-disable no-undef */
/**
 * a5c.ai component primitives — layout & navigation
 */

// ═══════════════════════════════════════════════════════════════
// Accordion
// ═══════════════════════════════════════════════════════════════
const Accordion = ({ items, defaultOpen = null, type = 'single' }) => {
  const [open, setOpen] = useState(
    type === 'single'
      ? (defaultOpen != null ? defaultOpen : null)
      : (Array.isArray(defaultOpen) ? defaultOpen : [])
  );
  const isOpen = (i) => type === 'single' ? open === i : open.includes(i);
  const toggle = (i) => {
    if (type === 'single') setOpen(open === i ? null : i);
    else setOpen(open.includes(i) ? open.filter((x) => x !== i) : [...open, i]);
  };
  return (
    <div className="tkc-acc">
      {items.map((it, i) => (
        <div key={i} className="tkc-acc__item" data-open={isOpen(i) || undefined}>
          <button type="button" className="tkc-acc__trigger" onClick={() => toggle(i)}>
            <span className="tkc-acc__num">{it.num || roman(i + 1)}</span>
            <span>{it.title}</span>
            <span className="tkc-acc__caret"><Icon name="chevronRight" size={12} /></span>
          </button>
          <div className="tkc-acc__panel">
            <div className="tkc-acc__body">{it.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const roman = (n) => {
  const map = [['X',10],['IX',9],['V',5],['IV',4],['I',1]];
  let r = ''; for (const [s, v] of map) { while (n >= v) { r += s; n -= v; } } return r;
};

// ═══════════════════════════════════════════════════════════════
// Tree view
// ═══════════════════════════════════════════════════════════════
const TreeNode = ({ node, depth = 0, expanded, setExpanded, selected, setSelected }) => {
  const isOpen = expanded.has(node.id);
  const hasKids = node.children && node.children.length > 0;
  return (
    <>
      <div
        className="tkc-tree__node"
        data-open={isOpen || undefined}
        data-selected={selected === node.id || undefined}
        style={{ paddingLeft: 6 + depth * 16 }}
        onClick={() => {
          setSelected(node.id);
          if (hasKids) {
            const n = new Set(expanded);
            n.has(node.id) ? n.delete(node.id) : n.add(node.id);
            setExpanded(n);
          }
        }}
      >
        <span className="tkc-tree__caret">
          {hasKids ? <Icon name="chevronRight" size={11} /> : null}
        </span>
        <Icon name={hasKids ? 'folder' : 'file'} size={13} style={{ color: 'var(--tkc-ink-soft)' }} />
        <span>{node.label}</span>
        {node.count != null && <span className="tkc-tree__count">{node.count}</span>}
      </div>
      {hasKids && isOpen && node.children.map((c) => (
        <TreeNode key={c.id} node={c} depth={depth + 1}
                  expanded={expanded} setExpanded={setExpanded}
                  selected={selected} setSelected={setSelected} />
      ))}
    </>
  );
};
const Tree = ({ data, defaultExpanded = [], defaultSelected = null, onSelect }) => {
  const [expanded, setExpanded] = useState(new Set(defaultExpanded));
  const [selected, setSelectedInternal] = useState(defaultSelected);
  const setSelected = (id) => { setSelectedInternal(id); onSelect && onSelect(id); };
  return (
    <div className="tkc-tree">
      {data.map((n) => (
        <TreeNode key={n.id} node={n} expanded={expanded} setExpanded={setExpanded}
                  selected={selected} setSelected={setSelected} />
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Breadcrumbs
// ═══════════════════════════════════════════════════════════════
const Breadcrumbs = ({ items, onNavigate }) => (
  <nav className="tkc-crumbs">
    {items.map((it, i) => (
      <Fragment key={i}>
        {i > 0 && <span className="sep">/</span>}
        {i === items.length - 1
          ? <span className="current">{it.label}</span>
          : <a onClick={() => onNavigate && onNavigate(it, i)}>{it.label}</a>}
      </Fragment>
    ))}
  </nav>
);

// ═══════════════════════════════════════════════════════════════
// Pagination
// ═══════════════════════════════════════════════════════════════
const Pagination = ({ page, defaultPage = 1, total, onChange, siblings = 1 }) => {
  const [p, set] = useCtrl(page, defaultPage, onChange);
  const go = (n) => { if (n >= 1 && n <= total) set(n); };
  const visible = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - p) <= siblings) visible.push(i);
    else if (visible[visible.length - 1] !== '…') visible.push('…');
  }
  return (
    <div className="tkc-pager">
      <button type="button" onClick={() => go(p - 1)} disabled={p === 1}>‹ Prev</button>
      {visible.map((it, i) =>
        it === '…'
          ? <button key={i} type="button" disabled>…</button>
          : <button key={i} type="button" data-active={it === p || undefined} onClick={() => go(it)}>{it}</button>
      )}
      <button type="button" onClick={() => go(p + 1)} disabled={p === total}>Next ›</button>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Tabs
// ═══════════════════════════════════════════════════════════════
const Tabs = ({ value, defaultValue, onChange, items }) => {
  const [v, set] = useCtrl(value, defaultValue || items[0]?.value, onChange);
  return (
    <div>
      <div className="tkc-tabs" role="tablist">
        {items.map((it) => (
          <button
            key={it.value}
            type="button"
            role="tab"
            className="tkc-tab"
            data-active={v === it.value || undefined}
            onClick={() => set(it.value)}
          >
            {it.label}
            {it.badge != null && <span className="tkc-badge" style={{ marginLeft: 8 }}>{it.badge}</span>}
          </button>
        ))}
      </div>
      {items.map((it) => (
        v === it.value
          ? <div key={it.value} role="tabpanel" style={{ paddingTop: 16 }}>{it.body}</div>
          : null
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Segmented control (with sliding thumb)
// ═══════════════════════════════════════════════════════════════
const Segmented = ({ value, defaultValue, onChange, options }) => {
  const [v, set] = useCtrl(value, defaultValue || options[0].value || options[0], onChange);
  const ref = useRef(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });
  const opts = options.map((o) => typeof o === 'string' ? { value: o, label: o } : o);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const active = ref.current.querySelector('[data-active="true"]');
    if (active) {
      const r = active.getBoundingClientRect();
      const pr = ref.current.getBoundingClientRect();
      setThumb({ left: r.left - pr.left, width: r.width });
    }
  }, [v]);

  return (
    <div ref={ref} className="tkc-seg">
      <span className="tkc-seg__thumb" style={{ left: thumb.left, width: thumb.width }} />
      {opts.map((o) => (
        <button
          key={o.value}
          type="button"
          className="tkc-seg__btn"
          data-active={v === o.value || undefined}
          onClick={() => set(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// EmptyState
// ═══════════════════════════════════════════════════════════════
const EmptyState = ({ icon = 'folder', title, message, action }) => (
  <div className="tkc-empty">
    <Icon name={icon} size={44} />
    <div className="tkc-empty__title">{title}</div>
    {message && <div className="tkc-empty__sub">{message}</div>}
    {action && <div style={{ marginTop: 14 }}>{action}</div>}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// DataTable (lightweight — sort + page + optional row click)
// ═══════════════════════════════════════════════════════════════
const DataTable = ({ columns, rows, defaultSort, pageSize = 10, onRowClick }) => {
  const [sort, setSort] = useState(defaultSort || { key: null, dir: 'asc' });
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sort.key) return rows;
    const col = columns.find((c) => c.key === sort.key);
    const get = col?.accessor || ((r) => r[sort.key]);
    return [...rows].sort((a, b) => {
      const av = get(a), bv = get(b);
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sort, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sort.key === key) setSort({ key, dir: sort.dir === 'asc' ? 'desc' : 'asc' });
    else setSort({ key, dir: 'asc' });
  };

  return (
    <div>
      <table className="tk-ledger">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}
                  onClick={c.sortable !== false ? () => toggleSort(c.key) : null}
                  className={c.num ? 'num' : ''}
                  aria-sort={sort.key === c.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  style={{
                    ...(c.width ? { width: c.width } : null),
                    ...(c.sortable !== false ? { cursor: 'pointer', userSelect: 'none' } : null),
                  }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {c.label}
                  {c.sortable !== false && (
                    <svg width="10" height="10" viewBox="0 0 10 10"
                         style={{ color: sort.key === c.key ? 'var(--tk-cinnabar)' : 'var(--tk-line-hair)' }}>
                      <path d={sort.key === c.key && sort.dir === 'desc' ? 'M2 4h6L5 8z' : 'M2 6h6L5 2z'} fill="currentColor" />
                    </svg>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.length === 0 ? (
            <tr><td colSpan={columns.length} style={{ padding: 0 }}>
              <EmptyState title="No records" message="Nothing matches these filters." />
            </td></tr>
          ) : pageRows.map((r, i) => (
            <tr key={r.id || i}
                onClick={onRowClick ? () => onRowClick(r) : null}
                style={onRowClick ? { cursor: 'pointer' } : null}>
              {columns.map((c) => (
                <td key={c.key} className={c.num ? 'num' : (c.mono ? 'ref' : '')}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderTop: 'var(--tk-rule-strong)', background: 'var(--tk-paper-2)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--tk-line-soft)' }}>
          <span>Showing {(page-1)*pageSize + 1}–{Math.min(page*pageSize, sorted.length)} of {sorted.length}</span>
          <Pagination page={page} total={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
};

Object.assign(window, {
  Accordion, Tree, Breadcrumbs, Pagination, Tabs, Segmented, EmptyState, DataTable, roman,
});
