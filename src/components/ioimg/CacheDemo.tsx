import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Flame, RefreshCw, Zap } from "lucide-react";
import { CACHE_STEPS, EASE_OUT } from "./data";
import { Reveal, SectionKicker } from "./ui";

export function CacheDemo() {
  const [purged, setPurged] = useState(false);

  function purge() {
    setPurged(true);
    window.setTimeout(() => setPurged(false), 1800);
  }

  return (
    <section id="cache" className="relative overflow-hidden bg-(--mint) px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div aria-hidden="true" className="io-grid absolute inset-0 opacity-25" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionKicker>Cache control</SectionKicker>
            <h2 className="io-display mt-5 text-[clamp(2.3rem,4.6vw,4rem)] leading-[0.95]">
              Cache that can
              <br />
              take a punch.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-snug font-bold opacity-80">
              L1 disk, L2 object storage, single-flight, ETag, purge fan-out, and warm jobs. One API for the whole
              lifecycle — so a flash sale does not turn into an origin outage.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {[
                "Single-flight per variant",
                "ETag + 304 responses",
                "Purge by URL, tag, prefix",
                "Warm/batch with job status",
                "Stale-if-error",
                "Per-origin circuit breaker",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-black">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-(--ink) bg-(--paper)">
                    <Check className="h-3 w-3" strokeWidth={4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16} className="mt-8">
            <div className="io-sticker rounded-[24px] bg-(--ink) p-4 text-(--paper)">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-(--mint)">one call, every edge</p>
              <pre className="io-code mt-2 overflow-x-auto text-[11px] leading-relaxed sm:text-xs">
                <code>{`POST /v1/purge\n{ "tags": ["campaign:summer"], "all": false }`}</code>
              </pre>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="io-sticker rounded-[36px] bg-(--mint-soft) p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-55">cache tower</p>
                  <p className="io-display text-3xl leading-none">98.4%</p>
                  <p className="text-xs font-bold opacity-60">hit ratio, happy origin</p>
                </div>
                <button
                  type="button"
                  onClick={purge}
                  className="io-btn inline-flex items-center gap-2 rounded-full bg-(--tang) px-4 py-2.5 text-sm font-black text-(--paper)"
                >
                  <Flame className="h-4 w-4" strokeWidth={2.5} />
                  Purge
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {CACHE_STEPS.map((step, i) => {
                  const isCdn = step.id === "cdn";
                  return (
                    <motion.div
                      key={step.id}
                      animate={purged && isCdn ? { scale: [1, 1.04, 1], rotate: [0, 6, -4, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.55, ease: EASE_OUT }}
                      className="relative rounded-[22px] border-[2.5px] border-(--ink) bg-(--paper) p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] border-2 border-(--ink) text-sm font-black" style={{ background: step.color }}>
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-black">{step.name}</p>
                          <p className="truncate text-[11px] font-bold opacity-55">{step.detail}</p>
                        </div>
                        <span className={`rounded-full border-2 border-(--ink) px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${purged && isCdn ? "bg-(--tang) text-(--paper)" : "bg-(--mint)"}`}>
                          {purged && isCdn ? "purging" : "ready"}
                        </span>
                      </div>
                      {i < CACHE_STEPS.length - 1 && (
                        <div aria-hidden="true" className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border-2 border-(--ink) bg-(--paper) px-1.5 text-[10px]">
                          ↓
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between gap-2 rounded-[18px] border-2 border-dashed border-(--ink)/30 px-3 py-2.5 text-[11px] font-black opacity-70">
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="h-4 w-4" strokeWidth={2.5} /> 12 edges refreshed
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5" strokeWidth={2.5} /> 240 ms
                </span>
              </div>
            </div>

            <AnimatePresence>
              {purged && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.9 }}
                  className="io-sticker-sm absolute -top-5 -right-3 z-20 rotate-[5deg] rounded-full bg-(--butter) px-3 py-1.5 text-xs font-black sm:-right-6"
                >
                  purged ✦ warm next
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
