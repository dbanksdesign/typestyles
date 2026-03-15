import { nodeResolve } from '@rollup/plugin-node-resolve';
import typestylesRollupPlugin from '@typestyles/rollup';

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: 'assets/index.js',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    typestylesRollupPlugin({
      mode: 'build',
      extract: {
        modules: ['src/styles.js', 'src/tokens.js', 'src/animations.js'],
        fileName: 'typestyles.css',
      },
    }),
  ],
};
