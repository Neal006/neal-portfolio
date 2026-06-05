"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { works } from "@/data/portfolio";
import type { WorkDetail } from "@/data/workDetails";

type Work = (typeof works)[0];

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

/* ── Fade-in section wrapper ── */
function Section({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function WorkDetail({
  work,
  details,
}: {
  work: Work;
  details: WorkDetail | null;
}) {
  const accent = ACCENT_MAP[work.id] ?? "var(--accent-y)";
  const image = IMAGE_MAP[work.id] ?? null;
  const isGithub = work.link.includes("github.com");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <Navbar />

      {/* ── BACK NAV ── */}
      <div
        className="px-6 md:px-10 flex items-center justify-between flex-wrap gap-3"
        style={{
          paddingTop: "88px",
          paddingBottom: "16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href="/#works"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          ← Selected Works
        </Link>

        {/* Live / GitHub badge */}
        <a
          href={work.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: accent,
            border: `1px solid ${accent}`,
            borderRadius: "999px",
            padding: "4px 12px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = accent;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = accent;
          }}
        >
          {isGithub ? "GitHub" : "Live"} ↗
        </a>
      </div>

      {/* ── HERO HEADER ── */}
      <div
        className="px-6 md:px-10 py-16 md:py-20 grid md:grid-cols-12 gap-8 items-end"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {/* Project number + title */}
        <div className="md:col-span-7">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            {work.category} · {work.year}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              lineHeight: 0.92,
              letterSpacing: "0.01em",
              color: "var(--text)",
            }}
          >
            {work.title}
          </h1>
        </div>

        {/* Tagline */}
        <div className="md:col-span-5">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              lineHeight: 1.7,
              color: "var(--text-muted)",
            }}
          >
            {details?.tagline ?? work.description.split(".")[0] + "."}
          </p>
        </div>
      </div>

      {/* ── VISUAL BANNER ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(240px, 40vw, 480px)",
          overflow: "hidden",
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={`${work.title} — project screenshot`}
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
            priority
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${accent}18 0%, ${accent}06 60%, var(--bg) 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Grid pattern */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(${accent}12 1px, transparent 1px), linear-gradient(90deg, ${accent}12 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(8rem, 20vw, 16rem)",
                color: `${accent}18`,
                letterSpacing: "0.05em",
                userSelect: "none",
                lineHeight: 1,
                position: "relative",
                zIndex: 1,
              }}
            >
              {work.title.replace(/[^A-Z0-9]/gi, "").slice(0, 4).toUpperCase()}
            </span>
          </div>
        )}
        {/* Gradient fade-out at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "140px",
            background: "linear-gradient(transparent, var(--bg))",
          }}
        />
      </div>

      {/* ── CONTENT SECTIONS ── */}
      <div className="px-6 md:px-10" style={{ paddingBottom: "8rem" }}>

        {/* ── OVERVIEW ── */}
        {details?.overview && (
          <Section>
            <div
              className="grid md:grid-cols-12 gap-8 md:gap-16 py-16 md:py-20"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="md:col-span-4">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: accent,
                  }}
                >
                  // Overview
                </span>
              </div>
              <div className="md:col-span-8">
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                    lineHeight: 1.9,
                    color: "var(--text-muted)",
                  }}
                >
                  {details.overview}
                </p>
              </div>
            </div>
          </Section>
        )}

        {/* ── SPECS ── */}
        {details?.specs && details.specs.length > 0 && (
          <Section delay={0.05}>
            <div
              className="grid md:grid-cols-12 gap-8 md:gap-16 py-16 md:py-20"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="md:col-span-4">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: accent,
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  // Specs
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    color: "var(--text)",
                  }}
                >
                  Specifications
                </h2>
              </div>
              <div className="md:col-span-8">
                {details.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between py-4"
                    style={{
                      borderBottom: i < details.specs.length - 1 ? "1px solid var(--border)" : "none",
                      gap: "24px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        minWidth: "120px",
                        flexShrink: 0,
                      }}
                    >
                      {spec.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "var(--text)",
                        lineHeight: 1.5,
                      }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* ── FEATURES ── */}
        {details?.features && details.features.length > 0 && (
          <Section delay={0.08}>
            <div
              className="grid md:grid-cols-12 gap-8 md:gap-16 py-16 md:py-20"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="md:col-span-4">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: accent,
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  // Features
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    color: "var(--text)",
                  }}
                >
                  Features
                </h2>
              </div>
              <div className="md:col-span-8">
                {details.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-6 py-4"
                    style={{
                      borderBottom: i < details.features.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        color: accent,
                        minWidth: "28px",
                        marginTop: "3px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "var(--text)",
                        lineHeight: 1.6,
                      }}
                    >
                      {feat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* ── TECH STACK ── */}
        {work.tags && work.tags.length > 0 && (
          <Section delay={0.1}>
            <div
              className="grid md:grid-cols-12 gap-8 md:gap-16 py-16 md:py-20"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="md:col-span-4">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: accent,
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  // Tech
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    color: "var(--text)",
                  }}
                >
                  Tech Stack
                </h2>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-3 content-start" style={{ alignItems: "flex-start" }}>
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: accent,
                      border: `1px solid ${accent}45`,
                      borderRadius: "var(--radius-sm)",
                      padding: "8px 18px",
                      background: `${accent}08`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* ── CTA ── */}
        <Section delay={0.12}>
          <div className="py-20 md:py-28 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  lineHeight: 1,
                  letterSpacing: "0.01em",
                  color: "var(--text)",
                }}
              >
                Interested in<br />
                <span style={{ color: accent }}>{work.title}?</span>
              </h2>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3">
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  marginBottom: "8px",
                }}
              >
                {isGithub
                  ? "Explore the source code, architecture notes, and full implementation."
                  : "Visit the live deployment and see it in action."}
              </p>
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px 32px",
                  background: accent,
                  color: "#fff",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  width: "fit-content",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {isGithub ? "View on GitHub" : "Visit Live Site"} ↗
              </a>
              <Link
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px 32px",
                  background: "transparent",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  width: "fit-content",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.color = accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text)";
                }}
              >
                Get in Touch →
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
