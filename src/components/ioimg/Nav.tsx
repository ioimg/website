import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { EASE_OUT, GITHUB_URL, NAV_LINKS } from "./data";
import { GithubMark, IoiMark, Magnetic } from "./ui";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <nav
        aria-label="Main"
        className={`relative mx-auto flex max-w-6xl items-center justify-between rounded-[22px] px-3 py-2.5 transition-[background-color,box-shadow,border-color] duration-300 sm:px-4 ${
          scrolled ? "io-sticker bg-(--paper)" : "border-[2.5px] border-transparent"
        }`}
      >
        <a href="/" className="group flex items-center gap-2" aria-label="ioimg home">
          <IoiMark className="h-9 w-9 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg]" />
          <span className="io-display text-[1.6rem] leading-none">ioimg</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="rounded-full px-3.5 py-2 text-[14px] font-black transition-colors hover:bg-(--butter)">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={GITHUB_URL} target="_blank" rel="noopener" className="hidden rounded-full px-3 py-2 text-sm font-black underline-offset-4 hover:underline sm:inline-flex sm:items-center sm:gap-1.5">
            <GithubMark className="h-4 w-4" strokeWidth={2.5} /> GitHub
          </a>
          <Magnetic>
            <a href="/#playground" className="io-btn rounded-full bg-(--ink) px-5 py-2.5 text-sm font-black text-(--paper)">
              Try a URL
            </a>
          </Magnetic>
          <button
            type="button"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-(--ink) bg-(--paper) lg:hidden"
          >
            {menu ? <X className="h-5 w-5" strokeWidth={2.5} /> : <Menu className="h-5 w-5" strokeWidth={2.5} />}
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="io-sticker absolute inset-x-0 top-[calc(100%+8px)] rounded-[22px] bg-(--paper) p-2 lg:hidden"
            >
              <ul className="grid gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenu(false)}
                      className="block rounded-[14px] px-3 py-2.5 text-base font-black hover:bg-(--butter)"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-[14px] px-3 py-2.5 text-base font-black hover:bg-(--butter)">
                    <GithubMark className="h-4 w-4" strokeWidth={2.5} /> GitHub
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
