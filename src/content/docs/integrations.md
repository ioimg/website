---
title: Integrations
description: Next.js, WordPress, plain HTML, Go, and infrastructure adapters.
section: More
order: 1
updated: "2026-11-25"
---

If your stack can render a URL, it can use ioimg.

## Next.js

Use a custom loader so every `<Image>` gets the right size and format:

```js
// next.config.js
module.exports = {
  images: {
    loader: "custom",
    loaderFile: "./ioimg-loader.ts",
  },
};
```

```ts
// ioimg-loader.ts
export default function loader({ src, width, quality }) {
  const base = process.env.NEXT_PUBLIC_IOIMG_BASE;
  const ops = `w_${width},f_auto,q_${quality ?? "auto"}`;
  return `${base}/${ops}/${src}`;
}
```

For signed URLs, generate them on the server. Never ship a signing secret to the browser.

## WordPress

Define the base URL and signing key in `wp-config.php`:

```php
define("IOIMG_BASE_URL", "https://img.acme.com");
define("IOIMG_SIGNING_KEY", "prod:secret");
```

The plugin rewrites `src`/`srcset` and signs the resulting URLs. See the WordPress plugin in the ioimg repo.

## Plain HTML

```html
<img
  src="https://acme.ioimg.dev/w_800,f_auto,q_auto/https://cdn.acme.com/hero.jpg"
  srcset="
    https://acme.ioimg.dev/w_400,f_auto/https://cdn.acme.com/hero.jpg 400w,
    https://acme.ioimg.dev/w_800,f_auto/https://cdn.acme.com/hero.jpg 800w,
    https://acme.ioimg.dev/w_1600,f_auto/https://cdn.acme.com/hero.jpg 1600w
  "
  sizes="(max-width: 800px) 100vw, 800px"
  alt="A very optimized hero"
/>
```

## JavaScript URL builder

```js
import { signedImageUrl } from "@ioimg/js";

const url = await signedImageUrl({
  base: "https://acme.ioimg.dev",
  source: "https://cdn.acme.com/hero.jpg",
  ops: { w: 800, f: "auto", q: "auto" },
  key: "prod:secret",
  expSeconds: 3600,
});
```

## Go

```go
url, err := ioimg.Sign(ioimg.SignOptions{
    Base:   "https://acme.ioimg.dev",
    Source: "https://cdn.acme.com/hero.jpg",
    Ops:    "w_800,f_auto,q_auto",
    Key:    "prod:secret",
    Exp:    time.Hour,
})
```

## Infrastructure

| Adapter | Status |
| --- | --- |
| S3 / R2 / MinIO L2 cache | Supported |
| Cloudflare purge | Supported |
| Bunny purge | Supported |
| Fastly purge | Supported |
| Google Cloud Storage source | Roadmap |
| Azure Blob / Swift source | Roadmap |
| OpenTelemetry | Roadmap |
| Helm chart | Roadmap |

## Framework roadmap

Official Nuxt, SvelteKit, Astro, Laravel, and Shopify integrations are on the roadmap. The URL contract is stable, so community packages can land before the official ones.

## Next

- [Roadmap](/docs/roadmap)
- [URL API](/docs/url-api)
