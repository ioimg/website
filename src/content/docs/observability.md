---
title: Observability
description: Metrics, health checks, debug headers, and per-phase timing.
section: Operations
order: 4
updated: "2026-11-25"
---

ioimg tries to make every image explainable.

## Metrics

`GET /metrics` exposes Prometheus text format. Optional bearer auth:

```bash
IOIMG_METRICS_TOKEN=secret
```

Typical series include request counts, cache hits/misses, errors, bytes in/out, fetch time, and transform time.

## Health checks

| Endpoint | Use |
| --- | --- |
| `/healthz` | Liveness; process is alive |
| `/readyz` | Readiness; cache directory is writable |
| `/v1/stats` | JSON runtime snapshot |

## Response headers

Every image response can tell you what happened:

```http
X-IOIMG-Cache: HIT-L1
X-IOIMG-Format: webp
X-IOIMG-Backend: go
X-IOIMG-Transform-Ms: 42.1
X-IOIMG-Clamped: 1
Server-Timing: fetch;dur=120, transform;dur=18, encode;dur=41
X-Request-Id: 01HQ8Y...
```

Use `Server-Timing` in browser DevTools to see where time went. Use `X-Request-Id` to join a request with logs.

## Logs

Set `IOIMG_LOG_FORMAT=json` in production. Access logs are off by default because synchronous logging is a tax on the hot path. Enable `IOIMG_ACCESS_LOG=true` when debugging, or collect logs at the proxy/CDN.

## Suggested alerts

- p95 transform latency above budget;
- cache hit ratio dropping;
- 5xx rate rising;
- origin timeout rate rising;
- L2 error rate rising;
- worker saturation / `503 overloaded`;
- certificate expiry at the edge.

## Tracing roadmap

OpenTelemetry tracing is on the roadmap, not in the current data plane. The per-phase timings above are designed to be a useful bridge until then.

## Next

- [Deployment](/docs/deployment)
- [Roadmap](/docs/roadmap)
