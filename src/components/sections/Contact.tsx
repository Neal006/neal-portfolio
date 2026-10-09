"use client";
import { useState } from "react";
import MagneticButton from "@/components/animations/MagneticButton";
import { MaskText, Reveal } from "@/components/ui/Reveal";
import { personal } from "@/data/profile";

const COPIED_MS = 2000;

export default function Contact({ syncedAt }: { syncedAt: string }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const links = [
    { label: "GitHub", href: personal.githubUrl },
    { label: "LinkedIn", href: personal.linkedinUrl },
    { label: "Résumé", href: personal.resume },
    { label: "Email", href: `mailto:${personal.email}` },
  ];

  return (
    <section id="contact" className="relative overflow-hidden pt-28 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]"
        style={{ background: "radial-gradient(60% 70% at 50% 100%, rgba(255,91,35,0.22), transparent 70%)" }}
      />
      <div className="wrap">
        <Reveal className="mb-10 flex items-center gap-4">
          <span className="eyebrow" style={{ color: "var(--ember)" }}>(06)</span>
          <span className="eyebrow">Contact</span>
          <span className="hairline flex-1" />
        </Reveal>

        <h2 className="display text-[clamp(3.5rem,13vw,13rem)]">
          <MaskText text="Let's build" />
          <br />
          <MaskText text="something" delay={0.1} />{" "}
          <MaskText text="real." className="serif text-[var(--ember)]" delay={0.2} />
        </h2>

        <div className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-md text-lg leading-relaxed text-[var(--text-muted)]">
            Internships, open-source collabs, or a hard problem you want shipped? My inbox is open and I reply fast.
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticButton
              onClick={copyEmail}
              className="group flex max-w-full items-center gap-3 rounded-full bg-[var(--text)] px-5 py-4 text-black transition-colors hover:bg-[var(--ember)] sm:gap-4 sm:px-7 sm:py-5"
            >
              <span className="min-w-0 text-[0.9rem] font-medium [overflow-wrap:anywhere] tracking-[-0.02em] sm:text-lg md:text-xl" aria-live="polite">
                {copied ? "Copied to clipboard ✓" : personal.email}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[var(--text)] sm:h-9 sm:w-9">↗</span>
            </MagneticButton>
          </Reveal>
        </div>

        <ul className="mt-20 grid grid-cols-2 border-t border-[var(--border)] md:grid-cols-4">
          {links.map((l) => (
            <li key={l.label} className="border-b border-[var(--border)] md:border-b-0 md:border-r md:last:border-r-0">
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener"
                className="group flex items-center justify-between px-1 py-6 text-xl transition-colors hover:text-[var(--ember)] md:px-6"
              >
                {l.label}
                <span className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="flex flex-col gap-3 border-t border-[var(--border)] py-8 eyebrow md:flex-row md:items-center md:justify-between">
          <span>© {new Date(syncedAt).getUTCFullYear()} {personal.name} · {personal.location}</span>
          <span>
            Designed & engineered by hand · GitHub data synced{" "}
            {new Date(syncedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })}
          </span>
          <a href="#top" className="link-u !text-[var(--text)]">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
