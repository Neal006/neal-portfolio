"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-8% 0px -8% 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fade + rise into view, once. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

interface MaskTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

/** Each word slides up from behind a mask — the editorial headline reveal.
    The wrapper is what's observed: the words themselves start clipped by
    their masks, so an observer on them would never fire. */
export function MaskText({ text, className, delay = 0, stagger = 0.06 }: MaskTextProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      transition={{ delayChildren: delay, staggerChildren: stagger }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em]">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "115%" }, shown: { y: "0%" } }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
