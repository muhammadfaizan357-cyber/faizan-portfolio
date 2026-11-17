import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';

const tempDir = path.join(os.tmpdir(), 'portfolio_zip_stage_' + Date.now());
fs.mkdirSync(tempDir, { recursive: true });

const root = process.cwd();
const excludes = new Set(['node_modules', '.git', 'portfolio.zip', 'portfolio-walkthrough.mp4', '.temp']);

for (const item of fs.readdirSync(root)) {
  if (excludes.has(item) || item.endsWith('.log')) continue;
  const src = path.join(root, item);
  const dest = path.join(tempDir, item);
  fs.cpSync(src, dest, { recursive: true, force: true });
}

const outZip = path.join(root, 'portfolio.zip');
if (fs.existsSync(outZip)) {
  fs.unlinkSync(outZip);
}

execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${outZip}' -Force"`);

fs.rmSync(tempDir, { recursive: true, force: true });

const stat = fs.statSync(outZip);
console.log(`Successfully generated portfolio.zip: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
