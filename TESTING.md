# Compendium Testing Matrix

This package uses story-driven regression tests to protect reusable exported surfaces that are easy to break during convergence work and hard to catch through manual visual inspection alone.

## Current regression focus

### Code surfaces
- Source stories: `src/components/Code/Code.stories.tsx`
- Protected states:
  - metadata-heavy editor facts and footer content
  - terminal/bash rendering and empty-code fallback
  - diff variants for default/docs states
  - one-sided, empty, and explicit initial-file diff selection

### Mockup previews and shared controls
- Source stories: `src/mockups/MockupPreviews.stories.tsx`
- Protected states:
  - exported control labels and column options
  - stable exported mockup name matrix
  - focused gallery filtering by selected mockup
  - zoom and frame-height clamping
  - description/source footer visibility toggles
  - theme markers for `void` and `vellum`

### Chat primitives
- Source stories: `src/mockups/ChatPrimitives.stories.tsx`
- Protected states:
  - dark workspace shell
  - rail current-thread and count rendering
  - full versus brief memo chrome and action/footer behavior

### Codex primitives
- Source stories: `src/mockups/CodexPrimitives.stories.tsx`
- Protected states:
  - active tab rendering in `CodexFrame`
  - dark `CodexPlate` variant
  - current chapter/item rendering in `CodexDocsToc`

## Deferred gaps

- DOM-interaction coverage for `MockupPreviewControls` remains deferred.
  Reason: this package currently uses server-rendered regression tests, and introducing jsdom-driven interaction tests would widen the harness more than this pass requires.
  Next step: add a package-level Vitest DOM config and cover the `Select`/`Slider` callback plumbing directly.

- Broad component-library coverage outside convergence-critical surfaces remains deferred.
  Reason: this pass prioritizes reusable exports with strong story/state matrices over trying to sample every component once.
  Next step: expand story-backed tests for form and overlay components in another targeted pass.
