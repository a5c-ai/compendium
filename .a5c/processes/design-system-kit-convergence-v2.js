/**
 * @process design-system-kit-convergence-v2
 * @description Agent-only Babysitter process for broad compendium kit convergence:
 *   componentization, pixel-accuracy calibration against local specs/mocks, dark-mode
 *   hardening, accessibility repair, Storybook/example parity, and reusable code/diff/editor surfaces.
 * @skill babysit C:/Users/tmusk/.codex/plugins/cache/local-plugins/babysitter/0.1.5/skills/babysit/SKILL.md
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

const DEFAULT_SURFACES = [
  'Mockup previews',
  'Seraph and Codex primitives',
  'Code / diff / editor surfaces',
  'Storybook controls and motifs',
  'Example app parity',
  'Dark mode and accessibility states',
];

export async function process(inputs, ctx) {
  const {
    projectDir = '.',
    exampleDir = 'examples/basic-usage',
    targetSurfaces = DEFAULT_SURFACES,
    targetQuality = 100,
    maxIterations = 10,
    requestText = '',
    relatedRunId = '',
    relatedRunReason = 'fresh-broad-convergence-process',
  } = inputs;

  const startedAt = ctx.now();

  const baseline = await ctx.task(baselineTraceTask, {
    projectDir,
    exampleDir,
    targetSurfaces,
    relatedRunId,
    relatedRunReason,
    requestText,
  });

  let implementation = await ctx.task(refactorPassTask, {
    projectDir,
    exampleDir,
    targetSurfaces,
    requestText,
    baseline,
    round: 1,
  });

  let review = await ctx.task(reviewTask, {
    projectDir,
    exampleDir,
    targetSurfaces,
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
      targetSurfaces,
      requestText,
      baseline,
      previousImplementation: implementation,
      previousReview: review,
      round,
    });

    review = await ctx.task(reviewTask, {
      projectDir,
      exampleDir,
      targetSurfaces,
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
    targetSurfaces,
    targetQuality,
    finalRound: round,
    finalScore: review.overallScore ?? 0,
    finalReview: review,
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
      processId: 'design-system-kit-convergence-v2',
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
  title: 'Trace full kit surfaces, spec anchors, and reuse blockers',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Brownfield design-system investigator',
      task: 'Trace the live kit surfaces, local spec anchors, and the highest-value blockers to componentization, pixel-fit, dark mode, and a11y.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        targetSurfaces: args.targetSurfaces,
        relatedRunId: args.relatedRunId,
        relatedRunReason: args.relatedRunReason,
      },
      instructions: [
        'USER REQUEST (verbatim):',
        '---',
        args.requestText,
        '---',
        'Inspect live source only.',
        'Trace shared runtime surfaces across `src/components/**`, `src/mockups/**`, Storybook stories, shared CSS, example app files, and local uploaded mock/spec images under `project/uploads/` where relevant.',
        'Be explicit about which surfaces are still page-local, which controls/stories are too shallow, where dark-mode hierarchy is weak, and where hover/active/disabled/chat/docs/code contexts still risk accessibility regressions.',
        'Return JSON with keys: `runtimeCallPaths`, `targetFiles`, `reusableSurfaces`, `gaps`, `constraints`, `specAnchors`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['runtimeCallPaths', 'targetFiles', 'reusableSurfaces', 'gaps', 'constraints', 'specAnchors'],
      properties: {
        runtimeCallPaths: { type: 'array' },
        targetFiles: { type: 'array' },
        reusableSurfaces: { type: 'array' },
        gaps: { type: 'array' },
        constraints: { type: 'array' },
        specAnchors: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['analysis', 'design-system', 'convergence', 'reuse'],
}));

export const refactorPassTask = defineTask('refactor-pass', (args, taskCtx) => ({
  kind: 'agent',
  title: `Refactor pass ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/CSS design-system engineer',
      task: 'Implement the highest-value broad kit convergence work directly in the repository.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        targetSurfaces: args.targetSurfaces,
        baseline: args.baseline,
        round: args.round,
      },
      instructions: [
        'USER REQUEST (verbatim):',
        '---',
        args.requestText,
        '---',
        'Operate directly on repository files. Do not only describe changes.',
        'Prioritize shared primitives, configurable sections/pages, and reusable styling vocabulary over page-local patches.',
        'Push fidelity and componentization together: if a surface is visually important and still local, extract it.',
        'Improve Storybook controls/motifs and keep example parity through the same source paths.',
        'Fix dark-mode and accessibility-sensitive states where touched.',
        'Prefer reusable code/editor/diff adoption in docs/chat/mock surfaces where appropriate.',
        'Return JSON with keys: `filesChanged`, `fixesApplied`, `reusableSurfacesTouched`, `storybookSurfaces`, `exampleSurfaces`, `residualRisks`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'fixesApplied', 'reusableSurfacesTouched', 'storybookSurfaces', 'exampleSurfaces', 'residualRisks'],
      properties: {
        filesChanged: { type: 'array' },
        fixesApplied: { type: 'array' },
        reusableSurfacesTouched: { type: 'array' },
        storybookSurfaces: { type: 'array' },
        exampleSurfaces: { type: 'array' },
        residualRisks: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['implementation', 'design-system', 'convergence', 'reuse'],
}));

export const reviewTask = defineTask('kit-review', (args, taskCtx) => ({
  kind: 'agent',
  title: `Kit review ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Exacting design-system reviewer',
      task: 'Review the current implementation for spec-fit, componentization quality, Storybook/example parity, dark-mode quality, and accessibility-sensitive state quality.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        targetSurfaces: args.targetSurfaces,
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
        'Review the live shared files, not only the summary.',
        'Score broadly from 0-100. Approval requires the target quality.',
        'Focus on: componentization depth, configurable reuse, visual/spec alignment, Storybook controls, example parity, dark-mode support, and obvious a11y issues in interactive and content surfaces.',
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
  labels: ['review', 'design-system', 'a11y', 'convergence'],
}));

export const repairPassTask = defineTask('repair-pass', (args, taskCtx) => ({
  kind: 'agent',
  title: `Repair pass ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/CSS design-system engineer in a convergence loop',
      task: 'Apply the previous review directly and continue broad kit convergence without narrowing scope.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        targetSurfaces: args.targetSurfaces,
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
        'Use the previous review as the authoritative miss list.',
        'Fix the most reusable and highest-leverage issues first, then close visual and a11y gaps.',
        'Prefer shared primitives/variants/stories over local fixes.',
        'Keep Storybook/example parity intact.',
        'Return JSON with keys: `filesChanged`, `fixesApplied`, `reusableSurfacesTouched`, `storybookSurfaces`, `exampleSurfaces`, `residualRisks`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'fixesApplied', 'reusableSurfacesTouched', 'storybookSurfaces', 'exampleSurfaces', 'residualRisks'],
      properties: {
        filesChanged: { type: 'array' },
        fixesApplied: { type: 'array' },
        reusableSurfacesTouched: { type: 'array' },
        storybookSurfaces: { type: 'array' },
        exampleSurfaces: { type: 'array' },
        residualRisks: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['repair', 'design-system', 'convergence', 'reuse'],
}));
