"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { projectCategories, projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/types";

const INITIAL_ROWS = 14;
const EASE = [0.16, 1, 0.3, 1] as const;
type Filter = "All" | ProjectCategory;

function Row({ p, open, onToggle }: { p: Project; open: boolean; onToggle: () => void }) {
  const panelId = `proj-${p.slug}`;
  return (
    <li className="group border-b border-[var(--border)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        data-cursor-label={open ? "Close" : "Open"}
        className="relative grid w-full grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-5 text-left md:grid-cols-[5rem_2fr_1.2fr_1.6fr_2rem] md:py-6"
      >
        <span className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-[var(--ember)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
        <span className="eyebrow tabular-nums">{p.year}</span>
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-[-0.03em] transition-colors group-hover:text-[var(--ember)]">
            {p.title}
          </span>
          {p.private && <span className="chip !py-0.5">Private</span>}
          {p.award && <span className="chip !py-0.5 !text-[var(--ember)]">★ Award</span>}
        </span>
        <span className="eyebrow hidden md:block">{p.category}</span>
        <span className="hidden truncate text-sm text-[var(--text-muted)] md:block">{p.stack.slice(0, 3).join(" · ")}</span>
        <span className={`text-xl transition-transform duration-500 ${open ? "rotate-45 text-[var(--ember)]" : ""}`} aria-hidden>
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-[5rem_2fr_2.8fr_2rem]">
              <span className="hidden md:block" />
              <div>
                <p className="serif text-xl leading-snug">{p.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-4 eyebrow">
                  {p.homepage && <a className="link-u !text-[var(--ember)]" href={p.homepage} target="_blank" rel="noopener">Live ↗</a>}
                  {p.repo && <a className="link-u !text-[var(--text)]" href={p.repo} target="_blank" rel="noopener">Source ↗</a>}
                  {!p.repo && <span>Private repository</span>}
                </div>
              </div>
              <div className="space-y-5 text-[var(--text-muted)] leading-relaxed">
                <p>{p.description}</p>
                {p.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3"><span className="text-[var(--ember)]">→</span>{h}</li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const counts = useMemo(() => {
    const c = new Map<Filter, number>([["All", projects.length]]);
    for (const p of projects) c.set(p.category, (c.get(p.category) ?? 0) + 1);
    return c;
  }, []);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_ROWS);

  return (
    <div className="wrap mt-28 md:mt-40">
      <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h3 className="text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-none tracking-[-0.045em]">
          The full <span className="serif text-[var(--ember)]">index</span>
          <sup className="eyebrow ml-2 align-top">({projects.length})</sup>
        </h3>
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {(["All", ...projectCategories] as Filter[]).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => { setFilter(f); setOpenSlug(null); }}
              className={`chip transition-colors ${filter === f ? "!border-[var(--ember)] !bg-[var(--ember)] !text-black" : "hover:!text-[var(--text)]"}`}
            >
              {f} <span className="opacity-60">{counts.get(f) ?? 0}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <ul className="border-t border-[var(--border)]">
        {visible.map((p) => (
          <Row key={p.slug} p={p} open={openSlug === p.slug} onToggle={() => setOpenSlug(openSlug === p.slug ? null : p.slug)} />
        ))}
      </ul>

      {filtered.length > INITIAL_ROWS && (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setExpanded((e) => !e)} className="chip !px-6 !py-3 hover:!text-[var(--text)]">
            {expanded ? "Show fewer" : `Show all ${filtered.length} projects`}
          </button>
        </div>
      )}
    </div>
  );
}
