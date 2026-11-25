---
title: Formats & negotiation
description: "Input codecs, output formats, f_auto, and Vary: Accept."
section: Reference
order: 3
updated: "2026-11-25"
---

ioimg keeps the output format advertising honest: it only claims what the build can actually encode.

## Output formats

| Format | Status | Notes |
| --- | --- | --- |
| JPEG | Supported | Universal fallback |
| PNG | Supported | Transparency, optional palette |
| WebP | Supported | Good default for most photos |
| AVIF | Supported | WASM encoder by default; slow |
| GIF | Supported | Static output; first frame only |
| JSON | Supported | Metadata endpoint, no image bytes |

## Input formats

| Format | Status | Notes |
| --- | --- | --- |
| JPEG | Supported | EXIF orientation applied |
| PNG | Supported | Transparency preserved |
| WebP | Supported | First frame for animated sources |
| AVIF | Supported | Decode depends on build |
| GIF | Supported | First frame |
| BMP | Supported | Decode-only |
| TIFF | Supported | Decode-only |
| SVG | Rejected | Deliberate security choice |

JPEG XL, HEIC, ICO, PSD, PDF, and video are not supported yet.

## f_auto

`f_auto` negotiates from the request's `Accept` header:

```http
Accept: image/avif,image/webp,image/jpeg
```

Resolution order:

1. AVIF if the client accepts it and the output stays within the size limit;
2. WebP if accepted;
3. PNG if the client explicitly prefers it;
4. JPEG as the fallback.

The response includes:

```http
Content-Type: image/avif
Vary: Accept
```

## The CDN caveat

`Vary: Accept` tells caches that the response depends on `Accept`. Not every CDN honours `Vary` well. If yours does not, use an explicit format:

```text
/w_800,f_webp/https://cdn.acme.com/hero.jpg
```

This is less magical and more cacheable. Both are valid.

## AVIF performance

The default pure Go build uses a WASM libavif encoder. Encoding can take roughly 0.5–2 seconds per image. For production traffic:

- build with `-tags vips` for native libvips; or
- set `IOIMG_DISABLE_AVIF=true` and serve WebP/JPEG.

## Metadata

Metadata is stripped by default (`strip_1`). EXIF orientation is applied before transforms, so the output does not need the EXIF tag to display correctly.

## Next

- [Transformations](/docs/transformations)
- [Caching](/docs/caching)
