"use client";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { orgName } from "@/lib/github/config";

const MANIFESTO =
  "I treat production as the only benchmark that counts. I ship AI products end to end — models, APIs, queues, clusters — and when the libraries underneath them break, I fix them upstream. My code runs at Curriculo and has been merged into Google DeepMind, Hugging Face, OpenCV, Anthropic and Cloudflare.";
const EMPHASIS = new Set(["production", "upstream.", "end", "Google", "DeepMind,", "Hugging", "Face,", "OpenCV,", "Anthropic", "Cloudflare."]);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const scrubbed = useTransform(progress, range, [0.18, 1]);
  const reduced = useReducedMotion();
  const opacity = reduced ? 1 : scrubbed; // no scroll-scrub for reduced motion
  const serif = EMPHASIS.has(word);
  return (
    <motion.span style={{ opacity }} className={serif ? "serif text-[var(--ember)]" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

export default function Manifesto({ orgs }: { orgs: { owner: string; avatar: string }[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = MANIFESTO.split(" ");
  const loop = [...orgs, ...orgs];

  return (
    <section aria-label="About" className="relative py-24 md:py-40">
      <div className="mb-24 overflow-hidden border-y border-[var(--border)] py-6 md:mb-40">
        <div className="marquee items-center gap-14 pr-14">
          {loop.map((o, i) => (
            <span key={`${o.owner}-${i}`} className="flex shrink-0 items-center gap-4" aria-hidden={i >= orgs.length}>
              <span className="eyebrow text-[var(--text-faint)]">Merged into</span>
              {o.avatar && (
                <Image src={o.avatar} alt="" width={36} height={36} className="rounded-md grayscale" />
              )}
              <span className="display text-[clamp(1.6rem,3vw,2.6rem)] tracking-tight">{orgName(o.owner)}</span>
              <span className="text-[var(--ember)]">✺</span>
            </span>
          ))}
        </div>
      </div>

      <div className="wrap grid grid-cols-1 gap-10 md:grid-cols-[1fr_3fr]">
        <span className="eyebrow pt-3">(About)</span>
        <p ref={ref} className="text-[clamp(1.75rem,4.2vw,4rem)] font-medium leading-[1.08] tracking-[-0.035em]">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
