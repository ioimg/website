import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { PLANS } from "./data";
import { Magnetic, Reveal, StickerIn } from "./ui";

const TONES: Record<string, string> = { paper: "var(--paper)", tang: "var(--tang)", lilac: "var(--lilac)" };
const TILTS = [-1.5, 0.8, 1.8];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-(--paper) px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div aria-hidden="true" className="io-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="io-sticker-sm inline-flex items-center gap-2 rounded-full bg-(--butter) px-3.5 py-1.5 text-sm font-black">
            <Sparkles className="h-4 w-4" strokeWidth={2.5} /> pricing
          </span>
          <h2 className="io-display mt-5 text-[clamp(2.6rem,6vw,5rem)] leading-[0.9]">Pick your altitude.</h2>
          <p className="mt-4 max-w-lg text-lg font-bold opacity-75">
            Self-host for free. Go managed when you want the cache and dashboard without the pager. No per-transform
            surprise.
          </p>
        </Reveal>

        <div id="waitlist" className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const hot = plan.tone === "tang";
            return (
              <StickerIn key={plan.name} rotate={TILTS[i]} delay={i * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -8, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`io-sticker relative flex h-full flex-col rounded-[32px] p-7 ${hot ? "md:-mt-4 md:pb-11" : ""}`}
                  style={{ background: TONES[plan.tone] }}
                >
                  {hot && (
                    <span className="io-sticker-sm absolute -top-4 right-6 rotate-[6deg] rounded-full bg-(--butter) px-3 py-1 text-sm font-black">
                      Most asked
                    </span>
                  )}
                  <p className="io-display text-4xl leading-none">{plan.name}</p>
                  <p className="mt-2 text-sm font-bold opacity-75">{plan.pitch}</p>
                  <p className="mt-6 flex items-end gap-2">
                    <span className={`io-display leading-[0.85] ${plan.price.startsWith("$") ? "text-6xl" : "text-4xl sm:text-5xl"}`}>{plan.price}</span>
                    <span className="pb-1 text-sm font-black opacity-60">{plan.cadence}</span>
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm font-bold">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-(--ink) bg-(--paper)">
                          <Check className="h-3 w-3" strokeWidth={4} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Magnetic className="mt-8 w-full">
                    <a
                      href={plan.href}
                      target={plan.href.startsWith("http") ? "_blank" : undefined}
                      rel={plan.href.startsWith("http") ? "noopener" : undefined}
                      className={`io-btn block w-full rounded-full px-6 py-3.5 text-center text-base font-black ${hot ? "bg-(--ink) text-(--paper)" : "bg-(--paper)"}`}
                    >
                      {plan.cta}
                    </a>
                  </Magnetic>
                </motion.div>
              </StickerIn>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs font-bold opacity-50">
          Prices are placeholders while ioimg is in alpha. The self-host path is the one we can promise today.
        </p>
      </div>
    </section>
  );
}
