/**
 * @process dark-mode-accessibility-convergence
 * @description Process-backed dark-mode and accessibility convergence pass for interactive, metadata, and dense content surfaces.
 */

import sdk from '/usr/lib/node_modules/@a5c-ai/babysitter-sdk/dist/index.js';

const { defineTask } = sdk;

const DEFAULT_SURFACES = [
  {
    area: 'interactive-controls',
    paths: [
      'src/components/components.css',
      'src/components/Button/Button.stories.tsx',
      'src/components/Input/Input.stories.tsx',
      'src/components/Select/Select.stories.tsx',
      'src/components/Toggle/Toggle.stories.tsx',
    ],
    concerns: ['dark-mode hierarchy', 'hover/active/focus-visible/disabled states', 'contrast of supporting metadata'],
  },
  {
    area: 'code-diff-editor',
    paths: [
      'src/components/Code/Code.tsx',
      'src/components/Code/Code.stories.tsx',
      'src/components/Code/Code.test.tsx',
    ],
    concerns: ['file metadata legibility', 'selected diff tabs', 'dense facts rows', 'chat/docs embeds'],
  },
  {
    area: 'chat-surfaces',
    paths: [
      'src/mockups/ChatPrimitives.tsx',
      'src/mockups/ChatPrimitives.stories.tsx',
      'src/mockups/ChatPrimitives.test.tsx',
      'src/mockups/mockups.css',
    ],
    concerns: ['thread selection', 'memo metadata contrast', 'tool card hierarchy', 'composer and inspector dark states'],
  },
  {
    area: 'docs-surfaces',
    paths: [
      'src/mockups/CodexPrimitives.tsx',
      'src/mockups/CodexPrimitives.stories.tsx',
      'src/mockups/CodexPrimitives.test.tsx',
      'src/mockups/mockups.css',
    ],
    concerns: ['toc and margin interactions', 'metadata quiet tones', 'code figure framing in dark mode'],
  },
  {
    area: 'manuscript-seraph',
    paths: [
      'src/mockups/SeraphPrimitives.tsx',
      'src/mockups/SeraphPrimitives.stories.tsx',
      'src/mockups/mockups.css',
    ],
    concerns: ['sidebar thread selection', 'ornate panel hierarchy in void theme', 'dense manuscript card readability'],
  },
];

export async function process(inputs, ctx) {
  const requestText = inputs.requestText ?? '';
  const projectDir = inputs.projectDir ?? '.';
  const auditedSurfaces = inputs.auditedSurfaces ?? DEFAULT_SURFACES;
  const validationCommand = inputs.validationCommand ?? 'npm run validate';

  ctx.log('info', 'Phase 1: audit the dark-mode and accessibility risk matrix');
  const auditMatrix = await ctx.task(auditMatrixTask, {
    requestText,
    projectDir,
    auditedSurfaces,
  });

  ctx.log('info', 'Phase 2: route issues into scoped fixes and coverage obligations');
  const fixPlan = await ctx.task(fixPlanTask, {
    requestText,
    projectDir,
    auditMatrix,
  });

  ctx.log('info', 'Phase 3: implement the hardening changes');
  const implementation = await ctx.task(implementationTask, {
    requestText,
    projectDir,
    auditMatrix,
    fixPlan,
  });

  ctx.log('info', 'Phase 4: update Storybook and regression coverage for sensitive states');
  const coverage = await ctx.task(coverageTask, {
    requestText,
    projectDir,
    auditMatrix,
    fixPlan,
    implementation,
  });

  ctx.log('info', 'Phase 5: verify the pass and record inspection notes');
  const verification = await ctx.task(verificationTask, {
    requestText,
    projectDir,
    auditMatrix,
    implementation,
    coverage,
    validationCommand,
  });

  ctx.log('info', 'Phase 6: summarize convergence proof');
  const completionProof = await ctx.task(finalReviewTask, {
    auditMatrix,
    fixPlan,
    implementation,
    coverage,
    verification,
  });

  return {
    success: verification.success === true,
    auditMatrix,
    fixPlan,
    implementation,
    coverage,
    verification,
    completionProof,
  };
}

const auditMatrixTask = defineTask('dark-mode-a11y-audit-matrix', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Audit matrix for dark mode and accessibility convergence',
  description: 'Inspect the targeted surfaces and enumerate the concrete hierarchy, contrast, and interaction-state risks.',
  agent: {
    name: 'dark-mode-a11y-auditor',
    prompt: {
      role: 'principal design-system auditor focused on dark mode and accessibility-sensitive UI states',
      task: 'Build the audit matrix for the requested hardening pass.',
      context: {
        requestText: args.requestText,
        projectDir: args.projectDir,
        auditedSurfaces: args.auditedSurfaces,
      },
      instructions: [
        'Read the targeted component, mockup, story, and test files before deciding the audit matrix.',
        'For each surface, enumerate the exact states that are high risk in dark mode: hover, active, focus-visible, selected, disabled, and dense metadata pairings where applicable.',
        'Call out semantics issues separately from color and hierarchy issues.',
        'Be concrete about where Storybook must expose direct inspection stories and where automated regression checks are required.',
        'Do not prescribe shell subtasks or breakpoints.',
        'Output strict JSON only.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  surfaces: Array<{ area: string, files: string[], riskSummary: string, stateMatrix: string[], contrastRisks: string[], semanticRisks: string[], requiredStories: string[], requiredTests: string[] }>,',
        '  priorityOrder: string[],',
        '  manualInspectionTargets: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['surfaces', 'priorityOrder', 'manualInspectionTargets'],
      properties: {
        surfaces: {
          type: 'array',
          items: {
            type: 'object',
            required: ['area', 'files', 'riskSummary', 'stateMatrix', 'contrastRisks', 'semanticRisks', 'requiredStories', 'requiredTests'],
            properties: {
              area: { type: 'string' },
              files: { type: 'array', items: { type: 'string' } },
              riskSummary: { type: 'string' },
              stateMatrix: { type: 'array', items: { type: 'string' } },
              contrastRisks: { type: 'array', items: { type: 'string' } },
              semanticRisks: { type: 'array', items: { type: 'string' } },
              requiredStories: { type: 'array', items: { type: 'string' } },
              requiredTests: { type: 'array', items: { type: 'string' } },
            },
          },
        },
        priorityOrder: { type: 'array', items: { type: 'string' } },
        manualInspectionTargets: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['dark-mode', 'a11y', 'audit'],
}));

const fixPlanTask = defineTask('dark-mode-a11y-fix-plan', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Route audited issues into scoped fixes',
  description: 'Turn the audit matrix into a concrete implementation and coverage plan.',
  agent: {
    name: 'dark-mode-a11y-planner',
    prompt: {
      role: 'senior UI engineer planning a scoped convergence pass',
      task: 'Convert the audit matrix into a concrete fix plan with direct routing to implementation, stories, and tests.',
      context: {
        requestText: args.requestText,
        projectDir: args.projectDir,
        auditMatrix: args.auditMatrix,
      },
      instructions: [
        'Map each surfaced risk to a specific file or file group.',
        'Separate pure style hardening from semantic markup fixes and from coverage work.',
        'Require Storybook stories for high-risk state combinations and regression tests for the most backslide-prone surfaces.',
        'Keep the plan constrained to the audited surfaces.',
        'Do not add shell tasks or breakpoints.',
        'Output strict JSON only.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  workstreams: Array<{ title: string, files: string[], changes: string[], storyCoverage: string[], testCoverage: string[] }>,',
        '  blockedBy: string[],',
        '  successCriteria: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['workstreams', 'blockedBy', 'successCriteria'],
      properties: {
        workstreams: {
          type: 'array',
          items: {
            type: 'object',
            required: ['title', 'files', 'changes', 'storyCoverage', 'testCoverage'],
            properties: {
              title: { type: 'string' },
              files: { type: 'array', items: { type: 'string' } },
              changes: { type: 'array', items: { type: 'string' } },
              storyCoverage: { type: 'array', items: { type: 'string' } },
              testCoverage: { type: 'array', items: { type: 'string' } },
            },
          },
        },
        blockedBy: { type: 'array', items: { type: 'string' } },
        successCriteria: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['dark-mode', 'a11y', 'planning'],
}));

const implementationTask = defineTask('dark-mode-a11y-implementation', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Implement the dark-mode and accessibility hardening pass',
  description: 'Apply the scoped fixes across the targeted surfaces.',
  agent: {
    name: 'dark-mode-a11y-implementer',
    prompt: {
      role: 'senior React and CSS engineer shipping a convergence pass',
      task: 'Implement the audited dark-mode and accessibility fixes completely.',
      context: {
        requestText: args.requestText,
        projectDir: args.projectDir,
        auditMatrix: args.auditMatrix,
        fixPlan: args.fixPlan,
      },
      instructions: [
        'Use the fix plan as the implementation source of truth.',
        'Harden dark-mode hierarchy, metadata contrast, and interaction states on the scoped surfaces.',
        'Fix semantic accessibility issues where markup is currently non-interactive or poorly expressed.',
        'Keep the visual language intact; this is a hardening pass, not a redesign.',
        'Return only concrete implementation outcomes and touched files.',
        'Output strict JSON only.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  filesChanged: string[],',
        '  stateFixes: string[],',
        '  semanticFixes: string[],',
        '  contrastFixes: string[],',
        '  notes: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'stateFixes', 'semanticFixes', 'contrastFixes', 'notes'],
      properties: {
        filesChanged: { type: 'array', items: { type: 'string' } },
        stateFixes: { type: 'array', items: { type: 'string' } },
        semanticFixes: { type: 'array', items: { type: 'string' } },
        contrastFixes: { type: 'array', items: { type: 'string' } },
        notes: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['dark-mode', 'a11y', 'implementation'],
}));

const coverageTask = defineTask('dark-mode-a11y-coverage', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Update stories and regression checks for high-risk combinations',
  description: 'Ensure Storybook and automated checks directly expose the sensitive state combinations.',
  agent: {
    name: 'dark-mode-a11y-coverage',
    prompt: {
      role: 'storybook and regression coverage specialist',
      task: 'Add or update the required stories and tests for the dark-mode accessibility pass.',
      context: {
        requestText: args.requestText,
        projectDir: args.projectDir,
        auditMatrix: args.auditMatrix,
        fixPlan: args.fixPlan,
        implementation: args.implementation,
      },
      instructions: [
        'Expose direct Storybook stories for the high-risk combinations identified in the audit matrix.',
        'Add or adjust automated regression tests for the surfaces most likely to backslide.',
        'Prefer targeted tests and stories over broad galleries when the goal is inspection fidelity.',
        'Return the exact stories and tests added or updated.',
        'Output strict JSON only.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  storyFilesChanged: string[],',
        '  storyIds: string[],',
        '  testFilesChanged: string[],',
        '  regressionChecks: string[],',
        '  notes: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['storyFilesChanged', 'storyIds', 'testFilesChanged', 'regressionChecks', 'notes'],
      properties: {
        storyFilesChanged: { type: 'array', items: { type: 'string' } },
        storyIds: { type: 'array', items: { type: 'string' } },
        testFilesChanged: { type: 'array', items: { type: 'string' } },
        regressionChecks: { type: 'array', items: { type: 'string' } },
        notes: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['dark-mode', 'a11y', 'coverage'],
}));

const verificationTask = defineTask('dark-mode-a11y-verification', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Verify the convergence pass and capture inspection notes',
  description: 'Run automated validation and finish with explicit manual inspection notes.',
  agent: {
    name: 'dark-mode-a11y-verifier',
    prompt: {
      role: 'frontend verification engineer',
      task: 'Verify the dark-mode accessibility pass with automated checks and manual inspection notes.',
      context: {
        requestText: args.requestText,
        projectDir: args.projectDir,
        auditMatrix: args.auditMatrix,
        implementation: args.implementation,
        coverage: args.coverage,
        validationCommand: args.validationCommand,
      },
      instructions: [
        'Run the relevant automated validation in the project directory and report real outcomes.',
        'Inspect the targeted stories in both vellum and void where the audit matrix requires theme-sensitive review.',
        'Confirm whether the highest-risk interaction states and metadata pairings are now covered by stories and tests.',
        'Return manual inspection notes even when automated checks pass.',
        'Do not ask for breakpoints.',
        'Output strict JSON only.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  success: boolean,',
        '  automatedChecks: Array<{ label: string, outcome: string }>,',
        '  manualInspectionNotes: string[],',
        '  residualRisks: string[],',
        '  failedChecks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['success', 'automatedChecks', 'manualInspectionNotes', 'residualRisks', 'failedChecks'],
      properties: {
        success: { type: 'boolean' },
        automatedChecks: {
          type: 'array',
          items: {
            type: 'object',
            required: ['label', 'outcome'],
            properties: {
              label: { type: 'string' },
              outcome: { type: 'string' },
            },
          },
        },
        manualInspectionNotes: { type: 'array', items: { type: 'string' } },
        residualRisks: { type: 'array', items: { type: 'string' } },
        failedChecks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['dark-mode', 'a11y', 'verification'],
}));

const finalReviewTask = defineTask('dark-mode-a11y-final-review', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Summarize convergence proof',
  description: 'Synthesize the audit, fixes, coverage, and verification into a concise completion proof.',
  agent: {
    name: 'dark-mode-a11y-reviewer',
    prompt: {
      role: 'staff engineer reviewing completion evidence',
      task: 'Summarize whether the dark-mode accessibility convergence pass satisfied the request.',
      context: {
        auditMatrix: args.auditMatrix,
        fixPlan: args.fixPlan,
        implementation: args.implementation,
        coverage: args.coverage,
        verification: args.verification,
      },
      instructions: [
        'Summarize the audited surfaces, the key fixes, and the supporting coverage.',
        'Call out any residual risk that remains intentionally documented instead of fixed.',
        'Be explicit about whether the acceptance criteria are met.',
        'Output strict JSON only.',
      ],
      outputFormat: [
        'JSON with keys:',
        '  acceptanceCriteriaStatus: Array<{ criterion: string, status: string, evidence: string }>,',
        '  strengths: string[],',
        '  residualRisks: string[],',
        '  verdict: string',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['acceptanceCriteriaStatus', 'strengths', 'residualRisks', 'verdict'],
      properties: {
        acceptanceCriteriaStatus: {
          type: 'array',
          items: {
            type: 'object',
            required: ['criterion', 'status', 'evidence'],
            properties: {
              criterion: { type: 'string' },
              status: { type: 'string' },
              evidence: { type: 'string' },
            },
          },
        },
        strengths: { type: 'array', items: { type: 'string' } },
        residualRisks: { type: 'array', items: { type: 'string' } },
        verdict: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['dark-mode', 'a11y', 'review'],
}));
