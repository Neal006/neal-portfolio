"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TextScramble from "@/components/animations/TextScramble";
import { personal } from "@/data/portfolio";

const LINKS = [
  { label: "Email", value: personal.contact.email, href: `mailto:${personal.contact.email}` },
  { label: "GitHub", value: `github.com/${personal.contact.github}`, href: `https://github.com/${personal.contact.github}` },
  { label: "LinkedIn", value: `linkedin.com/in/${personal.contact.linkedin}`, href: `https://linkedin.com/in/${personal.contact.linkedin}` },
  { label: "Resume", value: "Download PDF", href: "/proofs/Neal_Daftary_Resume.pdf" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="contact"
      ref={ref}
      style={{ background: "var(--bg-card)", paddingTop: "7rem", paddingBottom: "0", overflow: "hidden" }}
    >
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
          06 — Contact
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--accent-y)",
            letterSpacing: "0.15em",
          }}
        >
          ● Open to Work
        </span>
      </div>

      <div className="px-6 md:px-10">
        {/* Giant CTA headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 13vw, 12rem)",
              lineHeight: 0.88,
              letterSpacing: "0.01em",
              color: "var(--text)",
            }}
          >
            LET&apos;S
            <br />
            <span style={{ WebkitTextStroke: "2px var(--text)", color: "transparent" }}>
              BUILD
            </span>
            <span style={{ color: "var(--accent-y)" }}>.</span>
          </h2>
        </motion.div>

        {/* Description + links grid */}
        <div className="grid md:grid-cols-2 gap-12 pb-16" style={{ borderBottom: "1px solid var(--border)" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--text-muted)",
              maxWidth: "40ch",
            }}
          >
            Got a challenging AI problem, a product to ship, or research to collaborate on? I&apos;m always down to build something exceptional.
          </motion.p>

          <div className="space-y-0">
            {LINKS.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                download={link.label === "Resume"}
                className="flex items-center justify-between py-4 md:py-5 group"
                style={{
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                  borderColor: hovered === i ? "var(--accent-y)" : "var(--border)",
                  transition: "border-color 0.2s",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-center gap-4">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: hovered === i ? "var(--accent-y)" : "var(--text-muted)",
                      transition: "color 0.2s",
                      width: "4rem",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: hovered === i ? "var(--text)" : "var(--text-muted)",
                      transition: "color 0.2s",
                    }}
                  >
                    <TextScramble text={link.value} trigger={hovered === i} speed={5} />
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: hovered === i ? 45 : 0, color: hovered === i ? "var(--accent-y)" : "var(--text-muted)" }}
                  style={{ fontSize: "1rem", display: "block" }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Badge row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 py-10"
        >
          {["Open to Work", "AI/ML", "Computer Vision", "Full Stack AI", "Research", "India"].map(
            (badge, i) => (
              <span
                key={badge}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: i === 0 ? "#fff" : "var(--text-muted)",
                  background: i === 0 ? "var(--accent-y)" : "transparent",
                  border: `1px solid ${i === 0 ? "var(--accent-y)" : "var(--border)"}`,
                  borderRadius: "999px",
                  padding: "7px 16px",
                }}
              >
                {badge}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
