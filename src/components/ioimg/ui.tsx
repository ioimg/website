import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { EASE_OUT } from "./data";

export function IoiStyles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap');
.io-root {
  --paper: #FFF7F1; --ink: #1B1720; --tang: #FF7A59; --tang-deep: #E85A3B;
  --lilac: #C9B8FF; --lilac-soft: #EEE7FF; --mint: #9BEBCB; --mint-soft: #DFFBF0;
  --butter: #FFE36E; --pink: #FFA7C4; --sky: #9BD8FF;
  font-family: 'Zen Maru Gothic', ui-sans-serif, system-ui, sans-serif;
  background: var(--paper); color: var(--ink); -webkit-font-smoothing: antialiased;
}
.io-display { font-family: 'Mochiy Pop One', 'Zen Maru Gothic', sans-serif; font-weight: 400; letter-spacing: -0.015em; }
.io-root ::selection { background: var(--ink); color: var(--butter); }
.io-root :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 16px; }
.io-sticker { border: 2.5px solid var(--ink); box-shadow: 4px 5px 0 var(--ink); }
.io-sticker-sm { border: 2px solid var(--ink); box-shadow: 3px 3px 0 var(--ink); }
.io-btn {
  border: 2.5px solid var(--ink); box-shadow: 0 5px 0 var(--ink);
  transition: transform .18s cubic-bezier(.22,1,.36,1), box-shadow .18s cubic-bezier(.22,1,.36,1), background-color .25s;
}
.io-btn:hover { transform: translateY(-2px); box-shadow: 0 7px 0 var(--ink); }
.io-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 var(--ink); }
.io-bob { animation: io-bob var(--dur, 4s) ease-in-out var(--delay, 0s) infinite; }
@keyframes io-bob { 50% { transform: translate3d(0, -10px, 0) rotate(var(--tilt, 2deg)); } }
.io-spin { animation: io-spin 18s linear infinite; }
@keyframes io-spin { to { transform: rotate(360deg); } }
.io-twinkle { animation: io-twinkle var(--dur, 3s) ease-in-out var(--delay, 0s) infinite; transform-origin: center; }
@keyframes io-twinkle { 0%, 100% { opacity: .35; transform: scale(.8) rotate(0deg); } 50% { opacity: 1; transform: scale(1.12) rotate(8deg); } }
.io-float { animation: io-float var(--dur, 6s) ease-in-out var(--delay, 0s) infinite; }
@keyframes io-float { 0%, 100% { transform: translate3d(0, 0, 0) rotate(-2deg); } 50% { transform: translate3d(0, -12px, 0) rotate(2deg); } }
.io-dots { background-image: radial-gradient(color-mix(in srgb, var(--ink) 16%, transparent) 1.2px, transparent 1.4px); background-size: 22px 22px; }
.io-grid { background-image: linear-gradient(color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px); background-size: 28px 28px; }
.io-scan { background-image: repeating-linear-gradient(0deg, transparent 0 3px, color-mix(in srgb, var(--ink) 7%, transparent) 3px 4px); }
.io-code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.io-marquee { animation: io-marquee var(--dur, 28s) linear infinite; }
@keyframes io-marquee { to { transform: translate3d(-50%, 0, 0); } }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
@media (prefers-reduced-motion: reduce) {
  .io-bob, .io-spin, .io-twinkle, .io-float, .io-marquee { animation: none !important; }
}
`}</style>
  );
}

/** Pulls its child toward the cursor and springs back on leave. Mouse only. */
export function Magnetic({ children, strength = 0.3, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 17, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 280, damping: 17, mass: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, delay = 0, className = "", y = 36 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Slaps an element in like a sticker: overshoots in scale and settles on its tilt. */
export function StickerIn({
  children,
  rotate = 0,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.4, rotate: rotate - 18 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 380, damping: 16, delay }}
    >
      {children}
    </motion.div>
  );
}

export function IoiMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <rect x="3" y="3" width="38" height="38" rx="14" fill="var(--tang)" stroke="var(--ink)" strokeWidth="2.6" />
      <path d="M11 15 C14 10, 20 10, 22 15" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16.5" cy="21" r="2.3" fill="var(--ink)" />
      <circle cx="27.5" cy="21" r="2.3" fill="var(--ink)" />
      <path d="M17 29 Q22 33.5 27 29" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M31 10 L32.2 13.2 L35.5 14.2 L32.2 15.2 L31 18.4 L29.8 15.2 L26.5 14.2 L29.8 13.2 Z" fill="var(--butter)" stroke="var(--ink)" strokeWidth="1.4" />
    </svg>
  );
}

export function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      <path d="M25 76 C25 39 47 20 70 20 C95 20 116 40 116 76 C116 108 96 124 70 124 C44 124 25 108 25 76 Z" fill="var(--lilac)" stroke="var(--ink)" strokeWidth="3.5" />
      <path d="M43 55 C43 44 51 39 59 39 C67 39 75 45 75 55" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M70 55 C70 43 77 37 86 37 C95 37 103 44 103 55" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="58" cy="72" r="4.2" fill="var(--ink)" />
      <circle cx="88" cy="72" r="4.2" fill="var(--ink)" />
      <circle cx="59.5" cy="70.5" r="1.3" fill="var(--paper)" />
      <circle cx="89.5" cy="70.5" r="1.3" fill="var(--paper)" />
      <path d="M64 88 Q73 96 82 88" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="43" cy="88" rx="7" ry="4" fill="var(--pink)" opacity=".8" />
      <ellipse cx="103" cy="88" rx="7" ry="4" fill="var(--pink)" opacity=".8" />
      <path d="M112 30 L114 36 L120 38 L114 40 L112 46 L110 40 L104 38 L110 36 Z" fill="var(--butter)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M24 35 L25.5 39 L29.5 40.5 L25.5 42 L24 46 L22.5 42 L18.5 40.5 L22.5 39 Z" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.6" />
    </svg>
  );
}

export function SectionKicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`io-sticker-sm inline-flex items-center gap-2 rounded-full bg-(--paper) px-3.5 py-1.5 text-sm font-bold ${className}`}>
      <IoiMark className="h-4 w-4" />
      {children}
    </span>
  );
}

export function Sparkle({ className = "", color = "var(--butter)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1.5 L14.4 9.6 L22.5 12 L14.4 14.4 L12 22.5 L9.6 14.4 L1.5 12 L9.6 9.6 Z" fill={color} stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function GithubMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.2.8-.6v-2.3c-3.4.7-4.1-1.5-4.1-1.5-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.3 1.8 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.7 11.7 0 0 1 6.2 0c2.3-1.5 3.4-1.2 3.4-1.2.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.3 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}
