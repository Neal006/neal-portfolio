import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import CountUp from "@/components/animations/CountUp";
import { ossHighlights } from "@/data/profile";
import { orgName } from "@/lib/github/config";
import type { OpenSourceSummary } from "@/lib/github/stats";
import type { PrState, PullRequest } from "@/lib/github/types";

const STATE_STYLE: Record<PrState, { label: string; className: string }> = {
  MERGED: { label: "Merged", className: "bg-[var(--ember)] text-black" },
  OPEN: { label: "Open", className: "border border-[var(--border-strong)] text-[var(--text)]" },
  CLOSED: { label: "Closed", className: "border border-[var(--border)] text-[var(--text-faint)]" },
};

function formatStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n);
}

function monthKey(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

function groupByMonth(prs: readonly PullRequest[]): [string, PullRequest[]][] {
  const groups = new Map<string, PullRequest[]>();
  for (const p of prs) groups.set(monthKey(p.createdAt), [...(groups.get(monthKey(p.createdAt)) ?? []), p]);
  return [...groups.entries()];
}

interface OpenSourceProps {
  summary: OpenSourceSummary;
  prs: PullRequest[];
}

export default function OpenSource({ summary, prs }: OpenSourceProps) {
  const months = groupByMonth(prs);
  const stats = [
    { value: summary.merged, label: "PRs merged" },
    { value: summary.total, label: "PRs opened" },
    { value: summary.orgs.length, label: "Organisations" },
  ];

  return (
    <section id="upstream" className="relative py-24 md:py-36">
      <div className="wrap">
        <SectionHeader
          index="02"
          label="Open source"
          title="Merged"
          accent="upstream."
          aside={
            <>
              I read other people&apos;s code for fun, then fix it. Public PRs into repos with a combined{" "}
              <span className="text-[var(--text)]">{formatStars(summary.mergedRepoStars)}★</span>, reviewed and merged by
              their maintainers.
            </>
          }
        />

        <Reveal className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[var(--bg)] p-6 md:p-8">
              <CountUp value={String(s.value)} className="display block text-[clamp(2.75rem,5vw,4.5rem)]" />
              <span className="eyebrow">{s.label}</span>
            </div>
          ))}
          <div className="bg-[var(--bg)] p-6 md:p-8">
            <span className="display block text-[clamp(2.75rem,5vw,4.5rem)] text-[var(--ember)]">
              {formatStars(summary.mergedRepoStars)}★
            </span>
            <span className="eyebrow">Stars of repos merged into</span>
          </div>
        </Reveal>

        <div className="mb-28 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ossHighlights.map((h, i) => (
            <Reveal key={h.project} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col gap-5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-colors duration-500 hover:border-[var(--ember)]">
                <div className="flex items-center justify-between eyebrow">
                  <span>{h.org}</span>
                  <span className="text-[var(--ember)]">{h.prs.length} PR{h.prs.length > 1 ? "s" : ""}</span>
                </div>
                <h3 className="text-3xl font-medium tracking-[-0.04em]">{h.project}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">{h.summary}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {h.prs.map((pr) => (
                    <a key={pr.number} href={pr.url} target="_blank" rel="noopener" className="chip hover:!border-[var(--ember)] hover:!text-[var(--ember)]">
                      #{pr.number}
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <h3 className="mb-2 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.045em]">
                The <span className="serif text-[var(--ember)]">journey</span>
              </h3>
              <p className="mb-8 text-[var(--text-muted)]">Every public pull request, live from GitHub.</p>
            </Reveal>
            <ol className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {summary.orgs.map((o, i) => (
                <li key={o.owner}>
                  <Reveal delay={i * 0.03} y={12} className="flex items-center gap-4 py-3">
                    {o.avatar ? (
                      <Image src={o.avatar} alt="" width={32} height={32} className="rounded-md" />
                    ) : (
                      <span className="h-8 w-8 rounded-md bg-[var(--bg-elevated)]" />
                    )}
                    <span className="flex-1 truncate font-medium">{orgName(o.owner)}</span>
                    <span className="eyebrow tabular-nums">{formatStars(o.stars)}★</span>
                    <span className="eyebrow w-16 text-right tabular-nums text-[var(--text)]">
                      {o.merged}/{o.total}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
            <p className="eyebrow mt-3 text-right">merged / opened</p>
          </div>

          <ol className="relative border-l border-[var(--border)] pl-6 md:pl-10">
            {months.map(([month, list]) => (
              <li key={month} className="mb-12 last:mb-0">
                <Reveal y={16} className="relative mb-5">
                  <span className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-[var(--ember)] md:-left-[2.85rem]" />
                  <span className="eyebrow !text-[var(--text)]">{month}</span>
                  <span className="eyebrow ml-3">{list.length} PR{list.length > 1 ? "s" : ""}</span>
                </Reveal>
                <ul className="space-y-1">
                  {list.map((p) => (
                    <li key={p.url}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener"
                        className="group -mx-3 grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 rounded-md px-3 py-2.5 transition-colors hover:bg-[var(--bg-card)]"
                      >
                        <span className="text-[0.95rem] leading-snug text-[var(--text-muted)] transition-colors group-hover:text-[var(--text)]">
                          {p.title}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STATE_STYLE[p.state].className}`}>
                          {STATE_STYLE[p.state].label}
                        </span>
                        <span className="eyebrow col-span-2 !text-[0.62rem]">
                          {p.repo} #{p.number}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
