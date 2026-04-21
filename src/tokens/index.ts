/**
 * @a5c-ai/compendium Design Tokens
 *
 * Import this module to load all design system CSS custom properties,
 * reset styles, and base typography. Also exports token values as
 * typed JavaScript constants for use in JS/TS contexts.
 */

import './index.css';

/* ==========================================================
   Color Tokens
   ========================================================== */

export const colors = {
  ground: {
    vellum:    '#EDE3CF',
    parchment: '#D9CBAE',
    void:      '#0B0A0F',
    ink:       '#181624',
  },
  ink: {
    pigment: '#1B1611',
    fade:    '#5A4E3C',
    ghost:   '#8C7E65',
  },
  glyph: {
    bone: '#F0E6D1',
    fade: '#A89980',
  },
  accent: {
    cinnabar: '#C03A2B',
    indigo:   '#2B2A6B',
    viridian: '#2F6F5E',
    sulphur:  '#D4A84B',
  },
  gem: {
    cyan:     '#16D7E6',
    magenta:  '#E23FB4',
    ruby:     '#D81F3D',
    emerald:  '#3EA676',
    amber:    '#E0A63A',
    deep:     '#4A2518',
    bronze:   '#C98A3E',
    bronzeDk: '#7C4E1F',
  },
  brass: {
    light:  '#F2C88F',
    base:   '#C98A3E',
    deep:   '#8E5A26',
    dark:   '#5C3A14',
    shadow: '#3E1E0E',
  },
  leather:  '#5B3817',
  mahogany: '#2A1607',
  edge: {
    dark: '#6B4A22',
    fade: '#A88557',
  },
  semantic: {
    gatePass: '#2F6F5E',
    gateFail: '#C03A2B',
    info:     '#2B2A6B',
    warn:     '#D4A84B',
  },
  tk: {
    paper:      '#F6F2E6',
    paper2:     '#EBE4D1',
    graph:      '#E4DCC3',
    blueprint:  '#0D2B3E',
    bp2:        '#123649',
    line:       '#1B1611',
    lineSoft:   '#5A4E3C',
    lineHair:   '#A89277',
    bpLine:     '#7FD7FF',
    cinnabar:   '#C03A2B',
    brass:      '#B37E3E',
    cyan:       '#16D7E6',
    emerald:    '#3EA676',
    amber:      '#E0A63A',
    ruby:       '#D81F3D',
    magenta:    '#E23FB4',
  },
  tkc: {
    paper:        '#F0E6D1',
    paper2:       '#E8DCC3',
    paper3:       '#DCCEB0',
    ink:          '#1B1611',
    inkSoft:      '#3E342A',
    inkQuiet:     '#8A7B64',
    rule:         '#5B3817',
    cinnabar:     '#C03A2B',
    cinnabarDark: '#8A2519',
    emerald:      '#2F6F5E',
    ruby:         '#8E1B1B',
    amber:        '#B37E3E',
    cyan:         '#2E7C8A',
    lapis:        '#2B2A6B',
    brassLight:   '#E8C98A',
    brass:        '#B37E3E',
    brassDeep:    '#6C3E15',
  },
} as const;

/* ==========================================================
   Typography Tokens
   ========================================================== */

export const typography = {
  fontFamily: {
    display: "'Cormorant Garamond', 'Cormorant', 'Garamond', 'Didot', serif",
    body:    "'EB Garamond', 'Garamond', Georgia, 'Times New Roman', serif",
    mono:    "'JetBrains Mono', 'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
  },
  fontSize: {
    hairline: '11px',
    caption:  '13px',
    small:    '14px',
    body:     '17px',
    lead:     '20px',
    h5:       '22px',
    h4:       '28px',
    h3:       '36px',
    h2:       '52px',
    h1:       '84px',
    display:  '120px',
  },
  lineHeight: {
    tight:  1.02,
    snug:   1.18,
    normal: 1.45,
    prose:  1.62,
  },
  letterSpacing: {
    display: '-0.02em',
    tight:   '-0.01em',
    normal:  '0',
    label:   '0.14em',
    glyph:   '0.28em',
  },
} as const;

/* ==========================================================
   Spacing Tokens
   ========================================================== */

export const spacing = {
  s1:  '4px',
  s2:  '8px',
  s3:  '12px',
  s4:  '16px',
  s5:  '24px',
  s6:  '32px',
  s7:  '48px',
  s8:  '64px',
  s9:  '96px',
  s10: '128px',
  tk: {
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '32px',
  },
  measure: {
    body:    '58ch',
    caption: '42ch',
  },
} as const;

/* ==========================================================
   Border & Radius Tokens
   ========================================================== */

export const radii = {
  r0:   '0',
  r1:   '2px',
  pill: '999px',
} as const;

/* ==========================================================
   Shadow Tokens
   ========================================================== */

export const shadows = {
  plate:     '3px 3px 0 #1B1611',
  plateDark: '3px 3px 0 #F0E6D1',
  stamp:     '0 0 0 1px #C03A2B',
  fold:      'inset 0 1px 0 rgba(0,0,0,.08)',
} as const;

/* ==========================================================
   Motion Tokens
   ========================================================== */

export const motion = {
  easeCodex:  'cubic-bezier(.2,.7,.2,1)',
  durQuick:   '160ms',
  durBase:    '320ms',
  durSlow:    '520ms',
  tkc: {
    ease:    'cubic-bezier(.32,.72,.28,1)',
    easeOut: 'cubic-bezier(.2,.8,.2,1)',
    durFast: '120ms',
    dur:     '180ms',
    durSlow: '320ms',
  },
} as const;

/* ==========================================================
   Aggregate tokens export
   ========================================================== */

export const tokens = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  motion,
} as const;

/* ==========================================================
   TypeScript Types
   ========================================================== */

/** A deep path key into the colors token object */
export type ColorToken = typeof colors;

/** Typography token values */
export type TypographyToken = typeof typography;

/** Spacing token values */
export type SpacingToken = typeof spacing;

export default tokens;
