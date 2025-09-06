import { readFileSync, existsSync } from 'node:fs';
const out = [];
function ok(m){ out.push('✅ '+m); }
function bad(m){ out.push('❌ '+m); process.exitCode=1; }
// Astro base
const astro = readFileSync('sites/docs/astro.config.mjs','utf8');
/base:\s*'\/Slate'/.test(astro) ? ok('Astro base=/Slate') : bad('Astro base not /Slate');
// Docs trigger
const docs = readFileSync('.github/workflows/docs.yml','utf8');
/push:[\s\S]*branches:[\s\S]*-\s*main/.test(docs) ? ok('Docs workflow triggers on push: main') : bad('Docs workflow does not trigger on push: main');
// Placeholder step removed
/ensure-dist/.test(docs) ? bad('Placeholder ensure-dist step still present') : ok('No ensure-dist step present');
// Components link
const home = readFileSync('sites/docs/src/pages/index.astro','utf8');
/\/components/.test(home) ? ok('Home links to /components') : bad('Home missing /components link');
// Components pages exist (one sample)
existsSync('sites/docs/src/pages/components/button.astro') ? ok('Components gallery present') : bad('Components gallery missing');
console.log('--- Slate Docs Diagnostics ---\n'+out.join('\n'));
