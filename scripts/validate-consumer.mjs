import { mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const rootDir = process.cwd();
const packageDir = rootDir;
const exampleDir = path.join(rootDir, 'examples/basic-usage');
const tempDir = path.join(rootDir, '.tmp/consumer-validation');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const run = (command, args, cwd) => {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
};

rmSync(tempDir, { recursive: true, force: true });
mkdirSync(tempDir, { recursive: true });

const packJson = execFileSync(npmCommand, ['pack', '--json', '--pack-destination', tempDir], {
  cwd: packageDir,
  encoding: 'utf8',
  shell: process.platform === 'win32',
});

const [packResult] = JSON.parse(packJson);
const tarballPath = path.join(tempDir, packResult.filename);

run(npmCommand, ['ci'], exampleDir);
run(npmCommand, ['install', '--no-save', tarballPath], exampleDir);
run(npmCommand, ['run', 'build'], exampleDir);

console.log(`Consumer validation passed with tarball ${packResult.filename}.`);
