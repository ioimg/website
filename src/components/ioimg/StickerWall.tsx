import { motion } from "motion/react";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { GITHUB_URL, USE_CASES } from "./data";
import { Reveal, StickerIn } from "./ui";

const TILTS = [-3, 2.5, -1.5, 2, -2.5, 1.5];

export function StickerWall() {
  return (
    <section id="why" className="relative overflow-hidden bg-(--butter) px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div aria-hidden="true" className="io-dots absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="io-sticker-sm inline-flex items-center gap-2 rounded-full bg-(--paper) px-3.5 py-1.5 text-sm font-black">
              <Heart className="h-4 w-4" strokeWidth={2.5} /> use cases
            </span>
            <h2 className="io-display mt-5 max-w-3xl text-[clamp(2.6rem,6vw,5rem)] leading-[0.9]">
              Made for your
              <br />
              kind of chaos.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-snug font-bold opacity-75">
            Agencies, stores, blogs, platforms, and one very tired indie maker. If you have images, you probably have
            this problem.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((item, i) => (
            <StickerIn key={item.title} rotate={TILTS[i % TILTS.length]} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="io-sticker flex h-full flex-col justify-between rounded-[28px] p-6"
                style={{ background: item.color }}
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-(--ink) bg-(--paper)/70 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" strokeWidth={2.5} /> {item.tag}
                  </span>
                  <h3 className="io-display mt-4 text-3xl leading-none">{item.title}</h3>
                  <p className="mt-3 text-base leading-snug font-bold opacity-75">{item.body}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t-2 border-dashed border-(--ink)/20 pt-3 text-xs font-black">
                  <span>one URL away</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </div>
              </motion.div>
            </StickerIn>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <a href={GITHUB_URL} target="_blank" rel="noopener" className="io-btn inline-flex items-center gap-2 rounded-full bg-(--ink) px-6 py-3.5 text-base font-black text-(--paper)">
            See the repo
            <ArrowRight className="h-4 w-4" strokeWidth={2.75} />
          </a>
          <span className="rounded-full border-2 border-dashed border-(--ink)/30 px-4 py-3 text-sm font-black opacity-70">
            your use case could be sticker #7
          </span>
        </Reveal>
      </div>
    </section>
  );
}
