import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../..'); // repo root
const entries = [
  resolve(root, 'packages/core/src/index.scss'),
  resolve(root, 'packages/components/src/index.scss'),
  resolve(root, 'packages/utilities/src/index.scss'),
];

let sass;
try { sass = (await import('sass')).default; }
catch { console.error('[docs] Missing devDependency "sass" in sites/docs. Add it in package.json.'); process.exit(1); }

const parts = [];
for (const inFile of entries) {
  try {
    const css = sass.compile(inFile, { style: 'expanded', loadPaths: [dirname(inFile)] }).css;
    parts.push(css);
    console.log('[docs] compiled', inFile);
  } catch (e) {
    console.warn('[docs] failed to compile', inFile, e.message);
  }
}

const out = resolve(__dirname, '../src/styles/slate.css');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, parts.join('\n\n'));
console.log('[docs] wrote', out);
