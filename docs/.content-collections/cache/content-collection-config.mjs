// content-collections.ts
import { defineConfig, defineCollection } from "@content-collections/core";
import { z } from "zod";
var docs = defineCollection({
  name: "docs",
  directory: "content/docs",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string()
  })
});
var content_collections_default = defineConfig({
  content: [docs]
});
export {
  content_collections_default as default
};
