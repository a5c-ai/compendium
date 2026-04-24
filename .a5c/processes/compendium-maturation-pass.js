import sdk from '/usr/lib/node_modules/@a5c-ai/babysitter-sdk/dist/index.js';

const { defineTask } = sdk;

const planTask = defineTask('compendium-maturation-plan', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Plan compendium maturation pass',
  description: 'Trace live runtime paths and produce a concrete brownfield implementation plan.',
  agent: {
    name: 'design-system-architect',
    prompt: {
      role: 'principal frontend architect for reusable design systems',
      task: 'Inspect the compendium package and produce a concrete brownfield plan for the final maturation pass.',
      context: {
        ticket: args.ticket,
        packageRoot: args.packageRoot,
        entryPoints: args.entryPoints,
      },
      instructions: [
        'Treat this as brownfield work. Trace the live runtime call paths from each provided entry point through the shared surfaces they render or export.',
        'Record runtimeCallPaths explicitly. Each item must include the entry point, the touched live paths, and why those paths are in scope.',
        'Identify reusable page-local structures still trapped in MockupPreviews or example-only code.',
        'Identify API gaps in the code/editor/diff family, dark-mode or accessibility weaknesses, Storybook coverage gaps, and example-app parity gaps.',
        'Produce an ordered implementation plan with concrete file paths, intended shared exports, validation commands, and any notable risks.',
        'Do not propose speculative redesigns or churn outside the user-requested scope.',
      ],
      outputFormat: [
        'JSON with:',
        '  runtimeCallPaths: Array<{ entryPoint: string, paths: string[], reason: string }>,',
        '  focusAreas: Array<{ label: string, files: string[], reason: string }>,',
        '  implementationSteps: string[],',
        '  validationPlan: string[],',
        '  risks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['runtimeCallPaths', 'focusAreas', 'implementationSteps', 'validationPlan', 'risks'],
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
        focusAreas: {
          type: 'array',
          items: {
            type: 'object',
            required: ['label', 'files', 'reason'],
            properties: {
              label: { type: 'string' },
              files: { type: 'array', items: { type: 'string' } },
              reason: { type: 'string' },
            },
          },
        },
        implementationSteps: { type: 'array', items: { type: 'string' } },
        validationPlan: { type: 'array', items: { type: 'string' } },
        risks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'planning', 'brownfield'],
}));

const implementationTask = defineTask('compendium-maturation-implementation', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Implement compendium maturation pass',
  description: 'Apply the requested design-system convergence, dark-mode, a11y, Storybook, example, and code-surface improvements.',
  agent: {
    name: 'component-developer',
    prompt: {
      role: 'senior frontend engineer maturing a reusable design-system package',
      task: 'Implement the compendium maturation pass in the repository.',
      context: {
        ticket: args.ticket,
        packageRoot: args.packageRoot,
        plan: args.plan,
      },
      instructions: [
        'Use the plan only to guide concrete brownfield edits on the live execution paths.',
        'Finish componentizing reusable page-local structures that are still encoded in MockupPreviews or the example app.',
        'Expand or normalize exported APIs where page-specific wrapper markup is still required for meaningful reuse.',
        'Improve the code/editor/diff family for richer metadata, alternate framing, embedded docs/chat use, one-sided and metadata-heavy states, and theme-aware accessibility.',
        'Harden dark mode and accessibility across the touched kit surfaces, especially interactive states, metadata labels, chips, tabs, docs margins, and chat/tool rows.',
        'Add or update Storybook stories so meaningful extracted motifs and state variants are directly inspectable, including dark-mode renderings where relevant.',
        'Keep examples/basic-usage consuming shared exported surfaces only. If example-only UI logic belongs in the package, move it into shared exports and update the example to consume it.',
        'Preserve the current visual language. Refine toward the local mock/spec references rather than resetting the look.',
        'Run iterative local checks while implementing so the later shell gates are expected to pass cleanly.',
        'At the end, output JSON with changedFiles, summary, validationsRun, and residualRisks.',
      ],
      outputFormat: [
        'JSON with:',
        '  changedFiles: string[],',
        '  summary: string,',
        '  validationsRun: string[],',
        '  residualRisks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['changedFiles', 'summary', 'validationsRun', 'residualRisks'],
      properties: {
        changedFiles: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
        validationsRun: { type: 'array', items: { type: 'string' } },
        residualRisks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'implementation', 'design-system'],
}));

const lintTask = defineTask('compendium-lint', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Run TypeScript lint gate',
  description: 'Run the package lint gate required by the ticket acceptance criteria.',
  shell: {
    command: 'npm run lint',
    outputPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  expectedExitCode: 0,
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'verify', 'lint'],
}));

const testTask = defineTask('compendium-test', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Run Vitest suite',
  description: 'Run repository tests relevant to the touched reusable surfaces.',
  shell: {
    command: 'npm run test -- --run',
    outputPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  expectedExitCode: 0,
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'verify', 'test'],
}));

const buildTask = defineTask('compendium-build', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Build package',
  description: 'Build the package to verify exports, declarations, and CSS bundling.',
  shell: {
    command: 'npm run build',
    outputPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  expectedExitCode: 0,
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'verify', 'build'],
}));

const storybookTask = defineTask('compendium-build-storybook', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Build Storybook',
  description: 'Verify story organization and direct story coverage compile correctly.',
  shell: {
    command: 'npm run build-storybook',
    outputPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  expectedExitCode: 0,
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'verify', 'storybook'],
}));

const exampleBuildTask = defineTask('compendium-example-build', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Build example app',
  description: 'Verify the example app consumes shared exported surfaces as a real package consumer.',
  shell: {
    command: 'npm --prefix examples/basic-usage run build',
    outputPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  expectedExitCode: 0,
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'verify', 'example'],
}));

const finalReviewTask = defineTask('compendium-final-review', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Summarize maturation outcome',
  description: 'Summarize the implemented changes, validated gates, and any remaining risk.',
  agent: {
    name: 'component-documentation',
    prompt: {
      role: 'principal reviewer summarizing a design-system maturation pass',
      task: 'Review the completed work and produce a concise final outcome summary.',
      context: {
        plan: args.plan,
        implementation: args.implementation,
        validations: args.validations,
      },
      instructions: [
        'Summarize the major reusable-surface improvements, API changes, story/example parity changes, and dark-mode or accessibility hardening.',
        'Confirm which validation gates passed.',
        'List only material residual risks or follow-up opportunities.',
        'Output strict JSON.',
      ],
      outputFormat: [
        'JSON with:',
        '  summary: string,',
        '  validationsPassed: string[],',
        '  residualRisks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['summary', 'validationsPassed', 'residualRisks'],
      properties: {
        summary: { type: 'string' },
        validationsPassed: { type: 'array', items: { type: 'string' } },
        residualRisks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['compendium', 'review'],
}));

export async function process(inputs, ctx) {
  const packageRoot = inputs.packageRoot ?? ctx.cwd ?? '.';
  const ticket = inputs.ticket ?? 'Compendium maturation pass';
  const entryPoints = inputs.entryPoints ?? [
    'src/index.ts',
    'src/react.ts',
    'src/mockups/MockupPreviews.tsx',
    'src/mockups/*.stories.tsx',
    'src/components/Code/Code.tsx',
    'src/components/Code/Code.stories.tsx',
    'examples/basic-usage/src/App.tsx',
    '.storybook/preview.ts',
  ];

  const plan = await ctx.task(planTask, {
    ticket,
    packageRoot,
    entryPoints,
  });

  const implementation = await ctx.task(implementationTask, {
    ticket,
    packageRoot,
    plan,
  });

  const [lint, tests, build, storybook, exampleBuild] = await ctx.parallel.all([
    () => ctx.task(lintTask, {}),
    () => ctx.task(testTask, {}),
    () => ctx.task(buildTask, {}),
    () => ctx.task(storybookTask, {}),
    () => ctx.task(exampleBuildTask, {}),
  ]);

  const validations = {
    lint,
    tests,
    build,
    storybook,
    exampleBuild,
  };

  const finalReview = await ctx.task(finalReviewTask, {
    plan,
    implementation,
    validations,
  });

  return {
    success: true,
    ticket,
    runtimeCallPaths: plan.runtimeCallPaths,
    implementation,
    validations,
    finalReview,
    metadata: {
      processId: 'compendium-maturation-pass',
      packageRoot,
      finishedAt: ctx.now(),
    },
  };
}
