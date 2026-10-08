"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "@/components/animations/CountUp";
import { personal } from "@/data/profile";
import { useIntroDone } from "@/hooks/useIntro";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

export interface HeroStats {
  contributions: number;
  mergedPrs: number;
  orgs: number;
  repos: number;
}

function useClock(timeZone: string): string {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}

function Letters({ word, className, delay, play }: { word: string; className?: string; delay: number; play: boolean }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.06em] ${className ?? ""}`} aria-hidden>
      {[...word].map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "108%" }}
          animate={play ? { y: "0%" } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function FadeIn({ children, delay, play, className }: { children: React.ReactNode; delay: number; play: boolean; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={play ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({ stats }: { stats: HeroStats }) {
  const play = useIntroDone();
  const time = useClock(personal.timezone);
  const counters = [
    { value: stats.contributions, label: "GitHub contributions" },
    { value: stats.mergedPrs, label: "PRs merged upstream" },
    { value: stats.orgs, label: "orgs contributed to" },
    { value: stats.repos, label: "public repositories" },
  ];

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <HeroCanvas />

      <div className="wrap grid grid-cols-2 gap-6 pt-28 md:grid-cols-4 md:pt-32">
        <FadeIn play={play} delay={0.5} className="eyebrow">
          <span className="block text-[var(--text-faint)]">Role</span>
          <span className="text-[var(--text)]">{personal.role}</span>
        </FadeIn>
        <FadeIn play={play} delay={0.6} className="eyebrow">
          <span className="block text-[var(--text-faint)]">Based in</span>
          <span className="text-[var(--text)]">Ahmedabad, IN · <span className="tabular-nums">{time}</span> IST</span>
        </FadeIn>
        <FadeIn play={play} delay={0.7} className="eyebrow">
          <span className="block text-[var(--text-faint)]">Currently</span>
          <span className="inline-flex items-center gap-2 text-[var(--text)]">
            <span className="pulse-dot" /> {personal.status}
          </span>
        </FadeIn>
        <FadeIn play={play} delay={0.8} className="eyebrow md:text-right">
          <span className="block text-[var(--text-faint)]">Also</span>
          <span className="text-[var(--text)]">Chair, ACM Nirma</span>
        </FadeIn>
      </div>

      <div className="wrap mt-auto pb-8 md:pb-10">
        <h1 className="display text-[clamp(4.6rem,24vw,19.5rem)] md:text-[clamp(4.6rem,19vw,19.5rem)]">
          <span className="sr-only">{personal.name} — {personal.role}</span>
          <span className="flex items-end justify-between gap-8">
            <Letters word={personal.first} delay={0.05} play={play} />
            <FadeIn play={play} delay={0.9} className="hidden max-w-[24rem] pb-[2.2vw] text-base font-normal leading-relaxed tracking-normal text-[var(--text-muted)] lg:block">
              {personal.pitch}
            </FadeIn>
          </span>
          {/* extra bottom padding keeps the italic "y" descender inside the reveal mask */}
          <Letters word={personal.last} delay={0.2} play={play} className="serif -mt-[0.1em] -mb-[0.16em] !pb-[0.22em] pr-[0.08em] text-[var(--ember)]" />
        </h1>

        <FadeIn play={play} delay={0.9} className="mt-6 max-w-md text-[var(--text-muted)] leading-relaxed lg:hidden">
          {personal.pitch}
        </FadeIn>

        <FadeIn play={play} delay={1.05} className="mt-10 grid grid-cols-2 border-t border-[var(--border)] md:grid-cols-4">
          {counters.map((c) => (
            <div key={c.label} className="border-b border-[var(--border)] py-5 pr-4 md:border-b-0">
              <CountUp value={String(c.value)} className="display block text-[clamp(2rem,4vw,3.5rem)] tabular-nums" />
              <span className="eyebrow">{c.label}</span>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
