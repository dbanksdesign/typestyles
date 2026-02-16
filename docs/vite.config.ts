import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import contentCollections from '@content-collections/vite';
import typestylesPlugin from '@typestyles/vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    contentCollections(),
    tsConfigPaths({ projects: ['./tsconfig.json'] }),
    typestylesPlugin(),
    tanstackStart(),
  ],
});
