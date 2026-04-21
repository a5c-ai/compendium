# Design System Repo Transformation Process

## Goal
Transform the a5c.ai design handoff (HTML/CSS/JS prototypes) into a publishable, fully-featured React design system package (`@a5c-ai/compendium`).

## Phases

### Phase 1: Project Scaffolding
Set up package.json, tsconfig.json, vite.config.ts (library mode), directory structure, npm install.

### Phase 2: Design Token Extraction
Extract CSS custom properties from existing CSS files into structured `src/tokens/` with both CSS and TypeScript exports.

### Phase 3: Component Conversion
Convert 20+ window-attached JSX prototype components into proper TypeScript ES modules with React.forwardRef, typed Props interfaces, and per-component CSS.

### Phase 3.5: TypeScript Refinement Loop (if needed)
Up to 3 attempts to fix any TypeScript compilation errors.

### Phase 4: Icons & Assets
Convert 11 SVG assets into React icon components in `src/icons/`.

### Phase 5: Barrel Exports & Subpath Setup
Configure package.json exports map with subpaths: `.`, `./react`, `./tokens`, `./icons`, `./css`.

### Phase 6: Storybook
Set up Storybook 8 with stories for key components, token showcase, and icon gallery.

### Phase 7: Build & Bundle
Run Vite library build, verify output. Fix loop if needed.

### Phase 8: Example App
Create a small Vite React app in `examples/basic-usage/` demonstrating package consumption.

### Phase 9: Publishing Configuration
Set up changesets, .npmignore, README with usage docs.

### Breakpoint: Review Gate
User reviews the full design system before final verification.

### Phase 10: Final Verification
TSC + Vite build must both pass cleanly.

## Quality Gates
- TypeScript compilation (`npx tsc --noEmit`) — checked after Phase 3 and Phase 10
- Vite library build (`npx vite build`) — checked after Phase 7 and Phase 10
- Storybook build (`npx storybook build`) — checked after Phase 6
- Each gate has a refinement loop (up to 3 attempts)

## Output
A production-ready npm package with:
- TypeScript components with full type definitions
- CSS design tokens (both CSS custom properties and JS exports)
- React SVG icon components
- Storybook documentation
- Example consumer app
- Changeset-based versioning
- Subpath exports for tree-shaking
