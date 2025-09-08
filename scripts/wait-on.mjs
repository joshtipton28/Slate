const url = process.argv[2] || 'http://localhost:4173/Slate';
const deadline = Date.now() + 15000;
(async function tryFetch() {
  while (Date.now() < deadline) {
    try { const r = await fetch(url); if (r.ok) { console.log('[wait-on] ready'); process.exit(0); } } catch {}
    await new Promise(r=>setTimeout(r,250));
  }
  console.error('[wait-on] timeout waiting for', url);
  process.exit(1);
})();
