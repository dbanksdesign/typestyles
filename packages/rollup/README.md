# @typestyles/rollup

Rollup and Rolldown plugin for `typestyles`.

Supports:

- Runtime mode (default): normal typestyles runtime behavior.
- Build mode: emit static CSS and disable runtime style insertion in bundle.
- Hybrid mode: emit static CSS for production while keeping runtime-friendly behavior in development.

## Installation

```bash
pnpm add typestyles
pnpm add -D @typestyles/rollup rollup
```

## Rollup usage

```js
// rollup.config.mjs
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typestylesRollupPlugin from '@typestyles/rollup';

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    typestylesRollupPlugin({
      mode: 'build',
      extract: {
        modules: ['src/styles.ts', 'src/tokens.ts', 'src/animations.ts'],
        fileName: 'typestyles.css',
      },
    }),
  ],
};
```

Then link the emitted CSS in your HTML:

```html
<link rel="stylesheet" href="/typestyles.css" />
```

## Rolldown usage

Rolldown supports Rollup-compatible plugins, so you can use the same plugin:

```js
// rolldown.config.mjs
import typestylesRollupPlugin from '@typestyles/rollup';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    typestylesRollupPlugin({
      mode: 'build',
      extract: {
        modules: ['src/styles.ts', 'src/tokens.ts'],
      },
    }),
  ],
};
```

## Options

- `mode?: 'runtime' | 'build' | 'hybrid'`
  - Default: `'runtime'`
- `extract?: { modules: string[]; fileName?: string }`
  - Required for `build` and `hybrid` if you want CSS extraction
- `warnDuplicates?: boolean`
  - Default: `true`
- `root?: string`
  - Project root for resolving `extract.modules`
  - Default: `process.cwd()`
