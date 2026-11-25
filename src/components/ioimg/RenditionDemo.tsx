import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Image as ImageIcon, Wand2 } from "lucide-react";
import { Artwork } from "./Artwork";
import { DEMO_BASE, DEMO_ORIGIN, EASE_OUT } from "./data";
import { Reveal, SectionKicker } from "./ui";

const WIDTHS = [320, 800, 1600] as const;
const FORMATS = ["auto", "webp", "avif"] as const;
type Width = (typeof WIDTHS)[number];
type Format = (typeof FORMATS)[number];

const FORMAT_LABEL: Record<Format, string> = {
  auto: "auto → WebP",
  webp: "WebP",
  avif: "AVIF",
};

const FACTOR: Record<Format, number> = {
  auto: 0.00015,
  webp: 0.00015,
  avif: 0.0001,
};

export function RenditionDemo() {
  const [width, setWidth] = useState<Width>(800);
  const [format, setFormat] = useState<Format>("auto");
  const [copied, setCopied] = useState(false);

  const ops = `w_${width},f_${format},q_auto`;
  const url = `${DEMO_BASE}/${ops}/${DEMO_ORIGIN}`;
  const height = Math.round((width * 2) / 3);
  const kb = useMemo(() => Math.max(6, Math.round(width * height * FACTOR[format])), [width, height, format]);
  const hit = width === 800 && format === "auto";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the URL is still selectable.
    }
  }

  return (
    <section id="playground" className="relative overflow-hidden bg-(--paper) px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div aria-hidden="true" className="io-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionKicker>URL playground</SectionKicker>
          <h2 className="io-display mt-5 text-[clamp(2.6rem,6vw,5rem)] leading-[0.9]">
            Stop storing
            <br />
            every size.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-snug font-bold opacity-80">
            Keep one master in your bucket. Change the URL, get the variant. The cache does the remembering.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <Reveal delay={0.05}>
            <div className="io-sticker rounded-[30px] bg-(--lilac-soft) p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-black tracking-[0.14em] uppercase opacity-60">Build a URL</p>
                <span className="io-sticker-sm rounded-full bg-(--paper) px-2.5 py-1 text-[11px] font-black">live-ish demo</span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-black">Width</p>
                <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Output width">
                  {WIDTHS.map((w) => (
                    <button
                      key={w}
                      type="button"
                      role="radio"
                      aria-checked={width === w}
                      onClick={() => setWidth(w)}
                      className={`relative rounded-full border-2 border-(--ink) px-4 py-2 text-sm font-black transition-colors ${
                        width === w ? "bg-(--ink) text-(--paper)" : "bg-(--paper) hover:bg-(--butter)"
                      }`}
                    >
                      {w}px
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-black">Format</p>
                <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Output format">
                  {FORMATS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      role="radio"
                      aria-checked={format === f}
                      onClick={() => setFormat(f)}
                      className={`relative rounded-full border-2 border-(--ink) px-4 py-2 text-sm font-black transition-colors ${
                        format === f ? "bg-(--mint)" : "bg-(--paper) hover:bg-(--butter)"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[20px] border-2 border-(--ink) bg-(--ink) p-3.5 text-(--paper)">
                <div className="flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-(--mint)">
                  <span>your URL</span>
                  <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-full bg-(--paper)/10 px-2.5 py-1 text-[10px] text-(--paper) hover:bg-(--paper)/20">
                    {copied ? <Check className="h-3 w-3" strokeWidth={4} /> : <Copy className="h-3 w-3" strokeWidth={3} />}
                    {copied ? "copied" : "copy"}
                  </button>
                </div>
                <p className="io-code mt-2 overflow-wrap-anywhere text-[11px] leading-relaxed break-all sm:text-xs">
                  <span className="text-(--butter)">{DEMO_BASE}/</span>
                  <span className="text-(--pink)">{ops}/</span>
                  <span className="text-(--mint)">{DEMO_ORIGIN}</span>
                </p>
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs font-bold opacity-65">
                <Wand2 className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
                Static demo. In the real service this URL fetches, transforms, caches, and returns the variant.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="io-sticker rounded-[30px] bg-(--paper) p-3">
              <div className="flex items-center gap-1.5 px-2 py-1.5">
                <span className="h-2.5 w-2.5 rounded-full border border-(--ink) bg-(--pink)" />
                <span className="h-2.5 w-2.5 rounded-full border border-(--ink) bg-(--butter)" />
                <span className="h-2.5 w-2.5 rounded-full border border-(--ink) bg-(--mint)" />
                <span className="ml-2 truncate text-[11px] font-black opacity-55">variant preview</span>
              </div>

              <div className="relative overflow-hidden rounded-[22px] border-2 border-(--ink) bg-(--lilac-soft)">
                <motion.div key={`${width}-${format}`} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: EASE_OUT }}>
                  <Artwork className="w-full" />
                </motion.div>
                <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                  <span className="io-sticker-sm rounded-full bg-(--paper) px-2 py-1 text-[10px] font-black">{width} × {height}</span>
                  <span className="io-sticker-sm rounded-full bg-(--mint) px-2 py-1 text-[10px] font-black">{FORMAT_LABEL[format]}</span>
                </div>
                <div className="absolute right-2 bottom-2">
                  <span className={`io-sticker-sm rounded-full px-2.5 py-1 text-[11px] font-black ${hit ? "bg-(--mint)" : "bg-(--butter)"}`}>
                    {hit ? "cache HIT" : "cache MISS → HIT"}
                  </span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ["original", "3.2 MB"],
                  ["output", `${kb} KB`],
                  ["saved", `${Math.max(1, Math.round((1 - kb / 3200) * 100))}%`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[16px] border-2 border-(--ink) bg-(--lilac-soft) px-3 py-2.5">
                    <p className="text-[9px] font-black uppercase tracking-wider opacity-55">{label}</p>
                    <p className="mt-0.5 text-lg leading-none font-black">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-[16px] border-2 border-dashed border-(--ink)/30 px-3 py-2.5 text-[11px] font-bold opacity-70">
                <ImageIcon className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                Source stays put. The variant lives in cache, not in a second asset library.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
