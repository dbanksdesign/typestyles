import { defineConfig, defineCollection } from '@content-collections/core';
import { z } from 'zod';

const docs = defineCollection({
  name: 'docs',
  directory: 'content/docs',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string(),
  }),
});

export default defineConfig({
  content: [docs],
});
