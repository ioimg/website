import { motion } from "motion/react";
import { Check, Monitor, Smartphone, Sparkles } from "lucide-react";
import { EASE_OUT, FORMATS } from "./data";
import { Reveal, SectionKicker, StickerIn } from "./ui";

export function Formats() {
  return (
    <section id="formats" className="relative overflow-hidden bg-(--lilac) px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div aria-hidden="true" className="io-dots absolute inset-0 opacity-35" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <SectionKicker>Format negotiation</SectionKicker>
          <h2 className="io-display mt-5 text-[clamp(2.3rem,4.6vw,4rem)] leading-[0.95]">
            Right format.
            <br />
            Happy browser.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-snug font-bold opacity-80">
            <span className="io-code rounded bg-(--paper) px-1.5 py-0.5 text-base">f_auto</span> reads the
            <span className="io-code mx-1 rounded bg-(--paper) px-1.5 py-0.5 text-base">Accept</span>
            header and picks AVIF, WebP, or JPEG. Same URL. No pipeline rewrite.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { icon: Monitor, label: "Desktop → AVIF" },
              { icon: Smartphone, label: "Older mobile → JPEG" },
              { icon: Sparkles, label: "Always a fallback" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="io-sticker-sm inline-flex items-center gap-2 rounded-full bg-(--paper) px-3 py-1.5 text-xs font-black">
                <Icon className="h-4 w-4" strokeWidth={2.5} />
                {label}
              </span>
            ))}
          </div>

          <div className="io-sticker mt-8 rounded-[24px] bg-(--ink) p-4 text-(--paper)">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-(--mint)">response headers</p>
            <pre className="io-code mt-2 overflow-x-auto text-[11px] leading-relaxed sm:text-xs">
              <code>{`Content-Type: image/avif\nVary: Accept\nCache-Control: public, max-age=31536000, immutable`}</code>
            </pre>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {FORMATS.map((f, i) => (
            <StickerIn key={f.name} rotate={i === 1 ? 1.5 : i === 0 ? -1 : 1} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="io-sticker flex flex-col gap-3 rounded-[26px] bg-(--paper) p-5 sm:flex-row sm:items-center sm:gap-5"
              >
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[20px] border-[2.5px] border-(--ink) text-lg font-black" style={{ background: f.tone }}>
                  {f.name}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-lg font-black">{f.pitch}</p>
                    <p className="text-sm font-black opacity-60">{f.note}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-(--ink) bg-(--paper)">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: f.tone }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${f.saving}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 + i * 0.1 }}
                      />
                    </div>
                    <span className="text-sm font-black">{f.size}</span>
                  </div>
                  <p className="mt-1 text-xs font-bold opacity-55">{f.saving}% smaller than the original JPEG</p>
                </div>
                <Check className="hidden h-6 w-6 shrink-0 sm:block" strokeWidth={3} />
              </motion.div>
            </StickerIn>
          ))}
        </div>
      </div>
    </section>
  );
}
