# Slate

[![CI](https://img.shields.io/badge/ci-passing-brightgreen?style=flat-square)](#) [![npm](https://img.shields.io/badge/npm-workspace-blue?style=flat-square)](#)

A modern, Foundation-flavored CSS/JS framework with tokens, a flexible grid, and accessible components.

## Packages

| Package | Description |
| ------- | ----------- |
| `@slatecss/core` | tokens, reset, base, typography, dark mode (Shade) |
| `@slatecss/grid` | Matrix grid mixins and utilities |
| `@slatecss/utilities` | Quick utility generator (spacing, display, text, grid-span) |
| `@slatecss/components` | Buttons, Notices, Cards, Fields, Tabs, Stack, Modal, Tables, Motion |
| `@slatecss/js` | Primitives for focus, tabs, stack, modal, positioning |
| `@slatecss/cli` | `slate init <template>` starters (Vite, Laravel, Statamic, theme) |

## Install & Quickstart

```bash
pnpm add -D @slatecss/core @slatecss/components @slatecss/utilities
# or: npm i -D @slatecss/core @slatecss/components @slatecss/utilities
```

```css
/* main.css */
@import "@slatecss/core";
@import "@slatecss/components";
@import "@slatecss/utilities";
```

A minimal Vite setup:

```bash
pnpm create vite my-app -- --template vanilla
cd my-app
pnpm add -D @slatecss/core @slatecss/components @slatecss/utilities
```

See [CLI templates](packages/cli/templates/) for ready-made starters.

## Tokens & Theming

Core exposes CSS variables and maps for **Shade** (color), **Radius** (border-radius), and **Motion** (timing/easing).

```scss
:root {
  --sl-color-primary: #0d47a1;
  --sl-color-secondary: #26a69a;
  --sl-radius-md: 0.5rem;
  --sl-motion-fast: 150ms;
}

@media (prefers-color-scheme: dark), [data-theme="dark"] {
  --sl-color-primary: #90caf9;
}
```

## Grid (Matrix)

```scss
.gallery { @include matrix(12, 1rem, row); }
.card--wide { @include col-span(3); }
```

## Components

```html
<button class="btn">Primary</button>
<div class="notice notice--success">Saved</div>
<article class="card"><div class="card__body">...</div></article>
<div class="tabs">
  <div class="tabs__list"><button class="tabs__tab" aria-selected="true">One</button></div>
  <section class="tabs__panel">Panel</section>
</div>
```

## JS Primitives

```ts
import { initTabs, initStack, openModal } from "@slatecss/js";
initTabs(document.querySelector(".tabs")!);
initStack(document.querySelector(".stack")!);
openModal("#myModal");
```

## Accessibility

Slate targets **WCAG 2.2 AA**, supports keyboard-first interactions and reduced motion preferences. Automated tests run with **Playwright** and **axe**.

## Monorepo Scripts & CI

| Script | Description |
| ------ | ----------- |
| `pnpm lint` | run linters |
| `pnpm build` | build all packages |
| `pnpm test` | run tests |

CI runs these scripts and publishes docs to GitHub Pages.

## Starters & CLI

```bash
pnpm dlx @slatecss/cli init vite my-app
```

Templates live under `packages/cli/templates/*`.

## Versioning & Releases

This monorepo uses **Changesets** for versioning. Merging a release PR triggers publication of packages to npm.

## Migration from Foundation

A planned [migration table](sites/docs/src/migration/) maps Foundation classes to Slate equivalents.

## Contributing & Code of Conduct

Please read [CONTRIBUTING](CONTRIBUTING.md) and [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) before contributing.

## License

[MIT](LICENSE)
