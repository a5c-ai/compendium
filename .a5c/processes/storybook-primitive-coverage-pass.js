/**
 * @process storybook-primitive-coverage-pass
 * @description Process-backed Storybook coverage pass for reusable mockup motifs, dark mode, and inspection parity.
 */

import sdk from '/usr/lib/node_modules/@a5c-ai/babysitter-sdk/dist/index.js';

const { defineTask } = sdk;

const DEFAULT_MODULES = [
  {
    modulePath: 'src/mockups/ComponentPrimitives.tsx',
    storyPath: 'src/mockups/ComponentPrimitives.stories.tsx',
    exportNames: [
      'ComponentModeGrid',
      'ComponentNavBar',
      'ComponentGateStrip',
      'ComponentChipBoard',
      'ComponentInstallStrip',
      'ComponentGemRow',
      'ComponentGaugeRow',
      'ComponentTabNarrative',
    ],
  },
  {
    modulePath: 'src/mockups/MockupPreviewPrimitives.tsx',
    storyPath: 'src/mockups/MockupPreviewPrimitives.stories.tsx',
    exportNames: [
      'MockupGalleryControls',
      'MockupSpecList',
    ],
  },
  {
    modulePath: 'src/mockups/ChatPrimitives.tsx',
    storyPath: 'src/mockups/ChatPrimitives.stories.tsx',
    exportNames: [
      'ChatShell',
      'ChatRail',
      'ChatWall',
      'ChatTurn',
      'ChatMessageBody',
      'ChatBars',
      'ChatToolCard',
      'ChatMemo',
      'ChatTyping',
      'ChatComposer',
      'ChatInspector',
      'ChatBudgetFoot',
      'ChatAvatar',
    ],
  },
  {
    modulePath: 'src/mockups/SeraphPrimitives.tsx',
    storyPath: 'src/mockups/SeraphPrimitives.stories.tsx',
    exportNames: [
      'SeraphWindow',
      'SeraphSidebar',
      'SeraphPromptBar',
      'SeraphCrest',
      'SeraphCard',
      'SeraphTask',
      'SeraphSummaryRow',
      'SeraphComposer',
      'SeraphAside',
      'SeraphFolioBorder',
    ],
  },
];

export async function process(inputs, ctx) {
  const requestText = inputs.requestText ?? '';
  const projectDir = inputs.projectDir ?? '.';
  const targetModules = inputs.targetModules ?? DEFAULT_MODULES;
  const storybookBuildCommand = inputs.storybookBuildCommand ?? 'npm run build-storybook';
  const packageBuildCommand = inputs.packageBuildCommand ?? 'npm run build';
  const visualInspectionTargets = inputs.visualInspectionTargets ?? [];

  ctx.log('info', 'Phase 1: enumerate target exports and required Storybook coverage');
  const coveragePlan = await ctx.task(coveragePlanTask, {
    requestText,
    projectDir,
    targetModules,
  });

  ctx.log('info', 'Phase 2: implement direct stories, controls, and theme/state coverage');
  const implementation = await ctx.task(implementationTask, {
    requestText,
    projectDir,
    targetModules,
    coveragePlan,
  });

  ctx.log('info', 'Phase 3: verify build and visual inspection parity');
  const verification = await ctx.task(verificationTask, {
    requestText,
    projectDir,
    coveragePlan,
    implementation,
    storybookBuildCommand,
    packageBuildCommand,
    visualInspectionTargets,
  });

  ctx.log('info', 'Phase 4: summarize completion proof');
  const finalReview = await ctx.task(finalReviewTask, {
    coveragePlan,
    implementation,
    verification,
  });

  return {
    success: verification.success === true,
    coveragePlan,
    implementation,
    verification,
    completionProof: finalReview,
  };
}

const coveragePlanTask = defineTask('storybook-primitive-coverage-plan', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Enumerate primitive export coverage',
  description: 'Build the process-backed coverage list for reusable mockup motifs and required Storybook states.',
  agent: {
    name: 'storybook-coverage-planner',
    prompt: {
      role: 'principal design-system reviewer focused on Storybook inspection quality',
      task: 'Inspect the target mockup primitive modules and produce the exact Storybook coverage list required to satisfy the request.',
      context: {
        requestText: args.requestText,
        projectDir: args.projectDir,
        targetModules: args.targetModules,
      },
      instructions: [
        'Read the target source modules and their existing story files before deciding coverage.',
        'Enumerate the exports that need direct reusable-surface inspection, not just inclusion inside a gallery or full mock shell.',
        'For each target export, define the story purpose, the key configurable props, the required state variants, and whether dark mode or contrast review is mandatory.',
        'Prefer a Storybook organization that reads like a reusable motif package. Mock gallery stories should remain, but not carry the main inspection burden.',
        'Return only concrete, scoped work. Do not add speculative redesigns or unrelated component work.',
        'Output strict JSON.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  coverageMatrix: Array<{ modulePath: string, storyPath: string, exportName: string, storyGroup: string, inspectionReason: string, requiredStories: string[], requiredControls: string[], interactionStates: string[], darkModeRequired: boolean }>,',
        '  organizationChanges: string[],',
        '  verificationCheckpoints: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['coverageMatrix', 'organizationChanges', 'verificationCheckpoints'],
      properties: {
        coverageMatrix: {
          type: 'array',
          items: {
            type: 'object',
            required: ['modulePath', 'storyPath', 'exportName', 'storyGroup', 'inspectionReason', 'requiredStories', 'requiredControls', 'interactionStates', 'darkModeRequired'],
            properties: {
              modulePath: { type: 'string' },
              storyPath: { type: 'string' },
              exportName: { type: 'string' },
              storyGroup: { type: 'string' },
              inspectionReason: { type: 'string' },
              requiredStories: { type: 'array', items: { type: 'string' } },
              requiredControls: { type: 'array', items: { type: 'string' } },
              interactionStates: { type: 'array', items: { type: 'string' } },
              darkModeRequired: { type: 'boolean' },
            },
          },
        },
        organizationChanges: { type: 'array', items: { type: 'string' } },
        verificationCheckpoints: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['storybook', 'planning', 'motifs'],
}));

const implementationTask = defineTask('storybook-primitive-coverage-implementation', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Implement primitive and state story coverage',
  description: 'Apply the planned Storybook changes across the targeted motif stories.',
  agent: {
    name: 'storybook-react-implementer',
    prompt: {
      role: 'senior React engineer improving Storybook inspection parity for a reusable UI kit',
      task: 'Implement the Storybook primitive coverage pass completely, not as a proposal.',
      context: {
        requestText: args.requestText,
        projectDir: args.projectDir,
        targetModules: args.targetModules,
        coveragePlan: args.coveragePlan,
      },
      instructions: [
        'Use the coverage matrix as the source of truth for which exports need direct stories.',
        'Add direct stories and controls for configurable props that materially affect hierarchy, ornament, metadata, framing, and composition.',
        'Add dark-mode and interaction-state stories for surfaces where theme contrast or state handling matters.',
        'Keep mock gallery stories useful, but restructure titles and direct stories so Storybook reads like a reusable package.',
        'Prefer editing the existing story files for the target modules. Only add helpers when they reduce duplication across the new stories in the same file.',
        'Do not widen the scope beyond the targeted motif modules.',
        'Return strict JSON with the touched files, implemented story ids, and any noteworthy constraints.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  filesChanged: string[],',
        '  implementedStories: string[],',
        '  darkModeStories: string[],',
        '  stateStories: string[],',
        '  notes: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'implementedStories', 'darkModeStories', 'stateStories', 'notes'],
      properties: {
        filesChanged: { type: 'array', items: { type: 'string' } },
        implementedStories: { type: 'array', items: { type: 'string' } },
        darkModeStories: { type: 'array', items: { type: 'string' } },
        stateStories: { type: 'array', items: { type: 'string' } },
        notes: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['storybook', 'implementation', 'motifs'],
}));

const verificationTask = defineTask('storybook-primitive-coverage-verification', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Verify Storybook build and inspection checkpoints',
  description: 'Confirm the new story coverage compiles and remains visually inspectable.',
  agent: {
    name: 'storybook-verifier',
    prompt: {
      role: 'frontend verification engineer reviewing Storybook coverage quality',
      task: 'Verify the implemented Storybook coverage using the requested build and visual inspection checkpoints.',
      context: {
        requestText: args.requestText,
        projectDir: args.projectDir,
        coveragePlan: args.coveragePlan,
        implementation: args.implementation,
        storybookBuildCommand: args.storybookBuildCommand,
        packageBuildCommand: args.packageBuildCommand,
        visualInspectionTargets: args.visualInspectionTargets,
      },
      instructions: [
        'Run the provided Storybook build command and package build command in the project directory and report the real outcomes.',
        'Visually inspect the target stories that exercise dark mode, controls, and state permutations. Use actual inspection, not assumption.',
        'Compare the implemented stories against the coverage matrix and call out anything still missing.',
        'Return success only if the build passes and the requested direct inspection surfaces are present.',
        'Output strict JSON.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  success: boolean,',
        '  commandsRun: string[],',
        '  buildResults: Array<{ command: string, passed: boolean, summary: string }>,',
        '  visualCheckpoints: Array<{ storyId: string, verdict: string, notes: string }>,',
        '  remainingGaps: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['success', 'commandsRun', 'buildResults', 'visualCheckpoints', 'remainingGaps'],
      properties: {
        success: { type: 'boolean' },
        commandsRun: { type: 'array', items: { type: 'string' } },
        buildResults: {
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
        visualCheckpoints: {
          type: 'array',
          items: {
            type: 'object',
            required: ['storyId', 'verdict', 'notes'],
            properties: {
              storyId: { type: 'string' },
              verdict: { type: 'string' },
              notes: { type: 'string' },
            },
          },
        },
        remainingGaps: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['storybook', 'verification', 'motifs'],
}));

const finalReviewTask = defineTask('storybook-primitive-coverage-final-review', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Summarize story coverage proof',
  description: 'Produce the final proof summary for the Storybook coverage pass.',
  agent: {
    name: 'storybook-pass-summarizer',
    prompt: {
      role: 'principal reviewer summarizing a Storybook convergence pass',
      task: 'Summarize the completed coverage pass and its proof.',
      context: {
        coveragePlan: args.coveragePlan,
        implementation: args.implementation,
        verification: args.verification,
      },
      instructions: [
        'Summarize the major direct story coverage additions and organization improvements.',
        'List which dark-mode and interaction-state inspection surfaces are now directly available.',
        'Summarize the verification proof and only mention material residual risk if it remains.',
        'Output strict JSON.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  summary: string,',
        '  proofPoints: string[],',
        '  residualRisk: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['summary', 'proofPoints', 'residualRisk'],
      properties: {
        summary: { type: 'string' },
        proofPoints: { type: 'array', items: { type: 'string' } },
        residualRisk: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['storybook', 'review', 'motifs'],
}));
