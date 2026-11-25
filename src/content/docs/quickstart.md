---
title: Quickstart
description: Run ioimg locally and transform your first image in a few minutes.
section: Start here
order: 2
updated: "2026-11-25"
---

This guide gets you from zero to a transformed image with Docker or a local Go binary.

## Option A: Docker Compose

From the `service/` directory of the ioimg repo:

```bash
docker compose up --build
```

The demo compose file starts ioimg and a small static origin. Then request a variant:

```bash
curl -o hero.webp \
  -H 'Accept: image/webp' \
  'http://localhost:8080/w_400,f_auto/http://origin/photo00.jpg'
```

The compose demo enables private-origin access because the origin is another container. Do not use that setting in production.

## Option B: local binary

Requires Go 1.26 or newer. No cgo, libvips, Postgres, or Valkey required.

```bash
cd service
go build -o bin/ioimg ./cmd/ioimg
go build -o bin/ioimgctl ./cmd/ioimgctl
```

Start a tiny static origin (any HTTP server works; this example uses Bun):

```bash
bun -e "const http=require('http'),fs=require('fs');http.createServer((q,s)=>{fs.readFile('../poc/data/src'+q.url,(e,d)=>{e?(s.writeHead(404),s.end()):(s.writeHead(200,{'Content-Type':'image/jpeg'}),s.end(d))})}).listen(8099)"
```

Start ioimg in another terminal:

```bash
IOIMG_ALLOW_ANY_HOST=true \
IOIMG_ALLOW_PRIVATE=true \
IOIMG_CACHE_DIR=./cache \
IOIMG_SIGNING_KEYS=demo:secret \
./bin/ioimg
```

Generate a signed URL and fetch it:

```bash
URL=$(./bin/ioimgctl sign -base http://localhost:8080 \
  -ops 'w_400,f_auto,q_80' \
  -source 'http://127.0.0.1:8099/photo00.jpg' \
  -key demo:secret -exp 1h)

curl -D - -H 'Accept: image/webp,image/jpeg' "$URL"
```

## Your first URL

The important part is the path:

```text
/{optional-signature}/{ops}/{source-url}
```

Open mode without a signature:

```text
http://localhost:8080/w_800,f_auto,q_auto/https://cdn.acme.com/hero.jpg
```

Signed mode:

```text
http://localhost:8080/{signature}/w_800,f_auto,q_auto/https://cdn.acme.com/hero.jpg?exp=1760000000
```

See [Signed URLs](/docs/signing) for the signing algorithm.

## Verify the response

Use `curl -D -` to inspect headers:

```text
Content-Type: image/webp
ETag: "..."
X-IOIMG-Cache: MISS
X-IOIMG-Format: webp
Server-Timing: fetch;dur=..., transform;dur=..., encode;dur=...
```

Request the same URL again. `X-IOIMG-Cache` should become `HIT-L1`.

## Common first-run issues

| Symptom | Fix |
| --- | --- |
| `source_not_allowed` | Add the host to `IOIMG_ALLOWLIST` or use `IOIMG_ALLOW_ANY_HOST=true` locally. |
| `private_address_blocked` | The origin resolves to a private IP. For local demos, set `IOIMG_ALLOW_PRIVATE=true`. |
| `invalid_signature` | Check the canonical ops/source and that the signing key matches. |
| AVIF is slow | The default AVIF encoder is WASM. Set `IOIMG_DISABLE_AVIF=true` or build with `-tags vips`. |

## Next

- [Configuration](/docs/configuration)
- [URL API](/docs/url-api)
- [Caching](/docs/caching)
