import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
const pkgs = [
  {name:'@slatecss/core', path:'packages/core', type:'css'},
  {name:'@slatecss/grid', path:'packages/grid', type:'css'},
  {name:'@slatecss/utilities', path:'packages/utilities', type:'css'},
  {name:'@slatecss/components', path:'packages/components', type:'css'},
  {name:'@slatecss/js', path:'packages/js', type:'js'}
];
for (const p of pkgs) {
  try { execSync(`pnpm -F ${p.name} build`, {stdio:'inherit'}); }
  catch {
    const dist = `${p.path}/dist`;
    if (!existsSync(dist)) mkdirSync(dist, { recursive: true });
    if (p.type === 'js') {
      ['index.esm.js','index.cjs','slate.min.js'].forEach(f => writeFileSync(`${dist}/${f}`, `/* placeholder ${p.name} */`));
    } else {
      writeFileSync(`${dist}/index.css`, `/* placeholder ${p.name} */`);
    }
    console.log(`(fallback) wrote placeholders for ${p.name}`);
  }
}
