/**
 * @process design-system-repo
 * @description Transform a5c.ai design handoff into a publishable React design system package
 *   with TypeScript, Vite library mode, Storybook, examples, and npm publishing.
 *
 * Composed from reference processes:
 *   - specializations/web-development/component-library-radix (component lib structure)
 *   - specializations/web-development/storybook-component-testing (Storybook)
 *   - specializations/web-development/vite-build-configuration (Vite bundling)
 *   - specializations/sdk-platform-development/package-distribution (npm publishing)
 *   - specializations/web-development/typescript-configuration (TS setup)
 *
 * @skill frontend-design
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

export async function process(inputs, ctx) {
  const {
    packageName = '@a5c-ai/compendium',
    projectDir = '.',
  } = inputs;

  const startTime = ctx.now();
  const artifacts = [];

  ctx.log('info', `Starting design system repo transformation: ${packageName}`);

  // ============================================================================
  // PHASE 1: PROJECT SCAFFOLDING
  // Set up package.json, tsconfig, Vite library mode, directory structure
  // ============================================================================

  ctx.log('info', 'Phase 1: Project scaffolding — package.json, tsconfig, Vite, directory structure');

  const scaffolding = await ctx.task(scaffoldProjectTask, {
    packageName,
    projectDir,
  });
  artifacts.push('package.json', 'tsconfig.json', 'vite.config.ts');

  // Shell gate: verify scaffolding produced key files
  const scaffoldVerify = await ctx.task(verifyScaffoldTask, { projectDir });
  ctx.log('info', `Scaffold verification: exit ${scaffoldVerify.exitCode}`);

  // ============================================================================
  // PHASE 2: DESIGN TOKEN EXTRACTION
  // Extract CSS custom properties into structured token files
  // ============================================================================

  ctx.log('info', 'Phase 2: Design token extraction from existing CSS');

  const tokenExtraction = await ctx.task(extractTokensTask, {
    packageName,
    projectDir,
  });
  artifacts.push('src/tokens/');

  // ============================================================================
  // PHASE 3: COMPONENT CONVERSION (TypeScript + ES Modules)
  // Convert window-attached JSX components to proper TS module exports
  // ============================================================================

  ctx.log('info', 'Phase 3: Component conversion — JSX globals to TypeScript ES modules');

  const componentConversion = await ctx.task(convertComponentsTask, {
    packageName,
    projectDir,
  });
  artifacts.push('src/components/');

  // Shell gate: TypeScript compilation check
  const tscCheck = await ctx.task(tscVerifyTask, { projectDir });
  ctx.log('info', `TypeScript compilation: exit ${tscCheck.exitCode}`);

  // ============================================================================
  // PHASE 3.5: REFINEMENT LOOP — fix TS errors if any
  // ============================================================================

  if (tscCheck.exitCode !== 0) {
    ctx.log('info', 'Phase 3.5: TypeScript errors detected — entering refinement loop');

    for (let attempt = 0; attempt < 3; attempt++) {
      const fix = await ctx.task(fixTscErrorsTask, {
        projectDir,
        errors: tscCheck.stderr || tscCheck.stdout,
        attempt,
      });

      const recheck = await ctx.task(tscVerifyTask, { projectDir });
      ctx.log('info', `TSC recheck attempt ${attempt + 1}: exit ${recheck.exitCode}`);
      if (recheck.exitCode === 0) break;
    }
  }

  // ============================================================================
  // PHASE 4: ICONS & ASSETS
  // Convert SVG assets into React icon components
  // ============================================================================

  ctx.log('info', 'Phase 4: SVG assets → React icon components');

  const iconConversion = await ctx.task(convertIconsTask, {
    packageName,
    projectDir,
  });
  artifacts.push('src/icons/');

  // ============================================================================
  // PHASE 5: BARREL EXPORTS & SUBPATH SETUP
  // Create index files and configure package.json exports map
  // ============================================================================

  ctx.log('info', 'Phase 5: Barrel exports and subpath configuration');

  const exportsSetup = await ctx.task(setupExportsTask, {
    packageName,
    projectDir,
  });
  artifacts.push('src/index.ts');

  // ============================================================================
  // PHASE 6: STORYBOOK
  // Configure Storybook 8 with component stories and docs
  // ============================================================================

  ctx.log('info', 'Phase 6: Storybook setup with component stories');

  const storybookSetup = await ctx.task(setupStorybookTask, {
    packageName,
    projectDir,
  });
  artifacts.push('.storybook/', 'src/**/*.stories.tsx');

  // Shell gate: Storybook build
  const storybookBuild = await ctx.task(storybookBuildVerifyTask, { projectDir });
  ctx.log('info', `Storybook build: exit ${storybookBuild.exitCode}`);

  // ============================================================================
  // PHASE 7: BUILD & BUNDLE VERIFICATION
  // Run Vite library build, check output
  // ============================================================================

  ctx.log('info', 'Phase 7: Vite library build and bundle verification');

  const viteBuild = await ctx.task(viteBuildVerifyTask, { projectDir });
  ctx.log('info', `Vite build: exit ${viteBuild.exitCode}`);

  // ============================================================================
  // PHASE 7.5: BUILD FIX LOOP
  // ============================================================================

  if (viteBuild.exitCode !== 0) {
    ctx.log('info', 'Phase 7.5: Build errors — entering fix loop');

    for (let attempt = 0; attempt < 3; attempt++) {
      const fix = await ctx.task(fixBuildErrorsTask, {
        projectDir,
        errors: viteBuild.stderr || viteBuild.stdout,
        attempt,
      });

      const recheck = await ctx.task(viteBuildVerifyTask, { projectDir });
      ctx.log('info', `Build recheck attempt ${attempt + 1}: exit ${recheck.exitCode}`);
      if (recheck.exitCode === 0) break;
    }
  }

  // ============================================================================
  // PHASE 8: EXAMPLE APP
  // Create a small example React app demonstrating consumption
  // ============================================================================

  ctx.log('info', 'Phase 8: Example consumer app');

  const exampleApp = await ctx.task(createExampleAppTask, {
    packageName,
    projectDir,
  });
  artifacts.push('examples/');

  // ============================================================================
  // PHASE 9: PUBLISHING CONFIGURATION
  // npm publish config, changesets, README, LICENSE
  // ============================================================================

  ctx.log('info', 'Phase 9: Publishing configuration');

  const publishConfig = await ctx.task(setupPublishingTask, {
    packageName,
    projectDir,
  });
  artifacts.push('.changeset/', 'README.md');

  // ============================================================================
  // BREAKPOINT: Review before final verification
  // ============================================================================

  await ctx.breakpoint({
    question: 'Design system repo is scaffolded with components, Storybook, build, and publishing config. Review the work so far and approve to proceed to final verification?',
    title: 'Design System Review',
    options: ['Approve — run final verification', 'Request changes'],
    expert: 'owner',
    tags: ['approval-gate', 'design-system'],
    breakpointId: 'design-system.pre-final-review',
    autoApproveAfterN: -1,
  });

  // ============================================================================
  // PHASE 10: FINAL VERIFICATION SWEEP
  // TSC + Vite build + Storybook build + lint
  // ============================================================================

  ctx.log('info', 'Phase 10: Final verification sweep');

  const finalVerify = await ctx.task(finalVerificationTask, { projectDir });
  ctx.log('info', `Final verification: exit ${finalVerify.exitCode}`);

  if (finalVerify.exitCode !== 0) {
    ctx.log('warn', 'Final verification failed — entering last-resort fix');

    const lastFix = await ctx.task(finalFixTask, {
      projectDir,
      errors: finalVerify.stderr || finalVerify.stdout,
    });

    const lastCheck = await ctx.task(finalVerificationTask, { projectDir });
    ctx.log('info', `Final re-verification: exit ${lastCheck.exitCode}`);
  }

  return {
    success: true,
    packageName,
    artifacts,
    duration: ctx.now() - startTime,
    metadata: {
      processId: 'design-system-repo',
      timestamp: startTime,
    },
  };
}

// ============================================================================
// TASK DEFINITIONS
// ============================================================================

export const scaffoldProjectTask = defineTask('scaffold-project', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Scaffold design system project structure',
  execution: { model: 'claude-opus-4-6' },
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior frontend architect specializing in React component libraries',
      task: `Scaffold the project structure for a publishable React design system package called "${args.packageName}".`,
      context: {
        packageName: args.packageName,
        projectDir: args.projectDir,
        existingFiles: 'project/ directory contains CSS token files, JSX prototype components, SVG assets. These should NOT be deleted — the conversion happens in later phases.',
      },
      instructions: [
        'Create the following project structure (do NOT delete existing project/ directory):',
        '',
        'src/',
        '  tokens/      — will hold extracted CSS token files',
        '  components/  — will hold converted TypeScript React components',
        '  icons/       — will hold SVG icon React components',
        '  index.ts     — placeholder barrel export',
        '',
        'Create package.json with:',
        '  - name: ' + args.packageName,
        '  - type: "module"',
        '  - main: "./dist/index.cjs"',
        '  - module: "./dist/index.js"',
        '  - types: "./dist/index.d.ts"',
        '  - exports map with subpaths: ".", "./tokens", "./react", "./icons", "./css"',
        '  - files: ["dist", "README.md", "LICENSE"]',
        '  - peerDependencies: react ^18 || ^19, react-dom ^18 || ^19',
        '  - devDependencies: typescript, @types/react, @types/react-dom, vite, @vitejs/plugin-react, storybook + addons (latest v8), vitest, @storybook/react-vite, @storybook/addon-essentials, @changesets/cli',
        '  - scripts: dev (storybook), build (vite build), build-storybook, lint (tsc --noEmit), test (vitest), prepublishOnly (npm run build), changeset, release',
        '  - sideEffects: ["**/*.css"]',
        '  - version: "0.1.0"',
        '',
        'Create tsconfig.json:',
        '  - target: ES2020, module: ESNext, moduleResolution: bundler',
        '  - jsx: react-jsx',
        '  - declaration: true, declarationDir: dist',
        '  - outDir: dist',
        '  - strict: true',
        '  - include: ["src"]',
        '  - exclude: ["node_modules", "dist", "**/*.stories.tsx", "examples"]',
        '',
        'Create vite.config.ts:',
        '  - Library mode targeting src/index.ts',
        '  - Output formats: es and cjs',
        '  - External: react, react-dom, react/jsx-runtime',
        '  - CSS is NOT extracted to a single file — each component CSS is importable separately',
        '  - Plugin: @vitejs/plugin-react',
        '  - rollupOptions.output.preserveModules: true for tree-shaking',
        '  - rollupOptions.output.assetFileNames for CSS',
        '',
        'Create .gitignore (add dist/, node_modules/, storybook-static/)',
        'Create LICENSE (MIT, copyright a5c.ai)',
        '',
        'Run npm install after creating package.json.',
        '',
        'IMPORTANT: Do NOT modify or delete anything in the project/ directory.',
        'IMPORTANT: Actually create ALL files listed above and run npm install.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success', 'filesCreated'],
      properties: {
        success: { type: 'boolean' },
        filesCreated: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['scaffold', 'setup'],
}));

export const verifyScaffoldTask = defineTask('verify-scaffold', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Verify project scaffolding',
  shell: {
    command: [
      `cd "${args.projectDir}"`,
      'test -f package.json',
      'test -f tsconfig.json',
      'test -f vite.config.ts',
      'test -d src',
      'test -d node_modules',
      'echo "Scaffold verified"',
    ].join(' && '),
    expectedExitCode: 0,
    timeout: 15000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['verify', 'scaffold'],
}));

export const extractTokensTask = defineTask('extract-tokens', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Extract design tokens from CSS into structured token files',
  execution: { model: 'claude-opus-4-6' },
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Design systems engineer',
      task: `Extract CSS design tokens from the existing CSS files into the src/tokens/ directory for the ${args.packageName} package.`,
      context: {
        packageName: args.packageName,
        projectDir: args.projectDir,
        sourceFiles: [
          'project/colors_and_type.css — CSS custom properties for colors, typography, spacing',
          'project/codex-ornate.css — ornate component styles (cartouches, brass plates, wax seals)',
          'project/ornate.css — ornate styling variants',
          'project/technical.css — technical/data styles',
          'project/tk-controls.css — component control styles (buttons, inputs, toggles, etc.)',
        ],
      },
      instructions: [
        'Read ALL the existing CSS files in project/ to understand the full token system.',
        '',
        'Create the following files in src/tokens/:',
        '',
        '1. src/tokens/variables.css — ALL CSS custom properties extracted and organized:',
        '   - Colors (ground, ink, glyph, accent, semantic)',
        '   - Typography (font families, sizes, weights, line heights)',
        '   - Spacing scale',
        '   - Borders, radii, shadows',
        '   - Transitions/motion',
        '   Group them with clear section comments.',
        '',
        '2. src/tokens/reset.css — minimal CSS reset/normalize for the design system',
        '',
        '3. src/tokens/base.css — base typography styles that apply the token variables',
        '   (body font, heading scales, code/mono styling, link styling)',
        '',
        '4. src/tokens/index.css — imports all token CSS files in order',
        '',
        '5. src/tokens/index.ts — TypeScript file that:',
        '   - Exports the token values as a JS object (for programmatic access)',
        '   - Exports type definitions for token keys',
        '   - import "./index.css" to ensure CSS is included',
        '',
        'The CSS custom properties should use the EXACT same names as in the source files',
        '(--ground-vellum, --ink-pigment, --accent-cinnabar, etc.) for backward compatibility.',
        '',
        'IMPORTANT: Read every CSS file thoroughly before writing tokens.',
        'IMPORTANT: Actually create all files. Do not just describe them.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success', 'tokenCount'],
      properties: {
        success: { type: 'boolean' },
        tokenCount: { type: 'number' },
        filesCreated: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['tokens', 'css', 'extraction'],
}));

export const convertComponentsTask = defineTask('convert-components', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Convert JSX prototype components to TypeScript ES modules',
  execution: { model: 'claude-opus-4-6' },
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/TypeScript developer specializing in component library development',
      task: `Convert the prototype JSX components from project/ into proper TypeScript React components in src/components/ for the ${args.packageName} package.`,
      context: {
        packageName: args.packageName,
        projectDir: args.projectDir,
        sourceFiles: [
          'project/tk-react-base.jsx — utility hooks (cx, useId, useOutside, useKey, useCtrl) and Icon component',
          'project/tk-react-controls.jsx — Button, IconButton, Toggle, Checkbox, Radio, Slider, RangeSlider, Stepper, Input, Textarea, Field, Tag, InlineEdit, ColorPicker, Progress, Spinner, Skeleton',
          'project/tk-react-layout.jsx — Accordion, Tabs, Table, Pagination, DataGrid, Nav/NavItem, Sidebar, Breadcrumb, SplitPane',
          'project/tk-react-overlays.jsx — Tooltip, Popover, Select, Combobox, DropdownMenu, Modal, Drawer, CommandPalette, ContextMenu, Toast/useToasts',
          'project/tk-controls.css — all component styles',
        ],
      },
      instructions: [
        'Read ALL the source JSX files in project/ THOROUGHLY before starting conversion.',
        '',
        'CONVERSION RULES:',
        '1. Each component gets its own file: src/components/ComponentName/ComponentName.tsx',
        '2. Each component file also gets a CSS module or CSS file: src/components/ComponentName/ComponentName.css (using the existing class names from tk-controls.css)',
        '3. Each component directory gets an index.ts barrel export',
        '',
        'Create src/components/ structure:',
        '',
        '  src/components/',
        '    hooks/           — shared hooks (useOutside, useKey, useCtrl, etc.)',
        '      index.ts',
        '      useOutside.ts',
        '      useKey.ts',
        '      useCtrl.ts',
        '    utils/            — shared utils (cx, roman numeral helper, etc.)',
        '      index.ts',
        '      cx.ts',
        '    Icon/             — Icon component',
        '    Button/           — Button + IconButton',
        '    Toggle/',
        '    Checkbox/',
        '    Radio/',
        '    Slider/           — Slider + RangeSlider',
        '    Stepper/',
        '    Input/            — Input + Textarea + Field',
        '    Tag/',
        '    InlineEdit/',
        '    ColorPicker/',
        '    Progress/         — Progress + Spinner + Skeleton',
        '    Accordion/',
        '    Tabs/',
        '    Table/            — Table + DataGrid + Pagination',
        '    Nav/              — Nav + NavItem + Sidebar + Breadcrumb',
        '    SplitPane/',
        '    Tooltip/',
        '    Popover/',
        '    Select/           — Select + Combobox',
        '    DropdownMenu/     — DropdownMenu + ContextMenu',
        '    Modal/            — Modal + Drawer',
        '    CommandPalette/',
        '    Toast/            — Toast + useToasts',
        '    index.ts          — barrel export all components',
        '',
        'FOR EACH COMPONENT:',
        '- Define a proper Props interface with TypeScript types',
        '- Use React.forwardRef where the component renders a DOM element',
        '- Replace window-attached globals with proper imports',
        '- Replace global React.* with named imports from "react"',
        '- Keep the exact same visual behavior and CSS class names',
        '- Export the component as a named export',
        '- Extract relevant CSS from tk-controls.css into the component CSS file',
        '',
        'Create src/components/index.ts that re-exports everything.',
        '',
        'IMPORTANT: Read the source files FIRST. Match the behavior exactly.',
        'IMPORTANT: Actually create ALL component files. Do not skip any.',
        'IMPORTANT: The CSS class names must match tk-controls.css exactly (tkc-btn, tkc-toggle, etc.)',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success', 'componentCount'],
      properties: {
        success: { type: 'boolean' },
        componentCount: { type: 'number' },
        componentsConverted: { type: 'array', items: { type: 'string' } },
        filesCreated: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['components', 'typescript', 'conversion'],
}));

export const tscVerifyTask = defineTask('tsc-verify', (args, taskCtx) => ({
  kind: 'shell',
  title: 'TypeScript compilation check',
  shell: {
    command: `cd "${args.projectDir}" && npx tsc --noEmit 2>&1; echo "EXIT:$?"`,
    expectedExitCode: 0,
    timeout: 120000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['verify', 'typescript'],
}));

export const fixTscErrorsTask = defineTask('fix-tsc-errors', (args, taskCtx) => ({
  kind: 'agent',
  title: `Fix TypeScript errors (attempt ${args.attempt + 1})`,
  execution: { model: 'claude-opus-4-6' },
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'TypeScript expert',
      task: 'Fix TypeScript compilation errors in the design system components.',
      context: {
        projectDir: args.projectDir,
        errors: args.errors,
        attempt: args.attempt,
      },
      instructions: [
        'Run `npx tsc --noEmit` to see current errors.',
        'Fix ALL TypeScript errors in the src/ directory.',
        'Do not weaken types (no `any` unless absolutely necessary).',
        'Preserve the component behavior exactly.',
        'After fixing, verify with `npx tsc --noEmit` again.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success', 'fixesApplied'],
      properties: {
        success: { type: 'boolean' },
        fixesApplied: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['fix', 'typescript'],
}));

export const convertIconsTask = defineTask('convert-icons', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Convert SVG assets to React icon components',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'React component developer',
      task: `Convert SVG assets from project/assets/ into React TypeScript icon components in src/icons/.`,
      context: {
        packageName: args.packageName,
        projectDir: args.projectDir,
        svgFiles: [
          'project/assets/glyph-divider.svg',
          'project/assets/glyph-mode-forever.svg',
          'project/assets/glyph-mode-interactive.svg',
          'project/assets/glyph-mode-plan.svg',
          'project/assets/glyph-mode-yolo.svg',
          'project/assets/illustration-convergence-loop.svg',
          'project/assets/illustration-quality-gates.svg',
          'project/assets/logo-monogram.svg',
          'project/assets/logo-monogram-dark.svg',
          'project/assets/logo-wordmark.svg',
          'project/assets/seal-gate-passed.svg',
        ],
      },
      instructions: [
        'Read each SVG file in project/assets/.',
        'For each SVG, create a React component in src/icons/:',
        '  - Convert SVG to JSX (className instead of class, camelCase attrs)',
        '  - Accept standard SVG props (width, height, className, etc.)',
        '  - Use currentColor for fill/stroke where appropriate',
        '  - Name components in PascalCase (e.g., GlyphDivider, LogoWordmark)',
        '',
        'Create src/icons/index.ts barrel export.',
        'IMPORTANT: Actually read and convert ALL SVG files.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success', 'iconCount'],
      properties: {
        success: { type: 'boolean' },
        iconCount: { type: 'number' },
        icons: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['icons', 'svg', 'conversion'],
}));

export const setupExportsTask = defineTask('setup-exports', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Configure barrel exports and package.json exports map',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Package architecture specialist',
      task: `Set up barrel exports and package.json subpath exports for ${args.packageName}.`,
      context: {
        packageName: args.packageName,
        projectDir: args.projectDir,
      },
      instructions: [
        'Read the current src/ directory structure to understand what exists.',
        '',
        'Create/update src/index.ts:',
        '  - Re-export everything from ./components',
        '  - Re-export everything from ./icons',
        '  - Re-export token types from ./tokens',
        '  - Import ./tokens/index.css (so importing the package also imports base tokens)',
        '',
        'Create src/react.ts:',
        '  - Re-export only React components (not icons or tokens)',
        '',
        'Create src/tokens.ts:',
        '  - Re-export only tokens',
        '',
        'Create src/icons.ts:',
        '  - Re-export only icons',
        '',
        'Update package.json exports field:',
        '  ".": { import: "./dist/index.js", require: "./dist/index.cjs", types: "./dist/index.d.ts" }',
        '  "./react": { import: "./dist/react.js", require: "./dist/react.cjs", types: "./dist/react.d.ts" }',
        '  "./tokens": { import: "./dist/tokens.js", require: "./dist/tokens.cjs", types: "./dist/tokens.d.ts" }',
        '  "./icons": { import: "./dist/icons.js", require: "./dist/icons.cjs", types: "./dist/icons.d.ts" }',
        '  "./css": "./dist/tokens/index.css"',
        '  "./css/*": "./dist/*.css"',
        '',
        'Update vite.config.ts to include multiple entry points: index, react, tokens, icons.',
        '',
        'IMPORTANT: Actually modify the files. Verify they import/export correctly.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' },
        entryPoints: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['exports', 'package'],
}));

export const setupStorybookTask = defineTask('setup-storybook', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Set up Storybook 8 with component stories',
  execution: { model: 'claude-opus-4-6' },
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Storybook specialist for React component libraries',
      task: `Set up Storybook 8 for the ${args.packageName} design system with stories for all components.`,
      context: {
        packageName: args.packageName,
        projectDir: args.projectDir,
      },
      instructions: [
        'Initialize Storybook 8 for React + Vite:',
        '  npx storybook@latest init --type react --builder @storybook/builder-vite --skip-install',
        '  Then npm install if needed.',
        '',
        'Configure .storybook/main.ts:',
        '  - stories: ["../src/**/*.stories.@(ts|tsx)"]',
        '  - framework: @storybook/react-vite',
        '  - addons: essentials, a11y',
        '',
        'Configure .storybook/preview.ts:',
        '  - Import the design system CSS tokens (../src/tokens/index.css)',
        '  - Import the component CSS (../src/components/**/*.css) — or a global CSS import',
        '  - Set up a decorator that wraps stories in the design system theme context if needed',
        '  - Configure backgrounds: vellum (#EDE3CF) and void (#0B0A0F)',
        '  - Set default viewport',
        '',
        'Create stories for KEY components (not every single one, but a solid representative set):',
        '  - src/components/Button/Button.stories.tsx — all variants, sizes, states',
        '  - src/components/Toggle/Toggle.stories.tsx',
        '  - src/components/Input/Input.stories.tsx — Input, Textarea, Field',
        '  - src/components/Select/Select.stories.tsx',
        '  - src/components/Modal/Modal.stories.tsx',
        '  - src/components/Accordion/Accordion.stories.tsx',
        '  - src/components/Tabs/Tabs.stories.tsx',
        '  - src/components/Toast/Toast.stories.tsx',
        '  - src/components/Table/Table.stories.tsx',
        '  - src/icons/Icons.stories.tsx — showcase all icons',
        '  - src/tokens/Tokens.stories.tsx — color palette, typography, spacing showcase',
        '',
        'Each story should:',
        '  - Use CSF3 format (satisfies Meta<typeof Component>)',
        '  - Include args/controls for interactive prop exploration',
        '  - Show multiple variants as separate story exports',
        '  - Include a brief docs description',
        '',
        'IMPORTANT: Read the actual converted component files in src/ before writing stories.',
        'IMPORTANT: Make sure the storybook builds: npx storybook build',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success', 'storyCount'],
      properties: {
        success: { type: 'boolean' },
        storyCount: { type: 'number' },
        stories: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['storybook', 'stories', 'docs'],
}));

export const storybookBuildVerifyTask = defineTask('storybook-build-verify', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Verify Storybook builds',
  shell: {
    command: `cd "${args.projectDir}" && npx storybook build --quiet 2>&1; echo "EXIT:$?"`,
    expectedExitCode: 0,
    timeout: 300000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['verify', 'storybook'],
}));

export const viteBuildVerifyTask = defineTask('vite-build-verify', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Verify Vite library build',
  shell: {
    command: `cd "${args.projectDir}" && npx vite build 2>&1; echo "EXIT:$?"`,
    expectedExitCode: 0,
    timeout: 120000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['verify', 'build', 'vite'],
}));

export const fixBuildErrorsTask = defineTask('fix-build-errors', (args, taskCtx) => ({
  kind: 'agent',
  title: `Fix Vite build errors (attempt ${args.attempt + 1})`,
  execution: { model: 'claude-opus-4-6' },
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Vite/Rollup build specialist',
      task: 'Fix Vite library build errors in the design system package.',
      context: {
        projectDir: args.projectDir,
        errors: args.errors,
        attempt: args.attempt,
      },
      instructions: [
        'Read the build errors carefully.',
        'Fix the root cause — do not patch symptoms.',
        'Common issues to check:',
        '  - Missing imports or circular dependencies',
        '  - CSS import issues',
        '  - Rollup external configuration (react, react-dom should be external)',
        '  - TypeScript errors blocking build',
        'After fixing, run `npx vite build` to verify.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' },
        fixesApplied: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['fix', 'build'],
}));

export const createExampleAppTask = defineTask('create-example-app', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Create example consumer app',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'React developer creating example apps for design system documentation',
      task: `Create an example React app that demonstrates consuming the ${args.packageName} design system.`,
      context: {
        packageName: args.packageName,
        projectDir: args.projectDir,
      },
      instructions: [
        'Create examples/basic-usage/ with a small Vite React app:',
        '',
        'examples/basic-usage/',
        '  package.json  — depends on the parent package via "file:../../"',
        '  vite.config.ts',
        '  tsconfig.json',
        '  index.html',
        '  src/',
        '    main.tsx — entry',
        '    App.tsx  — demo page showcasing:',
        '      - Importing tokens/CSS',
        '      - Using Button, Input, Toggle, Select, Modal components',
        '      - Using icons (LogoWordmark, SealGatePassed)',
        '      - Using both light (vellum) and dark (void) backgrounds',
        '      - A realistic mini-form or dashboard layout',
        '',
        'The example should be a self-contained showcase that serves as both:',
        '  - Developer documentation for how to consume the package',
        '  - Visual proof that the components work correctly together',
        '',
        'Run `cd examples/basic-usage && npm install` to verify the link works.',
        '',
        'IMPORTANT: Read the actual src/ exports to know what components/icons exist.',
        'IMPORTANT: Actually create ALL files and run npm install.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' },
        filesCreated: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['example', 'documentation'],
}));

export const setupPublishingTask = defineTask('setup-publishing', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Configure npm publishing, changesets, and documentation',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Open source package publishing specialist',
      task: `Set up publishing configuration for ${args.packageName}.`,
      context: {
        packageName: args.packageName,
        projectDir: args.projectDir,
      },
      instructions: [
        'Set up changesets for versioning:',
        '  npx changeset init',
        '  Configure .changeset/config.json with correct settings',
        '',
        'Create/update README.md at project root (NOT in project/ dir):',
        '  - Package name and one-line description',
        '  - Install command: npm install ' + args.packageName,
        '  - Quick start code example showing import and usage',
        '  - Subpath imports documentation:',
        '    - ' + args.packageName + ' (everything)',
        '    - ' + args.packageName + '/react (components only)',
        '    - ' + args.packageName + '/tokens (design tokens)',
        '    - ' + args.packageName + '/icons (SVG icons)',
        '    - ' + args.packageName + '/css (CSS only, no JS)',
        '  - Link to Storybook for full component docs',
        '  - Development setup instructions (clone, install, npm run dev)',
        '  - Contributing / changeset workflow',
        '  - License (MIT)',
        '',
        'Create .npmignore:',
        '  project/, .a5c/, .storybook/, examples/, *.stories.tsx, storybook-static/',
        '',
        'Verify package.json has correct publishConfig and files field.',
        '',
        'IMPORTANT: Actually create/modify all files.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' },
        filesCreated: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['publishing', 'npm', 'docs'],
}));

export const finalVerificationTask = defineTask('final-verification', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Final verification sweep — TSC + Vite build',
  shell: {
    command: [
      `cd "${args.projectDir}"`,
      'npx tsc --noEmit',
      'npx vite build',
      'echo "All checks passed"',
    ].join(' && '),
    expectedExitCode: 0,
    timeout: 300000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['verify', 'final'],
}));

export const finalFixTask = defineTask('final-fix', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Last-resort fix for final verification failures',
  execution: { model: 'claude-opus-4-6' },
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior developer doing final QA on a design system package',
      task: 'Fix remaining build/type errors blocking the final verification.',
      context: {
        projectDir: args.projectDir,
        errors: args.errors,
      },
      instructions: [
        'Run `npx tsc --noEmit` and `npx vite build` to see current errors.',
        'Fix ALL remaining errors.',
        'Verify both commands pass cleanly after fixes.',
        'Do not weaken types or skip checks — fix the root cause.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' },
        fixesApplied: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
  labels: ['fix', 'final'],
}));
