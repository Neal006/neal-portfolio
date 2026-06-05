"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { personal, stats } from "@/data/portfolio";

const ROLES = ["AI Engineer", "CV Specialist", "RAG Architect", "IEEE Researcher", "Open to Work"];

export default function Hero() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [chars, setChars] = useState(ROLES[0].length);
  const [deleting, setDeleting] = useState(false);

  /* Typewriter */
  useEffect(() => {
    const role = ROLES[roleIdx];
    const t = setTimeout(
      () => {
        if (!deleting && chars < role.length) {
          setChars((c) => c + 1);
        } else if (!deleting && chars === role.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && chars > 0) {
          setChars((c) => c - 1);
        } else if (deleting && chars === 0) {
          setDeleting(false);
          setRoleIdx((r) => (r + 1) % ROLES.length);
        }
      },
      deleting ? 45 : 80
    );
    return () => clearTimeout(t);
  }, [chars, deleting, roleIdx]);

  /* GSAP intro */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power4.out", delay: 0.1 }
      );
      gsap.fromTo(
        ".hero-meta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power3.out", delay: 0.7 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col"
      style={{ background: "var(--bg)", minHeight: "100vh", overflow: "hidden" }}
    >
      {/* ── Keyword-rich machine-readable summary (hidden, crawlable) ── */}
      <p className="sr-only">
        Neal Daftary is an AI and Machine Learning Engineer and undergraduate researcher at
        Nirma University, Ahmedabad, India, pursuing B.Tech in CSE (Artificial Intelligence &amp;
        Machine Learning). He specialises in Computer Vision, Large Language Model engineering,
        RAG pipeline architecture, and production AI system deployment. Neal interned as an AI
        Engineer at 8xSports, building a 645ms visual jersey search engine with YOLOv8, DINOv2,
        and FAISS. He interned as an AI Software Engineer at MZHub Faithtech, shipping a Next.js
        web platform with Azure Cosmos DB. He is currently an ISRO-funded undergraduate researcher
        at Nirma University, developing deep learning pipelines on Chandrayaan-2 TMC-2 and OHRC
        lunar imagery. He is a published IEEE Sensors Letters author (2026), Student Chairperson
        of ACM ITNU, and national hackathon winner at HACKaMINeD 2026.
      </p>
      {/* Top status bar */}
      <div
        className="hero-meta absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-10"
        style={{ marginTop: "80px", opacity: 0 }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent-y)",
              border: "1px solid var(--accent-y)",
              padding: "4px 12px",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent-y)" }}
            />
            Available for work
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Ahmedabad, India — {new Date().getFullYear()}
        </p>
      </div>

      {/* Main headline block */}
      <div
        className="flex-1 flex flex-col justify-center px-6 md:px-10 pt-28 pb-8"
        style={{ gap: "0" }}
      >
        {/* Single h1 — two visually distinct spans for SEO + design */}
        <h1
          ref={headRef}
          style={{ margin: 0, padding: 0, fontWeight: "inherit", lineHeight: 1 }}
        >
          <div style={{ overflow: "hidden" }}>
            <span
              className="hero-line"
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(5.5rem, 20vw, 18rem)",
                lineHeight: 0.88,
                letterSpacing: "0.01em",
                color: "var(--text)",
                opacity: 0,
              }}
            >
              NEAL
            </span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <span
              className="hero-line"
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(5.5rem, 20vw, 18rem)",
                lineHeight: 0.88,
                letterSpacing: "0.01em",
                color: "transparent",
                WebkitTextStroke: "2px var(--text)",
                opacity: 0,
              }}
            >
              DAFTARY
            </span>
          </div>
        </h1>

        {/* Divider row */}
        <div
          className="hero-meta flex items-center justify-between mt-8 md:mt-10"
          style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", opacity: 0 }}
        >
          {/* Typewriter role */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              minWidth: "220px",
            }}
          >
            {ROLES[roleIdx].slice(0, chars)}
            <span
              className="inline-block w-px h-3 ml-0.5 align-middle animate-pulse"
              style={{ background: "var(--accent-y)" }}
            />
          </div>

          {/* Stats row */}
          <div className="hidden md:flex items-center gap-10">
            {stats.map((s) => (
              <div key={s.label} className="text-right">
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    lineHeight: 1,
                    color: "var(--accent-y)",
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              writingMode: "vertical-rl",
            }}
          >
            scroll
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee — two bidirectional rows */}
      <div
        className="hero-meta"
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "0",
          overflow: "hidden",
          opacity: 0,
        }}
      >
        {/* Row 1 — scrolls left: skills & roles */}
        {(() => {
          const row1 = ["AI & ML Engineer", "·", "Computer Vision", "·", "RAG / LLM Systems", "·", "ISRO Research", "·", "IEEE Published", "·", "HACKaMINeD Winner", "·", "Nirma University", "·", "8xSports", "·", "MZHub Faithtech", "·", "Ahmedabad, India", "·"];
          const doubled = [...row1, ...row1];
          return (
            <div
              style={{ borderBottom: "1px solid var(--border)", padding: "11px 0", overflow: "hidden" }}
            >
              <div className="marquee-track marquee-track-fast flex gap-10">
                {doubled.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: item === "·" ? "var(--accent-y)" : "var(--text-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Row 2 — scrolls right: achievements & metrics */}
        {(() => {
          const row2 = ["20+ Projects", "·", "IEEE Published", "·", "1 yr Experience", "·", "12+ Freelance", "·", "Track Winner 2026", "·", "4th National 2026", "·", "ACM Chairperson", "·", "LeetCode 1507", "·", "Open to Work", "·", "YOLOv8 · DINOv2", "·"];
          const doubled = [...row2, ...row2];
          return (
            <div style={{ padding: "11px 0", overflow: "hidden" }}>
              <div className="marquee-track-reverse flex gap-10">
                {doubled.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: item === "·" ? "var(--accent-y)" : "var(--text-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Corner decorations */}
      <div
        className="hero-meta absolute bottom-16 left-6 md:left-10"
        style={{ opacity: 0 }}
      >
        <a
          href="#works"
          className="inline-flex items-center gap-3 group"
          style={{ textDecoration: "none" }}
        >
          <motion.div
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-full flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontSize: "1.2rem",
            }}
          >
            ↓
          </motion.div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            View Works
          </span>
        </a>
      </div>
    </section>
  );
}
