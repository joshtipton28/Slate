import { existsSync } from 'node:fs';
import { join } from 'node:path';

const pkgs = [
  { name:'@slatecss/shims', path:'packages/shims', outputs:['index.css','index.js'] },
  { name:'@slatecss/core',       path:'packages/core',       outputs:['index.css'] },
  { name:'@slatecss/grid',       path:'packages/grid',       outputs:['index.css'] },
  { name:'@slatecss/utilities',  path:'packages/utilities',  outputs:['index.css'] },
  { name:'@slatecss/components', path:'packages/components', outputs:['index.css'] },
  { name:'@slatecss/js',         path:'packages/js',         outputs:['index.esm.js','index.cjs','slate.min.js'] }
];

let ok = true;
for (const p of pkgs) {
  const missing = p.outputs.filter(f => !existsSync(join(p.path, 'dist', f)));
  if (missing.length) {
    ok = false;
    console.error(`[verify-dists] ${p.name} missing: ${missing.join(', ')}`);
  }
}
if (!ok) {
  console.error('[verify-dists] One or more packages are missing required artifacts.');
  process.exit(1);
} else {
  console.log('[verify-dists] All package artifacts present.');
}
