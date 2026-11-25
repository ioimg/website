import { motion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import { DOCS_URL, EASE_OUT, GITHUB_URL } from "./data";
import { GithubMark, IoiMark, Magnetic, Mascot } from "./ui";

const LINKS = [
  { title: "Product", items: [["Features", "/features"], ["Playground", "/#playground"], ["Cache", "/#cache"], ["Pricing", "/pricing"]] },
  { title: "Build", items: [["GitHub", GITHUB_URL], ["Docs", DOCS_URL], ["Roadmap", "/docs/roadmap"], ["Parity notes", `${GITHUB_URL}/blob/main/docs/IMGPARITY.md`]] },
  { title: "Company", items: [["Control plane", "/docs/control-plane"], ["Security", "/docs/security"], ["Status", "#"], ["Contact", "mailto:hello@ioimg.dev"]] },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[48px] bg-(--ink) px-5 pt-20 text-(--paper) sm:px-8 sm:pt-28 lg:px-12">
      <div aria-hidden="true" className="io-dots absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <span className="io-sticker-sm inline-flex items-center gap-2 rounded-full bg-(--paper)/10 px-3 py-1.5 text-xs font-black text-(--mint)">
              <Heart className="h-3.5 w-3.5 fill-(--pink) text-(--pink)" /> made for the image-burdened
            </span>
            <h2 className="io-display mt-5 text-[clamp(3rem,8vw,6.4rem)] leading-[0.88]">
              Point your
              <br />
              first <span className="text-(--tang)">URL.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg font-bold opacity-70">
              One master in. Every size out. No thumbnail factory, no migration, no per-transform surprise.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href="/#playground" className="io-btn inline-flex items-center gap-2 rounded-full bg-(--tang) px-6 py-3.5 text-base font-black text-[#1B1720] [--ink:#FFF7F1]">
                  Try the playground
                  <ArrowRight className="h-5 w-5" strokeWidth={2.75} />
                </a>
              </Magnetic>
              <a href={GITHUB_URL} target="_blank" rel="noopener" className="io-btn inline-flex items-center gap-2 rounded-full bg-(--paper) px-6 py-3.5 text-base font-black text-(--ink)">
                <GithubMark className="h-4 w-4" strokeWidth={2.5} /> Star the repo
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {LINKS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-black tracking-[0.14em] uppercase opacity-45">{col.title}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.items.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener" : undefined} className="inline-block text-sm font-bold transition-[transform,color] duration-300 hover:translate-x-1 hover:text-(--mint)">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-[1400px] select-none sm:mt-20">
        <div className="pointer-events-none absolute right-[4%] -top-10 hidden w-28 lg:block">
          <div className="io-bob" style={{ ["--dur" as string]: "5s", ["--tilt" as string]: "4deg" }}>
            <Mascot className="w-full" />
          </div>
        </div>
        <p className="io-display flex justify-center pt-10 pb-[4vw] text-[clamp(6rem,30vw,25rem)] leading-[0.72] text-(--tang)" aria-label="ioimg">
          {"ioimg".split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="inline-block cursor-default"
              initial={{ y: "60%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE_OUT, delay: i * 0.06 } }}
              viewport={{ once: true }}
              whileHover={{ y: "-10%", rotate: i % 2 ? 7 : -7, color: ["#FFE36E", "#9BEBCB", "#FFA7C4", "#C9B8FF", "#9BD8FF"][i] }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-(--paper)/15 py-6 text-xs font-bold opacity-65">
        <span className="flex items-center gap-2">
          <IoiMark className="h-5 w-5" /> © 2026 ioimg. Alpha software. Cute, but still alpha.
        </span>
        <span className="inline-flex items-center gap-1.5">
          Built with Astro <span className="text-(--pink)">♥</span> and an unreasonable love for cache keys.
        </span>
      </div>
    </footer>
  );
}
