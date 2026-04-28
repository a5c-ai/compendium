import { mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const rootDir = process.cwd();
const packageDir = rootDir;
const exampleDir = path.join(rootDir, 'examples/basic-usage');
const tempDir = path.join(rootDir, '.tmp/consumer-validation');

const run = (command, args, cwd) => {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: process.env,
  });
};

rmSync(tempDir, { recursive: true, force: true });
mkdirSync(tempDir, { recursive: true });

const packJson = execFileSync('npm', ['pack', '--json', '--pack-destination', tempDir], {
  cwd: packageDir,
  encoding: 'utf8',
});

const [packResult] = JSON.parse(packJson);
const tarballPath = path.join(tempDir, packResult.filename);

run('npm', ['ci'], exampleDir);
run('npm', ['install', '--no-save', tarballPath], exampleDir);
run('npm', ['run', 'build'], exampleDir);

console.log(`Consumer validation passed with tarball ${packResult.filename}.`);
