---
title: Deployment
description: Docker, Kubernetes, CDN, TLS, and scaling patterns.
section: Operations
order: 3
updated: "2026-11-25"
---

The simplest production shape is a CDN in front of a few stateless ioimg replicas with a shared L2 cache.

## Recommended topology

```text
browser
  → CDN (cache + TLS)
  → load balancer
  → ioimg replicas (L1 disk cache)
  → L2 S3/R2 shared cache
  → origin storage
```

Cache hits terminate at the CDN or at the replica. Misses hit L2 before the origin.

## Docker

```dockerfile
FROM ghcr.io/ioimg/ioimg:latest
USER 65532:65532
```

```yaml
services:
  ioimg:
    image: ghcr.io/ioimg/ioimg:latest
    read_only: true
    user: "65532:65532"
    ports:
      - "8080:8080"
    volumes:
      - cache:/var/cache/ioimg
    environment:
      IOIMG_ALLOWLIST: "cdn.example.com,*.example.com"
      IOIMG_SIGNED_ONLY: "true"
      IOIMG_SIGNING_KEYS: "prod:replace-me"
      IOIMG_CACHE_DIR: "/var/cache/ioimg"
volumes:
  cache:
```

## Kubernetes sketch

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ioimg
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ioimg
  template:
    metadata:
      labels:
        app: ioimg
    spec:
      containers:
        - name: ioimg
          image: ghcr.io/ioimg/ioimg:latest
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /readyz
              port: 8080
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
          envFrom:
            - secretRef:
                name: ioimg-secrets
          volumeMounts:
            - name: cache
              mountPath: /var/cache/ioimg
      volumes:
        - name: cache
          emptyDir:
            sizeLimit: 20Gi
```

Use a shared L2 cache when running more than one replica. `emptyDir` L1 is fine because it is only a cache.

## CDN configuration

- Cache immutable variants aggressively.
- Respect `Vary: Accept` for `f_auto`, or use explicit formats.
- Forward `ETag` and `If-None-Match`.
- Allow purge API calls from ioimg to the CDN.
- Keep `/healthz`, `/readyz`, `/metrics`, and `/v1/*` off the public edge.

## TLS

Terminate TLS at the CDN or load balancer. ioimg speaks plain HTTP inside the private network. If you terminate TLS in ioimg, put a reverse proxy in front for HTTP/2 and certificate management.

## Scaling notes

- Transform work is CPU-bound. Scale on CPU and queue depth.
- Cache hits are I/O-bound and should not compete with transform workers.
- AVIF is expensive; budget it or disable it.
- Set `IOIMG_CONCURRENCY` to a value that leaves headroom for the OS and networking.

## Health and rollout

| Endpoint | Meaning |
| --- | --- |
| `/healthz` | Process is alive |
| `/readyz` | Cache dir is writable |
| `/metrics` | Prometheus metrics |

Roll out with readiness gates. A cold replica with an empty L1 is still healthy; L2 prevents a thundering herd.

## Next

- [Observability](/docs/observability)
- [Security](/docs/security)
