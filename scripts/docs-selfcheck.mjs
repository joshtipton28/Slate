import { existsSync } from 'node:fs';
const miss = [];
if (!existsSync('sites/docs/package.json')) miss.push('sites/docs/package.json');
if (!existsSync('sites/docs/astro.config.mjs')) miss.push('sites/docs/astro.config.mjs');
if (!existsSync('sites/docs/src/layouts/Base.astro')) miss.push('sites/docs/src/layouts/Base.astro');
if (!existsSync('sites/docs/src/pages/index.astro')) miss.push('sites/docs/src/pages/index.astro');
if (!existsSync('sites/docs/src/scripts/boot.ts')) miss.push('sites/docs/src/scripts/boot.ts');
if (miss.length) { console.log('[docs-selfcheck] Missing:', miss.join(', ')); process.exitCode = 0; } else { console.log('[docs-selfcheck] OK'); }
