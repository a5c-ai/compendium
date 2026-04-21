# a5c.ai Design System

---

## The Company

**a5c.ai** makes **Babysitter** — an orchestration layer that wraps any AI coding agent in quality gates, convergent loops, and cryptographic proof of completion. Tagline: *"Reliable AI workflows for teams that ship."*

Core positioning:

- **For developers and AI-curious teams** who want production-grade output from agents
- **MIT-licensed**, zero telemetry, runs against any agent (Claude Code, OpenCode, Gemini, Copilot, Codex)
- **2,000+ built-in processes** ("executable blueprints") — TDD, GSD, security audits, refactors
- **Enterprise offering**: "Atoms of Autonomy" — org-level AI transformation and task force
- **Four modes**: `/babysitter:call` (interactive), `:plan` (plan-first), `:yolo` (autonomous), `:forever` (continuous)

### Products / Surfaces covered here
- **Marketing website** (a5c.ai) — the primary and only surface this design system covers. A dark, developer-oriented landing page with install commands, quality-gate diagrams, a "Complexity Legends" gallery, and an enterprise page.

### Sources
- Primary: **https://a5c.ai** (scraped homepage + `/enterprise` page content)
- Product repo: **https://github.com/a5c-ai/babysitter** (referenced but not imported)
- Community: Discord, Twitter `@a5c_ai`
- Tone cue from the user: **"style, vibe and feel"** — surreal, esoteric, encyclopedic, encoded. Think hand-drawn diagrams of impossible machines with captions in an invented script.

### What the user did **not** provide
- No Figma file
- No codebase import (we are reconstructing from the public site)
- No official logo / brand PDF
- No production fonts

So this system is **a faithful-to-content + intentionally-stylized** rendering of a5c.ai. Colors and motifs are our synthesis; copy and product concepts are lifted directly. See CAVEATS at the bottom.

---

## Index

- `README.md` — this file
- `SKILL.md` — cross-compatible skill manifest
- `colors_and_type.css` — CSS custom properties for type + color
- `assets/` — logos, marks, illustrations, icons
- `fonts/` — any bundled web fonts (currently Google-hosted — see Fonts section)
- `preview/` — design-system preview cards (Type, Colors, Spacing, Components, Brand)
- `ui_kits/marketing/` — marketing-site UI kit with JSX components + interactive `index.html`
- `slides/` — invented slide template in the brand style

---

## Content Fundamentals

### Voice
- **Confident, developer-to-developer, slightly irreverent.** No corporate hedging.
- **Short declarative lines.** The homepage is built from fragment headlines: *"Tasks converge. PRs get merged. Done means done."* *"Same agent. Reliable outcomes."*
- **Trust through specificity.** Numbers are named: *2,000+ built-in processes. 5 min setup.* Claims are backed by proof artifacts (cryptographic, journal, gates).
- **Anti-hype.** The product positions *against* agent-industry slop: *"Agent says it's done. No external verification. Just confidence without evidence."*

### Person
- **"You" to the reader.** *"You define what 'done' means."* *"You ship."*
- **"We" rarely.** The product is anthropomorphized as a character: **Babysitter** does things. *"Babysitter orchestrates."* *"Babysitter creates the process."*
- **"The agent" is the third party** — a capable but untrustworthy contractor. The product watches it.

### Casing
- **Title Case** for section labels and mode names (`Interactive`, `Plan First`, `YOLO`, `Forever`).
- **Sentence case** for headlines.
- **`lowercase.snake`** for command slugs (`/babysitter:call`).
- **`MONOSPACE_UPPERCASE`** is reserved for metaphysical concepts in the Codex layer (`CONVERGENCE`, `THE GATE`, `THE LOOP`).

### Tone markers
- Uses "slop," "vibes," "hallucinate" — engineering-culture vernacular.
- No emoji. Not even in headers. (We respect this.)
- Quotes from real users, first-name only, short role: *"Yaniv, CEO & Co-founder."*
- Parenthetical asides for punch: *"Same agents. Better outcomes."*

### Copy examples to study
- Headline pattern: `{Noun phrase}. {Outcome sentence fragment}.` → *"Reliable AI workflows for teams that ship."*
- Problem framing triplet: *"Results vary run to run / Quality degrades without supervision / 'Almost done' stays almost done."*
- Quiet boasts: *"The recipes are more valuable than the kitchen."*

### Codex layer (our stylistic addition)
- Section dividers use invented glyph strings (see Iconography).
- Page numbers and diagram captions use roman numerals or an imagined "Codex index" like `fol. XVII.iii`.
- Figures are labeled as if from a manuscript: `FIG. A. — The Convergence Loop.`

---

## Visual Foundations

### Palette — "Vellum & Cipher"
A two-layer system: a warm, aged-paper ground vs. a deep ink-black void. Developer-tool legibility, occult-manuscript character.

- **Ground**
  - `--ground-vellum` `#EDE3CF` — warm aged paper, the marketing site's primary light surface
  - `--ground-parchment` `#D9CBAE` — deeper vellum for panels/dividers
  - `--ground-void` `#0B0A0F` — near-black with a violet cast, used for dark sections
  - `--ground-ink` `#181624` — slightly raised dark surface
- **Ink (text on vellum)**
  - `--ink-pigment` `#1B1611` — body ink
  - `--ink-fade` `#5A4E3C` — secondary text, captions
  - `--ink-ghost` `#8C7E65` — tertiary/watermark
- **Glyph (text on void)**
  - `--glyph-bone` `#F0E6D1` — primary on dark
  - `--glyph-fade` `#A89980` — secondary on dark
- **Accents** (used sparingly, like illuminations)
  - `--accent-cinnabar` `#C03A2B` — the "seal" color. Buttons, stamps, critical marks.
  - `--accent-indigo` `#2B2A6B` — cold accent, used in diagrams
  - `--accent-viridian` `#2F6F5E` — "gate passed" success
  - `--accent-sulphur` `#D4A84B` — warning / gold leaf highlight
- **Semantic**
  - `--gate-pass` = viridian, `--gate-fail` = cinnabar, `--info` = indigo

Gradients: **avoided**. We use solid color + texture + engraved lines. If a gradient is used, it's a tight vignette (edges of an illustration fading to vellum) — never a hero background.

### Typography
Three families, each with a role:

1. **Display — "Cloister"** → `Cormorant Garamond` (serif, Didone-ish, engraved feel)
   - Used for: hero headlines, "FIG." labels, deck titles.
   - Weights: 300 (airy), 500, 700.
2. **Body — "Scriptorium"** → `EB Garamond` (traditional old-style serif)
   - Used for: body copy, long prose, captions.
   - Weights: 400, 500, 700 + italics.
3. **Mono — "Cipher"** → `JetBrains Mono`
   - Used for: code, commands, glyph strings, spec tables.
   - Weights: 400, 700.

Substitutions are via **Google Fonts** (the user hasn't shipped brand fonts). See the Fonts section.

### Spacing & Rhythm
- Base unit: **4px**.
- Scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.
- **Text columns** are deliberately narrow — ~58ch for body, ~42ch for captions — evoking a manuscript.
- **Generous vertical rhythm**: section padding 96px min on desktop.

### Borders, Rules, Radii
- **Hairline rules** (`1px solid var(--ink-fade)`) separate sections, like a printed book's bleed.
- **Double rules** (top+bottom, 1px each, 4px gap) bracket pull quotes and mode cards.
- **Radii**: mostly `0`. Sharp corners = engraved plate. Pills are `999px` for the few capsule elements (nav pills, tag chips). Cards `2px` max.
- No drop shadows on cards. Elevation is indicated with **offset line outlines** — a 1px line shifted 3px down-right behind the element, like risograph registration.

### Shadows (such as they are)
- `--shadow-plate`: `3px 3px 0 var(--ink-pigment)` — the "printing plate offset"
- `--shadow-stamp`: `0 0 0 1px var(--accent-cinnabar)` — the seal/stamp outline
- `--shadow-inset-fold`: `inset 0 1px 0 rgba(0,0,0,.08)` — manuscript page fold

### Backgrounds
- Light: flat vellum + a subtle **paper grain** (noise SVG, ~4% opacity).
- Dark: flat void + **star-field speckle** (tiny white/gold dots, ~3% density).
- Occasionally a **full-bleed engraving** (our invented SVG line-art diagrams) with 60% opacity overlay.
- No stock photography. No gradients behind hero text.

### Imagery
- **Engraved line drawings** of impossible machines, organ-like loops, folded diagrams.
- **Warm monochrome** on vellum (brown-black on cream), or **cold monochrome** on void (bone on dark).
- Never full-color photography. If we must show people, it's a stippled/engraved portrait.
- **Registration marks** (small + and ⨯ at the corners of illustrations) lean into the print metaphor.

### Motion
- **Restraint first.** The Codex does not jitter.
- **Fade + small translate** (10–20px, 300–500ms, `cubic-bezier(.2,.7,.2,1)`).
- One signature motion: a **"seal impression"** — the cinnabar stamp scales from 1.1 → 1 with a 20ms opacity dip, mimicking pressing a stamp.
- Loading: a **quill-stroke spinner** — a thin arc that draws + undraws (stroke-dasharray animation).
- Hovers: opacity 1 → .78 on links; outlined buttons get a 3px `--shadow-plate` offset.
- Presses: translate `(3px, 3px)` + remove plate shadow (the stamp has "landed").
- No bounces. No spring overshoot.

### Transparency & Blur
- Blur is reserved for **the veil** — a `backdrop-filter: blur(8px)` with `rgba(11,10,15,.6)` over modals.
- Otherwise surfaces are opaque. We don't do translucent cards on images.

### Layout rules
- **Asymmetric column grids.** 12-column on desktop with intentional gutters of different widths — echoes manuscript margins with marginalia.
- **Marginalia column** on long-read sections: a narrow sidebar (~160px) for notes, glyphs, figure references.
- **Fixed elements**: a thin top rule with a small cinnabar dot (live indicator) + nav. A rule at the bottom with a folio number.
- Hero always has a **FIG. I** caption under the headline.

### Cards
- Flat vellum or void fill
- 1px hairline border in `--ink-fade` (light) or `--glyph-fade` (dark)
- No radius or 2px max
- Offset plate shadow on hover only
- Title set in Cloister display, body in Scriptorium

### Fonts — SUBSTITUTIONS (please flag)
We don't have a5c.ai's production fonts. We selected, via Google Fonts, open-source faces that fit the Codex aesthetic:

- **Cormorant Garamond** (display)
- **EB Garamond** (body)
- **JetBrains Mono** (mono)

> **ACTION NEEDED:** If a5c has canonical brand fonts (or wants different Codex-era picks — e.g. *Caslon*, *Adobe Jenson*, *IM Fell English*), please share `.woff2` files and we'll swap them in. Everything is wired through `colors_and_type.css` variables, so it's a one-line change.

---

## Iconography

The brand (as it stands publicly) uses almost **no icons** on the marketing site — section dividers, mode cards, and quality-gate diagrams are text-only. This is a gift: it lets the Codex direction define the entire icon language without fighting existing choices.

Our approach:

- **Primary iconography = invented glyph set.** A tiny monospace-width alphabet of occult-adjacent marks, rendered as inline SVG in `assets/glyphs/`. We use these as:
  - Section dividers (`⟡ ◊ ⟡`)
  - Mode insignia (each mode — Interactive, Plan First, YOLO, Forever — gets a single glyph)
  - "Quality Gate passed" seal
- **Secondary icon set = Lucide** (CDN), used only when a functional UI icon is genuinely needed (e.g. `github`, `discord`, `copy`, `chevron`). Stroke 1.5, never filled. We substitute Lucide because there is no known a5c icon library. **FLAG:** if a5c has / wants a different set (Phosphor, Tabler), change the CDN link in `ui_kits/marketing/index.html`.
- **No emoji.** Ever. The brand's existing copy does not use them, and the Codex motif forbids them.
- **No unicode emoji in icon slots.** But we *do* use rare unicode symbols — `⟡`, `◊`, `§`, `¶`, `✕`, `✓`, `∴`, `⧖` — as typographic glyphs.
- **Roman numerals** for section numbering on enterprise/deck views.
- **Registration marks** `+` at illustration corners.

See `assets/` for the glyph SVGs and logotype.

---

## CAVEATS & Open Questions

1. **Fonts are substitutes.** Google-hosted; flag if a5c has licensed brand fonts.
2. **Colors are synthesized.** The live a5c.ai site uses a dark tech-aesthetic palette (we did not do color-extract from the live site in this pass). The "Vellum & Cipher" palette is our Codex interpretation — it is *intentionally* a departure to match the user's stated vibe. If the intent was "a5c.ai's existing colors + Codex layout," let me know and I'll re-extract.
3. **Logo.** We've made a wordmark + monogram in `assets/` — there is no official a5c logo published that we could verify. Please share the real one.
4. **No codebase / Figma.** All UI components are reconstructed from the rendered marketing site copy; not from source. Pixel-parity with the live site is not claimed.
5. **Icon library is Lucide CDN.** Swap recommended if a5c has preferences.
6. **"Enterprise" / "Agent Stories" pages** are partially covered — we hit the homepage + enterprise page, not the full site tree.

**Bold ask:** tell me (a) real fonts, (b) real logo, (c) whether to stay on Vellum & Cipher or pivot to a darker void-heavy variant as the primary, (d) any specific Codex-era motif you want emphasized (cartography, anatomy, astronomy, botanical). With those four answers I can get this to pixel-perfect.
