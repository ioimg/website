export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const SPRING_POP = { type: "spring", stiffness: 420, damping: 18, mass: 0.7 } as const;

export const GITHUB_URL = "https://github.com/ioimg/ioimg";
export const DOCS_URL = "https://github.com/ioimg/ioimg#readme";
export const DEMO_ORIGIN = "https://cdn.acme.com/hero.jpg";
export const DEMO_BASE = "https://acme.ioimg.dev";

export const NAV_LINKS = [
  { href: "#why", label: "Why ioimg" },
  { href: "#playground", label: "Playground" },
  { href: "#formats", label: "Formats" },
  { href: "#cache", label: "Cache" },
  { href: "#pricing", label: "Pricing" },
];

export const COLORS = {
  paper: "#FFF7F1",
  ink: "#1B1720",
  tang: "#FF7A59",
  tangDeep: "#E85A3B",
  lilac: "#C9B8FF",
  lilacSoft: "#EEE7FF",
  mint: "#9BEBCB",
  mintSoft: "#DFFBF0",
  butter: "#FFE36E",
  pink: "#FFA7C4",
  sky: "#9BD8FF",
};

export interface HeroVariant {
  label: string;
  size: string;
  meta: string;
  color: string;
  rotate: number;
  top: string;
  delay: number;
  hit?: boolean;
}

/** The “one master → many outputs” graph in the hero. */
export const HERO_VARIANTS: HeroVariant[] = [
  { label: "w_320.webp", size: "18 KB", meta: "320 × 213", color: "var(--mint)", rotate: -5, top: "4%", delay: 0.9, hit: true },
  { label: "w_800.avif", size: "64 KB", meta: "800 × 533", color: "var(--lilac)", rotate: 3, top: "28%", delay: 1.05 },
  { label: "w_1600.webp", size: "210 KB", meta: "1600 × 1067", color: "var(--butter)", rotate: -2, top: "53%", delay: 1.2 },
  { label: "thumb.png", size: "7 KB", meta: "160 × 160", color: "var(--pink)", rotate: 4, top: "77%", delay: 1.35, hit: true },
];

export const PRESETS = [
  { label: "Card", ops: "w_320,h_320,c_fill,f_auto,q_auto" },
  { label: "Hero", ops: "w_1600,f_auto,q_auto" },
  { label: "Thumb", ops: "w_160,h_160,c_fill,f_webp,q_75" },
] as const;

export const FORMATS = [
  {
    name: "AVIF",
    tone: "var(--lilac)",
    pitch: "Tiny files, happy browsers.",
    saving: 78,
    size: "64 KB",
    note: "Best for photos",
  },
  {
    name: "WebP",
    tone: "var(--mint)",
    pitch: "The reliable little hero.",
    saving: 62,
    size: "96 KB",
    note: "Great everywhere",
  },
  {
    name: "JPEG",
    tone: "var(--butter)",
    pitch: "The fallback that never quits.",
    saving: 34,
    size: "168 KB",
    note: "Universal safety net",
  },
] as const;

export const USE_CASES = [
  {
    title: "Agency mode",
    body: "One proxy, every client, clean per-project usage.",
    tag: "multi-tenant",
    color: "var(--lilac)",
    rotate: -5,
  },
  {
    title: "Flash sale",
    body: "Coalesced requests and warm cache keep the origin breathing.",
    tag: "origin shield",
    color: "var(--mint)",
    rotate: 4,
  },
  {
    title: "WordPress",
    body: "One define, every image optimized. No theme surgery.",
    tag: "plugin",
    color: "var(--butter)",
    rotate: -3,
  },
  {
    title: "Next.js",
    body: "A custom loader gives every srcset the right size and format.",
    tag: "loader",
    color: "var(--pink)",
    rotate: 6,
  },
  {
    title: "Platform team",
    body: "One deployment, many brands, quotas and audit trails.",
    tag: "control plane",
    color: "var(--sky)",
    rotate: -6,
  },
  {
    title: "Indie maker",
    body: "One master in the bucket. Zero thumbnail factory.",
    tag: "self-host",
    color: "var(--paper)",
    rotate: 3,
  },
] as const;

export const PLANS = [
  {
    name: "Self-host",
    price: "$0",
    cadence: "forever",
    pitch: "Bring your own storage and CDN.",
    features: ["Single Go binary", "L1 + L2 cache", "Signed URLs", "Community support"],
    cta: "Read the docs",
    href: DOCS_URL,
    tone: "paper",
  },
  {
    name: "Cloud",
    price: "metered",
    cadence: "usage",
    pitch: "Managed cache and transforms.",
    features: ["Global cache", "Purge + warm API", "Usage dashboard", "No per-transform surprise"],
    cta: "Join the waitlist",
    href: "#waitlist",
    tone: "tang",
  },
  {
    name: "Studio",
    price: "custom",
    cadence: "quote",
    pitch: "For agencies and platforms.",
    features: ["Multi-tenant projects", "Quotas + chargeback", "SLA and support", "Custom onboarding"],
    cta: "Say hello",
    href: "mailto:hello@ioimg.dev",
    tone: "lilac",
  },
] as const;

export const FAQS = [
  {
    q: "What exactly is ioimg?",
    a: "An image proxy and transformation service. Put a source image URL behind ioimg, add ops to the path, and get a resized, converted, cached image back. No upload, no migration, no SDK required.",
  },
  {
    q: "Do I have to move my images?",
    a: "No. Your origin stays the source of truth. ioimg fetches the master, generates the variant, and caches it. Change the URL prefix, keep the bucket.",
  },
  {
    q: "Does it store every size forever?",
    a: "No. Variants live in cache (L1 disk + optional S3/R2 L2), not in a second asset library. Cache entries can be evicted, purged, or regenerated from the master at any time.",
  },
  {
    q: "Can I self-host it?",
    a: "Yes. The data plane is a single Go binary. It runs without libvips, Postgres, or Valkey. Build with the vips tag when you want the native fast path.",
  },
  {
    q: "How is it different from imgproxy?",
    a: "The core transforms overlap. ioimg's bet is the control plane around them: multi-tenant projects, usage/cost visibility, cache + CDN lifecycle, and an explainable pipeline. We are honest about the gaps in docs/IMGPARITY.md.",
  },
  {
    q: "Is it production-ready?",
    a: "It is alpha. The data plane M1 works, but quota/billing, hardening, and more integrations are still on the roadmap. Self-host it for experiments, staging, and friendly production with supervision.",
  },
  {
    q: "What about security?",
    a: "Signed URLs with HMAC and expiry, host allowlists, DNS-aware SSRF guards, private-IP blocking, size/pixel limits, metadata stripping, and SVG rejection by default.",
  },
] as const;

export interface Integration {
  id: string;
  label: string;
  file: string;
  code: string;
  note: string;
}

export const INTEGRATIONS: Integration[] = [
  {
    id: "next",
    label: "Next.js",
    file: "next.config.js",
    code: `images: {\n  loader: "custom",\n  loaderFile: "./ioimg-loader.ts",\n}`,
    note: "One loader gives every <Image> the right size and format.",
  },
  {
    id: "wordpress",
    label: "WordPress",
    file: "wp-config.php",
    code: `define("IOIMG_BASE_URL", "https://img.acme.com");\ndefine("IOIMG_SIGNING_KEY", "demo:secret");`,
    note: "Rewrite src/srcset and let the plugin sign URLs.",
  },
  {
    id: "html",
    label: "Plain HTML",
    file: "index.html",
    code: `<img\n  src="${DEMO_BASE}/w_800,f_auto,q_auto/${DEMO_ORIGIN}"\n  alt="A very optimized hero"\n/>`,
    note: "If it has a URL, it can be an image. That is the whole API.",
  },
  {
    id: "go",
    label: "Go",
    file: "main.go",
    code: `url := ioimg.URL("https://cdn.acme.com/hero.jpg",\n  "w_800", "f_auto", "q_auto")`,
    note: "Build signed URLs on the server, render them anywhere.",
  },
];

export const CACHE_STEPS = [
  {
    id: "l1",
    name: "L1 disk",
    detail: "Single-flight, ETag, atomic writes.",
    color: "var(--mint)",
  },
  {
    id: "l2",
    name: "L2 object store",
    detail: "S3, R2, MinIO. Shared across replicas.",
    color: "var(--lilac)",
  },
  {
    id: "cdn",
    name: "CDN edge",
    detail: "Cache-Tag + purge fan-out.",
    color: "var(--butter)",
  },
] as const;
