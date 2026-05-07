import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const rootDir = process.cwd();
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const requiredDistFiles = [
  'dist/index.js',
  'dist/index.cjs',
  'dist/index.d.ts',
  'dist/react.js',
  'dist/react.cjs',
  'dist/react.d.ts',
  'dist/codex.js',
  'dist/codex.cjs',
  'dist/codex.d.ts',
  'dist/icons.js',
  'dist/icons.cjs',
  'dist/icons.d.ts',
  'dist/tokens.js',
  'dist/tokens.cjs',
  'dist/tokens.d.ts',
  'dist/tokens.css',
  'dist/CodexPrimitives.css',
];

const packageJson = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const requiredExports = ['.', './react', './codex', './tokens', './icons', './css', './css/*'];
const missingExports = requiredExports.filter((exportPath) => !(exportPath in (packageJson.exports ?? {})));

if (missingExports.length > 0) {
  throw new Error(`package.json is missing required exports: ${missingExports.join(', ')}`);
}

for (const relativePath of requiredDistFiles) {
  if (!existsSync(path.join(rootDir, relativePath))) {
    throw new Error(`Missing build artifact: ${relativePath}. Run "npm run build" first.`);
  }
}

const packJson = execFileSync(npmCommand, ['pack', '--json', '--dry-run'], {
  cwd: rootDir,
  encoding: 'utf8',
  shell: process.platform === 'win32',
});

const [packResult] = JSON.parse(packJson);
const tarballFiles = new Set(packResult.files.map((entry) => entry.path));

const requiredTarballFiles = [
  'package.json',
  'README.md',
  'LICENSE',
  ...requiredDistFiles,
];

const missingTarballFiles = requiredTarballFiles.filter((relativePath) => !tarballFiles.has(relativePath));
if (missingTarballFiles.length > 0) {
  throw new Error(`Tarball is missing required files: ${missingTarballFiles.join(', ')}`);
}

const leakedSourceFiles = [...tarballFiles].filter((relativePath) => relativePath.startsWith('src/'));
if (leakedSourceFiles.length > 0) {
  throw new Error(`Tarball unexpectedly includes source files: ${leakedSourceFiles.join(', ')}`);
}

console.log(
  `Package validation passed for ${packResult.filename}: ${packResult.files.length} files, ${packResult.unpackedSize} bytes unpacked.`,
);
