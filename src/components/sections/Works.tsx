"use client";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { works } from "@/data/portfolio";

const IMAGE_MAP: Record<string, string> = {
  w1: "/proofs/luminai.jpeg",
  w2: "/proofs/spectrascann.png",
  w4: "/proofs/research.png",
  w5: "/proofs/visualsearch.png",
  w6: "/proofs/chefx.png",
  w7: "/proofs/tfd.jpeg",
  w8: "/proofs/mzhub.png",
};

const ACCENT_MAP: Record<string, string> = {
  w9:  "#F55036",
  w10: "#4AF0F0",
  w11: "#8B5CF6",
};

type Work = (typeof works)[0];

/* ─────────────────────────────────────────
   WorkCard — grid tile with spotlight effect
   Clicks navigate to /works/[id]
───────────────────────────────────────── */
function WorkCard({ work, index }: { work: Work; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.1 });
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT_MAP[work.id] ?? "var(--accent-y)";
  const accentHex = ACCENT_MAP[work.id] ?? "#E50020";
  const image = IMAGE_MAP[work.id] ?? null;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !spotlightRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      spotlightRef.current.style.background = `radial-gradient(360px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, ${accentHex}18, transparent 65%)`;
    },
    [accentHex]
  );

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
    >
      <Link href={`/works/${work.id}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          ref={containerRef}
          className="project-card group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: "28px",
            background: "var(--bg-card)",
            border: `1px solid ${hovered ? accent : "var(--border)"}`,
            borderRadius: "var(--radius-md)",
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: hovered
              ? `0 0 0 1px ${accentHex}20, 0 20px 50px rgba(0,0,0,0.4)`
              : "none",
            minHeight: "280px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Spotlight layer */}
          <div
            ref={spotlightRef}
            className="project-card-spotlight"
            style={{ opacity: hovered ? 1 : 0 }}
          />

          {/* Top row: index + thumbnail */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: hovered ? accent : "var(--text-muted)",
                transition: "color 0.3s",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Thumbnail */}
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                border: `1px solid ${hovered ? accentHex + "60" : "var(--border)"}`,
                transition: "border-color 0.3s",
                flexShrink: 0,
                position: "relative",
                background: image ? "transparent" : `${accentHex}12`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {image ? (
                <Image
                  src={image}
                  alt={`${work.title} — ${work.category} project preview`}
                  fill
                  sizes="52px"
                  className="object-cover"
                  quality={60}
                />
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    color: `${accentHex}70`,
                    lineHeight: 1,
                  }}
                >
                  {work.title[0]}
                </span>
              )}
            </div>
          </div>

          {/* Title + description reveal */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                color: hovered ? accent : "var(--text)",
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
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "14px",
              }}
            >
              {work.description}
            </motion.p>
          </div>

          {/* Bottom: tags + category + arrow */}
          <div>
            <div
              style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}
            >
              {work.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: hovered ? accent : "var(--text-muted)",
                    border: `1px solid ${hovered ? accentHex + "40" : "var(--border)"}`,
                    borderRadius: "2px",
                    padding: "3px 8px",
                    transition: "color 0.3s, border-color 0.3s",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
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
                animate={{ x: hovered ? 4 : 0, color: hovered ? accent : "var(--text-muted)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ fontSize: "0.9rem", display: "block" }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Works section
───────────────────────────────────────── */
export default function Works() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      id="works"
      style={{
        background: "var(--bg)",
        paddingTop: "7rem",
        paddingBottom: "7rem",
        overflow: "hidden",
      }}
    >
      <p className="sr-only">
        Neal Daftary&apos;s AI and ML projects include: SOLV.ai — AI voice complaint management
        using ONNX DistilBERT-MNLI and MiniLM-L6; Production RAG Chatbot for IAT Networks using
        ChromaDB and Groq with 4-layer guardrails; MemoryLens — LLM memory decay benchmark with
        5.45× recall improvement; SpectraScan — AI paint defect detection, 4th National at
        Mitsubishi Electric Cup 2026; Lumin.AI — solar inverter predictive maintenance, HACKaMINeD
        2026 national winner; Visual Search Engine at 8xSports at 645ms; CatBoost anomaly
        detection published in IEEE Sensors Letters.
      </p>

      {/* Section header */}
      <div
        className="flex items-center justify-between px-6 md:px-10 mb-14"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          03 — Works
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {works.length} Projects
        </span>
      </div>

      <div className="px-6 md:px-10">
        {/* Section title */}
        <div
          ref={headerRef}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 10vw, 9rem)",
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
              SELECTED
            </motion.span>
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={titleInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{
                display: "block",
                WebkitTextStroke: "2px var(--text)",
                color: "transparent",
              }}
            >
              WORKS
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:max-w-[28ch] text-sm"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}
          >
            AI systems, research, and full-stack products shipped in production — across computer
            vision, LLM infrastructure, and web engineering.
          </motion.p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
