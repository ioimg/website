import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    order: z.number().default(0),
    updated: z.string().default("2026-11-25"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
