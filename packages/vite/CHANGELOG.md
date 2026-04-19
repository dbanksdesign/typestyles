# @typestyles/vite

## 0.4.0

### Minor Changes

- 8bf64b0: Add shared convention entry discovery: `discoverDefaultExtractModules` and `DEFAULT_EXTRACT_MODULE_CANDIDATES` (including `styles/typestyles-entry.ts` and `styles/typestyles.ts` after the `src/…` paths).

  **@typestyles/vite** re-exports these from `@typestyles/build-runner` and resolves optional `extract.modules` using the same list.

  **@typestyles/next** depends on `@typestyles/build-runner`, aligns `buildTypestylesForNext` with that discovery, defaults `cssOutFile` to `app/typestyles.css` and manifest output unless overridden, adds `withTypestyles` for production config when a convention file exists, and re-exports the discovery helpers.

  `withTypestyles` now passes `root` through to extraction internals so webpack resolution uses the same project root as convention discovery.

  **Breaking (Next):** `BuildTypestylesForNextOptions` no longer requires `modules` or `cssOutFile`; pass them explicitly when you need non-default behavior.

- 28a3f82: **Breaking:** Duplicate logical `styles.component` / `styles.class` namespaces across different modules are now **build errors** (via `this.error`) instead of Rollup warnings, so overlapping registrations fail fast during `vite build` / Rollup.

  The `warnDuplicates` option still defaults to `true`; set `warnDuplicates: false` to skip the check. Namespace extraction now includes `styles.class('…')` calls so they participate in the same cross-module duplicate detection as `styles.component`.

### Patch Changes

- Updated dependencies [8bf64b0]
  - @typestyles/build-runner@0.4.0

## 0.3.0

### Minor Changes

- d9c8078: Add ESLint configuration across all packages, examples, and docs. Create shared `eslint.base.js` config with TypeScript rules and add lint scripts to all package.json files. Update CI workflow to run lint via turbo.
- b43e2f3: **@typestyles/vite:** When `extract.modules` is set and `mode` is omitted, default `mode` is now `'build'`: `vite dev` keeps runtime injection and HMR; `vite build` emits the CSS asset and disables client injection (same as explicit `mode: 'build'`). Pass `mode: 'runtime'` to keep the previous “extract config present but runtime-only” behavior. Vitest: plugin tests extended; runtime/build parity moved to `build-parity.test.ts` with `skipIf` when `build-runner` dist is missing.

  **@typestyles/next:** README documents applying `withTypestylesExtract` only in production so development keeps client runtime injection.

  Docs (`vite-plugin`, `zero-runtime`, `getting-started`) and `roadmap.md` describe dev-runtime / prod-extraction; `examples/vite-app`, `examples/typewind`, and `examples/next-app` (`next.config.mjs`) follow the recommended wiring.

### Patch Changes

- f65c570: Add lint-staged for prettier formatting on pre-commit hook and format entire codebase
- eee07e5: Unify multi-variant styling on `styles.component` with a CVA-style return value: call it for a composed class string (base always applied) or destructure named class strings. Supports dimensioned variants (`variants`, `compoundVariants`, `defaultVariants`), flat variant maps, and slot-based configs.

  Remove `styles.create` from the public `styles` API; use `styles.component` instead.

  Update Vite and Rollup static namespace extraction to match `styles.component(...)` only (no longer scans `styles.create(...)`).

- Updated dependencies [d9c8078]
- Updated dependencies [f65c570]
  - @typestyles/build-runner@0.3.0

## 0.2.0

### Minor Changes

- 0bb563c: Updating bundler integrations and adding examples

### Patch Changes

- Updated dependencies [0bb563c]
  - @typestyles/build-runner@0.2.0

## 0.1.1

### Patch Changes

- f2163d8: Add additional test coverage for vite plugin

## 0.1.0

### Minor Changes

- e63a512: Add `styles.component()` API for multi-variant component styles with support for base styles, variant dimensions, compound variants, and default variants. Add `global.style()` and `global.fontFace()` APIs for applying styles to arbitrary CSS selectors and declaring `@font-face` rules. Update the Vite plugin to support HMR for the new APIs.

## 0.0.2

### Patch Changes

- 5009776: Initial release of typestyles - CSS-in-TypeScript that embraces CSS instead of hiding from it.

  Features:
  - Core typestyles library with type-safe CSS styling
  - Server-side rendering support
  - Vite plugin for HMR support
