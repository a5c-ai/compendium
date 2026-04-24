/**
 * @process design-system-seraph-100-convergence
 * @description Agent-only Babysitter convergence loop for compendium mock fidelity,
 *   focused on the Seraph reference pages, reusable design-system surfaces, Storybook parity,
 *   and example parity without shell-kind tasks.
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
    maxIterations = 6,
    requestText = '',
    relatedRunId = '',
    relatedRunReason = 'variant',
  } = inputs;

  const startedAt = ctx.now();

  const baseline = await ctx.task(repoAndReferenceTraceTask, {
    projectDir,
    exampleDir,
    targetMockups,
    relatedRunId,
    relatedRunReason,
    requestText,
  });

  let implementation = await ctx.task(implementationPassTask, {
    projectDir,
    exampleDir,
    targetMockups,
    requestText,
    baseline,
    round: 1,
  });

  let review = await ctx.task(fidelityReviewTask, {
    projectDir,
    exampleDir,
    targetMockups,
    targetQuality,
    requestText,
    baseline,
    implementation,
    round: 1,
  });

  let round = 1;
  const rounds = [{
    round,
    implementation,
    review,
  }];

  while ((review.overallScore ?? 0) < targetQuality && round < maxIterations) {
    round += 1;
    implementation = await ctx.task(repairFromReviewTask, {
      projectDir,
      exampleDir,
      targetMockups,
      requestText,
      baseline,
      previousImplementation: implementation,
      previousReview: review,
      round,
    });

    review = await ctx.task(fidelityReviewTask, {
      projectDir,
      exampleDir,
      targetMockups,
      targetQuality,
      requestText,
      baseline,
      implementation,
      round,
    });

    rounds.push({
      round,
      implementation,
      review,
    });
  }

  return {
    success: (review.overallScore ?? 0) >= targetQuality,
    requestText,
    targetMockups,
    targetQuality,
    rounds,
    finalRound: round,
    finalScore: review.overallScore ?? 0,
    finalReview: review,
    runtimeCallPaths: baseline.runtimeCallPaths ?? [],
    filesChanged: dedupe([
      ...(baseline.targetFiles ?? []),
      ...rounds.flatMap((entry) => entry.implementation?.filesChanged ?? []),
    ]),
    relatedRunId,
    relatedRunReason,
    metadata: {
      processId: 'design-system-seraph-100-convergence',
      timestamp: startedAt,
    },
  };
}

function dedupe(items) {
  return [...new Set(items)];
}

export const repoAndReferenceTraceTask = defineTask('repo-and-reference-trace', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Trace live surfaces, references, and reusable mockup architecture',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Brownfield design-system investigator',
      task: 'Trace the live files and reference assets that control the Seraph mock pages and their reusable primitives.',
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
        'Inspect only the real runtime surfaces that matter to these mock pages.',
        'Read and trace: `src/mockups/MockupPreviews.tsx`, `src/mockups/SeraphPrimitives.tsx`, `src/mockups/mockups.css`, Storybook mock stories, exported mock primitives, the basic usage example app, and the uploaded reference images under `project/uploads/`.',
        'Focus on the two Seraph pages first, but note any reusable architecture coupling with Storybook/example parity.',
        'Return JSON with keys: `runtimeCallPaths`, `targetFiles`, `referenceAssets`, `gaps`, `constraints`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['runtimeCallPaths', 'targetFiles', 'referenceAssets', 'gaps', 'constraints'],
      properties: {
        runtimeCallPaths: { type: 'array' },
        targetFiles: { type: 'array' },
        referenceAssets: { type: 'array' },
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

export const implementationPassTask = defineTask('implementation-pass', (args, taskCtx) => ({
  kind: 'agent',
  title: `Implementation pass ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/CSS design-system engineer',
      task: 'Implement the highest-value Seraph fidelity improvements directly in the repo.',
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
        'Operate directly on the real files. Do not just describe changes.',
        'Preserve and extend reusability: prefer shared primitives and reusable CSS vocabulary over page-local hacks.',
        'Prioritize the largest fidelity gaps against the uploaded Seraph reference images: colors, decorations, composition, border geometry, side rails, ornaments, and chat-like content layout.',
        'Keep Storybook and example parity intact via the shared source surfaces.',
        'Do not introduce shell-kind orchestration or helper scripts.',
        'Return JSON with keys: `filesChanged`, `mockupsImproved`, `reusableSurfacesTouched`, `notes`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'mockupsImproved', 'reusableSurfacesTouched', 'notes'],
      properties: {
        filesChanged: { type: 'array' },
        mockupsImproved: { type: 'array' },
        reusableSurfacesTouched: { type: 'array' },
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

export const fidelityReviewTask = defineTask('fidelity-review', (args, taskCtx) => ({
  kind: 'agent',
  title: `Fidelity review ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Exacting visual reviewer and a11y-sensitive design-system critic',
      task: 'Review the current Seraph implementation against the local reference assets and score fidelity.',
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
        'Use the uploaded images under `project/uploads/` as the fidelity anchor, and inspect the current runtime files for the implementation under review.',
        'Review both Seraph pages on: overall composition, colors, ornament density, crest/totem/folio details, spacing rhythm, manuscript feel, reuse quality, and obvious a11y contrast issues in custom surfaces.',
        `Score overall fidelity from 0-100. Approval requires ${args.targetQuality}.`,
        'Be strict. If the work is not there, do not approve.',
        'Return JSON with keys: `approved`, `overallScore`, `issues`, `strengths`, `nextEdits`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['approved', 'overallScore', 'issues', 'strengths', 'nextEdits'],
      properties: {
        approved: { type: 'boolean' },
        overallScore: { type: 'number' },
        issues: { type: 'array' },
        strengths: { type: 'array' },
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

export const repairFromReviewTask = defineTask('repair-from-review', (args, taskCtx) => ({
  kind: 'agent',
  title: `Repair from review ${args.round}`,
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/CSS design-system engineer in a convergence loop',
      task: 'Apply the review feedback directly and improve fidelity without reducing scope.',
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
        'Use the previous review as the source of truth for what still misses.',
        'Fix the most important remaining gaps first. Prefer reusable CSS/primitives, but do not avoid necessary redraw work if shared surfaces can absorb it.',
        'Keep the pages reconstructive, not image-embedded.',
        'Return JSON with keys: `filesChanged`, `fixesApplied`, `residualRisks`, `reusableSurfacesTouched`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'fixesApplied', 'residualRisks', 'reusableSurfacesTouched'],
      properties: {
        filesChanged: { type: 'array' },
        fixesApplied: { type: 'array' },
        residualRisks: { type: 'array' },
        reusableSurfacesTouched: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['repair', 'convergence', 'seraph', 'fidelity'],
}));
