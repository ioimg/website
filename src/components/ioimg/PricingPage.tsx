import { ArrowRight, Check } from "lucide-react";
import { Faq } from "./Faq";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { Pricing } from "./Pricing";
import { IoiStyles, Mascot, Reveal, SectionKicker } from "./ui";

export function PricingPage() {
  return (
    <div className="io-root relative min-h-screen overflow-x-clip">
      <IoiStyles />
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-(--paper) px-5 pt-28 pb-10 sm:px-8 lg:px-12">
          <div aria-hidden="true" className="io-dots pointer-events-none absolute inset-0 opacity-55" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-(--mint) opacity-40 blur-3xl" />
          <div className="relative mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[1fr_auto]">
            <Reveal>
              <SectionKicker>Pricing</SectionKicker>
              <h1 className="io-display mt-6 text-[clamp(3rem,8vw,6rem)] leading-[0.9]">
                Pricing without
                <br />
                the jump scare.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-snug font-bold opacity-80">
                Self-host for free. Go managed when you want the cache, dashboard, and pager-free operations. No
                per-transform surprise.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["No per-transform surprise", "Bring your own storage", "Cancel anytime"].map((item) => (
                  <span key={item} className="io-sticker-sm inline-flex items-center gap-1.5 rounded-full bg-(--paper) px-3 py-1.5 text-xs font-black">
                    <span className="grid h-4 w-4 place-items-center rounded-full border-2 border-(--ink) bg-(--mint)">
                      <Check className="h-2.5 w-2.5" strokeWidth={4} />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
            <div className="hidden w-48 md:block">
              <div className="io-bob" style={{ ["--dur" as string]: "4.5s", ["--tilt" as string]: "4deg" }}>
                <Mascot className="w-full" />
              </div>
            </div>
          </div>
        </section>

        <Pricing />
        <Faq />

        <section className="bg-(--lilac-soft) px-5 pb-24 text-center sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl rounded-[32px] border-[2.5px] border-(--ink) bg-(--paper) p-8 shadow-[5px_6px_0_var(--ink)]">
            <h2 className="io-display text-3xl leading-none">Still deciding?</h2>
            <p className="mt-3 text-base font-bold opacity-70">
              Start with the self-host guide. You can always point the same URL contract at managed later.
            </p>
            <a href="/docs/installation" className="io-btn mt-5 inline-flex items-center gap-2 rounded-full bg-(--ink) px-6 py-3 text-base font-black text-(--paper)">
              Read installation <ArrowRight className="h-4 w-4" strokeWidth={2.75} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
