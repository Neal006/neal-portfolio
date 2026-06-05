"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills, achievements } from "@/data/portfolio";

type SkillCategory = { label: string; color: string; items: string[] };

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const categories = (skills as typeof skills & { categories?: SkillCategory[] }).categories;

  return (
    <section
      id="skills"
      ref={ref}
      style={{ background: "var(--bg-card)", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}
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
          02 — Skills
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
          {skills.software.length} Technologies
        </span>
      </div>

      <div className="px-6 md:px-10">
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: 0.9,
              color: "var(--text)",
            }}
          >
            TECH
            <br />
            <span style={{ WebkitTextStroke: "2px var(--text)", color: "transparent" }}>
              STACK
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              maxWidth: "36ch",
            }}
          >
            The tools I reach for to build production AI systems — from model training to deployment.
          </p>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2 mb-16">
          {skills.software.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.03, type: "spring", stiffness: 300 }}
              whileHover={{ y: -3, scale: 1.06 }}
              className="flex items-center gap-2 rounded cursor-default"
              style={{
                background: `${s.color}10`,
                border: `1px solid ${s.color}35`,
                padding: "7px 14px",
              }}
            >
              <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>{s.icon}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  color: s.color,
                }}
              >
                {s.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Expertise areas */}
        {categories && (
          <div className="mb-14">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: "var(--text)",
                marginBottom: "1.5rem",
              }}
            >
              EXPERTISE
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((cat, ci) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + ci * 0.07 }}
                  className="rounded"
                  style={{
                    background: "var(--bg)",
                    border: `1px solid ${cat.color}25`,
                    padding: "18px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: cat.color,
                      }}
                    >
                      {cat.label}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          background: `${cat.color}0d`,
                          border: `1px solid ${cat.color}18`,
                          borderRadius: "var(--radius-sm)",
                          padding: "3px 8px",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom: core areas + achievements */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.8rem",
                color: "var(--text)",
                marginBottom: "1rem",
              }}
            >
              CORE AREAS
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.personal.map((trait, i) => (
                <motion.span
                  key={trait}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  whileHover={{ background: "var(--accent-y)", color: "#fff", borderColor: "var(--accent-y)" }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "8px 16px",
                    cursor: "default",
                    transition: "all 0.2s",
                  }}
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.8rem",
                color: "var(--text)",
                marginBottom: "1rem",
              }}
            >
              ACHIEVEMENTS
            </h3>
            <div className="space-y-2">
              {achievements.slice(0, 5).map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "10px 14px",
                  }}
                >
                  <span style={{ color: "var(--accent-y)", fontSize: "0.6rem", marginTop: "2px" }}>✦</span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {a}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
