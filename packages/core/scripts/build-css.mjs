import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main(){
  let sass;
  try { sass = (await import('sass')).default; }
  catch { console.error('[core] Missing devDependency "sass". Install it to build real CSS.'); process.exit(1); }

  const entries = [
    { in: resolve(__dirname, '../src/index.scss'),              out: resolve(__dirname, '../dist/index.css') },
    { in: resolve(__dirname, '../src/tokens/_palette.scss'),    out: resolve(__dirname, '../dist/palette.css') }
  ];

  for (const { in: input, out } of entries) {
    const outDir = dirname(out);
    mkdirSync(outDir, { recursive: true });
    const result = sass.compile(input, { style: 'expanded', loadPaths: [resolve(__dirname, '../src')] });
    writeFileSync(out, result.css);
    console.log('[core] built', out);
  }
}
main().catch(e => { console.error(e); process.exit(1); });
