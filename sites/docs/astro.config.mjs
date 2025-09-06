import { defineConfig } from 'astro/config';
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const coreScss = new URL("../../packages/core/src/index.scss", import.meta.url).pathname;
const componentsScss = new URL("../../packages/components/src/index.scss", import.meta.url).pathname;

export default defineConfig({
  base: "/Slate",
  
  outDir: './dist'
  , vite: { resolve:{ alias:{ "slate:js": new URL("../../packages/js/src/index.ts", import.meta.url).pathname,  "slate:core": coreScss, "slate:components": componentsScss } } }
});
