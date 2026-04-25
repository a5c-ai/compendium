import sdk from '/usr/lib/node_modules/@a5c-ai/babysitter-sdk/dist/index.js';

const { defineTask } = sdk;

const ACCEPTANCE_CRITERIA = [
  'CI runs the test suite and validates the example consumer in addition to lint, build, and Storybook.',
  'Publish and release are gated on the meaningful validation contract.',
  'Visual and/or browser-level accessibility validation is integrated and documented.',
  'The package automation posture better matches the maturity target of this pass.',
];

const planTask = defineTask('ci-hardening-plan', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Plan compendium CI and release hardening',
  description: 'Produce the brownfield validation matrix, touched files, and release-gate plan for compendium maturity.',
  agent: {
    name: 'release-quality-architect',
    prompt: {
      role: 'principal release engineer hardening a reusable design-system package',
      task: 'Inspect the compendium package and produce the exact validation matrix and release-gate plan for this pass.',
      context: {
        packageRoot: args.packageRoot,
        requestText: args.requestText,
        acceptanceCriteria: args.acceptanceCriteria,
      },
      instructions: [
        'Treat this as brownfield release-engineering work on an npm package with Storybook and an example consumer.',
        'Read the current package scripts, workflows, docs, and example-consumer setup before deciding changes.',
        'Define a validation matrix that covers contributor confidence and release confidence separately, while keeping a single source of truth where possible.',
        'Include package-consumer validation, not only package build validation.',
        'Select an external visual-regression and/or browser-level accessibility signal appropriate for a Storybook-backed design-system package.',
        'Call out the release-gate path explicitly: which scripts, which workflows, and which external checks must pass before publish can proceed.',
        'Return strict JSON only.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  runtimeCallPaths: Array<{ entryPoint: string, paths: string[], reason: string }>,',
        '  validationMatrix: Array<{ gate: string, purpose: string, mechanism: string, blocksRelease: boolean }>,',
        '  workflowPlan: Array<{ file: string, changes: string[] }>,',
        '  documentationPlan: string[],',
        '  risks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['runtimeCallPaths', 'validationMatrix', 'workflowPlan', 'documentationPlan', 'risks'],
      properties: {
        runtimeCallPaths: {
          type: 'array',
          items: {
            type: 'object',
            required: ['entryPoint', 'paths', 'reason'],
            properties: {
              entryPoint: { type: 'string' },
              paths: { type: 'array', items: { type: 'string' } },
              reason: { type: 'string' },
            },
          },
        },
        validationMatrix: {
          type: 'array',
          items: {
            type: 'object',
            required: ['gate', 'purpose', 'mechanism', 'blocksRelease'],
            properties: {
              gate: { type: 'string' },
              purpose: { type: 'string' },
              mechanism: { type: 'string' },
              blocksRelease: { type: 'boolean' },
            },
          },
        },
        workflowPlan: {
          type: 'array',
          items: {
            type: 'object',
            required: ['file', 'changes'],
            properties: {
              file: { type: 'string' },
              changes: { type: 'array', items: { type: 'string' } },
            },
          },
        },
        documentationPlan: { type: 'array', items: { type: 'string' } },
        risks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'ci', 'planning'],
}));

const implementationTask = defineTask('ci-hardening-implementation', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Implement compendium CI and release hardening',
  description: 'Apply workflow, script, validation, and documentation changes for the maturity pass.',
  agent: {
    name: 'release-automation-implementer',
    prompt: {
      role: 'senior release engineer implementing CI, validation, and publishing guardrails',
      task: 'Implement the compendium CI hardening pass completely in the repository.',
      context: {
        packageRoot: args.packageRoot,
        requestText: args.requestText,
        acceptanceCriteria: args.acceptanceCriteria,
        plan: args.plan,
      },
      instructions: [
        'Use the plan as the source of truth for scope.',
        'Do the real repository edits. Do not leave this as a proposal.',
        'Keep this Babysitter process agent-only: do not introduce shell-kind subtasks or breakpoints into the process file.',
        'Harden the package validation contract so CI and publish share a meaningful release gate rather than duplicating unrelated commands.',
        'Include example-consumer validation that exercises the package as consumed from an artifact boundary, not only as a source tree dependency.',
        'Integrate an external visual-regression and/or browser-level accessibility signal appropriate for Storybook-backed package work.',
        'Document contributor and release-maintainer expectations, including required secrets or external-service setup when relevant.',
        'Run real local validation while implementing so the final review can report concrete evidence.',
        'Return strict JSON only.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  changedFiles: string[],',
        '  validationContract: string[],',
        '  externalIntegrations: string[],',
        '  evidence: string[],',
        '  residualRisks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['changedFiles', 'validationContract', 'externalIntegrations', 'evidence', 'residualRisks'],
      properties: {
        changedFiles: { type: 'array', items: { type: 'string' } },
        validationContract: { type: 'array', items: { type: 'string' } },
        externalIntegrations: { type: 'array', items: { type: 'string' } },
        evidence: { type: 'array', items: { type: 'string' } },
        residualRisks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'ci', 'implementation'],
}));

const finalReviewTask = defineTask('ci-hardening-final-review', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Review compendium CI hardening against acceptance criteria',
  description: 'Verify the implemented contract, release gates, and external integration against the requested maturity target.',
  agent: {
    name: 'release-readiness-reviewer',
    prompt: {
      role: 'principal reviewer verifying release quality and automation maturity',
      task: 'Review the completed CI hardening pass and decide whether the acceptance criteria are met.',
      context: {
        requestText: args.requestText,
        acceptanceCriteria: args.acceptanceCriteria,
        plan: args.plan,
        implementation: args.implementation,
      },
      instructions: [
        'Read the changed files relevant to scripts, workflows, docs, and validation support before deciding.',
        'Compare the final repo state directly against each acceptance criterion.',
        'Only mark success when the validation contract is coherent, contributor-visible, and publish-gating is materially stronger than the starting point.',
        'Call out any mismatch between CI validation and publish validation.',
        'Return strict JSON only.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  success: boolean,',
        '  acceptance: Array<{ criterion: string, met: boolean, evidence: string }>,',
        '  summary: string,',
        '  residualRisks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['success', 'acceptance', 'summary', 'residualRisks'],
      properties: {
        success: { type: 'boolean' },
        acceptance: {
          type: 'array',
          items: {
            type: 'object',
            required: ['criterion', 'met', 'evidence'],
            properties: {
              criterion: { type: 'string' },
              met: { type: 'boolean' },
              evidence: { type: 'string' },
            },
          },
        },
        summary: { type: 'string' },
        residualRisks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'ci', 'review'],
}));

export async function process(inputs, ctx) {
  const packageRoot = inputs.packageRoot ?? ctx.cwd ?? '.';
  const requestText = inputs.requestText ?? 'Harden CI, release gates, and external validation integrations for compendium package maturity';
  const acceptanceCriteria = inputs.acceptanceCriteria ?? ACCEPTANCE_CRITERIA;

  const plan = await ctx.task(planTask, {
    packageRoot,
    requestText,
    acceptanceCriteria,
  });

  const implementation = await ctx.task(implementationTask, {
    packageRoot,
    requestText,
    acceptanceCriteria,
    plan,
  });

  const review = await ctx.task(finalReviewTask, {
    requestText,
    acceptanceCriteria,
    plan,
    implementation,
  });

  return {
    success: review.success,
    requestText,
    acceptanceCriteria,
    plan,
    implementation,
    review,
  };
}
