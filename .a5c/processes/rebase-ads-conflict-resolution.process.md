# Rebase Ads Conflict Resolution

## Goal
Resolve the active rebase conflicts in the ads mockup surfaces while preserving both the low-level primitives and the higher-level catalog composition APIs.

## Phases

### Phase 1: Audit conflict state
Summarize the current rebase position, active conflicted files, and the intended merge direction.

### Phase 2: Resolve ads conflicts
Merge `AdsPrimitives`, `AdsPrimitives.stories`, and `MockupPreviews` so the reusable primitive and catalog surfaces coexist cleanly.

### Phase 3: Continue rebase
Advance the rebase non-interactively with `GIT_EDITOR=true` semantics so the process cannot hang on an editor prompt.

### Phase 4: Verify state
Report whether the rebase is complete or if additional conflicts remain for later commits.

## Constraints
- No `shell`-kind subtasks
- No breakpoints
- Preserve branch-introduced primitive APIs and mainline catalog-driven composition
