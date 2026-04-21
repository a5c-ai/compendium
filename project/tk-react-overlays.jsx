/* eslint-disable no-undef */
/**
 * a5c.ai component primitives — overlays & pickers
 */

// ═══════════════════════════════════════════════════════════════
// Popover anchor (positions child beneath trigger)
// ═══════════════════════════════════════════════════════════════
const usePopoverPos = (triggerRef, open, placement = 'bottom-start') => {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const update = () => {
      const r = triggerRef.current.getBoundingClientRect();
      let top = r.bottom + 4;
      let left = r.left;
      if (placement === 'bottom-end') left = r.right;
      if (placement === 'top-start') top = r.top - 4;
      setPos({ top: top + window.scrollY, left: left + window.scrollX, width: r.width });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, placement]);
  return pos;
};

// ═══════════════════════════════════════════════════════════════
// Tooltip
// ═══════════════════════════════════════════════════════════════
const Tooltip = ({ text, children, placement = 'top', delay = 250 }) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);
  const timer = useRef(null);

  const update = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const top = (placement === 'bottom' ? r.bottom + 8 : r.top - 8) + window.scrollY;
    const left = r.left + r.width / 2 + window.scrollX;
    setPos({ top, left });
  };

  const on  = () => { clearTimeout(timer.current); timer.current = setTimeout(() => { update(); setShow(true); }, delay); };
  const off = () => { clearTimeout(timer.current); setShow(false); };

  return (
    <>
      {React.cloneElement(children, {
        ref: (el) => {
          ref.current = el;
          const { ref: orig } = children;
          if (typeof orig === 'function') orig(el);
          else if (orig && 'current' in orig) orig.current = el;
        },
        onMouseEnter: on, onMouseLeave: off,
        onFocus: on, onBlur: off,
      })}
      {show && (
        <Portal>
          <div
            className="tkc-tip"
            style={{
              top: pos.top, left: pos.left,
              transform: `translate(-50%, ${placement === 'bottom' ? '0' : '-100%'})`,
            }}
          >
            {text}
          </div>
        </Portal>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// Select (single)
// ═══════════════════════════════════════════════════════════════
const Select = ({ value, defaultValue, onChange, options, placeholder = 'Select…', disabled }) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const trigger = useRef(null);
  const panel = useRef(null);
  const pos = usePopoverPos(trigger, open);

  const opts = options.map((o) => typeof o === 'string' ? { value: o, label: o } : o);
  useOutside(panel, () => setOpen(false), open);
  useKey('Escape', () => setOpen(false), open);

  const selected = opts.find((o) => o.value === v);

  const onKey = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { setOpen(true); e.preventDefault(); }
      return;
    }
    if (e.key === 'ArrowDown') { setActive((a) => (a + 1) % opts.length); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { setActive((a) => (a - 1 + opts.length) % opts.length); e.preventDefault(); }
    else if (e.key === 'Enter') { set(opts[active].value); setOpen(false); e.preventDefault(); }
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="tkc-select tkc-focus"
        data-open={open || undefined}
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKey}
      >
        <span className={selected ? '' : 'tkc-select__placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="tkc-select__caret"><Icon name="chevronDown" size={12} /></span>
      </button>
      {open && (
        <Portal>
          <div
            ref={panel}
            className="tkc-pop"
            style={{ top: pos.top, left: pos.left, minWidth: pos.width }}
            onKeyDown={onKey}
          >
            {opts.map((o, i) => (
              <div
                key={o.value}
                className="tkc-pop__item"
                data-active={i === active || undefined}
                data-selected={o.value === v || undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => { set(o.value); setOpen(false); }}
              >
                <span>{o.label}</span>
                <span className="tkc-pop__check"><Icon name="check" size={12} /></span>
              </div>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// Combobox (filterable select)
// ═══════════════════════════════════════════════════════════════
const Combobox = ({ value, defaultValue, onChange, options, placeholder = 'Search…' }) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const trigger = useRef(null);
  const panel = useRef(null);
  const pos = usePopoverPos(trigger, open);

  const opts = options.map((o) => typeof o === 'string' ? { value: o, label: o } : o);
  const filtered = opts.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
  const selected = opts.find((o) => o.value === v);

  useOutside(panel, () => setOpen(false), open);
  useKey('Escape', () => setOpen(false), open);

  const onKey = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key.length === 1)) setOpen(true);
    if (e.key === 'ArrowDown') { setActive((a) => Math.min(filtered.length - 1, a + 1)); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { setActive((a) => Math.max(0, a - 1)); e.preventDefault(); }
    else if (e.key === 'Enter' && filtered[active]) { set(filtered[active].value); setQuery(''); setOpen(false); e.preventDefault(); }
  };

  return (
    <>
      <div
        ref={trigger}
        className="tkc-input"
        style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'text' }}
        onClick={() => setOpen(true)}
        data-open={open || undefined}
      >
        <Icon name="search" size={13} style={{ color: 'var(--tkc-ink-quiet)' }} />
        <input
          style={{ border: 0, background: 'transparent', outline: 0, flex: 1, font: 'inherit', color: 'inherit' }}
          placeholder={selected ? selected.label : placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKey}
        />
      </div>
      {open && (
        <Portal>
          <div
            ref={panel}
            className="tkc-pop"
            style={{ top: pos.top, left: pos.left, minWidth: pos.width }}
          >
            {filtered.length === 0 ? (
              <div className="tkc-pop__empty">No matches</div>
            ) : filtered.map((o, i) => (
              <div
                key={o.value}
                className="tkc-pop__item"
                data-active={i === active || undefined}
                data-selected={o.value === v || undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => { set(o.value); setQuery(''); setOpen(false); }}
              >
                <span>{o.label}</span>
              </div>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// MultiSelect
// ═══════════════════════════════════════════════════════════════
const MultiSelect = ({ value, defaultValue = [], onChange, options, placeholder = 'Select…' }) => {
  const [vals, set] = useCtrl(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const trigger = useRef(null);
  const panel = useRef(null);
  const pos = usePopoverPos(trigger, open);
  const opts = options.map((o) => typeof o === 'string' ? { value: o, label: o } : o);
  const filtered = opts.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
  useOutside(panel, () => setOpen(false), open);
  useKey('Escape', () => setOpen(false), open);

  const toggle = (val) => {
    set(vals.includes(val) ? vals.filter((x) => x !== val) : [...vals, val]);
  };
  const remove = (val) => set(vals.filter((x) => x !== val));

  const selectedOpts = vals.map((val) => opts.find((o) => o.value === val)).filter(Boolean);

  return (
    <>
      <div
        ref={trigger}
        className="tkc-input"
        style={{ padding: '5px 8px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 5, cursor: 'text', minHeight: 36 }}
        onClick={() => setOpen(true)}
        data-open={open || undefined}
      >
        {selectedOpts.map((o) => (
          <Tag key={o.value} onRemove={(e) => { e.stopPropagation(); remove(o.value); }}>{o.label}</Tag>
        ))}
        <input
          style={{ border: 0, background: 'transparent', outline: 0, flex: 1, minWidth: 80, font: 'inherit', color: 'inherit' }}
          placeholder={selectedOpts.length ? '' : placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {open && (
        <Portal>
          <div
            ref={panel}
            className="tkc-pop"
            style={{ top: pos.top, left: pos.left, minWidth: pos.width }}
          >
            {filtered.length === 0 ? (
              <div className="tkc-pop__empty">No matches</div>
            ) : filtered.map((o) => (
              <div
                key={o.value}
                className="tkc-pop__item"
                data-selected={vals.includes(o.value) || undefined}
                onClick={() => toggle(o.value)}
              >
                <Checkbox checked={vals.includes(o.value)} onChange={() => {}} />
                <span>{o.label}</span>
              </div>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// SearchAutocomplete (Combobox with free text)
// ═══════════════════════════════════════════════════════════════
const SearchAutocomplete = ({ suggestions, onSelect, placeholder = 'Search the codex…' }) => {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const trigger = useRef(null);
  const panel = useRef(null);
  const pos = usePopoverPos(trigger, open);
  const matches = q ? suggestions.filter((s) => (typeof s === 'string' ? s : s.label).toLowerCase().includes(q.toLowerCase())) : [];
  useOutside(panel, () => setOpen(false), open);
  useKey('Escape', () => setOpen(false), open);

  const pick = (s) => {
    const label = typeof s === 'string' ? s : s.label;
    setQ(label); setOpen(false);
    onSelect && onSelect(s);
  };

  return (
    <>
      <div
        ref={trigger}
        className="tkc-input"
        style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}
        data-open={open || undefined}
      >
        <Icon name="search" size={13} style={{ color: 'var(--tkc-ink-quiet)' }} />
        <input
          style={{ border: 0, background: 'transparent', outline: 0, flex: 1, font: 'inherit', color: 'inherit' }}
          placeholder={placeholder}
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => q && setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { setActive((a) => Math.min(matches.length - 1, a + 1)); e.preventDefault(); }
            else if (e.key === 'ArrowUp') { setActive((a) => Math.max(0, a - 1)); e.preventDefault(); }
            else if (e.key === 'Enter' && matches[active]) { pick(matches[active]); }
          }}
        />
      </div>
      {open && matches.length > 0 && (
        <Portal>
          <div ref={panel} className="tkc-pop" style={{ top: pos.top, left: pos.left, minWidth: pos.width }}>
            {matches.map((s, i) => {
              const label = typeof s === 'string' ? s : s.label;
              const hint = typeof s === 'string' ? null : s.hint;
              return (
                <div key={i} className="tkc-pop__item" data-active={i === active || undefined}
                     onMouseEnter={() => setActive(i)}
                     onClick={() => pick(s)}>
                  <span>{label}</span>
                  {hint && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tkc-ink-quiet)', letterSpacing: '.1em' }}>{hint}</span>}
                </div>
              );
            })}
          </div>
        </Portal>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// Dropdown menu (generic popover with items)
// ═══════════════════════════════════════════════════════════════
const Menu = ({ trigger, items, placement = 'bottom-start' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const panel = useRef(null);
  const pos = usePopoverPos(ref, open, placement);
  useOutside(panel, () => setOpen(false), open);
  useKey('Escape', () => setOpen(false), open);
  return (
    <>
      {React.cloneElement(trigger, {
        ref,
        onClick: (e) => { trigger.props.onClick && trigger.props.onClick(e); setOpen((o) => !o); },
      })}
      {open && (
        <Portal>
          <div ref={panel} className="tkc-pop" style={{ top: pos.top, left: pos.left }}>
            {items.map((it, i) => (
              it.type === 'group' ? <div key={i} className="tkc-pop__group">{it.label}</div> :
              it.type === 'sep'   ? <div key={i} style={{ height: 1, background: 'var(--tkc-rule-m)', margin: '4px 0' }} /> :
              <div key={i} className="tkc-pop__item"
                   data-disabled={it.disabled || undefined}
                   onClick={() => { if (!it.disabled) { it.onClick && it.onClick(); setOpen(false); } }}>
                {it.icon && <Icon name={it.icon} size={13} />}
                <span>{it.label}</span>
                {it.shortcut && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--tkc-ink-quiet)' }}>{it.shortcut}</span>}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// Modal / Dialog
// ═══════════════════════════════════════════════════════════════
const Modal = ({ open, onClose, title, children, footer }) => {
  useKey('Escape', () => onClose && onClose(), open);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);
  if (!open) return null;
  return (
    <Portal>
      <div className="tkc-scrim" onClick={onClose} />
      <div className="tkc-modal" role="dialog" aria-modal="true">
        {title && (
          <div className="tkc-modal__head">
            <span style={{ flex: 1 }}>{title}</span>
            <button type="button" className="tkc-toast__x" onClick={onClose} aria-label="close">
              <Icon name="x" size={14} />
            </button>
          </div>
        )}
        <div className="tkc-modal__body">{children}</div>
        {footer && <div className="tkc-modal__foot">{footer}</div>}
      </div>
    </Portal>
  );
};

// ═══════════════════════════════════════════════════════════════
// Drawer (right-side sheet)
// ═══════════════════════════════════════════════════════════════
const Drawer = ({ open, onClose, title, children, footer, width }) => {
  useKey('Escape', () => onClose && onClose(), open);
  if (!open) return null;
  return (
    <Portal>
      <div className="tkc-scrim" onClick={onClose} />
      <div className="tkc-drawer" style={width ? { width } : null} role="dialog" aria-modal="true">
        {title && (
          <div className="tkc-drawer__head">
            <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18 }}>{title}</span>
            <button type="button" className="tkc-toast__x" onClick={onClose} aria-label="close">
              <Icon name="x" size={14} />
            </button>
          </div>
        )}
        <div className="tkc-drawer__body">{children}</div>
        {footer && <div className="tkc-drawer__foot">{footer}</div>}
      </div>
    </Portal>
  );
};

// ═══════════════════════════════════════════════════════════════
// Toast
// ═══════════════════════════════════════════════════════════════
const ToastCtx = createContext(null);
const ToastProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [closing, setClosing] = useState({});
  const push = useCallback((t) => {
    const id = Math.random().toString(36).slice(2, 9);
    const item = { id, kind: 'info', duration: 4500, ...(typeof t === 'string' ? { title: t } : t) };
    setList((l) => [...l, item]);
    if (item.duration) setTimeout(() => close(id), item.duration);
    return id;
  }, []);
  const close = useCallback((id) => {
    setClosing((c) => ({ ...c, [id]: true }));
    setTimeout(() => {
      setList((l) => l.filter((t) => t.id !== id));
      setClosing((c) => { const n = { ...c }; delete n[id]; return n; });
    }, 220);
  }, []);
  return (
    <ToastCtx.Provider value={{ push, close }}>
      {children}
      <div className="tkc-toasts">
        {list.map((t, i) => (
          <div
            key={t.id}
            className={cx('tkc-toast', t.kind && `tkc-toast--${t.kind}`)}
            data-closing={closing[t.id] || undefined}
          >
            <span className="tkc-toast__num">
              {t.kind === 'success' ? '✓' : t.kind === 'warn' ? '!' : t.kind === 'error' ? '×' : (i + 1)}
            </span>
            <div className="tkc-toast__body">
              {t.title && <div className="t">{t.title}</div>}
              {t.message && <div className="s">{t.message}</div>}
            </div>
            <button type="button" className="tkc-toast__x" onClick={() => close(t.id)} aria-label="dismiss">
              <Icon name="x" size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};
const useToasts = () => useContext(ToastCtx);

// ═══════════════════════════════════════════════════════════════
// DatePicker
// ═══════════════════════════════════════════════════════════════
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const CalGrid = ({ view, setView, selected, onSelect, range, today = new Date() }) => {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = [];
  // prev month tail
  const prevEnd = new Date(view.getFullYear(), view.getMonth(), 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) cells.push({ d: new Date(view.getFullYear(), view.getMonth() - 1, prevEnd - i), other: true });
  for (let i = 1; i <= daysInMonth; i++) cells.push({ d: new Date(view.getFullYear(), view.getMonth(), i), other: false });
  while (cells.length % 7 !== 0 || cells.length < 42) cells.push({ d: new Date(view.getFullYear(), view.getMonth() + 1, cells.length - daysInMonth - startDay + 1), other: true });

  return (
    <div className="tkc-cal">
      <div className="tkc-cal__head">
        <button type="button" className="tkc-btn tkc-btn--ghost tkc-btn--sm" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1))}>
          <Icon name="chevronRight" size={12} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className="tkc-cal__title">{MONTHS[view.getMonth()]} {view.getFullYear()}</div>
        <button type="button" className="tkc-btn tkc-btn--ghost tkc-btn--sm" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1))}>
          <Icon name="chevronRight" size={12} />
        </button>
      </div>
      <div className="tkc-cal__grid">
        {DOW.map((d) => <div key={d} className="tkc-cal__dow">{d}</div>)}
        {cells.map((c, i) => {
          let selAttrs = {};
          if (range) {
            const [s, e] = range;
            if (s && e) {
              if (sameDay(c.d, s)) selAttrs['data-selected'] = true;
              else if (sameDay(c.d, e)) selAttrs['data-selected'] = true;
              else if (c.d > s && c.d < e) selAttrs['data-in-range'] = true;
              if (sameDay(c.d, s)) selAttrs['data-range-start'] = true;
              if (sameDay(c.d, e)) selAttrs['data-range-end'] = true;
            } else if (s && sameDay(c.d, s)) selAttrs['data-selected'] = true;
          } else {
            if (sameDay(c.d, selected)) selAttrs['data-selected'] = true;
          }
          return (
            <button
              type="button" key={i} className="tkc-cal__day"
              data-other={c.other || undefined}
              data-today={sameDay(c.d, today) || undefined}
              {...selAttrs}
              onClick={() => onSelect(c.d)}
            >
              {c.d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const DatePicker = ({ value, defaultValue, onChange, placeholder = 'Select a date' }) => {
  const [v, set] = useCtrl(value, defaultValue || null, onChange);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => v || new Date());
  const trigger = useRef(null);
  const panel = useRef(null);
  const pos = usePopoverPos(trigger, open);
  useOutside(panel, () => setOpen(false), open);
  useKey('Escape', () => setOpen(false), open);

  const fmt = (d) => d ? `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}` : '';

  return (
    <>
      <button ref={trigger} type="button" className="tkc-select tkc-focus" data-open={open || undefined} onClick={() => setOpen((o) => !o)}>
        <Icon name="calendar" size={13} style={{ color: 'var(--tkc-ink-soft)' }} />
        <span className={v ? '' : 'tkc-select__placeholder'}>{v ? fmt(v) : placeholder}</span>
        <span className="tkc-select__caret"><Icon name="chevronDown" size={12} /></span>
      </button>
      {open && (
        <Portal>
          <div ref={panel} className="tkc-pop" style={{ top: pos.top, left: pos.left, padding: 0 }}>
            <CalGrid view={view} setView={setView} selected={v} onSelect={(d) => { set(d); setOpen(false); }} />
          </div>
        </Portal>
      )}
    </>
  );
};

const DateRangePicker = ({ value, defaultValue = [null, null], onChange, placeholder = 'Select range' }) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => v[0] || new Date());
  const trigger = useRef(null);
  const panel = useRef(null);
  const pos = usePopoverPos(trigger, open);
  useOutside(panel, () => setOpen(false), open);
  useKey('Escape', () => setOpen(false), open);

  const handle = (d) => {
    const [s, e] = v;
    if (!s || (s && e)) set([d, null]);
    else if (d < s) set([d, s]);
    else { set([s, d]); setOpen(false); }
  };
  const fmt = (d) => d ? `${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}/${d.getFullYear()}` : '—';
  return (
    <>
      <button ref={trigger} type="button" className="tkc-select tkc-focus" data-open={open || undefined} onClick={() => setOpen((o) => !o)} style={{ minWidth: 240 }}>
        <Icon name="calendar" size={13} style={{ color: 'var(--tkc-ink-soft)' }} />
        <span className={v[0] ? '' : 'tkc-select__placeholder'}>{v[0] || v[1] ? `${fmt(v[0])} → ${fmt(v[1])}` : placeholder}</span>
        <span className="tkc-select__caret"><Icon name="chevronDown" size={12} /></span>
      </button>
      {open && (
        <Portal>
          <div ref={panel} className="tkc-pop" style={{ top: pos.top, left: pos.left, padding: 0 }}>
            <CalGrid view={view} setView={setView} range={v} onSelect={handle} />
          </div>
        </Portal>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// TimePicker (HH:MM in 5-min steps)
// ═══════════════════════════════════════════════════════════════
const TimePicker = ({ value, defaultValue, onChange, step = 5 }) => {
  const [v, set] = useCtrl(value, defaultValue || '09:00', onChange);
  const [h, m] = v.split(':').map(Number);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const mins = Array.from({ length: 60 / step }, (_, i) => i * step);
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const panel = useRef(null);
  const pos = usePopoverPos(trigger, open);
  useOutside(panel, () => setOpen(false), open);
  useKey('Escape', () => setOpen(false), open);

  const setH = (nh) => set(`${String(nh).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
  const setM = (nm) => set(`${String(h).padStart(2,'0')}:${String(nm).padStart(2,'0')}`);

  const colStyle = { maxHeight: 160, overflow: 'auto', padding: 2, borderRight: '1px solid var(--tkc-rule-m)' };

  return (
    <>
      <button ref={trigger} type="button" className="tkc-select tkc-focus" data-open={open || undefined} onClick={() => setOpen((o) => !o)} style={{ minWidth: 130 }}>
        <Icon name="clock" size={13} style={{ color: 'var(--tkc-ink-soft)' }} />
        <span>{v}</span>
        <span className="tkc-select__caret"><Icon name="chevronDown" size={12} /></span>
      </button>
      {open && (
        <Portal>
          <div ref={panel} className="tkc-pop" style={{ top: pos.top, left: pos.left, padding: 0, display: 'flex', minWidth: 160 }}>
            <div style={colStyle}>
              {hours.map((nh) => (
                <div key={nh} className="tkc-pop__item" data-selected={nh === h || undefined} onClick={() => setH(nh)}>
                  <span>{String(nh).padStart(2,'0')}</span>
                </div>
              ))}
            </div>
            <div style={{ maxHeight: 160, overflow: 'auto', padding: 2 }}>
              {mins.map((nm) => (
                <div key={nm} className="tkc-pop__item" data-selected={nm === m || undefined} onClick={() => setM(nm)}>
                  <span>{String(nm).padStart(2,'0')}</span>
                </div>
              ))}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// FileUpload / Dropzone
// ═══════════════════════════════════════════════════════════════
const FileUpload = ({ onFiles, accept, multiple = true, hint = 'Drop files here, or click to browse' }) => {
  const [over, setOver] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const handle = (fs) => {
    const arr = [...fs];
    setFiles(arr);
    onFiles && onFiles(arr);
  };
  return (
    <>
      <div
        className="tkc-drop"
        data-over={over || undefined}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files); }}
      >
        <div style={{ fontSize: 28, color: 'var(--tkc-ink-soft)' }}>
          <Icon name="upload" size={28} />
        </div>
        <div className="tkc-drop__title">Deposit the parcel</div>
        <div className="tkc-drop__sub">{hint}</div>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple}
               style={{ display: 'none' }} onChange={(e) => handle(e.target.files)} />
      </div>
      {files.length > 0 && (
        <div style={{ marginTop: 10, display: 'grid', gap: 6 }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--tkc-ink)' }}>
              <Icon name="file" size={14} style={{ color: 'var(--tkc-ink-soft)' }} />
              <span style={{ flex: 1 }}>{f.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tkc-ink-quiet)' }}>{(f.size / 1024).toFixed(1)} KB</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

Object.assign(window, {
  Tooltip, Select, Combobox, MultiSelect, SearchAutocomplete, Menu,
  Modal, Drawer, ToastProvider, useToasts,
  DatePicker, DateRangePicker, TimePicker, FileUpload,
  CalGrid, sameDay,
});
