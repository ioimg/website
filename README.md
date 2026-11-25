# ioimg website

The marketing site and docs for [ioimg](https://github.com/ioimg/ioimg) — an image proxy that turns one master into every size, crop, and format.

Built on the [Kite Astro template](https://github.com/Wiktorkulas51/kite-astro-template), with a docs system inspired by [Lotus](https://github.com/prosefly/astro-template-lotus-starter). The look and feel stays ioimg: pastel, sticker-ish, and a little kawaii.

## Pages

| Route | What |
| --- | --- |
| `/` | Landing page + URL playground |
| `/features` | Feature checklist + honest imgproxy comparison |
| `/pricing` | Self-host, cloud, and studio plans |
| `/docs` | Docs overview |
| `/docs/quickstart` | First image in a few minutes |
| `/docs/url-api` | URL contract, canonicalisation, presets |
| `/docs/transformations` | Every supported op |
| `/docs/formats` | `f_auto`, input/output formats, CDN caveats |
| `/docs/signing` | HMAC, expiry, rotation |
| `/docs/caching` | L1/L2, ETag, purge, warm |
| `/docs/security` | SSRF, limits, metadata, SVG policy |
| `/docs/deployment` | Docker, k8s, CDN, scaling |
| `/docs/observability` | Metrics, health, timing headers |
| `/docs/control-plane` | Multi-tenant control plane |
| `/docs/integrations` | Next.js, WordPress, HTML, Go |
| `/docs/roadmap` | Done / next / honest gaps |
| `/docs/faq` | The blunt answers |

Docs include a local search modal, sidebar, table of contents, prev/next, and an edit link.

## Stack

- Astro 7 (static output)
- React islands
- Tailwind CSS 4
- Motion
- Astro content collections for docs

## Develop

```bash
bun install
bun dev
```

Open http://localhost:4321.

## Build

```bash
bun run build
bun run preview
```

The static site is written to `dist/`.

## Content map

- `src/components/ioimg/data.ts` — landing copy, variants, plans, FAQ, integrations
- `src/components/ioimg/Hero.tsx` — the “one master → many variants” hero
- `src/components/ioimg/RenditionDemo.tsx` — interactive URL playground
- `src/components/ioimg/FeaturesPage.tsx` — `/features`
- `src/components/ioimg/ui.tsx` — colours, fonts, stickers, mascot, motion helpers
- `src/components/docs/nav.ts` — docs sidebar order
- `src/components/docs/DocsSearch.tsx` — local docs search
- `src/content/docs/*.md` — docs content
- `src/layouts/DocsLayout.astro` — docs shell
- `src/styles/docs.css` — docs prose styling
- `src/pages/docs/[...slug].astro` — docs renderer
- `src/pages/docs/search.json.ts` — search index

## CI

GitHub Actions only runs on `main`. Day-to-day work happens on `develop`.
