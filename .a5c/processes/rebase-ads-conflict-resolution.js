import sdk from '/usr/lib/node_modules/@a5c-ai/babysitter-sdk/dist/index.js';

const { defineTask } = sdk;

export async function process(inputs, ctx) {
  const {
    repo = 'compendium',
    branch = 'vk/47a9-deepen-code-edit',
    onto = 'main',
    conflictedFiles = [],
  } = inputs;

  const audit = await ctx.task(auditConflictStateTask, {
    repo,
    branch,
    onto,
    conflictedFiles,
  });

  const resolution = await ctx.task(resolveAdsConflictsTask, {
    repo,
    branch,
    onto,
    conflictedFiles,
    audit,
  });

  const continuation = await ctx.task(continueRebaseTask, {
    repo,
    branch,
    onto,
    conflictedFiles,
    resolution,
  });

  const verification = await ctx.task(verifyRebaseStateTask, {
    repo,
    branch,
    onto,
    continuation,
  });

  return {
    success: true,
    repo,
    branch,
    onto,
    audit,
    resolution,
    continuation,
    verification,
    metadata: {
      processId: 'rebase-ads-conflict-resolution',
      timestamp: ctx.now(),
    },
  };
}

const auditConflictStateTask = defineTask('rebase-audit-conflict-state', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Audit current rebase conflict state',
  description: 'Capture the active rebase position, intended merge direction, and conflicted files before editing.',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'senior engineer auditing an in-progress git rebase',
      task: 'Summarize the current conflict state and the intended resolution direction.',
      context: {
        repo: args.repo,
        branch: args.branch,
        onto: args.onto,
        conflictedFiles: args.conflictedFiles,
      },
      instructions: [
        'Keep the summary tightly scoped to the active rebase.',
        'Identify the merge direction for each conflicted file.',
        'Call out any API collisions or export risks that the resolution must preserve.',
        'Return structured JSON only.',
      ],
      outputFormat: [
        'JSON with:',
        '  conflictedFiles: string[],',
        '  mergeDirection: string,',
        '  fileDecisions: Array<{ file: string, decision: string }>,',
        '  risks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['conflictedFiles', 'mergeDirection', 'fileDecisions', 'risks'],
      properties: {
        conflictedFiles: { type: 'array', items: { type: 'string' } },
        mergeDirection: { type: 'string' },
        fileDecisions: {
          type: 'array',
          items: {
            type: 'object',
            required: ['file', 'decision'],
            properties: {
              file: { type: 'string' },
              decision: { type: 'string' },
            },
          },
        },
        risks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['rebase', 'audit', 'conflicts'],
}));

const resolveAdsConflictsTask = defineTask('rebase-resolve-ads-conflicts', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Resolve ads/mockup rebase conflicts',
  description: 'Merge the Ads primitives, story, and preview surfaces without losing either the primitive or catalog layers.',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'frontend engineer resolving a careful brownfield rebase conflict',
      task: 'Resolve the requested conflicted files and stage them for rebase continuation.',
      context: {
        repo: args.repo,
        branch: args.branch,
        onto: args.onto,
        conflictedFiles: args.conflictedFiles,
        audit: args.audit,
      },
      instructions: [
        'Preserve the low-level Ads primitive surface introduced on the branch.',
        'Preserve the higher-level AdsCatalog and typed data-driven surface from main.',
        'Avoid name collisions between component exports and type exports.',
        'Keep MockupPreviews on the shared catalog-driven surface where that pattern already exists.',
        'Return the concrete changed files and a short summary of the merged decisions.',
      ],
      outputFormat: [
        'JSON with:',
        '  changedFiles: string[],',
        '  stagedFiles: string[],',
        '  summary: string,',
        '  residualRisks: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['changedFiles', 'stagedFiles', 'summary', 'residualRisks'],
      properties: {
        changedFiles: { type: 'array', items: { type: 'string' } },
        stagedFiles: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
        residualRisks: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['rebase', 'implementation', 'conflicts'],
}));

const continueRebaseTask = defineTask('rebase-continue-noninteractive', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Continue rebase without interactive editor',
  description: 'Advance the rebase after staging the resolved files using a non-interactive editor configuration.',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'git specialist continuing an in-progress rebase safely',
      task: 'Continue the rebase after the conflict resolution is staged.',
      context: {
        repo: args.repo,
        branch: args.branch,
        onto: args.onto,
        resolution: args.resolution,
      },
      instructions: [
        'Continue the rebase non-interactively.',
        'Avoid opening a blocking editor session.',
        'Return the resulting rebase status and whether further conflicts remain.',
      ],
      outputFormat: [
        'JSON with:',
        '  rebased: boolean,',
        '  statusSummary: string,',
        '  remainingConflicts: string[]',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['rebased', 'statusSummary', 'remainingConflicts'],
      properties: {
        rebased: { type: 'boolean' },
        statusSummary: { type: 'string' },
        remainingConflicts: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['rebase', 'continue', 'git'],
}));

const verifyRebaseStateTask = defineTask('rebase-verify-state', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Verify post-continue rebase state',
  description: 'Summarize the current branch state after the rebase continuation step.',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'engineer verifying an active git rebase state',
      task: 'Summarize whether the active rebase has completed cleanly or if additional conflicts remain.',
      context: {
        repo: args.repo,
        branch: args.branch,
        onto: args.onto,
        continuation: args.continuation,
      },
      instructions: [
        'Keep the result short and factual.',
        'Return structured JSON only.',
      ],
      outputFormat: [
        'JSON with:',
        '  clean: boolean,',
        '  branchState: string,',
        '  nextAction: string',
      ].join('\n'),
    },
    outputSchema: {
      type: 'object',
      required: ['clean', 'branchState', 'nextAction'],
      properties: {
        clean: { type: 'boolean' },
        branchState: { type: 'string' },
        nextAction: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['rebase', 'verify'],
}));
