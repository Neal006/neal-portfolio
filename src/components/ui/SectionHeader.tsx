"use client";
import type { ReactNode } from "react";
import { MaskText, Reveal } from "./Reveal";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  /** Rendered in italic serif after the title. */
  accent?: string;
  aside?: ReactNode;
}

export function SectionHeader({ index, label, title, accent, aside }: SectionHeaderProps) {
  return (
    <header className="mb-14 md:mb-20">
      <Reveal className="flex items-center gap-4 mb-8">
        <span className="eyebrow" style={{ color: "var(--ember)" }}>({index})</span>
        <span className="eyebrow">{label}</span>
        <span className="hairline flex-1" />
      </Reveal>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="section-title">
          <MaskText text={title} />
          {accent && (
            <>
              {" "}
              <MaskText text={accent} className="serif" delay={0.15} />
            </>
          )}
        </h2>
        {aside && <Reveal delay={0.2} className="md:max-w-sm text-[var(--text-muted)] leading-relaxed">{aside}</Reveal>}
      </div>
    </header>
  );
}
