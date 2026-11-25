---
title: URL API
description: Path-based and query-based URL contracts, canonicalisation, and presets.
section: Reference
order: 1
updated: "2026-11-25"
---

Every ioimg request is just a URL. There are two shapes: path-based (preferred) and query-based (compatibility).

## Path-based

```text
/{signature}/{ops}/{source_url}
{ops}/{source_url}                       # open mode, no signature
```

- `ops` is a comma-separated list of `name_value` pairs. Order never matters.
- `source_url` is an absolute `http(s)` URL.
- A signature is optional only when the deployment allows open mode.

Examples:

```text
/w_800,f_auto,q_auto/https://cdn.acme.com/hero.jpg
/8Kk2s.../w_320,h_320,c_fill,g_auto,f_webp/https://cdn.acme.com/p/123.jpg
```

## Query-based

```text
/img?src=https%3A%2F%2Fcdn.acme.com%2Fhero.jpg&w=800&h=600&c=fill&f=auto&q=auto&sig=...
```

Query mode exists for platforms that cannot easily write long paths (some Shopify proxies, WAFs, or legacy CMS plugins). Both forms produce the same canonical variant.

## Canonicalisation

Signatures and cache keys are built from a canonical string. The server normalises before hashing:

1. Lowercase scheme and host.
2. Remove default ports (`:80` for http, `:443` for https).
3. Percent-decode and safely re-encode the path.
4. Collapse duplicate `//` in the path, except after the scheme.
5. Drop fragments.
6. Spaces in ops are rejected.
7. Presets are expanded before canonicalisation.

Ops are serialised in a fixed order, so `w_800,f_webp` and `f_webp,w_800` produce the same signature and cache key.

## Canonical ops order

```text
bg, blur, bri, c, con, dpr, enlarge, f, flip, g, h, mono,
palette, pixel, q, rot, sat, sharp, strip, trim, w
```

## Presets

A preset is a named bundle of ops:

```bash
IOIMG_PRESETS='{"thumb":"h_320,c_fill,f_auto,q_auto"}'
```

Use it with `t_<name>`:

```text
/t_thumb/https://cdn.acme.com/photo.jpg
/t_thumb,w_200/https://cdn.acme.com/photo.jpg   # width overrides the preset
```

Rules:

- presets cannot reference another preset;
- explicit ops override preset values;
- presets are expanded before signing and caching.

## Response headers

| Header | Example | Meaning |
| --- | --- | --- |
| `Content-Type` | `image/avif` | Actual output format |
| `ETag` | `"b3f1..."` | Strong ETag derived from cache key |
| `Cache-Control` | `public, max-age=31536000, immutable` | Immutable variant |
| `Vary` | `Accept` | Present for `f_auto` |
| `Cache-Tag` | `src:a1b2c3` | Tag for selective purge |
| `X-IOIMG-Cache` | `HIT-L1`, `HIT-L2`, `MISS` | Cache state |
| `X-IOIMG-Format` | `webp` | Negotiated/actual format |
| `X-IOIMG-Clamped` | `1` | DPR scaling hit the dimension limit |
| `Server-Timing` | `fetch;dur=120, transform;dur=18` | Per-phase timings |

## HEAD and conditional requests

`HEAD` returns the same headers without a body. `If-None-Match` returns `304 Not Modified` for a matching ETag, which is the cheapest possible response.

## Next

- [Transformations](/docs/transformations)
- [Signed URLs](/docs/signing)
- [Error model](/docs/errors)
