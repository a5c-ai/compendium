# a5c.ai Codex Design System — SKILL

When the user wants a new design artifact (landing page, slide, section, component) in the a5c.ai brand, follow this skill.

## What this system is
A "Codex"-style reinterpretation of a5c.ai / Babysitter. Warm vellum grounds vs. violet-black void; ornate brass, wax seals, gem accents, engraved diagrams. Serif display (Cormorant), serif body (EB Garamond), mono (JetBrains Mono).

## Load order
1. `colors_and_type.css` — tokens + base typography
2. `codex-ornate.css` — cartouches, brass plates, wax seals, gems, scrolls, gauges, quill-input

## Anatomy checklist for any new surface
- [ ] Top rule with tiny cinnabar dot + uppercase mono label
- [ ] Eyebrow labels in `var(--font-mono)`, letter-spacing .3em, uppercase
- [ ] Display headlines in `var(--font-display)` (Cormorant), with `.` dot in `var(--accent-cinnabar)` for a5c.ai
- [ ] Body prose max-width 44–58ch, italic lede option
- [ ] At least one ornate artifact (brass plate button, wax seal, gauge, or scroll)
- [ ] Figure caption `fig · N · …` and folio `fol · N` at corners
- [ ] Paper grain (SVG turbulence at 6–8% opacity) on any solid ground

## Sections
- `preview/` — design-system cards (type, colors, spacing, components, brand)
- `ui_kits/marketing/` — full marketing site composition
- `slides/deck.html` — 1920×1080 slide deck with deck_stage
- `assets/` — logos, seal, glyphs, illustrations

## Do / don't
- **Do** set copy in second person, short declarative fragments. "Tasks converge. PRs get merged. Done means done."
- **Do** use cinnabar (`--accent-cinnabar` #C03A2B) as the single rhetorical highlight.
- **Don't** use emoji, gradients as hero backgrounds, or soft drop shadows. Elevation is plate offset (`3px 3px 0 var(--ink-pigment)`) or seal stamp.
- **Don't** invent new colors — compose from tokens.

## Caveats passed through to the user
- Fonts are Google Fonts substitutes. Ask for licensed a5c fonts if available.
- Logo is invented. Ask for the canonical mark.
- Palette is a stylistic departure from the live site's dark tech-aesthetic — deliberate, per user direction ("Codex vibe").
