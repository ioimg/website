---
title: Security
description: SSRF guards, signed URLs, decoder limits, and metadata handling.
section: Operations
order: 2
updated: "2026-11-25"
---

ioimg fetches URLs from the internet and decodes bytes from untrusted sources. That deserves a serious security posture.

## Threat model

| Threat | Control |
| --- | --- |
| SSRF / cloud metadata | Host allowlist, DNS-aware IP filtering, redirect re-checks |
| Open proxy / bandwidth theft | Signed URLs, allowlist, rate limit, quotas |
| Decoder vulnerabilities | Memory-safe Go paths, bounded decode, native backend isolation |
| Decompression bombs | 40 MP / 8192 px / byte limits before full decode |
| Cache poisoning | Deterministic keys + signatures + `Vary: Accept` |
| Cross-tenant leaks | Project-scoped keys and cache namespaces in control plane |
| SVG XSS | SVG rejected by default |
| Key leakage | Key rotation with `kid`, constant-time verification |

## SSRF protection

The fetcher validates more than the first URL:

1. Scheme must be `http` or `https`.
2. Host must match the allowlist.
3. IP literals are checked before dialling.
4. DNS is resolved, then every resolved IP is checked.
5. The connection is made to the validated IP, not a re-resolved one — closing the DNS rebinding hole.
6. Redirects are followed at most five hops and re-validated.

Blocked ranges include loopback, RFC1918, link-local, CGNAT, multicast, unspecified, IPv6 ULA, and cloud metadata addresses.

## Signed URLs

HMAC-SHA256, constant-time comparison, optional expiry, and key rotation. See [Signed URLs](/docs/signing).

## Resource limits

| Limit | Default |
| --- | --- |
| Source bytes | 25 MiB |
| Input/output dimension | 8192 px |
| Total pixels | 40 MP |
| Requested dimension | 8192 |
| Origin timeout | 15 s |
| Redirects | 5 |

## Metadata

Metadata is stripped by default. EXIF orientation is applied to pixels before transformation, then the tag is dropped. GPS and camera metadata do not leak by default.

## SVG

SVG is rejected. It is a rich document format with script and external-reference risks, and ioimg does not ship a sanitizer yet. If you need SVG, rasterise it before ioimg or wait for a hardened sanitizer.

## Rate limiting and abuse

- Per-IP token bucket via `IOIMG_RATE_RPS`.
- For real scale, enforce rate limits at the CDN/LB.
- Control plane adds project quotas and API key scopes.
- Signed URLs are still rate-limited.

## Deployment hardening

- Run as non-root.
- Read-only root filesystem.
- Writably cache volume only.
- No `IOIMG_ALLOW_PRIVATE` in production.
- Restrict `/metrics` and admin endpoints with tokens or network policy.
- Keep decoder dependencies patched.

## Reporting

Found something? Email `security@ioimg.dev` with a minimal reproduction. Please do not open a public issue for an exploit.

## Next

- [Deployment](/docs/deployment)
- [Configuration](/docs/configuration)
