---
title: Overview
description: What ioimg is, how it works, and where it fits in your stack.
section: Start here
order: 1
updated: "2026-11-25"
---

ioimg is an **image proxy and transformation service** with a URL-first API. You keep your original images in your own storage, put a source URL behind ioimg, and add transformation ops to the path.

```text
https://acme.ioimg.dev/w_800,f_auto,q_auto/https://cdn.acme.com/hero.jpg
```

The service fetches the original, transforms it, caches the result, and serves it through any CDN. No upload, no migration, and no mandatory SDK.

## One master, every image

Traditional pipelines pre-generate a pile of sizes and formats. ioimg treats the original as the single source of truth:

- the origin stays where it is;
- variants are generated on demand;
- variants live in cache, not in a second asset library;
- the URL describes exactly which variant you want.

That is the whole idea: **one master in, every rendition out**.

## How a request flows

```text
request
  → parse ops + validate signature
  → L1 cache lookup
  → L2 cache lookup (optional)
  → fetch source
  → decode
  → transform
  → encode
  → write L1/L2
  → response + ETag + timing headers
```

A cache hit does not fetch or transform. It reads the cached bytes and returns them with a strong `ETag`.

## What ships today

The M1 data plane includes:

- resize modes `fit`, `fill`, `force`, `pad`, `crop`, `scale`;
- JPEG, PNG, WebP, AVIF, GIF output and `f_auto`;
- BMP and TIFF decode;
- blur, sharpen, pixelate, brightness, contrast, saturation, grayscale;
- rotate, flip, trim, background, palette, DPR, presets;
- signed URLs with expiry and key rotation;
- L1 disk cache, L2 S3/R2/MinIO cache, single-flight, ETag/304;
- purge fan-out to Cloudflare, Bunny, and Fastly;
- warm/batch jobs with status;
- Prometheus metrics, health endpoints, and structured logs.

## What is still cooking

ioimg is **alpha**. The docs are honest about the gaps:

- watermarking and chained pipelines;
- smart crop, face detection, and AI object features;
- PDF/video/PSD thumbnails and GIF→MP4;
- JPEG XL, HEIC, ICO;
- full quota/billing and production hardening.

See [Roadmap](/docs/roadmap) and [Feature parity](/docs/roadmap#parity-with-imgproxy) for the longer version.

## Design principles

1. **URL-first and CDN-friendly.** A variant is an immutable URL, so any CDN can cache it.
2. **Origin stays authoritative.** ioimg never becomes your master asset store.
3. **Cache is a cache.** Entries can be evicted, purged, and regenerated.
4. **Separate the data plane from the control plane.** Image traffic should not run through a dashboard middleware chain.
5. **Boring operations win.** Metrics, health checks, and clear errors beat magic.

## Next steps

- [Quickstart](/docs/quickstart) — run it locally and transform your first image.
- [URL API](/docs/url-api) — the URL contract.
- [Transformations](/docs/transformations) — every op.
- [Caching](/docs/caching) — how to make it fast and cheap.
