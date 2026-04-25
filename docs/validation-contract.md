# Validation Contract

`@a5c-ai/compendium` is treated as a reusable package, not only as an app bundle. Every change is expected to preserve package integrity, consumer installability, Storybook health, and visual/browser-level confidence.

## Local Contributor Contract

1. Install dependencies with `npm ci`.
2. Install the Playwright browser once per machine with `npm run playwright:install`.
3. Run `npm run validate` before opening or updating a PR.

`npm run validate` enforces:

- `npm run lint`
- `npm run test:ci`
- `npm run build`
- `npm run build-storybook`
- `npm run validate:package`
- `npm run validate:consumer`
- `npm run test:a11y`

## What Each Gate Protects

- `validate:package`: verifies the packed npm artifact contains the expected public build outputs and does not leak `src/`.
- `validate:consumer`: packs the library, installs that tarball into `examples/basic-usage`, and builds the example as a consumer would.
- `test:a11y`: serves built Storybook and runs browser-level accessibility smoke checks with Playwright + axe against representative stories.
- `chromatic`: publishes the Storybook build to Chromatic for external visual regression tracking.

## CI And Release Expectations

- `CI` runs the full validation contract on pushes to `main` and on pull requests.
- `Chromatic` runs alongside CI for internal branches and pushes. Forked pull requests skip the job because repository secrets are unavailable.
- `Publish` reruns the release validation contract and requires the Chromatic release gate before `changeset publish` can run.
- `prepublishOnly` and `npm run release` both execute the validation contract so local publish attempts cannot bypass the gates.

## Maintainer Setup

Set `CHROMATIC_PROJECT_TOKEN` in the repository secrets before relying on the publish workflow. The release gate intentionally fails when this secret is missing on protected branches.

Recommended branch protection for `main`:

- Require the `Validation Contract` check.
- Require the `Chromatic` check.
