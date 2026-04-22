/**
 * @process design-system-mockup-remediation
 * @description Brownfield remediation for compendium mock fidelity, Storybook mock previews,
 *   and example-app parity against the project preview surfaces.
 * @skill storybook plugins/babysitter/skills/babysit/process/specializations/web-development/skills/storybook/SKILL.md
 * @agent react-developer plugins/babysitter/skills/babysit/process/specializations/web-development/agents/react-developer/AGENT.md
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

const DEFAULT_MOCKUPS = [
  'Ads',
  'Brand',
  'Chat',
  'Colors',
  'Components',
  'Dashboard',
  'Docs',
  'Spacing',
  'Type',
];

export async function process(inputs, ctx) {
  const {
    projectDir = '.',
    exampleDir = 'examples/basic-usage',
    requestText = '',
    mockupNames = DEFAULT_MOCKUPS,
    relatedRunId = '',
    relatedRunReason = 'follow-up',
  } = inputs;

  const startTime = ctx.now();

  ctx.log('info', 'Phase 1: runtime inventory and brownfield path tracing');
  const runtimeInventory = await ctx.task(runtimeInventoryTask, {
    projectDir,
    exampleDir,
  });

  ctx.log('info', 'Phase 2: remediation plan for mock fidelity and coverage');
  const remediationPlan = await ctx.task(remediationPlanTask, {
    projectDir,
    exampleDir,
    requestText,
    mockupNames,
    runtimeInventory,
    relatedRunId,
    relatedRunReason,
  });

  ctx.log('info', 'Phase 3: implement mockup stories, shared surfaces, and example coverage');
  const implementation = await ctx.task(implementMockupRemediationTask, {
    projectDir,
    exampleDir,
    requestText,
    mockupNames,
    runtimeInventory,
    remediationPlan,
    relatedRunId,
    relatedRunReason,
  });

  ctx.log('info', 'Phase 4: deterministic verification gates');
  let coverageCheck = await ctx.task(mockupCoverageCheckTask, {
    projectDir,
    exampleDir,
    mockupNames,
  });
  let typecheck = await ctx.task(typecheckTask, { projectDir });
  let libraryBuild = await ctx.task(libraryBuildTask, { projectDir });
  let storybookBuild = await ctx.task(storybookBuildTask, { projectDir });
  let exampleBuild = await ctx.task(exampleBuildTask, { projectDir, exampleDir });

  const firstFailures = summarizeFailures({
    coverageCheck,
    typecheck,
    libraryBuild,
    storybookBuild,
    exampleBuild,
  });

  let repair = null;
  if (firstFailures.length > 0) {
    ctx.log('warn', `Verification failed: ${firstFailures.join(', ')}`);

    repair = await ctx.task(fixFailedVerificationTask, {
      projectDir,
      exampleDir,
      requestText,
      mockupNames,
      runtimeInventory,
      remediationPlan,
      implementation,
      failures: firstFailures,
    });

    coverageCheck = await ctx.task(mockupCoverageCheckTask, {
      projectDir,
      exampleDir,
      mockupNames,
    });
    typecheck = await ctx.task(typecheckTask, { projectDir });
    libraryBuild = await ctx.task(libraryBuildTask, { projectDir });
    storybookBuild = await ctx.task(storybookBuildTask, { projectDir });
    exampleBuild = await ctx.task(exampleBuildTask, { projectDir, exampleDir });
  }

  const finalFailures = summarizeFailures({
    coverageCheck,
    typecheck,
    libraryBuild,
    storybookBuild,
    exampleBuild,
  });

  return {
    success: finalFailures.length === 0,
    requestText,
    mockupNames,
    relatedRunId,
    relatedRunReason,
    runtimeCallPaths:
      remediationPlan.runtimeCallPaths ??
      implementation.runtimeCallPaths ??
      [],
    storyIds:
      implementation.storyIds ??
      [],
    mockupsCovered:
      implementation.mockupsCovered ??
      [],
    exampleSurfaces:
      implementation.exampleSurfaces ??
      [],
    verification: {
      coverageCheck,
      typecheck,
      libraryBuild,
      storybookBuild,
      exampleBuild,
      finalFailures,
    },
    repair,
    duration: ctx.now() - startTime,
    metadata: {
      processId: 'design-system-mockup-remediation',
      timestamp: startTime,
    },
  };
}

function summarizeFailures(results) {
  return Object.entries(results)
    .filter(([, result]) => (result?.exitCode ?? 1) !== 0)
    .map(([name]) => name);
}

export const runtimeInventoryTask = defineTask('runtime-inventory', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Inventory live runtime paths for storybook, source, examples, and preview specs',
  shell: {
    command: [
      "$ErrorActionPreference = 'Stop'",
      "$paths = @(",
      "  '.storybook',",
      "  'src',",
      `  '${args.exampleDir.replace(/\\/g, '/')}/src',`,
      "  'project/preview',",
      "  'project/ui_kits/marketing'",
      ")",
      "foreach ($path in $paths) {",
      "  if (Test-Path $path) {",
      "    Write-Output \"## $path\"",
      "    rg --files $path",
      "  }",
      "}",
    ].join('; '),
    cwd: args.projectDir,
    expectedExitCode: 0,
    timeout: 30000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['brownfield', 'inventory', 'storybook', 'examples', 'mockups'],
}));

export const remediationPlanTask = defineTask('remediation-plan', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Plan mockup remediation on the live runtime paths only',
  agent: {
    name: 'react-developer',
    prompt: {
      role: 'Senior React maintainer for a brownfield design-system repo',
      task: 'Produce a concise remediation plan and runtime call-path map before code changes.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        relatedRunId: args.relatedRunId,
        relatedRunReason: args.relatedRunReason,
        mockupNames: args.mockupNames,
        runtimeInventory: args.runtimeInventory,
      },
      instructions: [
        'USER REQUEST (verbatim):',
        '---',
        args.requestText,
        '---',
        'Work only on live runtime paths that affect Storybook, shared source surfaces, and the basic usage example app.',
        'Trace the runtime call paths from `.storybook/main.ts` and `.storybook/preview.ts` through stories, shared source files, CSS entry points, and `examples/basic-usage/src/App.tsx`.',
        'Name the minimal files/modules that should change to add Storybook previews for the project mock surfaces and reuse them in the example app.',
        'Do not cut scope silently. Preserve mock fidelity work, Storybook coverage, meaningful controls, and example parity.',
        'Return JSON with keys: `runtimeCallPaths`, `plan`, `targetFiles`, `verificationNotes`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['runtimeCallPaths', 'plan', 'targetFiles', 'verificationNotes'],
      properties: {
        runtimeCallPaths: { type: 'array' },
        plan: { type: 'array' },
        targetFiles: { type: 'array' },
        verificationNotes: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['brownfield', 'planning', 'storybook', 'examples', 'mockups'],
}));

export const implementMockupRemediationTask = defineTask('implement-mockup-remediation', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Implement shared mockup surfaces, stories, and example-app parity',
  agent: {
    name: 'react-developer',
    prompt: {
      role: 'Senior React design-system engineer',
      task: 'Implement the requested brownfield remediation completely, not as a proposal.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        relatedRunId: args.relatedRunId,
        relatedRunReason: args.relatedRunReason,
        mockupNames: args.mockupNames,
        runtimeInventory: args.runtimeInventory,
        remediationPlan: args.remediationPlan,
      },
      instructions: [
        'USER REQUEST (verbatim):',
        '---',
        args.requestText,
        '---',
        'Implement React mockup surfaces that match the project preview sources as closely as practical with the existing compendium tokens, technical CSS, components, and icons.',
        'Create or update Storybook stories so each project preview mock surface has a preview and meaningful controls.',
        'Reuse the same shared React surfaces in the basic usage example app so the examples cover the same mock families.',
        'Prefer shared source files over duplicating markup across Storybook and the example app.',
        'Keep package public API stable unless exporting a shared internal surface is clearly required for reuse.',
        'Do not touch unrelated files or add speculative abstractions.',
        'Return JSON with keys: `filesChanged`, `runtimeCallPaths`, `mockupsCovered`, `storyIds`, `exampleSurfaces`, `notes`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'runtimeCallPaths', 'mockupsCovered', 'storyIds', 'exampleSurfaces', 'notes'],
      properties: {
        filesChanged: { type: 'array' },
        runtimeCallPaths: { type: 'array' },
        mockupsCovered: { type: 'array' },
        storyIds: { type: 'array' },
        exampleSurfaces: { type: 'array' },
        notes: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['implementation', 'react', 'storybook', 'examples', 'mockups'],
}));

export const mockupCoverageCheckTask = defineTask('mockup-coverage-check', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Verify story coverage and shared mockup source files exist',
  shell: {
    command: [
      "$ErrorActionPreference = 'Stop'",
      "$storyFile = 'src/mockups/MockupPreviews.stories.tsx'",
      "$surfaceFile = 'src/mockups/MockupPreviews.tsx'",
      "$exampleFile = 'examples/basic-usage/src/App.tsx'",
      "if (!(Test-Path $storyFile)) { Write-Error \"Missing $storyFile\" }",
      "if (!(Test-Path $surfaceFile)) { Write-Error \"Missing $surfaceFile\" }",
      "if (!(Test-Path $exampleFile)) { Write-Error \"Missing $exampleFile\" }",
      "$storyText = Get-Content -Raw $storyFile",
      "$surfaceText = Get-Content -Raw $surfaceFile",
      "$exampleText = Get-Content -Raw $exampleFile",
      `$expected = @(${args.mockupNames.map((name) => `'${name}'`).join(', ')})`,
      "foreach ($name in $expected) {",
      "  if ($storyText -notmatch $name) { Write-Error \"Story coverage missing for $name\" }",
      "  if ($surfaceText -notmatch $name) { Write-Error \"Surface definition missing for $name\" }",
      "}",
      "if ($exampleText -notmatch 'Mockup') { Write-Error 'Example app does not reference mockup surfaces' }",
      "Write-Output 'mockup coverage ok'",
    ].join('; '),
    cwd: args.projectDir,
    expectedExitCode: 0,
    timeout: 30000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['verification', 'storybook', 'examples', 'mockups'],
}));

export const typecheckTask = defineTask('typecheck', (args, taskCtx) => ({
  kind: 'shell',
  title: 'TypeScript typecheck',
  shell: {
    command: 'npm run lint',
    cwd: args.projectDir,
    expectedExitCode: 0,
    timeout: 300000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['verification', 'typescript'],
}));

export const libraryBuildTask = defineTask('library-build', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Library build',
  shell: {
    command: 'npm run build',
    cwd: args.projectDir,
    expectedExitCode: 0,
    timeout: 300000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['verification', 'build', 'library'],
}));

export const storybookBuildTask = defineTask('storybook-build', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Storybook build',
  shell: {
    command: 'npm run build-storybook',
    cwd: args.projectDir,
    expectedExitCode: 0,
    timeout: 300000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['verification', 'storybook', 'build'],
}));

export const exampleBuildTask = defineTask('example-build', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Basic usage example build',
  shell: {
    command: 'npm run build',
    cwd: args.exampleDir,
    expectedExitCode: 0,
    timeout: 300000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['verification', 'examples', 'build'],
}));

export const fixFailedVerificationTask = defineTask('fix-failed-verification', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Repair verification failures without reducing scope',
  agent: {
    name: 'react-developer',
    prompt: {
      role: 'Senior maintainer fixing brownfield verification regressions',
      task: 'Fix the root causes of the failed verification gates while preserving the requested scope.',
      context: {
        projectDir: args.projectDir,
        exampleDir: args.exampleDir,
        mockupNames: args.mockupNames,
        runtimeInventory: args.runtimeInventory,
        remediationPlan: args.remediationPlan,
        implementation: args.implementation,
        failures: args.failures,
      },
      instructions: [
        'USER REQUEST (verbatim):',
        '---',
        args.requestText,
        '---',
        `The failing gates are: ${args.failures.join(', ')}.`,
        'Repair the actual causes. Do not reduce scope, disable checks, or drop story/example coverage.',
        'Keep edits on the live runtime paths identified earlier.',
        'Return JSON with keys: `filesChanged`, `fixesApplied`, `remainingRisks`.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['filesChanged', 'fixesApplied', 'remainingRisks'],
      properties: {
        filesChanged: { type: 'array' },
        fixesApplied: { type: 'array' },
        remainingRisks: { type: 'array' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['repair', 'verification', 'storybook', 'examples'],
}));
