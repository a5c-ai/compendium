import sdk from '/usr/lib/node_modules/@a5c-ai/babysitter-sdk/dist/index.js';

const { defineTask } = sdk;

const auditTask = defineTask('code-surface-expansion-audit', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Audit code, editor, and diff surfaces',
  description: 'Build the target-state matrix and identify recurring composition wrappers that should become reusable APIs.',
  agent: {
    name: 'design-system-architect',
    prompt: {
      role: 'principal frontend architect for brownfield design systems',
      task: 'Audit the current code, editor, and diff primitives against the richer docs, chat, and mock compositions in the repo.',
      context: {
        ticket: args.ticket,
        projectDir: args.projectDir,
        focusFiles: args.focusFiles,
        targetThemes: args.targetThemes,
      },
      instructions: [
        'Treat this as a brownfield convergence pass on a shared component family, not a one-off mock cleanup.',
        'Inspect the live reusable code paths first, then inspect the richer docs/chat/mock compositions that currently consume or work around them.',
        'Produce an explicit targetStateMatrix covering documentation, chat, and mock contexts.',
        'Each matrix item must name the surface, context, framing treatment, metadata density, empty-state behavior, diff symmetry, embedded requirements, and theme expectations.',
        'Identify recurring composition-specific wrappers or surrounding markup that should be absorbed into the shared APIs.',
        'Call out missing prop surfaces for file metadata, framing treatment, empty states, one-sided diffs, embedded usage, and asymmetric comparisons.',
        'Produce an ordered file-level implementation plan, plus direct story and test coverage requirements for each high-risk state.',
        'Do not propose speculative redesigns outside the code/editor/diff family and its direct shared consumers.',
      ],
      outputFormat: [
        'JSON with:',
        '  runtimeContexts: Array<{ name: string, files: string[], reason: string }>,',
        '  targetStateMatrix: Array<{ surface: string, context: string, framing: string, metadata: string, emptyState: string, diffShape: string, embedded: string, themes: string[] }>,',
        '  recurringWrappers: Array<{ pattern: string, files: string[], sharedApiOpportunity: string }>,',
        '  apiChanges: Array<{ component: string, change: string, reason: string }>,',
        '  storyCoverage: Array<{ state: string, storyTarget: string, reason: string }>,',
        '  testCoverage: Array<{ state: string, testTarget: string, reason: string }>,',
        '  implementationPlan: string[],',
        '  validationPlan: string[],',
        '  risks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: [
        'runtimeContexts',
        'targetStateMatrix',
        'recurringWrappers',
        'apiChanges',
        'storyCoverage',
        'testCoverage',
        'implementationPlan',
        'validationPlan',
        'risks',
      ],
      properties: {
        runtimeContexts: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'files', 'reason'],
            properties: {
              name: { type: 'string' },
              files: { type: 'array', items: { type: 'string' } },
              reason: { type: 'string' },
            },
          },
        },
        targetStateMatrix: {
          type: 'array',
          items: {
            type: 'object',
            required: ['surface', 'context', 'framing', 'metadata', 'emptyState', 'diffShape', 'embedded', 'themes'],
            properties: {
              surface: { type: 'string' },
              context: { type: 'string' },
              framing: { type: 'string' },
              metadata: { type: 'string' },
              emptyState: { type: 'string' },
              diffShape: { type: 'string' },
              embedded: { type: 'string' },
              themes: { type: 'array', items: { type: 'string' } },
            },
          },
        },
        recurringWrappers: {
          type: 'array',
          items: {
            type: 'object',
            required: ['pattern', 'files', 'sharedApiOpportunity'],
            properties: {
              pattern: { type: 'string' },
              files: { type: 'array', items: { type: 'string' } },
              sharedApiOpportunity: { type: 'string' },
            },
          },
        },
        apiChanges: {
          type: 'array',
          items: {
            type: 'object',
            required: ['component', 'change', 'reason'],
            properties: {
              component: { type: 'string' },
              change: { type: 'string' },
              reason: { type: 'string' },
            },
          },
        },
        storyCoverage: {
          type: 'array',
          items: {
            type: 'object',
            required: ['state', 'storyTarget', 'reason'],
            properties: {
              state: { type: 'string' },
              storyTarget: { type: 'string' },
              reason: { type: 'string' },
            },
          },
        },
        testCoverage: {
          type: 'array',
          items: {
            type: 'object',
            required: ['state', 'testTarget', 'reason'],
            properties: {
              state: { type: 'string' },
              testTarget: { type: 'string' },
              reason: { type: 'string' },
            },
          },
        },
        implementationPlan: { type: 'array', items: { type: 'string' } },
        validationPlan: { type: 'array', items: { type: 'string' } },
        risks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'code-surface', 'audit'],
}));

const implementationTask = defineTask('code-surface-expansion-implementation', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Implement code-surface expansion',
  description: 'Expand the shared APIs, replace recurring wrappers, and add direct stories/tests for high-risk states.',
  agent: {
    name: 'component-developer',
    prompt: {
      role: 'senior frontend engineer maturing shared code-surface primitives',
      task: 'Implement the code/editor/diff expansion across the reusable component family and its direct shared consumers.',
      context: {
        ticket: args.ticket,
        projectDir: args.projectDir,
        audit: args.audit,
      },
      instructions: [
        'Use the audit output as the contract for the implementation.',
        'Modify the shared code family first, then update direct consumers so recurring composition-specific wrappers disappear where the pattern is clearly reusable.',
        'Add missing prop surfaces for file metadata, framing treatment, empty states, one-sided diffs, embedded usage, and asymmetric contexts.',
        'Keep the visual language aligned with the current Codex/mock direction in both vellum and void themes.',
        'Add direct Storybook stories for metadata-heavy, empty, one-sided, alternate-frame, and embedded states.',
        'Add or update tests that exercise the high-risk permutations named in the audit.',
        'Run iterative local checks while implementing so the final validation sweep is expected to pass.',
        'At the end, return strict JSON with changedFiles, storyTargets, testTargets, validationsRun, summary, and residualRisks.',
      ],
      outputFormat: [
        'JSON with:',
        '  changedFiles: string[],',
        '  storyTargets: string[],',
        '  testTargets: string[],',
        '  validationsRun: string[],',
        '  summary: string,',
        '  residualRisks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['changedFiles', 'storyTargets', 'testTargets', 'validationsRun', 'summary', 'residualRisks'],
      properties: {
        changedFiles: { type: 'array', items: { type: 'string' } },
        storyTargets: { type: 'array', items: { type: 'string' } },
        testTargets: { type: 'array', items: { type: 'string' } },
        validationsRun: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
        residualRisks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'code-surface', 'implementation'],
}));

const validationTask = defineTask('code-surface-expansion-validation', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Validate lint, test, build, and Storybook gates',
  description: 'Run the required local validation commands and report pass/fail details without using shell-kind subtasks.',
  agent: {
    name: 'quality-engineer',
    prompt: {
      role: 'frontend quality engineer validating a reusable component family',
      task: 'Run the required local validation gates for the code-surface expansion and report the results.',
      context: {
        projectDir: args.projectDir,
        requiredCommands: args.requiredCommands,
        implementation: args.implementation,
      },
      instructions: [
        'Run each required command in the repository and capture whether it passed.',
        'Required commands are part of the acceptance criteria: lint, tests, package build, and Storybook build.',
        'If a command fails, include the failing command, the important error summary, and whether the failure blocks acceptance.',
        'Do not skip a command because a previous one failed; run the full sweep unless the repo becomes unusable.',
        'Return strict JSON only.',
      ],
      outputFormat: [
        'JSON with:',
        '  checks: Array<{ command: string, passed: boolean, summary: string }>,',
        '  allPassed: boolean,',
        '  blockers: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['checks', 'allPassed', 'blockers'],
      properties: {
        checks: {
          type: 'array',
          items: {
            type: 'object',
            required: ['command', 'passed', 'summary'],
            properties: {
              command: { type: 'string' },
              passed: { type: 'boolean' },
              summary: { type: 'string' },
            },
          },
        },
        allPassed: { type: 'boolean' },
        blockers: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'code-surface', 'validation'],
}));

const finalReviewTask = defineTask('code-surface-expansion-final-review', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Summarize code-surface convergence outcome',
  description: 'Produce a concise final review covering the matrix, implementation outcome, and validation status.',
  agent: {
    name: 'component-documentation',
    prompt: {
      role: 'principal reviewer closing a reusable component convergence pass',
      task: 'Summarize the completed code-surface expansion against the requested target state.',
      context: {
        audit: args.audit,
        implementation: args.implementation,
        validation: args.validation,
      },
      instructions: [
        'Confirm whether the shared APIs now cover the audited docs/chat/mock requirements without one-off wrappers.',
        'Summarize the most important API and composition changes.',
        'Report validation status and only material residual risks.',
        'Return strict JSON.',
      ],
      outputFormat: [
        'JSON with:',
        '  summary: string,',
        '  acceptanceStatus: string,',
        '  residualRisks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['summary', 'acceptanceStatus', 'residualRisks'],
      properties: {
        summary: { type: 'string' },
        acceptanceStatus: { type: 'string' },
        residualRisks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'code-surface', 'review'],
}));

export async function process(inputs, ctx) {
  const projectDir = inputs.projectDir ?? '.';
  const ticket = inputs.ticket ?? 'Deepen Code, Editor, and Diff primitives for metadata-heavy, embedded, and asymmetric contexts';
  const focusFiles = inputs.focusFiles ?? [
    'src/components/Code/Code.tsx',
    'src/components/Code/Code.stories.tsx',
    'src/components/Code/Code.test.tsx',
    'src/components/components.css',
    'src/mockups/MockupPreviews.tsx',
    'src/mockups/ChatPrimitives.stories.tsx',
    'src/mockups/CodexPrimitives.tsx',
    'src/mockups/mockups.css',
  ];
  const targetThemes = inputs.targetThemes ?? ['vellum', 'void'];
  const requiredCommands = inputs.requiredCommands ?? [
    'npm run lint',
    'npm run test -- --run',
    'npm run build',
    'npm run build-storybook',
  ];

  ctx.log('info', `Starting code-surface expansion: ${ticket}`);

  const audit = await ctx.task(auditTask, {
    ticket,
    projectDir,
    focusFiles,
    targetThemes,
  });

  const implementation = await ctx.task(implementationTask, {
    ticket,
    projectDir,
    audit,
  });

  const validation = await ctx.task(validationTask, {
    projectDir,
    requiredCommands,
    implementation,
  });

  const finalReview = await ctx.task(finalReviewTask, {
    audit,
    implementation,
    validation,
  });

  return {
    success: validation.allPassed,
    ticket,
    audit,
    implementation,
    validation,
    finalReview,
    metadata: {
      processId: 'code-surface-expansion',
      timestamp: ctx.now(),
    },
  };
}
