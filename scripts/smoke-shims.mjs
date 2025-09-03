import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const pkgPath = 'packages/shims/package.json';
const pkg = JSON.parse(readFileSync(pkgPath,'utf8'));
const style = pkg.style; // "./dist/index.css"
const exp = pkg.exports && pkg.exports['.'] && pkg.exports['.'].import; // "./dist/index.js"
const css = join('packages/shims', style || '');
const js  = join('packages/shims', exp || '');
let ok = true;
if (!style || !existsSync(css)) { console.error('[smoke:shims] Missing CSS artifact at', css); ok = false; }
if (!exp || !existsSync(js))   { console.error('[smoke:shims] Missing JS artifact at', js); ok = false; }
if (!ok) process.exit(1);
console.log('[smoke:shims] OK:', css, 'and', js);
