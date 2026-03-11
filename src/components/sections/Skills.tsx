"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/animations/SplitText";
import { skills } from "@/data/portfolio";

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        background: "var(--bg-card)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}>
        {/* Section label */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-px" style={{ background: "var(--accent-y)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Skills & Achievements
          </span>
        </div>

        {/* Tech Stack — compact pill grid */}
        <SplitText
          text="Tech Stack"
          as="h2"
          type="chars"
          stagger={0.07}
          className="mb-6"
          style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
        />
        <div className="flex flex-wrap gap-2.5 mb-14">
          {skills.software.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ y: 20, opacity: 0, scale: 0.85 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              whileHover={{ y: -4, scale: 1.08 }}
              className="flex items-center gap-2 rounded-full cursor-default"
              style={{
                background: `${s.color}12`,
                border: `1.5px solid ${s.color}40`,
                padding: "8px 16px",
              }}
              title={s.name}
            >
              <span className="text-base leading-none">{s.icon}</span>
              <span
                className="text-xs font-semibold"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: s.color,
                }}
              >
                {s.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom row: Core Areas + Achievements side by side */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Core Areas */}
          <div>
            <h3
              className="mb-5"
              style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}
            >
              Core Areas
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {skills.personal.map((trait, i) => (
                <motion.span
                  key={trait}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{
                    scale: 1.06,
                    background: "var(--accent-y)",
                    color: "#000",
                  }}
                  className="rounded-full text-xs border cursor-default transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    fontFamily: "var(--font-heading)",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    padding: "8px 18px",
                  }}
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3
              className="mb-5"
              style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}
            >
              Achievements
            </h3>
            <div className="space-y-2.5">
              {[
                "🏆 Winner (Aubergine Track) & Top 5 Finalist – HACKaMINeD National Hackathon 2026",
                "🥉 4th National Rank – Mitsubishi Electric Cup",
              ].map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="flex items-center gap-2 text-xs rounded-lg"
                  style={{
                    background: "var(--bg-elevated)",
                    fontFamily: "var(--font-body)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    padding: "10px 14px",
                    lineHeight: 1.5,
                  }}
                >
                  {a}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
