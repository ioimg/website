---
title: Cache, purge, warm
description: L1 and L2 cache, ETag, single-flight, purge fan-out, and warm jobs.
section: Operations
order: 1
updated: "2026-11-25"
---

Cache is the difference between a cute image proxy and an expensive origin stress test.

## Layers

| Layer | Where | Notes |
| --- | --- | --- |
| Browser/CDN | Edge | Immutable URLs + ETag |
| L1 | Local disk | Per replica, LRU eviction |
| L2 | S3/R2/MinIO | Shared across replicas |
| Origin | Your storage | The only source of truth |

A typical request checks L1, then L2, then fetches the origin.

## Cache keys

The cache key is built from:

```text
pipeline version | ops canonical | source canonical | output format
```

That means `w_800,f_webp` and `f_webp,w_800` share one entry, while `f_avif` gets its own. Cache keys are also what the strong `ETag` is derived from.

## Single-flight

If 50 requests ask for the same missing variant at once, ioimg fetches and transforms it once. The rest wait for that result. This is the difference between a cache stampede and a normal Tuesday.

## ETag and 304

Every variant has a strong `ETag`. Send it back:

```http
If-None-Match: "..."
```

ioimg returns `304 Not Modified` without a body. Cache hits never fetch or transform.

## L2 shared cache

Enable L2 with S3-compatible storage:

```bash
IOIMG_L2_ENABLED=true
IOIMG_L2_ENDPOINT=https://s3.example.com
IOIMG_L2_BUCKET=ioimg
IOIMG_L2_ACCESS_KEY=...
IOIMG_L2_SECRET_KEY=...
```

L2 is read-through and write-through. On an L1 miss, ioimg checks L2; on a transform miss, it writes to both.

## Purge

Purge local cache and fan out to CDNs:

```bash
curl -X POST https://img.example.com/v1/purge \
  -H "Authorization: Bearer $IOIMG_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://cdn.acme.com/hero.jpg"],"tags":["campaign:summer"]}'
```

Supported payload fields:

| Field | Meaning |
| --- | --- |
| `urls` | Purge variants for exact source URLs |
| `tags` | Purge by `Cache-Tag` |
| `prefix` | Purge a key prefix |
| `all` | Purge everything (careful) |

CDN providers are best-effort per provider. Partial failures are reported, not hidden.

## Warm and batch

Warm the cache before a campaign:

```bash
curl -X POST https://img.example.com/v1/warm \
  -H "Authorization: Bearer $IOIMG_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"targets":[{"source":"https://cdn.acme.com/hero.jpg","ops":"w_1600,f_auto,q_auto"}]}'
```

The response is `202 Accepted` with a job ID. Poll it:

```bash
curl https://img.example.com/v1/jobs/{id}
```

## Cache headers

```http
Cache-Control: public, max-age=31536000, immutable
ETag: "..."
Cache-Tag: src:a1b2c3
X-IOIMG-Cache: HIT-L1
```

Because variants are immutable, the long max-age is safe. When the source changes, use a new source URL or purge the variant.

## Stale-if-error and origin shield

The roadmap includes stale-if-error, negative caching for origin 4xx, and per-origin circuit breakers. The current data plane already coalesces requests and separates cache hits from the transform worker pool, so hits survive a miss flood.

## Next

- [Deployment](/docs/deployment)
- [Observability](/docs/observability)
