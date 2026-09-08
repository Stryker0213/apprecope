import { cpSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const angularOutput = join(projectRoot, 'dist', 'apprecope', 'browser');
const workerSource = join(projectRoot, 'sites-worker.mjs');
const temporaryRoot = mkdtempSync(join(tmpdir(), 'apprecope-sites-'));
const stagedOutput = join(temporaryRoot, 'dist');

mkdirSync(stagedOutput, { recursive: true });
cpSync(angularOutput, stagedOutput, { recursive: true });
cpSync(join(stagedOutput, 'index.csr.html'), join(stagedOutput, 'index.html'));
mkdirSync(join(stagedOutput, 'server'), { recursive: true });
cpSync(workerSource, join(stagedOutput, 'server', 'index.js'));

rmSync(join(projectRoot, 'dist'), { recursive: true, force: true });
cpSync(stagedOutput, join(projectRoot, 'dist'), { recursive: true });
rmSync(temporaryRoot, { recursive: true, force: true });
