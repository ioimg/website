import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Code2, Copy } from "lucide-react";
import { EASE_OUT, INTEGRATIONS } from "./data";
import { Reveal, SectionKicker } from "./ui";

export function Integrations() {
  const [active, setActive] = useState(INTEGRATIONS[0].id);
  const [copied, setCopied] = useState(false);
  const current = INTEGRATIONS.find((i) => i.id === active) ?? INTEGRATIONS[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the code is still selectable.
    }
  }

  return (
    <section id="integrations" className="relative overflow-hidden bg-(--paper) px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div aria-hidden="true" className="io-dots pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionKicker>Integrations</SectionKicker>
          <h2 className="io-display mt-5 text-[clamp(2.6rem,6vw,5rem)] leading-[0.9]">
            Drop it in.
            <br />
            Anywhere.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-snug font-bold opacity-80">
            If your stack can render a URL, it can use ioimg. Start with a loader, a plugin, or one very long
            <span className="io-code mx-1 rounded bg-(--lilac-soft) px-1.5 py-0.5 text-base">&lt;img&gt;</span>
            tag.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal delay={0.05}>
            <div className="grid gap-2.5">
              {INTEGRATIONS.map((item) => {
                const isActive = item.id === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(item.id)}
                    className={`group flex items-center justify-between rounded-[20px] border-[2.5px] border-(--ink) px-4 py-3 text-left transition-all ${
                      isActive ? "bg-(--butter) shadow-[4px_4px_0_var(--ink)]" : "bg-(--paper) hover:-translate-y-0.5 hover:bg-(--lilac-soft)"
                    }`}
                  >
                    <span>
                      <span className="block text-base font-black">{item.label}</span>
                      <span className="mt-0.5 block text-[11px] font-bold opacity-60">{item.note}</span>
                    </span>
                    <ArrowUpRight className={`h-5 w-5 transition-transform ${isActive ? "rotate-45" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} strokeWidth={2.5} />
                  </button>
                );
              })}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Nuxt", "SvelteKit", "Astro", "Laravel", "Shopify"].map((name) => (
                  <span key={name} className="rounded-full border-2 border-dashed border-(--ink)/30 px-2.5 py-1 text-[10px] font-black opacity-60">
                    {name} · soon
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="io-sticker overflow-hidden rounded-[28px] bg-(--ink) text-(--paper)">
              <div className="flex items-center justify-between gap-3 border-b-2 border-(--paper)/15 px-4 py-3">
                <span className="inline-flex items-center gap-2 text-xs font-black">
                  <Code2 className="h-4 w-4 text-(--mint)" strokeWidth={2.5} />
                  <span className="io-code">{current.file}</span>
                </span>
                <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-full bg-(--paper)/10 px-3 py-1.5 text-[11px] font-black transition-colors hover:bg-(--paper)/20">
                  {copied ? <Check className="h-3.5 w-3.5" strokeWidth={4} /> : <Copy className="h-3.5 w-3.5" strokeWidth={3} />}
                  {copied ? "copied" : "copy"}
                </button>
              </div>
              <div className="min-h-[220px] p-4 sm:p-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.pre
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    className="io-code overflow-x-auto text-[12px] leading-relaxed sm:text-sm"
                  >
                    <code>{current.code}</code>
                  </motion.pre>
                </AnimatePresence>
              </div>
              <div className="border-t-2 border-(--paper)/15 px-4 py-3 text-[11px] font-bold text-(--mint)">
                {current.note}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["one line", "No SDK required"],
                ["signed", "HMAC + expiry"],
                ["cacheable", "Works with any CDN"],
              ].map(([big, small]) => (
                <div key={big} className="rounded-[18px] border-2 border-(--ink) bg-(--lilac-soft) px-3 py-2.5">
                  <p className="text-sm font-black">{big}</p>
                  <p className="text-[11px] font-bold opacity-60">{small}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
