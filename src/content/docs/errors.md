---
title: Error model
description: Stable error codes, status codes, and retry behaviour.
section: Reference
order: 5
updated: "2026-11-25"
---

Errors are JSON unless the request is an image request with fallback redirect enabled.

```json
{
  "error": {
    "code": "source_not_allowed",
    "message": "Host 'internal.corp' is not in the allowlist.",
    "request_id": "01HQ8Y...",
    "docs": "https://ioimg.dev/docs/errors#source_not_allowed"
  }
}
```

`error.code` is stable. Do not parse `error.message`.

## Codes

| HTTP | Code | Cause | Retry? |
| --- | --- | --- | --- |
| 400 | `invalid_ops` | Unknown parameter or conflicting ops | No |
| 400 | `invalid_source_url` | Source is not an absolute http(s) URL | No |
| 401 | `invalid_signature` | Missing or wrong signature | No |
| 403 | `source_not_allowed` | Host outside allowlist | No |
| 403 | `private_address_blocked` | Resolves to private/metadata IP | No |
| 404 | `source_not_found` | Origin 404/410 | No |
| 410 | `signature_expired` | `exp` is in the past | No |
| 413 | `payload_too_large` | Source exceeds the byte limit | No |
| 415 | `unsupported_format` | Format not accepted by build | No |
| 422 | `decode_failed` | Corrupt or unsupported image | No |
| 422 | `dimension_limit_exceeded` | Over 40 MP or 8192 px | No |
| 429 | `rate_limited` | Token bucket empty | Yes, after `Retry-After` |
| 429 | `quota_exceeded` | Project quota exhausted | No, until reset |
| 502 | `origin_error` | Origin 5xx or connection failure | Yes |
| 503 | `overloaded` | Worker pool saturated | Yes |
| 504 | `origin_timeout` | Origin fetch timed out | Yes |
| 500 | `internal_error` | Bug | Yes |

## Browser fallback

If the request looks like an image request and the deployment enables `IOIMG_FALLBACK_REDIRECT`, errors can redirect to the original source instead of returning JSON.

The default is honest JSON + the real status code, because monitoring should see failures.

## Request IDs

Every response includes `X-Request-Id`. Include it when reporting a bug; it is the fastest way to find the matching log line.

## Next

- [Observability](/docs/observability)
- [FAQ](/docs/faq)
