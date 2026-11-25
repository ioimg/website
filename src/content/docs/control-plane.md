---
title: Control plane
description: Multi-tenant projects, API keys, signing, usage, and the dashboard.
section: Operations
order: 5
updated: "2026-11-25"
---

The data plane serves images. The control plane manages who gets to serve what.

## Why a separate plane

Image traffic is high-volume, cache-heavy, and latency-sensitive. Dashboard middleware, sessions, CSRF, and admin queries do not belong on that path.

ioimg keeps them separate:

```text
control plane (auth, projects, keys, usage, billing)
        │ snapshot/config
        ▼
data plane (fetch, transform, cache, serve)
```

## What the control plane owns

- projects and organisations;
- signing keys and rotation;
- API keys with scopes;
- allowlists and presets per project;
- usage accounting and quotas;
- admin API and dashboard;
- audit log.

## Data plane integration

When `IOIMG_CONTROL_URL` is set, the data plane pulls tenant snapshots instead of reading local signing keys and allowlists:

```bash
IOIMG_CONTROL_URL=https://control.example.com
IOIMG_CONTROL_TOKEN=service-token
IOIMG_CONTROL_SYNC=30s
```

The pull model keeps the data plane independent from control-plane latency. A control-plane outage does not stop cached image serving.

## Tenant selection

In production, the tenant is selected by host mapping or a configured project header. The project header bypass is a development aid and should stay off:

```bash
IOIMG_ALLOW_PROJECT_HEADER=false
IOIMG_PROJECT_HEADER=X-IOIMG-Project
```

## Usage and quotas

The control plane is where per-project usage and quota live:

- transformations;
- bytes out;
- cache hits/misses;
- quota remaining;
- billing thresholds.

The data plane can expose `X-IOIMG-Quota-Remaining` when quota is enabled.

## Status

The control plane is under active work and lives in a separate repository. Treat multi-tenant production use as early access until the hardening checklist is done.

## Next

- [Configuration](/docs/configuration)
- [Deployment](/docs/deployment)
