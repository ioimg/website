---
title: Signed URLs
description: HMAC signing, expiry, canonical strings, and key rotation.
section: Reference
order: 4
updated: "2026-11-25"
---

Signed URLs keep your origin private and stop ioimg from becoming an open proxy.

## URL shape

```text
/{signature}/{ops}/{source}?exp=<unix>&kid=<key_id>
```

- `signature` — `base64url(HMAC-SHA256(secret, canonical))` without padding;
- `canonical` — normalised `{ops}/{source}`;
- `exp` — optional Unix timestamp; required when `IOIMG_SIGNATURE_EXPIRY_REQUIRED=true`;
- `kid` — optional key identifier for rotation.

By default `IOIMG_SIGNATURE_INCLUDE_EXP=true`, so the canonical string becomes:

```text
{ops}/{source}?exp={exp}
```

This prevents an attacker from changing the expiry without invalidating the signature.

## Signing example

```ts
const canonical = `${ops}/${source}?exp=${exp}`;
const sig = base64url(hmacSha256(secret, canonical));
const url = `https://acme.ioimg.dev/${sig}/${ops}/${source}?exp=${exp}`;
```

Use the official helper to avoid canonicalisation bugs:

```bash
ioimgctl sign \
  -base http://localhost:8080 \
  -ops 'w_400,f_auto,q_80' \
  -source 'https://cdn.acme.com/hero.jpg' \
  -key demo:secret \
  -exp 1h
```

## Verification

1. Parse the signature, ops, source, `exp`, and `kid`.
2. Load the active key (and any rotation grace keys).
3. Canonicalise ops and source.
4. Compare HMACs in constant time.
5. Reject expired URLs with `410 signature_expired`.
6. Return `401 invalid_signature` on mismatch.

The error message stays deliberately vague to avoid leaking key details.

## Key rotation

`IOIMG_SIGNING_KEYS` accepts a comma-separated key list:

```bash
IOIMG_SIGNING_KEYS=new:new-secret,old:old-secret
```

- The first key signs new URLs.
- All keys verify during the grace window.
- Remove the old key after your longest URL lifetime has passed.

## Open vs signed mode

| Mode | Config | Use case |
| --- | --- | --- |
| Open | `IOIMG_SIGNED_ONLY=false` + allowlist | Public CDN with trusted origins |
| Signed | `IOIMG_SIGNED_ONLY=true` + keys | Private origins, paid tiers, abuse control |

Signed mode is still rate-limited. A valid signature is not permission to DoS the service.

## Next

- [Security](/docs/security)
- [Error model](/docs/errors)
