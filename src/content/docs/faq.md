---
title: FAQ
description: The honest answers about ioimg, storage, imgproxy, and alpha status.
section: More
order: 3
updated: "2026-11-25"
---

## What exactly is ioimg?

An image proxy and transformation service. Put a source image URL behind ioimg, add ops to the path, and get a resized, converted, cached image back.

## Do I have to move my images?

No. Your origin stays the source of truth. Change the URL prefix, keep the bucket.

## Does it store every size forever?

No. Variants live in cache (L1 disk + optional S3/R2 L2), not in a second asset library. Cache entries can be evicted, purged, or regenerated from the master at any time.

## Can I self-host it?

Yes. The data plane is a single Go binary. It runs without libvips, Postgres, or Valkey. Build with `-tags vips` when you want the native fast path.

## How is it different from imgproxy?

The core transforms overlap. ioimg's bet is the control plane around them: multi-tenant projects, usage/cost visibility, cache + CDN lifecycle, and an explainable pipeline. We are honest about the gaps in the roadmap.

## Is it production-ready?

It is alpha. The data plane M1 works, but quota/billing, hardening, and more integrations are still on the roadmap. Self-host it for experiments, staging, and friendly production with supervision.

## What about security?

Signed URLs with HMAC and expiry, host allowlists, DNS-aware SSRF guards, private-IP blocking, size/pixel limits, metadata stripping, and SVG rejection by default.

## Why is AVIF slow?

The default build uses a WASM libavif encoder. Build with `-tags vips` for native speed, or set `IOIMG_DISABLE_AVIF=true`.

## Does `f_auto` work with every CDN?

Only if the CDN respects `Vary: Accept`. If it does not, use an explicit format such as `f_webp`.

## Can I use it without signed URLs?

Yes, in open mode with an allowlist. For production, signed mode is strongly recommended.

## Where do I report a security issue?

Email `security@ioimg.dev` with a minimal reproduction. Please do not open a public issue for an exploit.

## Next

- [Overview](/docs/overview)
- [Quickstart](/docs/quickstart)
