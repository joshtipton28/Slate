import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const coreScss = new URL("../../packages/core/src/index.scss", import.meta.url).pathname;
const componentsScss = new URL("../../packages/components/src/index.scss", import.meta.url).pathname;

export default defineConfig({
  integrations: [mdx()],
  outDir: './dist'
  , vite: { resolve: { alias: { "slate:core": coreScss, "slate:components": componentsScss } } }
});