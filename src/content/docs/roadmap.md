---
title: Roadmap
description: What is done, what is next, and where the honest gaps are.
section: More
order: 2
updated: "2026-11-25"
---

ioimg is alpha. This page is the honest map.

## Done

- M1 data plane: resize, format negotiation, filters, signed URLs, SSRF guard.
- L1 + L2 cache, single-flight, ETag/304.
- Purge fan-out to Cloudflare, Bunny, and Fastly.
- Warm/batch jobs with status.
- Metrics, health endpoints, structured logs.
- Pure Go and optional libvips backends.
- BMP/TIFF decode, colour adjustments, pixelate, monochrome.
- Multi-tenant control plane foundation in a separate service.

## Next: parity pack 2

- fallback image;
- custom source headers;
- skip processing / raw streaming;
- resize kernel selection;
- automatic PNG palette;
- animation frame limit;
- source hash verification.

## Next: parity pack 3

- watermark image/text;
- chained pipelines;
- autoquality by file size / DSSIM;
- smart crop and face crop;
- source URL encryption;
- OpenTelemetry tracing.

## Later: product decisions

- PDF, video, PSD thumbnails, GIF→MP4 workers;
- AI object crop/blur;
- JPEG XL, HEIC, ICO;
- S3/GCS/Azure as source adapters;
- SVG sanitization.

## Parity with imgproxy

ioimg overlaps with imgproxy on the core OSS transforms, signed URLs, ETag, and cache. It does **not** match imgproxy feature-for-feature today.

Where ioimg aims to be different:

- multi-tenant control plane;
- usage and cost visibility;
- cache + CDN lifecycle in one API;
- explainable per-request pipeline timings.

The detailed matrix lives in the repository at `docs/IMGPARITY.md`.

## Non-goals

- becoming a DAM or image editor;
- AI generation in the request path;
- accepting SVG without a hardened sanitizer;
- claiming “fastest” without reproducible benchmarks.

## Next

- [FAQ](/docs/faq)
- [Feature parity](https://github.com/ioimg/ioimg/blob/main/docs/IMGPARITY.md)
