---
title: Installation
description: Docker, binary, libvips, and deployment shapes for ioimg.
section: Start here
order: 3
updated: "2026-11-25"
---

ioimg is a single Go service. The default build is pure Go; the native libvips build is optional.

## Requirements

| Path | Requirements |
| --- | --- |
| Pure Go | Go 1.26+; no cgo, no libvips |
| Docker | Docker with Compose for the demo |
| Native acceleration | libvips + pkg-config, build with `-tags vips` |
| L2 cache | S3-compatible object storage (S3, R2, MinIO, Wasabi) |
| Control plane | Postgres for the separate control plane service |

## Build from source

```bash
cd service
go build -o bin/ioimg ./cmd/ioimg
go build -o bin/ioimgctl ./cmd/ioimgctl
```

Run tests:

```bash
go test ./...
```

## Native libvips build

The libvips path is the recommended production fast path when you can ship native dependencies.

```bash
cd service
go build -tags vips -o bin/ioimg ./cmd/ioimg
```

There is also a `Dockerfile.vips` in the service directory.

The two backends implement the same `imaging.Processor` interface. The pure Go build is portable; the vips build is faster for resize and encode.

## Docker

```bash
cd service
docker compose up --build
```

Production images should run as a non-root user, with a read-only root filesystem and a writable cache volume:

```yaml
services:
  ioimg:
    image: ghcr.io/ioimg/ioimg:latest
    read_only: true
    user: "65532:65532"
    volumes:
      - ioimg-cache:/var/cache/ioimg
    environment:
      IOIMG_ADDR: ":8080"
      IOIMG_CACHE_DIR: "/var/cache/ioimg"
      IOIMG_ALLOWLIST: "cdn.example.com,*.example.com"
      IOIMG_SIGNED_ONLY: "true"
      IOIMG_SIGNING_KEYS: "prod:replace-me"
```

## Minimal production config

```bash
IOIMG_ADDR=:8080
IOIMG_BASE_URL=https://img.example.com
IOIMG_ALLOWLIST=cdn.example.com,*.example.com
IOIMG_SIGNED_ONLY=true
IOIMG_SIGNING_KEYS=prod:change-me
IOIMG_SIGNATURE_EXPIRY_REQUIRED=true
IOIMG_CACHE_DIR=/var/cache/ioimg
IOIMG_CACHE_MAX_MB=4096
```

## Scaling shape

The data plane is stateless apart from cache. Recommended shape:

```text
CDN → load balancer → N ioimg replicas → shared origin
                         │
                         ├── L1 disk cache per replica
                         └── L2 S3/R2 shared cache
```

Use a shared L2 cache if you run more than one replica. L1 stays local and fast; L2 prevents every replica from re-fetching the same source.

## What not to do

- Do not expose the service as an open proxy. Use an allowlist and signed URLs.
- Do not put the cache on a filesystem that is not writable by the runtime user.
- Do not enable `IOIMG_ALLOW_PRIVATE` in production unless you really mean it.
- Do not run AVIF-heavy traffic on the WASM encoder without a budget.

## Next

- [Configuration](/docs/configuration)
- [Deployment](/docs/deployment)
- [Security](/docs/security)
