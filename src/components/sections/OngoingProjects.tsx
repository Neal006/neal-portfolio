"use client";
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ongoingWorks } from "@/data/portfolio";

type OngoingWork = (typeof ongoingWorks)[0];

function OngoingCard({ work, index }: { work: OngoingWork; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.1 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !spotlightRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    spotlightRef.current.style.background = `radial-gradient(320px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, ${work.accentColor}1A, transparent 65%)`;
  }, [work.accentColor]);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <a
        href={work.github}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          ref={containerRef}
          className="project-card"
          onMouseMove={handleMouseMove}
          style={{
            padding: "32px",
            background: "var(--bg-card)",
            border: `1px solid ${hovered ? work.accentColor : "var(--border)"}`,
            borderRadius: "var(--radius-md)",
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: hovered
              ? `0 0 0 1px ${work.accentColor}22, 0 20px 50px rgba(0,0,0,0.4)`
              : "none",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Spotlight */}
          <div
            ref={spotlightRef}
            className="project-card-spotlight"
            style={{ opacity: hovered ? 1 : 0 }}
          />

          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            {/* WIP badge */}
            <span
              className="inline-flex items-center gap-1.5"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.52rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: work.accentColor,
                border: `1px solid ${work.accentColor}`,
                borderRadius: "999px",
                padding: "4px 10px",
              }}
            >
              <span
                className="ongoing-border inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: work.accentColor }}
              />
              In Progress
            </span>

            {/* Year */}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-muted)" }}>
              {work.year}
            </span>
          </div>

          {/* Title */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                color: hovered ? work.accentColor : "var(--text)",
                transition: "color 0.3s",
                marginBottom: "10px",
              }}
            >
              {work.title}
            </h3>
            <motion.p
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                lineHeight: 1.7,
                color: "var(--text-muted)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "14px",
              }}
            >
              {work.description}
            </motion.p>
          </div>

          {/* Bottom */}
          <div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
              {work.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: hovered ? work.accentColor : "var(--text-muted)",
                    border: `1px solid ${hovered ? work.accentColor + "40" : "var(--border)"}`,
                    borderRadius: "2px",
                    padding: "3px 8px",
                    transition: "color 0.3s, border-color 0.3s",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {work.category}
              </span>
              <motion.span
                animate={{ x: hovered ? 4 : 0, color: hovered ? work.accentColor : "var(--text-muted)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ fontSize: "0.9rem" }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function OngoingProjects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      id="ongoing"
      style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "7rem", overflow: "hidden" }}
    >
      {/* Section header */}
      <div
        className="flex items-center justify-between px-6 md:px-10 mb-14"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          04 — Ongoing
        </span>
        <span
          className="inline-flex items-center gap-1.5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--accent-y)",
            border: "1px solid var(--accent-y)",
            borderRadius: "999px",
            padding: "3px 10px",
          }}
        >
          <span className="ongoing-border inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-y)" }} />
          {ongoingWorks.length} Building
        </span>
      </div>

      <div className="px-6 md:px-10">
        {/* Section title */}
        <div ref={headerRef} className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              color: "var(--text)",
            }}
          >
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={titleInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "block" }}
            >
              CURRENTLY
            </motion.span>
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={titleInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{ display: "block", WebkitTextStroke: "2px var(--text)", color: "transparent" }}
            >
              BUILDING
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:max-w-[28ch] text-sm"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", lineHeight: 1.7 }}
          >
            Active projects in development — shipping soon.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ongoingWorks.map((work, i) => (
            <OngoingCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
