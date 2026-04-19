# @typestyles/next

## 0.4.0

### Minor Changes

- 8bf64b0: Add shared convention entry discovery: `discoverDefaultExtractModules` and `DEFAULT_EXTRACT_MODULE_CANDIDATES` (including `styles/typestyles-entry.ts` and `styles/typestyles.ts` after the `src/…` paths).

  **@typestyles/vite** re-exports these from `@typestyles/build-runner` and resolves optional `extract.modules` using the same list.

  **@typestyles/next** depends on `@typestyles/build-runner`, aligns `buildTypestylesForNext` with that discovery, defaults `cssOutFile` to `app/typestyles.css` and manifest output unless overridden, adds `withTypestyles` for production config when a convention file exists, and re-exports the discovery helpers.

  `withTypestyles` now passes `root` through to extraction internals so webpack resolution uses the same project root as convention discovery.

  **Breaking (Next):** `BuildTypestylesForNextOptions` no longer requires `modules` or `cssOutFile`; pass them explicitly when you need non-default behavior.

### Patch Changes

- 8bf64b0: Ensure `withTypestyles({ root })` uses the same `root` for downstream webpack module resolution as it does for convention discovery.
- Updated dependencies [8bf64b0]
  - @typestyles/build-runner@0.4.0

## 0.3.0

### Minor Changes

- d9c8078: Add ESLint configuration across all packages, examples, and docs. Create shared `eslint.base.js` config with TypeScript rules and add lint scripts to all package.json files. Update CI workflow to run lint via turbo.

### Patch Changes

- c467888: **typestyles:** Extend `global.fontFace` / `FontFaceProps`: `src` may be a string or an array of fragments (joined into one CSS `src`); optional `@font-face` descriptors `sizeAdjust`, `ascentOverride`, `descentOverride`, and `lineGapOverride`; dedupe keys use normalized `src` (including array vs equivalent comma-separated string). Export `FontFaceSrc`. When the same rule dedupe key is registered again with different CSS, the later rule is skipped and non-production builds warn on the mismatch (re-registration with identical CSS stays silent). Tests cover multi-`src` font faces, metric overrides, and global dedupe warnings.

  **@typestyles/next:** README examples use `styles.component` and default variant calls; add **Fonts and local files** guidance for Next extraction (`public/fonts/`, root-relative URLs) versus Vite asset URLs.

- 015bb99: `withTypestylesExtract` now sets `NEXT_PUBLIC_TYPESTYLES_RUNTIME_DISABLED` via `next.config` `env` so client bundles disable runtime style injection under **Turbopack** as well as webpack (webpack `DefinePlugin` alone does not run for Turbopack). Core `sheet` reads this env flag alongside `__TYPESTYLES_RUNTIME_DISABLED__`.

  README: build-time CSS / Turbopack notes; clarify `getTypestylesMetadata` and fix the previous `generateMetadata` example. Add `@typestyles/next` tests for `withTypestylesExtract`.

  TypeScript: module augmentation + `client.d.ts` declaration for `useServerInsertedHTML` (aligned `@types/react` / `@types/react-dom`); add `typecheck` script; restore `webpack` + `typestyles` devDependencies and `server.d.ts` / `./build` exports. `buildTypestylesForNext` now uses `collectStylesFromModules` from `typestyles/build` (no separate `@typestyles/build` package).

- f65c570: Add lint-staged for prettier formatting on pre-commit hook and format entire codebase
- b43e2f3: **@typestyles/vite:** When `extract.modules` is set and `mode` is omitted, default `mode` is now `'build'`: `vite dev` keeps runtime injection and HMR; `vite build` emits the CSS asset and disables client injection (same as explicit `mode: 'build'`). Pass `mode: 'runtime'` to keep the previous “extract config present but runtime-only” behavior. Vitest: plugin tests extended; runtime/build parity moved to `build-parity.test.ts` with `skipIf` when `build-runner` dist is missing.

  **@typestyles/next:** README documents applying `withTypestylesExtract` only in production so development keeps client runtime injection.

  Docs (`vite-plugin`, `zero-runtime`, `getting-started`) and `roadmap.md` describe dev-runtime / prod-extraction; `examples/vite-app`, `examples/typewind`, and `examples/next-app` (`next.config.mjs`) follow the recommended wiring.

## 0.2.0

### Minor Changes

- f2163d8: Add @typestyles/next package for Next.js SSR integration
- f7b2027: Fix changesets dep bump
