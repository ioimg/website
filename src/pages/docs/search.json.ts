import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const docs = await getCollection("docs");
  const index = docs.map((entry) => ({
    slug: entry.id.replace(/\.mdx?$/, ""),
    title: entry.data.title,
    description: entry.data.description,
    section: entry.data.section,
    text: (entry.body ?? "").replace(/\s+/g, " ").slice(0, 6000),
  }));
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
