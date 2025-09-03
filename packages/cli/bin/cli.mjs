#!/usr/bin/env node
import { mkdirSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = resolve(__dirname, '../templates');

const [, , cmd, template = 'vite', target = 'slate-app'] = process.argv;
function help(){
  console.log(`Slate CLI
Usage:
  slate init <template> [target]
Templates:
  ${readdirSync(templatesDir).join(', ')}`);
}

if (!cmd || cmd === '--help' || cmd === '-h') { help(); process.exit(0); }
if (cmd === 'init') {
  const src = resolve(templatesDir, template);
  if (!existsSync(src)) { console.error('Unknown template:', template); process.exit(1); }
  const dest = resolve(process.cwd(), target);
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(`\u2713 Created ${template} app at ${target}`);
  process.exit(0);
} else {
  help(); process.exit(1);
}

