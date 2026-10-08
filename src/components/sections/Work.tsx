"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredProjects, projects } from "@/data/projects";
import type { Project } from "@/data/types";
import ProjectArt from "./ProjectArt";
import ProjectIndex from "./ProjectIndex";

const STACK_OFFSET_REM = 1.1;
const SHRINK_PER_CARD = 0.035;

function trackGlow(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

interface CardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function FeaturedCard({ project: p, index, total, progress }: CardProps) {
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index) * SHRINK_PER_CARD]);
  const link = p.homepage ?? p.repo;

  return (
    <div className="sticky" style={{ top: `calc(5.5rem + ${index * STACK_OFFSET_REM}rem)` }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        onPointerMove={trackGlow}
        className="glow-card grid overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-card)] md:min-h-[72vh] md:grid-cols-[1.15fr_1fr]"
      >
        <div className="flex flex-col gap-6 p-6 md:p-10">
          <div className="flex items-center justify-between eyebrow">
            <span>
              <span className="text-[var(--ember)]">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
            </span>
            <span>{p.category} · {p.year}</span>
          </div>
          {p.award && (
            <span className="chip w-fit !border-[var(--ember)] !text-[var(--ember)]">★ {p.award}</span>
          )}
          <h3 className="display text-[clamp(2.6rem,6vw,5.5rem)]">{p.title}</h3>
          <p className="serif text-[clamp(1.25rem,2vw,1.75rem)] leading-snug text-[var(--text)]">{p.tagline}</p>
          <ul className="space-y-2.5 text-[0.95rem] leading-relaxed text-[var(--text-muted)]">
            {p.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-[0.6em] h-px w-4 shrink-0 bg-[var(--ember)]" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {p.stack.slice(0, 7).map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[18rem] border-t border-[var(--border)] md:border-l md:border-t-0">
          <div className="absolute inset-0"><ProjectArt slug={p.slug} /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
          {p.metric && (
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
              <div className="display text-[clamp(3.5rem,8vw,7.5rem)] text-[var(--text)]">{p.metric.value}</div>
              <div className="eyebrow mt-2">{p.metric.label}</div>
            </div>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener"
              data-cursor-label={p.homepage ? "Visit" : "Code"}
              className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg)]/60 text-xl backdrop-blur transition-colors hover:bg-[var(--ember)] hover:text-black md:right-10 md:top-10"
              aria-label={`Open ${p.title}`}
            >
              ↗
            </a>
          )}
        </div>
      </motion.article>
    </div>
  );
}

export default function Work() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });
  const shipped = projects.length;

  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="wrap">
        <SectionHeader
          index="01"
          label="Selected work"
          title="Things I've"
          accent="shipped."
          aside={
            <>
              Eight flagships out of <span className="text-[var(--text)]">{shipped} projects</span> — benchmarks on PyPI,
              CLIs on npm, hackathon winners and systems running on Kubernetes. Every one is real code on GitHub.
            </>
          }
        />
        <div ref={stackRef} className="flex flex-col gap-[12vh] pb-[6vh]">
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} total={featuredProjects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
      <ProjectIndex />
    </section>
  );
}
