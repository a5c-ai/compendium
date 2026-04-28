/**
 * @process design-system-seraph-fidelity-max-v2
 * @description Agent-only Babysitter convergence loop for compendium Seraph mock fidelity.
 *   Focused on reconstructing the reference pages as reusable design-system primitives with
 *   Storybook/example parity, dark-mode adaptation, and explicit a11y-sensitive review.
 * @skill babysit C:/Users/tmusk/.codex/plugins/cache/local-plugins/babysitter/0.1.5/skills/babysit/SKILL.md
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

const DEFAULT_TARGETS = ['Seraph Refactor', 'Seraph Bestiary'];

export async function process(inputs, ctx) {
  const {
    projectDir = '.',
    exampleDir = 'examples/basic-usage',
    targetMockups = DEFAULT_TARGETS,
    targetQuality = 100,
    maxIterations = 8,
    requestText = '',
    relatedRunId = '',
    relatedRunReason = 'fresh-process-variant',
  } = inputs;

  const startedAt = ctx.now();

  const baseline = await ctx.task(baselineTraceTask, {
    projectDir,
    exampleDir,
    targetMockups,
    relatedRunId,
    relatedRunReason,
    requestText,
  });

  let implementation = await ctx.task(reconstructionPassTask, {
    projectDir,
    exampleDir,
    targetMockups,
    requestText,
    baseline,
    round: 1,
  });

  let review = await ctx.task(visualAndA11yReviewTask, {
    projectDir,
    exampleDir,
    targetMockups,
    targetQuality,
    requestText,
    baseline,
    implementation,
    round: 1,
  });

  const rounds = [{ round: 1, implementation, review }];
  let round = 1;

  while ((review.overallScore ?? 0) < targetQuality && round < maxIterations) {
    round += 1;

    implementation = await ctx.task(repairPassTask, {
      projectDir,
      exampleDir,
      targetMockups,
      requestText,
      baseline,
      previousImplementation: implementation,
      previousReview: review,
      round,
    });

    review = await ctx.task(visualAndA11yReviewTask, {
      projectDir,
      exampleDir,
      targetMockups,
      targetQuality,
      requestText,
      baseline,
      implementation,
      round,
    });

    rounds.push({ round, implementation, review });
  }

  return {
    success: (review.overallScore ?? 0) >= targetQuality,
    requestText,
    targetMockups,
    targetQuality,
    finalRound: round,
    finalScore: review.overallScore ?? 0,
    finalReview: review,
    runtimeCallPaths: baseline.runtimeCallPaths ?? [],
    targetFiles: dedupe([
      ...(baseline.targetFiles ?? []),
      ...rounds.flatMap((entry) => entry.implementation?.filesChanged ?? []),
    ]),
    reusableSurfaces: dedupe(rounds.flatMap((entry) => entry.implementation?.reusableSurfacesTouched ?? [])),
    storybookSurfaces: dedupe(rounds.flatMap((entry) => entry.implementation?.storybookSurfaces ?? [])),
    exampleSurfaces: dedupe(rounds.flatMap((entry) => entry.implementation?.exampleSurfaces ?? [])),
    rounds,
    relatedRunId,
    relatedRunReason,
    metadata: {
      processId: 'design-system-seraph-fidelity-max-v2',
      timestamp: startedAt,
      orchestrationMode: 'agent-only',
    },
  };
}

function dedupe(items) {
  return [...new Set(items)];
}

export const baselineTraceTask = defineTask('baseline-trace', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Trace live Seraph surfaces, reference anchors, and reusable architecture',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Brownfield design-system investigator',
      task: 'Trace the real runtime surfaces controlling the Seraph mock pages, Storybook previews, and example app usage.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        targetMockups: args.targetMockups,
        relatedRunId: args.relatedRunId,
        relatedRunReason: args.relatedRunReason,
      },
      instructions: [
        'USER REQUEST (verbatim):',
        '---',
        args.requestText,
        '---',
        'Inspect the live runtime files and the local mock references only.',
        'Read and trace: `src/mockups/MockupPreviews.tsx`, `src/mockups/SeraphPrimitives.tsx`, `src/mockups/mockups.css`, relevant stories in `src/mockups/*.stories.tsx`, exported code/diff primitives, example app entry files, and the uploaded reference images in `project/uploads/`.',
        'Map the real shared surfaces that drive both Storybook and the example app.',
        'Be explicit about gaps in: color system fit, decorations/ornaments, componentization, dark-mode support, code/diff component usage, and a11y risk areas.',
        'Return JSON with keys: `runtimeCallPaths`, `targetFiles`, `referenceAssets`, `reusableSurfaces`, `gaps`, `constraints`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['runtimeCallPaths', 'targetFiles', 'referenceAssets', 'reusableSurfaces', 'gaps', 'constraints'],
      properties: {
        runtimeCallPaths: { type: 'array' },
        targetFiles: { type: 'array' },
        referenceAssets: { type: 'array' },
        reusableSurfaces: { type: 'array' },
        gaps: { type: 'array' },
        constraints: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['analysis', 'brownfield', 'seraph', 'fidelity'],
}));

export const reconstructionPassTask = defineTask('reconstruction-pass', (args, taskCtx) => ({
  kind: 'agent',
  title: `Reconstruction pass ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/CSS design-system engineer',
      task: 'Implement the highest-value Seraph reconstruction work directly in the repository.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        targetMockups: args.targetMockups,
        baseline: args.baseline,
        round: args.round,
      },
      instructions: [
        'USER REQUEST (verbatim):',
        '---',
        args.requestText,
        '---',
        'Operate directly on the real source files. Do not only describe changes.',
        'The target is reconstruction fidelity, not a loose interpretation. Push the design toward the uploaded Seraph references on color, decoration density, folio framing, side rails, totems, framing lines, and manuscript composition.',
        'Keep everything reusable and componentized. Extend the design system where needed so the mock pages are assembled from customizable primitives, sections, and page-level compositions.',
        'Preserve or improve parity across shared source, Storybook stories/controls, and the example app.',
        'Dark mode must be adapted across the affected controls and custom surfaces. Avoid a11y regressions in hover, active, disabled, chat, and code/diff surfaces.',
        'Use the reusable code editor, code block, and diff primitives where docs/chat/mock pages call for them. Prefer shared adoption over one-off copies.',
        'Do not introduce `shell` tasks, helper scripts, or image-embedded reconstructions.',
        'Return JSON with keys: `filesChanged`, `mockupsImproved`, `reusableSurfacesTouched`, `storybookSurfaces`, `exampleSurfaces`, `notes`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'mockupsImproved', 'reusableSurfacesTouched', 'storybookSurfaces', 'exampleSurfaces', 'notes'],
      properties: {
        filesChanged: { type: 'array' },
        mockupsImproved: { type: 'array' },
        reusableSurfacesTouched: { type: 'array' },
        storybookSurfaces: { type: 'array' },
        exampleSurfaces: { type: 'array' },
        notes: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['implementation', 'react', 'css', 'seraph'],
}));

export const visualAndA11yReviewTask = defineTask('visual-and-a11y-review', (args, taskCtx) => ({
  kind: 'agent',
  title: `Visual and a11y review ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Exacting visual reviewer and accessibility-sensitive design-system critic',
      task: 'Review the current Seraph implementation against the local references and score fidelity strictly.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        targetMockups: args.targetMockups,
        targetQuality: args.targetQuality,
        baseline: args.baseline,
        implementation: args.implementation,
        round: args.round,
      },
      instructions: [
        'USER REQUEST (verbatim):',
        '---',
        args.requestText,
        '---',
        'Use the uploaded images under `project/uploads/` as the fidelity anchor, and inspect the current shared runtime files for the implementation under review.',
        'Review both Seraph pages and the supporting shared primitives on: overall composition, color accuracy, ornament density, framing geometry, decorative rails, emblem/totem treatment, page rhythm, reusable architecture quality, story/example parity, dark-mode adaptation, and obvious a11y contrast failures.',
        `Score overall fidelity from 0-100. Approval requires ${args.targetQuality}.`,
        'Be strict. If the result still looks materially off from the references, do not approve.',
        'Return JSON with keys: `approved`, `overallScore`, `issues`, `strengths`, `a11yRisks`, `nextEdits`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['approved', 'overallScore', 'issues', 'strengths', 'a11yRisks', 'nextEdits'],
      properties: {
        approved: { type: 'boolean' },
        overallScore: { type: 'number' },
        issues: { type: 'array' },
        strengths: { type: 'array' },
        a11yRisks: { type: 'array' },
        nextEdits: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['review', 'fidelity', 'a11y', 'seraph'],
}));

export const repairPassTask = defineTask('repair-pass', (args, taskCtx) => ({
  kind: 'agent',
  title: `Repair pass ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/CSS design-system engineer in a fidelity convergence loop',
      task: 'Apply the review feedback directly and improve the shared implementation without reducing scope.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        targetMockups: args.targetMockups,
        baseline: args.baseline,
        previousImplementation: args.previousImplementation,
        previousReview: args.previousReview,
        round: args.round,
      },
      instructions: [
        'USER REQUEST (verbatim):',
        '---',
        args.requestText,
        '---',
        'Use the previous review as the authoritative list of misses.',
        'Fix the most visually important gaps first, then the architecture and a11y gaps that block reuse or dark-mode adaptation.',
        'Favor reusable primitives, configurable sections, and shared CSS vocabulary, but do not hide behind abstraction if a direct redraw is still needed.',
        'Keep the pages reconstructive, not image-based.',
        'Return JSON with keys: `filesChanged`, `fixesApplied`, `residualRisks`, `reusableSurfacesTouched`, `storybookSurfaces`, `exampleSurfaces`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'fixesApplied', 'residualRisks', 'reusableSurfacesTouched', 'storybookSurfaces', 'exampleSurfaces'],
      properties: {
        filesChanged: { type: 'array' },
        fixesApplied: { type: 'array' },
        residualRisks: { type: 'array' },
        reusableSurfacesTouched: { type: 'array' },
        storybookSurfaces: { type: 'array' },
        exampleSurfaces: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['repair', 'convergence', 'seraph', 'fidelity'],
}));
