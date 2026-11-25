---
title: Configuration
description: Environment variables for the ioimg data plane.
section: Start here
order: 4
updated: "2026-11-25"
---

ioimg is configured with environment variables. Every value has a safe default so it can run locally with no config.

## HTTP

| Variable | Default | Notes |
| --- | --- | --- |
| `IOIMG_ADDR` | `:8080` | Listen address |
| `IOIMG_BASE_URL` | `http://localhost:8080` | Public base URL used by helpers |
| `IOIMG_LOG_LEVEL` | `info` | `debug`, `info`, `warn`, `error` |
| `IOIMG_LOG_FORMAT` | `text` | `text` or `json` |
| `IOIMG_ACCESS_LOG` | `false` | Synchronous access log; keep off on hot paths |
| `IOIMG_TRUST_PROXY` | `false` | Trust `X-Forwarded-For` for client IP |

## Security

| Variable | Default | Notes |
| --- | --- | --- |
| `IOIMG_ALLOWLIST` | empty | Comma-separated exact hosts or `*.example.com` |
| `IOIMG_ALLOW_ANY_HOST` | `false` | Open mode. Avoid in production. |
| `IOIMG_ALLOW_PRIVATE` | `false` | Dev only. Allows loopback/private/metadata addresses. |
| `IOIMG_SIGNED_ONLY` | `false` | Require an HMAC signature |
| `IOIMG_SIGNING_KEYS` | — | `kid:secret[,oldkid:secret]`; first key signs, all verify |
| `IOIMG_SIGNATURE_INCLUDE_EXP` | `true` | Include `exp` in the canonical string |
| `IOIMG_SIGNATURE_EXPIRY_REQUIRED` | `false` | Reject signed URLs without `exp` |
| `IOIMG_FALLBACK_REDIRECT` | `false` | Redirect image requests to source on error |
| `IOIMG_ADMIN_TOKEN` | — | Bearer token for purge/warm admin endpoints |
| `IOIMG_METRICS_TOKEN` | — | Optional bearer token for `/metrics` |
| `IOIMG_RATE_RPS` | `0` | Per-IP token bucket rate; `0` disables |
| `IOIMG_RATE_BURST` | `0` | Burst size |

## Sources and limits

| Variable | Default | Notes |
| --- | --- | --- |
| `IOIMG_SOURCE_TIMEOUT` | `15s` | Total origin fetch timeout |
| `IOIMG_SOURCE_MAX_BYTES` | `26214400` | 25 MiB source limit |
| `IOIMG_SOURCE_USER_AGENT` | `ioimg/0.1` | User-Agent sent to origins |
| `IOIMG_MAX_DIMENSION` | `8192` | Max requested width/height |
| `IOIMG_CONCURRENCY` | `NumCPU*4` | Fetch + transform worker limit |
| `IOIMG_DISABLE_AVIF` | `false` | Disable AVIF output |
| `IOIMG_DISABLE_WEBP` | `false` | Disable WebP output |

## L1 cache

| Variable | Default | Notes |
| --- | --- | --- |
| `IOIMG_CACHE_DIR` | `./cache` | Disk cache directory |
| `IOIMG_CACHE_MAX_MB` | `4096` | LRU budget per process |

## L2 shared cache

| Variable | Default | Notes |
| --- | --- | --- |
| `IOIMG_L2_ENABLED` | `false` | Enable S3-compatible L2 |
| `IOIMG_L2_ENDPOINT` | — | S3/R2/MinIO endpoint |
| `IOIMG_L2_BUCKET` | `ioimg` | Bucket |
| `IOIMG_L2_ACCESS_KEY` | — | Access key |
| `IOIMG_L2_SECRET_KEY` | — | Secret key |
| `IOIMG_L2_REGION` | empty | Provider default; S3 needs a region |
| `IOIMG_L2_PREFIX` | `ioimg` | Object key prefix |
| `IOIMG_L2_USE_SSL` | `false` | Use TLS |
| `IOIMG_L2_TIMEOUT` | `10s` | L2 operation timeout |

## CDN purge

| Variable | Notes |
| --- | --- |
| `IOIMG_CDN_PROVIDERS` | `cloudflare,bunny,fastly` |
| `IOIMG_CDN_CLOUDFLARE_TOKEN` | Cloudflare API token |
| `IOIMG_CDN_CLOUDFLARE_ZONE` | Cloudflare zone ID |
| `IOIMG_CDN_BUNNY_KEY` | Bunny API key |
| `IOIMG_CDN_FASTLY_TOKEN` | Fastly API token |
| `IOIMG_CDN_FASTLY_SERVICE` | Fastly service ID |

## Presets

```bash
IOIMG_PRESETS='{"thumb":"h_320,c_fill,f_auto,q_auto","hero":"w_1600,c_fill,f_auto,q_80"}'
```

Presets are expanded on parse. A request can override preset values:

```text
/t_thumb,w_200/https://cdn.acme.com/photo.jpg
```

## Control plane

When `IOIMG_CONTROL_URL` is set, tenant config is pulled from the control plane instead of local signing keys, allowlists, and presets.

| Variable | Notes |
| --- | --- |
| `IOIMG_CONTROL_URL` | Control plane base URL |
| `IOIMG_CONTROL_TOKEN` | Service-to-service token |
| `IOIMG_CONTROL_SYNC` | Snapshot refresh interval |
| `IOIMG_CONTROL_TIMEOUT` | Pull timeout |
| `IOIMG_ALLOW_PROJECT_HEADER` | Dev only: select tenant via header |
| `IOIMG_PROJECT_HEADER` | Default `X-IOIMG-Project` |

## Next

- [Deployment](/docs/deployment)
- [Security](/docs/security)
- [Control plane](/docs/control-plane)
