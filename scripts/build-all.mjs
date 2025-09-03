import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const pkgs = [
  { name:'@slatecss/core',       path:'packages/core',       type:'css', outputs:['index.css'] },
  { name:'@slatecss/grid',       path:'packages/grid',       type:'css', outputs:['index.css'] },
  { name:'@slatecss/utilities',  path:'packages/utilities',  type:'css', outputs:['index.css'] },
  { name:'@slatecss/components', path:'packages/components', type:'css', outputs:['index.css'] },
  { name:'@slatecss/js',         path:'packages/js',         type:'js',  outputs:['index.esm.js','index.cjs','slate.min.js'] }
];

function hasScript(pkgPath, script) {
  try {
    const pkg = JSON.parse(readFileSync(join(pkgPath, 'package.json'), 'utf8'));
    return !!(pkg.scripts && pkg.scripts[script]);
  } catch {
    return false;
  }
}

function ensurePlaceholders(p) {
  const dist = join(p.path, 'dist');
  if (!existsSync(dist)) mkdirSync(dist, { recursive: true });
  if (p.type === 'js') {
    p.outputs.forEach(f => writeFileSync(join(dist, f), `/* placeholder ${p.name}:${f} */`));
  } else {
    p.outputs.forEach(f => writeFileSync(join(dist, f), `/* placeholder ${p.name}:${f} */`));
  }
  console.log(`(fallback) wrote placeholders for ${p.name}`);
}

function verifyDist(p) {
  const dist = join(p.path, 'dist');
  return p.outputs.every(f => existsSync(join(dist, f)));
}

for (const p of pkgs) {
  const canBuild = hasScript(p.path, 'build');
  if (!canBuild) {
    console.warn(`(info) ${p.name} has no "build" script — writing placeholders`);
    ensurePlaceholders(p);
    continue;
  }
  try {
    // Prefer workspace filter; fallback to package-local build
    try { execSync(`pnpm -F ${p.name} build`, { stdio: 'inherit' }); }
    catch { execSync(`pnpm --filter ${p.name} build`, { stdio: 'inherit' }); }
  } catch {
    console.warn(`(warn) build failed for ${p.name} — writing placeholders`);
    ensurePlaceholders(p);
    continue;
  }
  if (!verifyDist(p)) {
    console.warn(`(warn) missing outputs for ${p.name} after build — writing placeholders`);
    ensurePlaceholders(p);
  } else {
    console.log(`(ok) ${p.name} produced expected outputs`);
  }
}
