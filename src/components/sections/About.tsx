"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TextScramble from "@/components/animations/TextScramble";
import { personal } from "@/data/portfolio";

const FACTS = [
  { label: "Location", value: "Ahmedabad, India" },
  { label: "University", value: "Nirma University" },
  { label: "Degree", value: "B.Tech CSE (AI & ML)" },
  { label: "CGPA", value: "7.77 / 10" },
  { label: "JEE Mains", value: "97.62 percentile" },
  { label: "LeetCode", value: "Rating 1507" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: "var(--bg)", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}
    >
      <p className="sr-only">
        Neal Daftary — AI &amp; ML Engineer based in Ahmedabad, India. B.Tech CSE student
        specialising in Artificial Intelligence and Machine Learning at the Institute of Technology,
        Nirma University (2024–2028). JEE Mains 2024: 97.62 percentile. Former AI Intern at
        8xSports (Computer Vision, YOLOv8, DINOv2, FAISS, visual search engine). Former AI
        Software Engineering Intern at MZHub Faithtech (Next.js, Azure Cosmos DB, RAG chatbot
        R&amp;D). ISRO-funded researcher on Chandrayaan-2 lunar imagery segmentation. IEEE Sensors
        Letters author. ACM ITNU Student Chairperson.
      </p>

      {/* Section header */}
      <div
        className="flex items-center justify-between px-6 md:px-10 mb-14"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          01 — About
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          Neal Daftary
        </span>
      </div>

      <div className="px-6 md:px-10">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: 1,
            letterSpacing: "0.01em",
            color: "var(--text)",
            marginBottom: "2.5rem",
          }}
        >
          Building AI systems that
          <br />
          <span style={{ color: "var(--accent-y)" }}>actually ship.</span>
        </motion.h2>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                lineHeight: 1.85,
                color: "var(--text-muted)",
                marginBottom: "2.5rem",
              }}
            >
              {personal.bio}
            </p>

            {/* Contact tiles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { icon: "→", label: personal.contact.email, href: `mailto:${personal.contact.email}` },
                { icon: "→", label: `@${personal.contact.github}`, href: `https://github.com/${personal.contact.github}` },
                { icon: "→", label: "LinkedIn", href: `https://linkedin.com/in/${personal.contact.linkedin}` },
                { icon: "→", label: personal.contact.phone, href: `tel:${personal.contact.phone}` },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex items-center gap-3 rounded-lg"
                  style={{
                    padding: "14px 16px",
                    background: hovered === i ? "var(--accent-y)" : "var(--bg-card)",
                    border: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "background 0.25s, border-color 0.25s",
                    borderColor: hovered === i ? "var(--accent-y)" : "var(--border)",
                  }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: hovered === i ? "#fff" : "var(--accent-y)", transition: "color 0.2s" }}>
                    {item.icon}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.08em", color: hovered === i ? "#fff" : "var(--text)", transition: "color 0.2s", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <TextScramble text={item.label} trigger={hovered === i} speed={4} />
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Quick facts */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                Quick Facts
              </span>
            </div>
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  {f.label}
                </span>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }}>
                  {f.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
