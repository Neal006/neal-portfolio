"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education, responsibilities, research } from "@/data/portfolio";

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const pubRef = useRef<HTMLDivElement>(null);
  const pubInView = useInView(pubRef, { once: true, amount: 0.15 });

  return (
    <section
      id="education"
      ref={ref}
      style={{ background: "var(--bg-card)", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}
    >
      {/* ── Section header ── */}
      <div
        className="flex items-center justify-between px-6 md:px-10 mb-14"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          05 — Background
        </span>
      </div>

      {/* ── Education + Leadership ── */}
      <div className="px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-16 mb-20">

        {/* Education */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text)", marginBottom: "1.5rem" }}
          >
            EDUCATION
          </motion.h2>

          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              style={{ padding: "20px 24px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", marginBottom: "0.75rem", borderLeft: "3px solid var(--accent-y)" }}
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              <time style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.15em", color: "var(--accent-y)", textTransform: "uppercase" }}>
                {edu.period}
              </time>
              <h3 itemProp="educationalLevel" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginTop: "8px", lineHeight: 1.3 }}>
                {edu.institution}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px", lineHeight: 1.5 }}>
                {edu.degree}
              </p>
              {edu.grade && (
                <span style={{ display: "inline-block", marginTop: "10px", fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", color: "var(--accent-y)", border: "1px solid var(--accent-y)", borderRadius: "999px", padding: "3px 10px" }}>
                  {edu.grade}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Leadership */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text)", marginBottom: "1.5rem" }}
          >
            LEADERSHIP
          </motion.h2>

          {responsibilities.map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{ padding: "20px 24px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--accent-b)" }}
            >
              <time style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.15em", color: "var(--accent-b)", textTransform: "uppercase" }}>
                {pos.period}
              </time>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginTop: "8px" }}>
                {pos.role}
              </h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--accent-b)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
                {pos.organization}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.65, marginTop: "10px" }}>
                {pos.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PUBLICATIONS — redesigned to match reference
      ══════════════════════════════════════════ */}
      <div
        ref={pubRef}
        style={{ borderTop: "1px solid var(--border)", paddingTop: "5rem" }}
      >
        {/* Publications header row */}
        <div
          className="flex items-center justify-between px-6 md:px-10 mb-12"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            04 — Research
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            1 Publication
          </span>
        </div>

        <div className="px-6 md:px-10">
          {/* "PUBLICATIONS" large heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={pubInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              marginBottom: "3rem",
            }}
          >
            <span style={{ color: "var(--text)" }}>PUBLI</span>
            <span style={{ WebkitTextStroke: "2px var(--text)", color: "transparent" }}>CATIONS</span>
          </motion.h2>

          {/* Publication card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={pubInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            itemScope
            itemType="https://schema.org/ScholarlyArticle"
          >
            <a
              href={research.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  display: "flex",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent-y)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                }}
              >
                {/* Left accent bar */}
                <div style={{ width: "4px", background: "var(--accent-y)", flexShrink: 0 }} />

                {/* Content */}
                <div style={{ padding: "28px 32px", flex: 1, background: "var(--bg)", minWidth: 0 }}>
                  {/* Top row: journal + VIEW PAPER */}
                  <div className="flex items-start justify-between gap-4 mb-4" style={{ flexWrap: "wrap" }}>
                    <span
                      itemProp="isPartOf"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-y)" }}
                    >
                      {research.publication}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        flexShrink: 0,
                        transition: "color 0.2s",
                      }}
                    >
                      View Paper ↗
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    itemProp="name"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--text)", lineHeight: 1.4, marginBottom: "12px" }}
                  >
                    {research.title}
                  </h3>

                  {/* Description */}
                  <p
                    itemProp="abstract"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "24px", maxWidth: "70ch" }}
                  >
                    {research.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-8 mb-5">
                    {research.stats.map((s) => (
                      <div key={s.label}>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1, color: "var(--accent-p)", marginBottom: "4px" }}>
                          {s.value}
                        </p>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {research.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.52rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-sm)",
                          padding: "4px 10px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* ISRO ongoing research card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={pubInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            style={{ marginTop: "1rem", display: "flex", overflow: "hidden", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}
          >
            <div style={{ width: "4px", background: "var(--accent-b)", flexShrink: 0 }} />
            <div style={{ padding: "24px 28px", background: "var(--bg)", flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-b)" }}>
                ISRO — Ongoing · Chandrayaan-2
              </span>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.7, marginTop: "10px" }}>
                ISRO-funded undergraduate research at Nirma University: automated detection, segmentation, and morphometric analysis of lunar surface features (craters, rilles) on Chandrayaan-2 TMC-2 and OHRC imagery for mission planning.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
