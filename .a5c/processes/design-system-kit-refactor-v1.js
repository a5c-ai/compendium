/**
 * @process design-system-kit-refactor-v1
 * @description Agent-only Babysitter process for refactoring the compendium kit
 *   toward stronger reusable primitives, section/page compositions, Storybook
 *   controls, example parity, dark-mode support, and a11y across use cases.
 * @skill babysit C:/Users/tmusk/.codex/plugins/cache/local-plugins/babysitter/0.1.5/skills/babysit/SKILL.md
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

const DEFAULT_SURFACES = [
  'Seraph primitives',
  'Mockup previews',
  'Code and diff surfaces',
  'Storybook controls',
  'Example app parity',
];

export async function process(inputs, ctx) {
  const {
    projectDir = '.',
    exampleDir = 'examples/basic-usage',
    targetSurfaces = DEFAULT_SURFACES,
    targetQuality = 100,
    maxIterations = 8,
    requestText = '',
    relatedRunId = '',
    relatedRunReason = 'new-process-kit-refactor',
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

  let review = await ctx.task(kitReviewTask, {
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

    review = await ctx.task(kitReviewTask, {
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
      processId: 'design-system-kit-refactor-v1',
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
  title: 'Trace shared kit surfaces and reuse gaps',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Brownfield design-system investigator',
      task: 'Trace the real runtime surfaces that define the compendium kit, stories, and example-app usage, then identify the highest-value reuse and spec-fit gaps.',
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
        'Inspect the live source only. Do not work from stale summaries.',
        'Read and trace the shared paths that define reusable kit behavior: `src/components/**`, `src/mockups/**`, relevant Storybook stories, shared CSS, and the example app.',
        'Map where page-specific implementation is still blocking reuse.',
        'Be explicit about gaps in: componentization, configurable section/page surfaces, Storybook controls, code/diff/editor adoption, dark-mode support, and a11y-sensitive states.',
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
  labels: ['analysis', 'design-system', 'kit', 'reuse'],
}));

export const refactorPassTask = defineTask('refactor-pass', (args, taskCtx) => ({
  kind: 'agent',
  title: `Refactor pass ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/CSS design-system engineer',
      task: 'Refactor the kit directly in the repository to improve spec fit and reusability across use cases.',
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
        'Operate directly on the repository. Do not only describe changes.',
        'Prioritize reusable configurable primitives, section/page assemblies, and shared styling vocabulary over page-local one-offs.',
        'Improve Storybook controls and inspectability where it materially increases kit reuse.',
        'Keep the example app aligned with the same shared surfaces.',
        'Dark mode and a11y states must stay intact or improve.',
        'Prefer shared code/diff/editor surfaces wherever product/docs/mock surfaces overlap.',
        'Do not introduce shell-kind tasks or image-based shortcuts.',
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
  labels: ['implementation', 'design-system', 'kit', 'reuse'],
}));

export const kitReviewTask = defineTask('kit-review', (args, taskCtx) => ({
  kind: 'agent',
  title: `Kit review ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Exacting design-system reviewer',
      task: 'Review the current implementation for spec fit, reusability, dark-mode quality, Storybook/example parity, and a11y-sensitive state quality.',
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
        'Review the live shared files, not only the implementation summary.',
        'Score reusability and spec-fit strictly from 0-100. Approval requires the target quality.',
        'Focus on: componentization quality, configuration depth, shared styling vocabulary, Storybook controls, example parity, dark-mode support, hover/active/disabled contrast, and code/diff/editor reuse across surfaces.',
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
  labels: ['review', 'design-system', 'a11y', 'reuse'],
}));

export const repairPassTask = defineTask('repair-pass', (args, taskCtx) => ({
  kind: 'agent',
  title: `Repair pass ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/CSS design-system engineer in a refactor loop',
      task: 'Apply the review feedback directly and continue improving reusable kit quality without narrowing the user request.',
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
        'Use the previous review as the authoritative list of misses.',
        'Fix the most architecture-relevant and reuse-blocking issues first, then close visual and a11y state gaps.',
        'Prefer shared primitives and configurable compositions over duplicating page-local structures.',
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
  labels: ['repair', 'design-system', 'kit', 'reuse'],
}));
