/* eslint-disable no-undef */
/**
 * a5c.ai component primitives — core controls
 * Button, Toggle, Checkbox, Radio, Slider, RangeSlider, Stepper,
 * Input, Textarea, Field, Tag, InlineEdit, ColorPicker, Progress, Spinner, Skeleton
 */

// ═══════════════════════════════════════════════════════════════
// Button
// ═══════════════════════════════════════════════════════════════
const Button = ({
  variant = 'default', size, loading, disabled, leading, trailing,
  className, children, onClick, ...rest
}) => {
  const cls = cx(
    'tkc-btn',
    variant === 'primary' && 'tkc-btn--primary',
    variant === 'ghost'   && 'tkc-btn--ghost',
    size === 'sm' && 'tkc-btn--sm',
    className
  );
  return (
    <button
      className={cls}
      disabled={disabled}
      data-loading={loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {loading && <span className="tkc-btn__spin" />}
      {!loading && leading}
      {children}
      {!loading && trailing}
    </button>
  );
};

const IconButton = ({ icon, label, ...rest }) => (
  <Button className="tkc-btn--icon" aria-label={label} title={label} {...rest}>
    <Icon name={icon} size={14} />
  </Button>
);

// ═══════════════════════════════════════════════════════════════
// Toggle switch
// ═══════════════════════════════════════════════════════════════
const Toggle = ({ checked, defaultChecked, onChange, disabled, label }) => {
  const [on, set] = useCtrl(checked, !!defaultChecked, onChange);
  const toggle = () => { if (!disabled) set(!on); };
  const control = (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className="tkc-toggle tkc-focus"
      data-on={on || undefined}
      data-disabled={disabled || undefined}
      onClick={toggle}
    >
      <span className="tkc-toggle__knob" />
    </button>
  );
  if (label) {
    return (
      <label className="tkc-check-row" style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
        {control}
        <span>{label}</span>
      </label>
    );
  }
  return control;
};

// ═══════════════════════════════════════════════════════════════
// Checkbox (supports indeterminate)
// ═══════════════════════════════════════════════════════════════
const Checkbox = ({ checked, defaultChecked, indeterminate, onChange, disabled, label }) => {
  const [on, set] = useCtrl(checked, !!defaultChecked, onChange);
  const toggle = () => { if (!disabled) set(!on); };
  const control = (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : on}
      className="tkc-check tkc-focus"
      data-checked={(on && !indeterminate) || undefined}
      data-indeterminate={indeterminate || undefined}
      onClick={toggle}
      disabled={disabled}
      style={disabled ? { opacity: .5, cursor: 'not-allowed' } : null}
    >
      {indeterminate
        ? <svg className="tkc-check__mark tkc-check__mark--dash" width="12" height="12" viewBox="0 0 16 16"><path d="M4 8h8" /></svg>
        : <svg className="tkc-check__mark" width="12" height="12" viewBox="0 0 16 16"><path d="M3.5 8l3 3 6-7" /></svg>}
    </button>
  );
  if (label) {
    return (
      <label className="tkc-check-row" style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
        {control}
        <span>{label}</span>
      </label>
    );
  }
  return control;
};

// ═══════════════════════════════════════════════════════════════
// Radio group
// ═══════════════════════════════════════════════════════════════
const RadioGroup = ({ value, defaultValue, onChange, options, name, disabled, direction = 'vertical' }) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const gid = useId('rg');
  return (
    <div style={{ display: direction === 'horizontal' ? 'flex' : 'grid', gap: 10, flexWrap: 'wrap' }} role="radiogroup">
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const lab = typeof opt === 'string' ? opt : opt.label;
        const dis = disabled || (opt.disabled);
        const checked = v === val;
        return (
          <label key={val} className="tkc-check-row" style={{ cursor: dis ? 'not-allowed' : 'pointer', opacity: dis ? .5 : 1 }}>
            <button
              type="button"
              role="radio"
              aria-checked={checked}
              className="tkc-radio tkc-focus"
              data-checked={checked || undefined}
              onClick={() => !dis && set(val)}
              name={name || gid}
            >
              <span className="tkc-radio__dot" />
            </button>
            <span>{lab}</span>
          </label>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Slider (single value)
// ═══════════════════════════════════════════════════════════════
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

const Slider = ({ value, defaultValue = 50, onChange, min = 0, max = 100, step = 1, ticks, format }) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const ref = useRef(null);
  const [drag, setDrag] = useState(false);

  const toPct = (n) => ((n - min) / (max - min)) * 100;
  const fromEvt = useCallback((clientX) => {
    const r = ref.current.getBoundingClientRect();
    const pct = clamp((clientX - r.left) / r.width, 0, 1);
    const raw = min + pct * (max - min);
    const stepped = Math.round(raw / step) * step;
    return clamp(stepped, min, max);
  }, [min, max, step]);

  const onDown = (e) => {
    e.preventDefault();
    setDrag(true);
    set(fromEvt(e.clientX ?? e.touches[0].clientX));
  };
  useEffect(() => {
    if (!drag) return;
    const move = (e) => {
      const x = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
      if (x != null) set(fromEvt(x));
    };
    const up = () => setDrag(false);
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    document.addEventListener('mouseup', up);
    document.addEventListener('touchend', up);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchend', up);
    };
  }, [drag, fromEvt, set]);

  const key = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(clamp(v - step, min, max)); e.preventDefault(); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(clamp(v + step, min, max)); e.preventDefault(); }
  };

  const pct = toPct(v);
  return (
    <div className="tkc-slider" ref={ref} data-dragging={drag || undefined} onMouseDown={onDown} onTouchStart={onDown}>
      {ticks && (
        <div className="tkc-slider__ticks">
          {Array.from({ length: ticks }).map((_, i) => (
            <div key={i} className="tkc-slider__tick" style={{ left: `${(i / (ticks - 1)) * 100}%` }} />
          ))}
        </div>
      )}
      <div className="tkc-slider__track" />
      <div className="tkc-slider__fill" style={{ left: 0, width: `${pct}%` }} />
      <div
        className="tkc-slider__thumb tkc-focus"
        style={{ left: `${pct}%` }}
        role="slider"
        aria-valuemin={min} aria-valuemax={max} aria-valuenow={v}
        tabIndex={0}
        onKeyDown={key}
      >
        <span className="tkc-slider__value" style={{ left: '50%' }}>
          {format ? format(v) : v}
        </span>
      </div>
    </div>
  );
};

// Range slider (two thumbs)
const RangeSlider = ({ value, defaultValue = [20, 80], onChange, min = 0, max = 100, step = 1, format }) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const ref = useRef(null);
  const [drag, setDrag] = useState(null); // 0 | 1 | null

  const toPct = (n) => ((n - min) / (max - min)) * 100;
  const fromEvt = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    const pct = clamp((clientX - r.left) / r.width, 0, 1);
    const raw = min + pct * (max - min);
    return clamp(Math.round(raw / step) * step, min, max);
  };

  const onDown = (idx) => (e) => {
    e.preventDefault(); e.stopPropagation();
    setDrag(idx);
  };

  useEffect(() => {
    if (drag == null) return;
    const move = (e) => {
      const x = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
      if (x == null) return;
      const n = fromEvt(x);
      const nv = [...v];
      nv[drag] = n;
      if (nv[0] > nv[1]) nv.reverse();
      set(nv);
    };
    const up = () => setDrag(null);
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    document.addEventListener('mouseup', up);
    document.addEventListener('touchend', up);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchend', up);
    };
  }, [drag, v]);

  const [a, b] = v;
  return (
    <div className="tkc-slider" ref={ref} data-dragging={drag != null || undefined}>
      <div className="tkc-slider__track" />
      <div className="tkc-slider__fill" style={{ left: `${toPct(a)}%`, width: `${toPct(b) - toPct(a)}%` }} />
      {[a, b].map((val, i) => (
        <div
          key={i}
          className="tkc-slider__thumb tkc-focus"
          style={{ left: `${toPct(val)}%`, zIndex: 2 + i }}
          role="slider" tabIndex={0}
          aria-valuemin={min} aria-valuemax={max} aria-valuenow={val}
          onMouseDown={onDown(i)} onTouchStart={onDown(i)}
        >
          <span className="tkc-slider__value" style={{ left: '50%' }}>
            {format ? format(val) : val}
          </span>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Stepper
// ═══════════════════════════════════════════════════════════════
const Stepper = ({ value, defaultValue = 0, onChange, min = -Infinity, max = Infinity, step = 1 }) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const dec = () => set(clamp(v - step, min, max));
  const inc = () => set(clamp(v + step, min, max));
  return (
    <div className="tkc-stepper">
      <button type="button" onClick={dec} disabled={v <= min} aria-label="decrease">
        <Icon name="minus" size={12} />
      </button>
      <input
        type="text"
        value={v}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          if (!Number.isNaN(n)) set(clamp(n, min, max));
          else if (e.target.value === '' || e.target.value === '-') set(e.target.value);
        }}
        onBlur={(e) => {
          const n = parseFloat(e.target.value);
          set(Number.isNaN(n) ? 0 : clamp(n, min, max));
        }}
      />
      <button type="button" onClick={inc} disabled={v >= max} aria-label="increase">
        <Icon name="plus" size={12} />
      </button>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Input / Textarea / Field
// ═══════════════════════════════════════════════════════════════
const Input = React.forwardRef(({ className, invalid, ...rest }, ref) => (
  <input ref={ref} className={cx('tkc-input', invalid && 'tkc-input--invalid', className)} {...rest} />
));
const Textarea = React.forwardRef(({ className, invalid, rows = 3, ...rest }, ref) => (
  <textarea ref={ref} className={cx('tkc-textarea', invalid && 'tkc-input--invalid', className)} rows={rows} style={{ resize: 'vertical' }} {...rest} />
));
const Field = ({ label, hint, error, children }) => (
  <label className="tkc-field">
    {label && <span className="tkc-field__label">{label}</span>}
    {children}
    {error ? <span className="tkc-field__error">{error}</span> :
     hint  ? <span className="tkc-field__hint">{hint}</span> : null}
  </label>
);

// ═══════════════════════════════════════════════════════════════
// Tag (dismissable chip)
// ═══════════════════════════════════════════════════════════════
const Tag = ({ children, onRemove, removing }) => (
  <span className={cx('tkc-tag', removing && 'tkc-tag--removing')}>
    {children}
    {onRemove && (
      <button type="button" className="tkc-tag__x" onClick={onRemove} aria-label="remove">
        <Icon name="x" size={10} />
      </button>
    )}
  </span>
);

// TagInput — list + input
const TagInput = ({ value, defaultValue = [], onChange, placeholder = 'Add tag…' }) => {
  const [tags, set] = useCtrl(value, defaultValue, onChange);
  const [draft, setDraft] = useState('');
  const [removing, setRemoving] = useState(null);
  const add = () => {
    const t = draft.trim();
    if (!t) return;
    if (tags.includes(t)) { setDraft(''); return; }
    set([...tags, t]); setDraft('');
  };
  const removeAt = (i) => {
    setRemoving(i);
    setTimeout(() => { set(tags.filter((_, j) => j !== i)); setRemoving(null); }, 200);
  };
  return (
    <div className="tkc-input" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', padding: 6 }}>
      {tags.map((t, i) => (
        <Tag key={i} removing={removing === i} onRemove={() => removeAt(i)}>{t}</Tag>
      ))}
      <input
        style={{ border: 0, background: 'transparent', outline: 0, flex: 1, minWidth: 80, font: 'inherit', color: 'inherit' }}
        placeholder={placeholder}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); }
          else if (e.key === 'Backspace' && draft === '' && tags.length) { removeAt(tags.length - 1); }
        }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// InlineEdit
// ═══════════════════════════════════════════════════════════════
const InlineEdit = ({ value, defaultValue = '', onChange, placeholder = 'edit…' }) => {
  const [v, set] = useCtrl(value, defaultValue, onChange);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(v);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const commit = () => { set(draft); setEditing(false); };
  const cancel = () => { setDraft(v); setEditing(false); };

  if (editing) {
    return (
      <span className="tkc-inline" style={{ borderBottomColor: 'var(--tkc-cinnabar)' }}>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            else if (e.key === 'Escape') cancel();
          }}
          style={{ width: Math.max(40, (draft.length + 1) * 8) }}
        />
      </span>
    );
  }
  return (
    <span className="tkc-inline" onClick={() => { setDraft(v); setEditing(true); }}>
      <span>{v || <em style={{ color: 'var(--tkc-ink-quiet)' }}>{placeholder}</em>}</span>
      <Icon name="pencil" size={11} className="tkc-inline__pencil" />
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════
// ColorPicker (swatches)
// ═══════════════════════════════════════════════════════════════
const ColorPicker = ({
  value, defaultValue, onChange,
  colors = ['#C03A2B', '#B37E3E', '#2F6F5E', '#2B2A6B', '#8E1B1B', '#D9A96A', '#2E7C8A', '#1B1611', '#F0E6D1'],
}) => {
  const [v, set] = useCtrl(value, defaultValue || colors[0], onChange);
  return (
    <div className="tkc-swatches">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          className="tkc-swatch"
          style={{ background: c }}
          data-selected={v === c || undefined}
          aria-label={c}
          onClick={() => set(c)}
        />
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Progress / Spinner / Skeleton
// ═══════════════════════════════════════════════════════════════
const Progress = ({ value, indeterminate, className }) => (
  <div className={cx('tkc-progress', indeterminate && 'tkc-progress--indeterminate', className)}>
    <div className="tkc-progress__bar" style={{ width: indeterminate ? undefined : `${clamp(value, 0, 100)}%` }} />
  </div>
);
const Spinner = ({ gear }) => <span className={gear ? 'tkc-spinner--gear' : 'tkc-spinner'} />;
const Skeleton = ({ w = '100%', h = 12, r = 3, className, style }) => (
  <span className={cx('tkc-skel', className)} style={{ width: w, height: h, borderRadius: r, ...style }} />
);

Object.assign(window, {
  Button, IconButton, Toggle, Checkbox, RadioGroup,
  Slider, RangeSlider, Stepper,
  Input, Textarea, Field,
  Tag, TagInput, InlineEdit, ColorPicker,
  Progress, Spinner, Skeleton,
  clamp,
});
