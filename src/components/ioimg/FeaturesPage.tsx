import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { DOCS_URL, GITHUB_URL } from "./data";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { IoiMark, IoiStyles, Magnetic, Reveal, SectionKicker, StickerIn } from "./ui";

const GROUPS = [
  {
    icon: "🎨",
    title: "Transforms",
    tone: "var(--lilac)",
    items: ["fit / fill / force / pad / crop / scale", "9 gravity anchors + DPR", "rotate, flip, trim, background", "blur, sharpen, pixelate", "brightness, contrast, saturation", "monochrome, palette", "presets via t_<name>"],
  },
  {
    icon: "⚡",
    title: "Formats",
    tone: "var(--mint)",
    items: ["JPEG, PNG, WebP, AVIF, GIF", "f_auto from Accept", "BMP + TIFF decode", "EXIF orientation baked in", "metadata stripped by default", "Vary: Accept", "f_json metadata"],
  },
  {
    icon: "🗄️",
    title: "Cache",
    tone: "var(--butter)",
    items: ["L1 disk cache", "L2 S3 / R2 / MinIO", "single-flight", "strong ETag + 304", "purge by URL/tag/prefix", "CDN purge fan-out", "warm + batch jobs"],
  },
  {
    icon: "🔒",
    title: "Security",
    tone: "var(--pink)",
    items: ["HMAC signed URLs", "expiry + key rotation", "host allowlists", "DNS-aware SSRF guard", "private/metadata IP blocking", "byte + pixel limits", "SVG rejected by default"],
  },
  {
    icon: "🧸",
    title: "Operations",
    tone: "var(--sky)",
    items: ["Prometheus metrics", "health + readiness", "JSON logs", "per-phase Server-Timing", "X-IOIMG debug headers", "Docker / Compose", "pure Go or libvips"],
  },
  {
    icon: "🌸",
    title: "Platform",
    tone: "var(--paper)",
    items: ["multi-tenant projects", "API keys + scopes", "usage + quotas", "control-plane snapshot sync", "usage dashboard", "per-project cache namespace", "chargeback reporting (roadmap)"],
  },
] as const;

const ROWS = [
  ["Core resize, crop, filters", "✅", "✅"],
  ["Signed URLs + expiry", "✅", "✅"],
  ["ETag / 304 / Vary: Accept", "✅", "✅"],
  ["L1 + L2 shared cache", "✅", "🟡"],
  ["Purge + warm API", "✅", "🟡"],
  ["Multi-tenant control plane", "✅ early", "⛔ OSS"],
  ["Portable no-libvips binary", "✅", "⛔"],
  ["Watermark + chained pipelines", "⛔", "✅"],
  ["Smart crop / AI objects", "⛔", "✅ Pro"],
  ["PDF / video / PSD thumbnails", "⛔", "✅ Pro"],
  ["JPEG XL / HEIC / ICO", "⛔", "✅"],
  ["Docs + honest parity matrix", "✅", "✅"],
] as const;

export function FeaturesPage() {
  return (
    <div className="io-root relative min-h-screen overflow-x-clip">
      <IoiStyles />
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-(--paper) px-5 pt-28 pb-16 sm:px-8 lg:px-12">
          <div aria-hidden="true" className="io-dots pointer-events-none absolute inset-0 opacity-55" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-(--lilac) opacity-40 blur-3xl" />
          <div className="relative mx-auto max-w-5xl text-center">
            <Reveal>
              <SectionKicker>Feature checklist</SectionKicker>
              <h1 className="io-display mt-6 text-[clamp(3rem,8vw,6.2rem)] leading-[0.9]">
                Small proxy.
                <br />
                Big checklist.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-snug font-bold opacity-80 sm:text-xl">
                All the image transforms you expect, wrapped in the cache, security, and operations you actually need.
                Every claim here has a docs page and a repo behind it.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <a href="/#playground" className="io-btn inline-flex items-center gap-2 rounded-full bg-(--ink) px-7 py-4 text-lg font-extrabold text-(--paper)">
                    Try the playground <ArrowRight className="h-5 w-5" strokeWidth={2.75} />
                  </a>
                </Magnetic>
                <a href={DOCS_URL} className="io-btn inline-flex items-center gap-2 rounded-full bg-(--paper) px-6 py-4 text-lg font-extrabold">
                  Read the docs
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {["~20 transforms", "7 input formats", "L1 + L2 cache", "CDN purge", "multi-tenant"].map((label) => (
                  <span key={label} className="io-sticker-sm rounded-full bg-(--butter) px-3 py-1.5 text-xs font-black">
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative bg-(--lilac-soft) px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="io-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.95]">Everything in the box.</h2>
              <p className="mt-4 text-lg font-bold opacity-75">
                No feature gates hidden behind a fake “coming soon”. If it is listed here, it is in the data plane or
                clearly marked as roadmap.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {GROUPS.map((group, i) => (
                <StickerIn key={group.title} rotate={i % 2 ? 1.2 : -1.2} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -6, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="io-sticker flex h-full flex-col rounded-[28px] p-6"
                    style={{ background: group.tone }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-[16px] border-2 border-(--ink) bg-(--paper) text-2xl">{group.icon}</span>
                      <h3 className="io-display text-2xl leading-none">{group.title}</h3>
                    </div>
                    <ul className="mt-5 flex flex-1 flex-col gap-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-bold">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-(--ink) bg-(--paper)">
                            <Check className="h-3 w-3" strokeWidth={4} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </StickerIn>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-(--paper) px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
          <div aria-hidden="true" className="io-grid pointer-events-none absolute inset-0 opacity-25" />
          <div className="relative mx-auto max-w-5xl">
            <Reveal className="text-center">
              <SectionKicker>Honest comparison</SectionKicker>
              <h2 className="io-display mt-5 text-[clamp(2.4rem,5vw,4rem)] leading-[0.95]">Where we overlap. Where we don’t.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-bold opacity-75">
                imgproxy is mature and feature-rich. We respect that. Here is the honest table, not a marketing one.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-[24px] border-[2.5px] border-(--ink) bg-(--paper) shadow-[5px_6px_0_var(--ink)]">
              <div className="grid grid-cols-[1fr_90px_100px] border-b-2 border-(--ink) bg-(--butter) px-4 py-3 text-[11px] font-black uppercase tracking-wider sm:grid-cols-[1fr_140px_160px] sm:px-6">
                <span>Capability</span>
                <span className="text-center">ioimg</span>
                <span className="text-center">imgproxy</span>
              </div>
              {ROWS.map(([label, ours, theirs], i) => (
                <div
                  key={label}
                  className={`grid grid-cols-[1fr_90px_100px] items-center px-4 py-3 text-sm font-bold sm:grid-cols-[1fr_140px_160px] sm:px-6 ${i % 2 ? "bg-(--lilac-soft)/40" : ""}`}
                >
                  <span>{label}</span>
                  <span className="text-center">{ours}</span>
                  <span className="text-center opacity-80">{theirs}</span>
                </div>
              ))}
            </Reveal>
            <p className="mx-auto mt-4 max-w-2xl text-center text-xs font-bold opacity-55">
              “Pro” means imgproxy’s paid tier. See the full parity notes in the repo for the long version.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-(--mint) px-5 py-20 text-center sm:px-8 sm:py-24 lg:px-12">
          <div aria-hidden="true" className="io-dots absolute inset-0 opacity-35" />
          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto w-24">
              <div className="io-bob" style={{ ["--dur" as string]: "4s" }}>
                <IoiMark className="w-full" />
              </div>
            </div>
            <h2 className="io-display mt-5 text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.95]">Read the whole manual.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-bold opacity-75">
              URL API, transforms, cache, security, deployment, integrations. It is all there, with the limits written
              down too.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={DOCS_URL} className="io-btn inline-flex items-center gap-2 rounded-full bg-(--ink) px-7 py-4 text-lg font-extrabold text-(--paper)">
                Open docs <ArrowRight className="h-5 w-5" strokeWidth={2.75} />
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener" className="io-btn inline-flex items-center gap-2 rounded-full bg-(--paper) px-6 py-4 text-lg font-extrabold">
                Star the repo
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
