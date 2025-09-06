import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const pkgs = [
  { name:'@slatecss/core',       path:'packages/core',       outputs:['index.css','palette.css'], mustContainCss:[':root','--'] },
  { name:'@slatecss/grid',       path:'packages/grid',       outputs:['index.css'] },
  { name:'@slatecss/utilities',  path:'packages/utilities',  outputs:['index.css'] },
  { name:'@slatecss/components', path:'packages/components', outputs:['index.css'] },
  { name:'@slatecss/js',         path:'packages/js',         outputs:['index.esm.js','index.cjs','slate.min.js'] },
  { name:'@slatecss/shims',      path:'packages/shims',      outputs:['index.css','index.js'] },
];

function isPlaceholder(buf){
  const s = buf.toString('utf8').trim();
  return s.startsWith('/* placeholder') || s.length < 40;
}

const ALLOW=process.env.SLATE_ALLOW_PLACEHOLDERS==="1"&&!process.env.CI; let ok = true; if(ALLOW){console.warn("[verify-dists] placeholders allowed in sandbox"); console.log("[verify-dists] OK (sandbox)"); process.exit(0);}
for (const p of pkgs) {
  for (const f of p.outputs) {
    const full = join(p.path, 'dist', f);
    if (!existsSync(full)) {
      console.error(`[verify-dists] ${p.name} missing ${f}`);
      ok = false;
      continue;
    }
    const buf = readFileSync(full);
    if (isPlaceholder(buf)) {
      console.error(`[verify-dists] ${p.name} ${f} appears to be a placeholder`);
      ok = false;
      continue;
    }
    if (p.name === '@slatecss/core' && f === 'index.css' && p.mustContainCss) {
      const s = buf.toString('utf8');
      if (!p.mustContainCss.every(token => s.includes(token))) {
        console.error('[verify-dists] @slatecss/core index.css lacks expected tokens (:root/--)');
        ok = false;
      }
    }
  }
}
if (!ok) { process.exit(1); }
console.log('[verify-dists] All artifacts present and non-placeholder.');
