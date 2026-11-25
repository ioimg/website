# ioimg website

The cute landing page for [ioimg](https://github.com/ioimg/ioimg) — an image proxy that turns one master into every size, crop, and format.

Built with the [Kite Astro template](https://github.com/Wiktorkulas51/kite-astro-template), then rewritten for ioimg.

## Stack

- Astro 7 (static output)
- React islands
- Tailwind CSS 4
- Motion
- Lucide icons

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

- `src/components/ioimg/data.ts` — copy, variants, formats, plans, FAQ, integrations
- `src/components/ioimg/Hero.tsx` — the “one master → many variants” hero
- `src/components/ioimg/RenditionDemo.tsx` — interactive URL playground
- `src/components/ioimg/ui.tsx` — colours, fonts, stickers, mascot, motion helpers
- `src/pages/index.astro` — page metadata
- `src/layouts/Layout.astro` — HTML head

## CI

GitHub Actions only runs on `main`. Day-to-day work happens on `develop`.
