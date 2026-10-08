"use client";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { achievements, education, leadership, publication, skills } from "@/data/profile";

export default function Recognition() {
  return (
    <section id="recognition" className="relative py-24 md:py-36">
      <div className="wrap">
        <SectionHeader index="05" label="Research & recognition" title="Proof," accent="not promises." />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="h-full">
            <a
              href={publication.url}
              target="_blank"
              rel="noopener"
              data-cursor-label="Read"
              className="group relative flex h-full flex-col justify-between gap-12 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--ember)] p-8 text-black md:p-12"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.14em] opacity-70">Publication · {publication.meta}</div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-[0.14em]">{publication.venue}</div>
                </div>
                <span className="text-3xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </div>
              <div>
                <h3 className="text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                  {publication.title}
                </h3>
                <p className="mt-5 max-w-xl leading-relaxed opacity-80">{publication.summary}</p>
              </div>
              <dl className="grid grid-cols-3 gap-4 border-t border-black/20 pt-6">
                {publication.stats.map((s) => (
                  <div key={s.label}>
                    <dd className="display text-[clamp(1.8rem,3.5vw,3rem)]">{s.value}</dd>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-70">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </a>
          </Reveal>

          <div className="flex flex-col gap-4">
            <ol className="flex-1 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] px-6 md:px-8">
              {achievements.map((a, i) => (
                <li key={a.title} className="border-b border-[var(--border)] py-6 last:border-b-0">
                  <Reveal delay={i * 0.06} y={14} className="flex gap-5">
                    <span className="eyebrow pt-1 text-[var(--ember)]">0{i + 1}</span>
                    <div>
                      <div className="text-xl font-medium tracking-[-0.02em]">{a.title}</div>
                      <div className="text-[var(--text-muted)]">{a.event}</div>
                      <div className="mt-1 text-sm text-[var(--text-faint)]">{a.detail}</div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-8">
            <div className="eyebrow mb-6">Leadership · {leadership.period}</div>
            <div className="text-3xl font-medium tracking-[-0.04em]">{leadership.role}</div>
            <div className="serif mt-1 text-xl text-[var(--text-muted)]">{leadership.org}</div>
            <p className="mt-5 leading-relaxed text-[var(--text-muted)]">{leadership.summary}</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-8">
            <div className="eyebrow mb-6">Education · {education.period}</div>
            <div className="text-3xl font-medium tracking-[-0.04em]">{education.school}</div>
            <div className="serif mt-1 text-xl text-[var(--text-muted)]">{education.degree}</div>
            <p className="mt-5 leading-relaxed text-[var(--text-muted)]">{education.detail} · {education.location}</p>
          </Reveal>
        </div>

        <div className="mt-28 md:mt-36">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <h3 className="text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-none tracking-[-0.045em]">
              The <span className="serif text-[var(--ember)]">toolkit</span>
            </h3>
          </Reveal>
          <div className="border-t border-[var(--border)]">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.04} y={14} className="grid grid-cols-1 gap-4 border-b border-[var(--border)] py-7 md:grid-cols-[14rem_1fr]">
                <span className="eyebrow pt-1.5">{g.group}</span>
                <p className="text-[clamp(1.15rem,2vw,1.6rem)] leading-snug tracking-[-0.02em]">
                  {g.items.map((s, j) => (
                    <span key={s}>
                      <span className="transition-colors hover:text-[var(--ember)]">{s}</span>
                      {/* real spaces give the line somewhere to wrap */}
                      {j < g.items.length - 1 && <> <span className="text-[var(--text-faint)]">/</span> </>}
                    </span>
                  ))}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
