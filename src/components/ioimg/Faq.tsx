import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { EASE_OUT, FAQS } from "./data";
import { Reveal, SectionKicker } from "./ui";

const TINTS = ["var(--lilac)", "var(--mint)", "var(--butter)", "var(--pink)", "var(--sky)", "var(--lilac)", "var(--mint)"];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-(--paper) px-5 pb-28 sm:px-8 sm:pb-36 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionKicker>FAQ</SectionKicker>
          <h2 className="io-display mt-5 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.9]">Fair questions.</h2>
          <p className="mt-5 max-w-sm text-lg leading-snug font-bold opacity-75">
            No magic claims. Just the honest version of what ioimg does today, and what is still cooking.
          </p>
        </Reveal>

        <ul className="flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const panelId = `io-faq-${i}`;
            return (
              <li key={item.q}>
                <motion.div
                  className="io-sticker-sm overflow-hidden rounded-[24px]"
                  animate={{ backgroundColor: isOpen ? TINTS[i % TINTS.length] : "#FFFFFF" }}
                  transition={{ duration: 0.35 }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-lg leading-tight font-black transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0, backgroundColor: isOpen ? "#1B1720" : "#FFF7F1", color: isOpen ? "#FFF7F1" : "#1B1720" }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-(--ink)"
                    >
                      <Plus className="h-5 w-5" strokeWidth={3} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: EASE_OUT }}
                      >
                        <p className="max-w-2xl px-5 pb-6 text-base leading-snug font-bold opacity-75 sm:px-6 sm:text-lg">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
