import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles as SparklesIcon } from "lucide-react";
import { Artwork } from "./Artwork";
import { EASE_OUT, GITHUB_URL, HERO_VARIANTS } from "./data";
import { GithubMark, IoiMark, Magnetic, Mascot, Sparkle } from "./ui";

const LINES = ["One master.", "Every image.", "Zero busywork."];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-(--paper) px-5 pt-28 pb-16 sm:px-8 lg:min-h-[100svh] lg:px-12 lg:pt-32">
      <div aria-hidden="true" className="io-dots pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 -z-10 h-80 w-80 rounded-full bg-(--lilac) opacity-40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-96 w-96 rounded-full bg-(--mint) opacity-30 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="io-sticker-sm inline-flex items-center gap-2 rounded-full bg-(--paper) px-3.5 py-1.5 text-sm font-extrabold"
          >
            <IoiMark className="h-5 w-5" />
            Open source image proxy
            <span className="rounded-full bg-(--butter) px-2 py-0.5 text-[11px] font-black uppercase tracking-wider">alpha</span>
          </motion.div>

          <h1 className="io-display mt-6 text-[clamp(2.6rem,10vw,4.1rem)] leading-[0.9] text-(--ink) lg:text-[clamp(3.4rem,6.3vw,5.7rem)]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pt-[0.06em] pb-[0.1em]">
                <motion.span
                  className="relative inline-block whitespace-nowrap"
                  initial={{ y: "110%", rotate: 5 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 0.95, ease: EASE_OUT, delay: 0.15 + i * 0.11 }}
                >
                  {i === 1 && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-x-[-0.12em] top-[0.14em] bottom-[0.03em] -z-10 origin-left rounded-[0.2em] bg-(--butter)"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, ease: EASE_OUT, delay: 1.0 }}
                    />
                  )}
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-[34rem] text-lg leading-snug font-bold text-(--ink)/85 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 }}
          >
            ioimg turns one original into every size, crop, and format your product needs — generated on demand,
            cached like it should be, and measured down to the byte.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.75 }}
          >
            <Magnetic>
              <a href="#playground" className="io-btn inline-flex items-center gap-2 rounded-full bg-(--ink) px-7 py-4 text-lg font-extrabold text-(--paper)">
                Try the playground
                <ArrowRight className="h-5 w-5" strokeWidth={2.75} />
              </a>
            </Magnetic>
            <a href={GITHUB_URL} target="_blank" rel="noopener" className="io-btn inline-flex items-center gap-2 rounded-full bg-(--paper) px-6 py-4 text-lg font-extrabold">
              <GithubMark className="h-5 w-5" strokeWidth={2.5} />
              Star on GitHub
            </a>
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-extrabold text-(--ink)/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {["L1 + L2 cache", "signed URLs", "CDN purge", "pure Go"].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-(--ink) bg-(--mint)">
                  <Check className="h-3 w-3" strokeWidth={4} />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto w-full max-w-[620px]">
          <RenditionGraph />

          <div className="pointer-events-none absolute -top-4 -left-2 hidden w-24 lg:block">
            <div className="io-bob" style={{ ["--dur" as string]: "4.6s", ["--tilt" as string]: "-6deg" }}>
              <Mascot className="w-full" />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-3 -bottom-8 hidden lg:block">
            <Sparkle className="io-twinkle h-10 w-10" color="var(--pink)" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-(--ink)/20 pt-5 text-sm font-bold text-(--ink)/65">
        <span className="inline-flex items-center gap-2">
          <SparklesIcon className="h-4 w-4" strokeWidth={2.5} /> Like webpack, but backwards.
        </span>
        <span className="io-code rounded-full bg-(--ink) px-3 py-1 text-[11px] text-(--mint)">one → many, not many → one</span>
        <span className="hidden sm:inline">No upload. No migration. No thumbnail factory.</span>
      </div>
    </section>
  );
}

function RenditionGraph() {
  return (
    <div className="relative aspect-[1.06/1] w-full select-none">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[
          { d: "M45 50 C51 50 50 12 57 12", delay: 0.7 },
          { d: "M45 50 C51 50 50 36 57 36", delay: 0.8 },
          { d: "M45 50 C51 50 50 61 57 61", delay: 0.9 },
          { d: "M45 50 C51 50 50 85 57 85", delay: 1.0 },
        ].map((p) => (
          <motion.path
            key={p.d}
            d={p.d}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="1.5 2.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: p.delay }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute top-[30%] left-0 z-20 w-[45%]"
        initial={{ opacity: 0, x: -40, rotate: -12, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, rotate: -3, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.25 }}
      >
        <div className="io-sticker relative rounded-[26px] bg-(--paper) p-2.5">
          <span className="io-sticker-sm absolute -top-4 -left-2 z-10 rotate-[-6deg] rounded-full bg-(--tang) px-3 py-1 text-[10px] font-black uppercase tracking-wider text-(--paper)">
            1 master
          </span>
          <Artwork className="w-full rounded-[18px]" />
          <div className="mt-2 flex items-center justify-between gap-2 px-1 pb-0.5">
            <span className="truncate text-[11px] font-black sm:text-sm">hero.jpg</span>
            <span className="rounded-full bg-(--lilac-soft) px-2 py-0.5 text-[10px] font-black sm:text-xs">3.2 MB</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1 text-[10px] font-extrabold text-(--ink)/60 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-(--mint)" /> origin stays the source of truth
        </div>
      </motion.div>

      {HERO_VARIANTS.map((v) => (
        <motion.div
          key={v.label}
          className="absolute left-[56%] z-20 w-[43%]"
          style={{ top: v.top }}
          initial={{ opacity: 0, x: 30, rotate: v.rotate + 10, scale: 0.75 }}
          animate={{ opacity: 1, x: 0, rotate: v.rotate, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 14, delay: v.delay }}
          whileHover={{ scale: 1.04, rotate: 0 }}
        >
          <div className="io-sticker-sm rounded-[18px] bg-(--paper) p-2">
            <div className="flex items-center justify-between gap-1">
              <span className="rounded-full px-2 py-0.5 text-[9px] font-black sm:text-[10px]" style={{ background: v.color }}>
                {v.label}
              </span>
              {v.hit && (
                <span className="rounded-full border border-(--ink) bg-(--mint) px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider sm:text-[9px]">
                  hit
                </span>
              )}
            </div>
            <div className="mt-1.5 flex items-end justify-between gap-2">
              <span className="text-base leading-none font-black whitespace-nowrap sm:text-2xl">{v.size}</span>
              <span className="hidden text-[9px] font-bold opacity-55 whitespace-nowrap sm:inline sm:text-[10px]">{v.meta}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-(--ink)/10">
              <motion.span
                className="block h-full rounded-full"
                style={{ background: v.color }}
                initial={{ width: 0 }}
                animate={{ width: v.hit ? "82%" : "58%" }}
                transition={{ duration: 0.8, delay: v.delay + 0.25, ease: EASE_OUT }}
              />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="io-sticker-sm absolute bottom-0 left-[4%] z-30 rotate-[3deg] rounded-full bg-(--butter) px-3 py-1.5 text-[10px] font-black sm:text-xs"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 1.6 }}
      >
        generated on demand ✦
      </motion.div>
    </div>
  );
}
