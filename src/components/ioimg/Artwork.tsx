import { useId } from "react";

/** A cute little landscape used as the “master image” in demos. */
export function Artwork({ className = "", alt = "A pastel landscape with a smiling sun" }: { className?: string; alt?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 320 200" className={className} role="img" aria-label={alt}>
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFE8FF" />
          <stop offset="62%" stopColor="#FFD9E7" />
          <stop offset="100%" stopColor="#FFE9B8" />
        </linearGradient>
        <linearGradient id={`hill-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9BEBCB" />
          <stop offset="100%" stopColor="#5CC9A7" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" rx="18" fill={`url(#sky-${id})`} />
      <circle cx="252" cy="52" r="24" fill="#FFE36E" stroke="#1B1720" strokeWidth="3" />
      <path d="M239 49 Q245 43 251 49" fill="none" stroke="#1B1720" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M253 49 Q259 43 265 49" fill="none" stroke="#1B1720" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M246 58 Q252 63 258 58" fill="none" stroke="#1B1720" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-10 150 C40 100, 82 108, 126 142 C160 168, 190 126, 230 118 C266 111, 300 132, 330 150 L330 210 L-10 210 Z" fill={`url(#hill-${id})`} stroke="#1B1720" strokeWidth="3" />
      <path d="M-10 174 C50 142, 88 154, 122 174 C166 200, 208 158, 252 156 C286 155, 310 166, 330 176 L330 210 L-10 210 Z" fill="#C9B8FF" stroke="#1B1720" strokeWidth="3" />
      <g fill="#FFF7F1" stroke="#1B1720" strokeWidth="2">
        <ellipse cx="62" cy="54" rx="20" ry="10" />
        <ellipse cx="80" cy="54" rx="14" ry="8" />
        <ellipse cx="176" cy="34" rx="15" ry="8" />
        <ellipse cx="190" cy="34" rx="10" ry="6" />
      </g>
      <g fill="#FF7A59" stroke="#1B1720" strokeWidth="2">
        <circle cx="84" cy="171" r="6" />
        <circle cx="96" cy="171" r="6" />
        <circle cx="90" cy="163" r="6" />
      </g>
      <path d="M206 180 L212 166 L218 180 Z" fill="#FFE36E" stroke="#1B1720" strokeWidth="2" strokeLinejoin="round" />
      <path d="M228 182 L234 170 L240 182 Z" fill="#FFA7C4" stroke="#1B1720" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
