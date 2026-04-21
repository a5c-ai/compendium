# @a5c-ai/compendium

The a5c.ai design system — Codex Seraphinianus-inspired React components, design tokens, and icons.

## Install

```bash
npm install @a5c-ai/compendium
```

## Quick Start

```tsx
// Import everything (components + tokens + icons + CSS)
import { Button, Toggle, Modal } from '@a5c-ai/compendium';

// Or import specific subpaths for tree-shaking
import { Button, Input, Select } from '@a5c-ai/compendium/react';
import { colors, spacing } from '@a5c-ai/compendium/tokens';
import { LogoWordmark, SealGatePassed } from '@a5c-ai/compendium/icons';

// CSS-only (no JS) — useful for non-React projects
import '@a5c-ai/compendium/css';
```

## Subpath Exports

| Import | Contents |
|--------|----------|
| `@a5c-ai/compendium` | Everything: components, tokens, icons, CSS |
| `@a5c-ai/compendium/react` | React components only |
| `@a5c-ai/compendium/tokens` | Design tokens (CSS variables + JS constants) |
| `@a5c-ai/compendium/icons` | SVG icon React components |
| `@a5c-ai/compendium/css` | CSS custom properties, reset, and base typography |

## Components

**Controls:** Button, IconButton, Toggle, Checkbox, RadioGroup, Slider, RangeSlider, Stepper, Input, Textarea, Field, Tag, TagInput, InlineEdit, ColorPicker, Progress, Spinner, Skeleton

**Layout:** Accordion, Tabs, DataTable, Pagination, Tree, Breadcrumbs, NavItem, Sidebar, SplitPane

**Overlays:** Tooltip, Popover, Select, Combobox, DropdownMenu, ContextMenu, Modal, Drawer, CommandPalette, ToastProvider/useToasts

**Icons:** LogoWordmark, LogoMonogram, LogoMonogramDark, SealGatePassed, GlyphDivider, GlyphModeInteractive, GlyphModePlan, GlyphModeYolo, GlyphModeForever, IllustrationConvergenceLoop, IllustrationQualityGates

## Development

```bash
git clone <repo-url>
cd compendium
npm install
npm run dev        # Start Storybook on port 6006
npm run build      # Build the library
npm run lint       # TypeScript type check
npm run test       # Run tests
```

## Contributing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning.

```bash
npx changeset          # Create a new changeset
npx changeset version  # Apply changesets to bump versions
npm run release        # Publish to npm
```

## Design Language

Warm vellum grounds vs. violet-black void. Serif display (Cormorant Garamond), serif body (EB Garamond), mono (JetBrains Mono). No emoji. No gradients. Elevation via plate offset shadows.

See the [Storybook](./storybook-static/) for the full design token reference and component gallery.

## License

MIT — a5c.ai
