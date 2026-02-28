import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm', 'cjs'],
  dts: false,
  clean: true,
  splitting: false,
  entry: ['src/index.tsx'],
  loader: {
    '.tsx': 'tsx',
  },
  external: ['typestyles', 'typestyles/server', 'react', 'react-dom', 'next'],
});
