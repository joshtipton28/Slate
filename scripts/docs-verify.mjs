import { existsSync, readFileSync } from 'node:fs';
const mustFiles = [
  'sites/docs/dist/index.html',
  'sites/docs/dist/components/index.html',
];
let ok = true;
for (const f of mustFiles) {
  if (!existsSync(f)) { console.error('[docs-verify] Missing', f); ok = false; }
}
if (ok) {
  const html = readFileSync('sites/docs/dist/index.html','utf8');
  if (!/href="\/Slate\/components/.test(html)) { console.error('[docs-verify] Home missing base-aware link to /Slate/components'); ok = false; }
}
if (!ok) process.exit(1);
console.log('[docs-verify] OK');
