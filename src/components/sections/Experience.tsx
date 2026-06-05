"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/portfolio";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="experience"
      ref={ref}
      style={{ background: "var(--bg)", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}
    >
      {/* ── Hidden SEO paragraph ── */}
      <p className="sr-only">
        Neal Daftary's professional experience: AI Intern at 8xSports (June–September 2025),
        building a real-time visual search engine with YOLOv8, DINOv2, and FAISS achieving
        645ms latency across 301 sports profiles — earned Letter of Recommendation. AI Software
        Engineering Intern at MZHub Faithtech (October–December 2025), a spiritual technology
        platform for religious institutions, improving web performance by 57% and SEO by 40%
        on Azure. Undergraduate Student Researcher at Nirma University under ISRO funding
        (January 2026–present), building Computer Vision pipelines on Chandrayaan-2 TMC-2 and
        OHRC lunar imagery for automated crater detection, segmentation, and morphometric analysis.
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
          04 — Experience
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
          {experience.length} Roles
        </span>
      </div>

      <div className="px-6 md:px-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 0.9,
            color: "var(--text)",
            marginBottom: "4rem",
          }}
        >
          EXP
          <span style={{ WebkitTextStroke: "2px var(--text)", color: "transparent" }}>ERIENCE</span>
        </motion.h2>

        {/* Experience rows */}
        <div>
          {experience.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group"
              itemScope
              itemType="https://schema.org/WorkExperience"
            >
              <div
                className="grid md:grid-cols-12 gap-6 py-8 md:py-10"
                style={{
                  borderBottom: "1px solid var(--border)",
                  transition: "border-color 0.3s",
                }}
              >
                {/* Left: Period + index */}
                <div className="md:col-span-3 flex flex-col gap-2">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <time
                    itemProp="startDate"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: exp.accentColor,
                      lineHeight: 1.4,
                    }}
                  >
                    {exp.period}
                  </time>
                </div>

                {/* Center: Company + Role */}
                <div className="md:col-span-4 flex flex-col gap-2">
                  <h3
                    itemProp="hiringOrganization"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                      fontWeight: 700,
                      color: "var(--text)",
                      lineHeight: 1.1,
                    }}
                  >
                    {exp.company}
                  </h3>
                  <p
                    itemProp="title"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: exp.accentColor,
                    }}
                  >
                    {exp.role}
                  </p>
                </div>

                {/* Right: Description */}
                <div className="md:col-span-5">
                  <p
                    itemProp="description"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      lineHeight: 1.75,
                      color: "var(--text-muted)",
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
