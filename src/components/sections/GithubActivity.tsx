"use client";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState, type MouseEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import CountUp from "@/components/animations/CountUp";
import { personal } from "@/data/profile";
import { toWeekGrid, type LanguageSlice, type Streak } from "@/lib/github/stats";
import type { ContributionDay, ContributionYear } from "@/lib/github/types";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LEVELS = 4;

export interface ActivityStats {
  lifetime: number;
  longest: Streak;
  current: Streak;
  busiest: ContributionDay | null;
  activeDays: number;
}

interface GithubActivityProps {
  years: ContributionYear[];
  stats: ActivityStats;
  languages: LanguageSlice[];
  syncedAt: string;
  live: boolean;
}

const fmtDay = (date: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });

/** sqrt scaling so one huge day doesn't flatten every other day to level 1. */
function level(count: number, max: number): number {
  return count === 0 || max === 0 ? 0 : Math.max(1, Math.ceil(Math.sqrt(count / max) * LEVELS));
}

interface Tip { x: number; y: number; day: ContributionDay }

function Heatmap({ year }: { year: ContributionYear }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [tip, setTip] = useState<Tip | null>(null);
  const weeks = useMemo(() => toWeekGrid(year.days), [year]);
  const max = useMemo(() => Math.max(0, ...year.days.map((d) => d.count)), [year]);

  const monthStarts = weeks.map((w, i) => {
    const first = w.find((d) => d !== null);
    const prev = i > 0 ? weeks[i - 1].find((d) => d !== null) : null;
    const m = first ? Number(first.date.slice(5, 7)) - 1 : -1;
    const pm = prev ? Number(prev.date.slice(5, 7)) - 1 : -1;
    return m !== pm ? MONTHS[m] : null;
  });

  const onHover = (e: MouseEvent<HTMLDivElement>, day: ContributionDay) => {
    const host = ref.current?.getBoundingClientRect();
    const cell = e.currentTarget.getBoundingClientRect();
    const scrollX = ref.current?.scrollLeft ?? 0; // grid scrolls horizontally on small screens
    if (host) setTip({ x: cell.left - host.left + scrollX + cell.width / 2, y: cell.top - host.top, day });
  };

  return (
    <div ref={ref} className="relative -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-2" onMouseLeave={() => setTip(null)}>
      <div className="min-w-[720px]">
        <div className="mb-2 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}>
          {monthStarts.map((m, i) => (
            <span key={i} className="eyebrow !text-[0.6rem] whitespace-nowrap">{m ?? ""}</span>
          ))}
        </div>
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }} role="img"
          aria-label={`${year.total} contributions in ${year.year}`}>
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-rows-7 gap-[3px]">
              {week.map((day, di) =>
                day ? (
                  <motion.div
                    key={day.date}
                    className="heat aspect-square"
                    data-l={level(day.count, max)}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={inView ? { opacity: 1, scale: 1 } : undefined}
                    transition={{ duration: 0.5, ease: EASE, delay: wi * 0.012 + di * 0.02 }}
                    onMouseEnter={(e) => onHover(e, day)}
                  />
                ) : (
                  <div key={`pad-${di}`} className="aspect-square" />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      {tip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs"
          style={{ left: tip.x, top: tip.y }}
        >
          <span className="font-medium text-[var(--text)]">{tip.day.count} contribution{tip.day.count === 1 ? "" : "s"}</span>
          <span className="text-[var(--text-muted)]"> · {fmtDay(tip.day.date, { weekday: "short", month: "short", day: "numeric" })}</span>
        </div>
      )}
    </div>
  );
}

export default function GithubActivity({ years, stats, languages, syncedAt, live }: GithubActivityProps) {
  const ordered = [...years].sort((a, b) => b.year - a.year);
  const [selected, setSelected] = useState(ordered[0]?.year);
  const year = ordered.find((y) => y.year === selected) ?? ordered[0];
  const peak = Math.max(1, ...years.map((y) => y.total));
  if (!year) return null;

  const breakdown = [
    { label: "Commits", value: year.commits },
    { label: "Pull requests", value: year.pullRequests },
    { label: "Issues", value: year.issues },
    { label: "Repos created", value: year.reposCreated },
    { label: "Private", value: year.privateContributions },
  ];
  const tiles = [
    { label: "Lifetime contributions", value: stats.lifetime.toLocaleString("en-US") },
    { label: "Longest streak", value: `${stats.longest.length}d`, note: stats.longest.start ? `${fmtDay(stats.longest.start, { month: "short", day: "numeric" })} → ${fmtDay(stats.longest.end ?? stats.longest.start, { month: "short", day: "numeric" })}` : "" },
    { label: "Current streak", value: `${stats.current.length}d` },
    { label: "Best day", value: String(stats.busiest?.count ?? 0), note: stats.busiest ? fmtDay(stats.busiest.date) : "" },
    { label: "Active days", value: String(stats.activeDays) },
  ];

  return (
    <section id="activity" className="relative py-24 md:py-36">
      <div className="wrap">
        <SectionHeader
          index="03"
          label="GitHub activity"
          title="Commit"
          accent="history."
          aside={
            <>
              Pulled straight from{" "}
              <a href={personal.githubUrl} target="_blank" rel="noopener" className="link-u text-[var(--text)]">github.com/{personal.github}</a>
              {live ? " and refreshed every few hours." : "."} From one contribution in 2024 to over a thousand this year.
            </>
          }
        />

        <Reveal className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-5 md:p-10">
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="display text-[clamp(3.5rem,8vw,7rem)]">
                <CountUp key={year.year} value={String(year.total)} />
              </div>
              <div className="eyebrow mt-3">contributions in {year.year}</div>
            </div>
            <div role="group" aria-label="Year" className="flex gap-2">
              {ordered.map((y) => (
                <button
                  key={y.year}
                 
                  aria-pressed={y.year === year.year}
                  onClick={() => setSelected(y.year)}
                  className={`chip !px-4 !py-2 transition-colors ${y.year === year.year ? "!border-[var(--ember)] !bg-[var(--ember)] !text-black" : "hover:!text-[var(--text)]"}`}
                >
                  {y.year}
                </button>
              ))}
            </div>
          </div>

          <Heatmap key={year.year} year={year} />

          <div className="mt-6 flex flex-col gap-6 border-t border-[var(--border)] pt-6 md:flex-row md:items-center md:justify-between">
            <dl className="flex flex-wrap gap-x-8 gap-y-3">
              {breakdown.map((b) => (
                <div key={b.label} className="flex flex-row-reverse items-baseline justify-end gap-2">
                  <dt className="eyebrow">{b.label}</dt>
                  <dd className="text-lg font-medium tabular-nums">{b.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex items-center gap-2 eyebrow">
              Less
              {[0, 1, 2, 3, 4].map((l) => <span key={l} className="heat h-3 w-3" data-l={l} />)}
              More
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
            {tiles.map((t) => (
              <div key={t.label} className="bg-[var(--bg-card)] p-6">
                <div className="display text-[clamp(2.2rem,4vw,3.25rem)]">{t.value}</div>
                <div className="eyebrow mt-1">{t.label}</div>
                {t.note && <div className="mt-1 text-xs text-[var(--text-faint)]">{t.note}</div>}
              </div>
            ))}
            <div className="flex flex-col justify-end bg-[var(--bg-card)] p-6">
              <div className="flex h-20 items-end gap-2">
                {[...years].sort((a, b) => a.year - b.year).map((y) => (
                  <div key={y.year} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                    <motion.div
                      className="w-full rounded-sm bg-[var(--ember)]"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${Math.max(3, (y.total / peak) * 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: EASE }}
                    />
                    <span className="eyebrow !text-[0.6rem]">{String(y.year).slice(2)}</span>
                  </div>
                ))}
              </div>
              <div className="eyebrow mt-2">Year over year</div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <div className="eyebrow mb-5">Languages across public repos</div>
            <div className="mb-6 flex h-3 overflow-hidden rounded-full">
              {languages.map((l) => (
                <motion.span
                  key={l.name}
                  title={`${l.name} ${l.pct.toFixed(1)}%`}
                  style={{ background: l.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: EASE }}
                />
              ))}
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                  <span className="flex-1">{l.name}</span>
                  <span className="tabular-nums text-[var(--text-muted)]">{l.pct.toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <p className="eyebrow mt-6 !text-[0.62rem] text-[var(--text-faint)]">
          Synced {new Date(syncedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })} ·{" "}
          {live ? "live GitHub GraphQL" : "snapshot"} · private contributions are counted, never shown
        </p>
      </div>
    </section>
  );
}
