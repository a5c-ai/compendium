# Code Surface Expansion Process

## Goal
Expand the shared `CodeBlock`, `CodeEditor`, and `DiffViewer` primitives so they cover metadata-heavy, embedded, empty, alternate-frame, and asymmetric diff states across docs, chat, and mock contexts without recurring one-off wrappers.

## Constraints
- No `shell`-kind subtasks in the Babysitter process.
- No breakpoints.
- Convergence must still end with lint, test, build, and Storybook validation.

## Phases

### Phase 1: Audit and State Matrix
- Compare the current code-surface API with docs/chat/mock compositions.
- Produce a target-state matrix covering framing treatment, metadata density, empty states, one-sided diff behavior, embedding needs, and vellum/void expectations.
- Identify recurring wrappers that should become reusable API surfaces.

### Phase 2: Shared API and Consumer Convergence
- Expand the shared component props and markup so the recurring patterns are directly representable.
- Update direct consumers to use the shared API instead of composition-specific wrappers where the pattern is clearly reusable.
- Preserve the broader Codex/mock visual language.

### Phase 3: Story and Test Coverage
- Add direct stories for metadata-heavy, empty, one-sided, alternate-frame, and embedded states.
- Add tests for the high-risk permutations named in the state matrix.

### Phase 4: Validation Sweep
- Run `npm run lint`
- Run `npm run test -- --run`
- Run `npm run build`
- Run `npm run build-storybook`

## Output
- Updated shared code-surface APIs
- Updated shared consumers
- Direct Storybook coverage for the high-risk states
- Test coverage for high-risk permutations
- Final validation report covering lint/test/build/storybook
