/* eslint-disable no-undef */
/**
 * a5c.ai component primitives — base utilities
 * All components attach to window for cross-file use.
 */

const { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect, createContext, useContext, Fragment } = React;

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

const cx = (...parts) => parts.filter(Boolean).join(' ');

const useId = (prefix = 'tkc') => useMemo(
  () => prefix + '-' + Math.random().toString(36).slice(2, 9),
  []
);

const useOutside = (ref, onOut, when = true) => {
  useEffect(() => {
    if (!when) return;
    const h = (e) => {
      const r = ref.current;
      if (r && !r.contains(e.target)) onOut(e);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [when, onOut]);
};

const useKey = (key, handler, when = true) => {
  useEffect(() => {
    if (!when) return;
    const h = (e) => { if (e.key === key) handler(e); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [key, when, handler]);
};

// Simple controlled-or-uncontrolled state handler
const useCtrl = (value, defaultValue, onChange) => {
  const [internal, setInternal] = useState(defaultValue);
  const isCtrl = value !== undefined;
  const v = isCtrl ? value : internal;
  const set = useCallback((nv) => {
    if (!isCtrl) setInternal(nv);
    onChange && onChange(nv);
  }, [isCtrl, onChange]);
  return [v, set];
};

// ═══════════════════════════════════════════════════════════════
// Icons (SVG, monochrome via currentColor)
// ═══════════════════════════════════════════════════════════════
const Icon = ({ name, size = 14, className = '' }) => {
  const paths = {
    check:    'M4 8l3 3 5-7',
    dash:     'M4 8h8',
    caret:    'M6 4l4 4-4 4',
    x:        'M4 4l8 8M12 4l-8 8',
    plus:     'M8 3v10M3 8h10',
    minus:    'M3 8h10',
    search:   ['M7.5 13a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zM11.5 11.5L14 14', null],
    folder:   'M2 4.5C2 3.67 2.67 3 3.5 3h2.3l1 1.5H12.5c.83 0 1.5.67 1.5 1.5V12c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 0 1 2 12z',
    file:     'M4 2h5l3 3v9H4z M9 2v3h3',
    gear:     'M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3',
    calendar: 'M3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM3 7h10M5 3v2M11 3v2',
    clock:    ['M8 2.5A5.5 5.5 0 1 0 8 13.5 5.5 5.5 0 0 0 8 2.5zM8 5v3l2 1.5', null],
    pencil:   'M3 13l1-3 7-7 2 2-7 7-3 1z',
    upload:   'M8 11V3M5 6l3-3 3 3M3 13h10',
    bell:     'M4 11a4 4 0 0 1 8 0v1l1 1H3l1-1zM6 13a2 2 0 0 0 4 0',
    info:     ['M8 1.5A6.5 6.5 0 1 0 8 14.5 6.5 6.5 0 0 0 8 1.5zM8 7v4.5M8 5h.01', null],
    chevronRight: 'M6 3l5 5-5 5',
    chevronDown:  'M3 6l5 5 5-5',
  };
  const d = paths[name] || '';
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16"
         fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round"
         style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {Array.isArray(d)
        ? d.map((p, i) => p && <path key={i} d={p} />)
        : <path d={d} />}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// Portal — for overlays
// ═══════════════════════════════════════════════════════════════
const Portal = ({ children }) => {
  const [el] = useState(() => {
    const d = document.createElement('div');
    d.setAttribute('data-tkc-portal', '');
    return d;
  });
  useEffect(() => {
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, [el]);
  return ReactDOM.createPortal(children, el);
};

Object.assign(window, {
  cx, useId, useOutside, useKey, useCtrl, Icon, Portal,
  useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect,
  createContext, useContext, Fragment,
});
