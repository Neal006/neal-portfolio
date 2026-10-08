"use client";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience, LOR_URL } from "@/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="wrap">
        <SectionHeader
          index="04"
          label="Experience"
          title="Where I've"
          accent="worked."
          aside="Three remote internships, one theme: own the thing end to end and leave it faster, safer and in production."
        />

        <ol className="border-t border-[var(--border)]">
          {experience.map((job, i) => (
            <li key={job.company} className="group border-b border-[var(--border)]">
              <Reveal delay={i * 0.05} className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[12rem_1fr_1.25fr] md:gap-10 md:py-14">
                <div className="flex flex-col gap-2">
                  <span className="eyebrow !text-[var(--text)]">{job.period}</span>
                  <span className="eyebrow">{job.location}</span>
                  {job.current && (
                    <span className="mt-1 inline-flex items-center gap-2 eyebrow !text-[#3ddc84]">
                      <span className="pulse-dot" /> Now
                    </span>
                  )}
                </div>

                <div>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener"
                    data-cursor-label="Visit"
                    className="display inline-block text-[clamp(3rem,7vw,6.5rem)] transition-colors duration-500 group-hover:text-[var(--ember)]"
                  >
                    {job.company}
                  </a>
                  <p className="serif mt-3 text-2xl text-[var(--text-muted)]">{job.role}</p>
                </div>

                <div className="flex flex-col gap-6">
                  <ul className="space-y-3 text-[1.02rem] leading-relaxed text-[var(--text-muted)]">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-[var(--ember)]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {job.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                    {job.company === "8xSports" && (
                      <a href={LOR_URL} target="_blank" rel="noopener" className="chip !border-[var(--ember)] !text-[var(--ember)]">
                        Letter of Recommendation ↗
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
