# CI Release Hardening Pass

This process hardens `@a5c-ai/compendium` for package maturity.

## Intent

- Define a single validation contract for contributors and release maintainers.
- Ensure CI validates the package, the example consumer, and the visual/browser-level integration surface.
- Strengthen publish gating so release work cannot bypass the same contract.
- Keep the Babysitter run non-interactive and agent-only for this pass.

## Phases

1. Plan the brownfield validation matrix and release-gate design.
2. Implement workflow, script, validation, and documentation changes in the package repo.
3. Review the final repo state against the acceptance criteria and emit completion status.

## Explicit Constraints

- No `shell` task kinds in the process.
- No breakpoints.
- External validation must be integrated as part of the release-quality posture, not documented as a future idea.
