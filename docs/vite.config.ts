import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import contentCollections from '@content-collections/vite';
import typestylesPlugin from '@typestyles/vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    contentCollections(),
    tsConfigPaths({ projects: ['./tsconfig.json'] }),
    typestylesPlugin(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        filter: ({ path }) => !path.startsWith('.'),
      },
    }),
    react(),
  ],
});
