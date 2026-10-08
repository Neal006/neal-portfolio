"use client";
import { motion } from "framer-motion";
import type { PointerEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/data/types";
import ProjectIndex from "./ProjectIndex";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Bento layout on a 6-col desktop grid: wide (4) / narrow (2) / half (3).
   Wide cards also show highlights. Tablet: wide cards span both columns. */
const LAYOUT = ["wide", "narrow", "narrow", "wide", "half", "half", "half", "half"] as const;
type Size = (typeof LAYOUT)[number];
const SPAN: Record<Size, string> = {
  wide: "md:col-span-2 lg:col-span-4",
  narrow: "lg:col-span-2",
  half: "lg:col-span-3",
};

function trackGlow(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function ProjectCard({ project: p, index, size }: { project: Project; index: number; size: Size }) {
  const link = p.homepage ?? p.repo ?? undefined;
  const wide = size === "wide";

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener"
      onPointerMove={trackGlow}
      data-cursor-label={p.homepage ? "Visit" : "Code"}
      className={`group glow-card relative flex min-h-[22rem] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-6 md:p-8 ${SPAN[size]}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      {/* pointer-follow wash + ghost index number */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,91,35,0.10), transparent 45%)" }}
      />
      <span
        aria-hidden
        className="display pointer-events-none absolute -bottom-6 -right-2 select-none text-[9rem] leading-none text-transparent md:text-[12rem]"
        style={{ WebkitTextStroke: "1px var(--border-strong)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-center justify-between gap-4">
        <span className="eyebrow">{p.category} · {p.year}</span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] transition-all duration-500 group-hover:rotate-45 group-hover:border-[var(--ember)] group-hover:bg-[var(--ember)] group-hover:text-black">
          ↗
        </span>
      </div>

      <div className="relative mt-8 flex flex-col gap-3">
        {p.award && <span className="chip w-fit max-w-full !whitespace-normal !leading-snug !border-[var(--ember)] !text-[var(--ember)]">★ {p.award}</span>}
        <h3 className={`font-medium leading-[0.95] tracking-[-0.045em] ${wide ? "text-[clamp(2.4rem,4.5vw,4rem)]" : "text-[clamp(2rem,3vw,2.75rem)]"}`}>
          {p.title}
        </h3>
        <p className="serif max-w-xl text-[1.2rem] leading-snug text-[var(--text-muted)] md:text-[1.35rem]">{p.tagline}</p>
      </div>

      {wide && p.highlights.length > 0 && (
        <ul className="relative mt-6 hidden max-w-2xl space-y-2 text-[0.95rem] leading-relaxed text-[var(--text-muted)] md:block">
          {p.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-[0.65em] h-px w-4 shrink-0 bg-[var(--ember)]" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-auto flex flex-wrap items-end justify-between gap-6 pt-10">
        {p.metric && (
          <div>
            <div className="display text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--text)]">{p.metric.value}</div>
            <div className="eyebrow mt-1 max-w-[16rem]">{p.metric.label}</div>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {p.stack.slice(0, wide ? 5 : 3).map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="wrap">
        <SectionHeader
          index="01"
          label="Selected work"
          title="Things I've"
          accent="shipped."
          aside="A few favourites I'm proud of. Everything else (side projects, hackathons and experiments) lives in the index below."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} size={LAYOUT[i % LAYOUT.length]} />
          ))}
        </div>
      </div>
      <ProjectIndex />
    </section>
  );
}
