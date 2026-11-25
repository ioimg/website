---
title: Transformations
description: Every supported URL operation, with values and defaults.
section: Reference
order: 2
updated: "2026-11-25"
---

Ops are written as `name_value` and separated by commas.

```text
/w_800,h_600,c_fill,g_auto,f_auto,q_auto/https://cdn.acme.com/hero.jpg
```

## Geometry

| Op | Values | Default | Notes |
| --- | --- | --- | --- |
| `w` | `1..8192`, `auto` | — | Output width |
| `h` | `1..8192`, `auto` | — | Output height |
| `c` | `fit`, `fill`, `force`, `pad`, `crop`, `scale` | `fit` | Resize mode |
| `g` | `center`, `north`, `south`, `east`, `west`, `north_east`, `north_west`, `south_east`, `south_west`, `auto`, `face` | `center` | Crop/pad anchor |
| `dpr` | `1`, `1.5`, `2`, `3` | `1` | Multiplies `w` and `h` |
| `enlarge` | `0`, `1` | `0` | Allow upscaling |

Resize modes:

- `fit` — fit inside the box, preserve aspect ratio;
- `fill` — cover the box, then crop;
- `force` — exact width and height, may distort;
- `pad` — fit inside, then add background;
- `crop` — crop the source without scaling;
- `scale` — scale to the requested box, allowing upscale.

## Format and quality

| Op | Values | Default | Notes |
| --- | --- | --- | --- |
| `f` | `auto`, `avif`, `webp`, `jpeg`, `png`, `gif`, `json` | `auto` | Output format |
| `q` | `1..100`, `auto` | per format | Quality |
| `bg` | `RRGGBB`, `transparent` | `transparent` | Pad and PNG→JPEG background |
| `palette` | `1` | `0` | PNG 256-colour quantization |

`f_json` returns metadata instead of an image.

## Filters

| Op | Values | Default | Notes |
| --- | --- | --- | --- |
| `blur` | `0..100` | `0` | Approximate Gaussian blur |
| `sharp` / `sharpen` | `0..10` | `0` | Unsharp mask |
| `bri` / `brightness` | `-100..100` | `0` | Additive brightness |
| `con` / `contrast` | `-100..100` | `0` | Contrast around mid-grey |
| `sat` / `saturation` | `-100..100` | `0` | `-100` is grayscale |
| `mono` / `monochrome` | `1` | `0` | Grayscale |
| `pixel` / `px` | `1..200` | — | Pixelate with N-pixel blocks |

## Orientation and framing

| Op | Values | Notes |
| --- | --- | --- |
| `rot` | `90`, `180`, `270` | Rotate clockwise |
| `flip` | `h`, `v`, `hv` | Mirror horizontally/vertically |
| `trim` | `1..40` | Auto-crop uniform border with fuzz |
| `strip` | `0`, `1` | Strip metadata; default `1` |

## Presets

```text
/t_thumb,w_200/https://cdn.acme.com/photo.jpg
```

## Canonical order

Ops are canonicalised in this order for signatures and cache keys:

```text
bg, blur, bri, c, con, dpr, enlarge, f, flip, g, h, mono,
palette, pixel, q, rot, sat, sharp, strip, trim, w
```

## Known limitations

- Rotations are multiples of 90° only.
- `g_auto` uses libvips attention on the vips build; the pure Go build falls back to center.
- `g_face` currently falls back to center.
- Animated sources are decoded to their first frame.
- Watermarks, chained pipelines, duotone, colorize, and gradients are not implemented yet.

See [Roadmap](/docs/roadmap) for the next parity packs.

## Next

- [Formats & negotiation](/docs/formats)
- [Signed URLs](/docs/signing)
