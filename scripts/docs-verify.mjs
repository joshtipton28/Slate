import { existsSync, readFileSync } from 'node:fs';
let ok = true;
const must = [
  'sites/docs/dist/index.html',
  'sites/docs/dist/components/index.html'
];
for (const f of must) {
  if (!existsSync(f)) { console.error('[docs-verify] Missing', f); ok = false; }
}
if (ok) {
  const html = readFileSync('sites/docs/dist/index.html','utf8');
  if (!/href="\/Slate\/components/.test(html)) {
    console.error('[docs-verify] Home missing base-aware link to /Slate/components'); ok = false;
  }
}
if (!ok) process.exit(1);
console.log('[docs-verify] OK');
