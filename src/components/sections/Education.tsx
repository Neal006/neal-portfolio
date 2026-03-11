"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/animations/SplitText";
import ScrollZoom from "@/components/animations/ScrollZoom";
import { education, responsibilities, research } from "@/data/portfolio";

export default function Education() {
  return (
    <section
      id="education"
      style={{
        background: "var(--bg-card)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "64rem", marginLeft: "auto", marginRight: "auto" }}>
        {/* Section label */}
        <div className="flex items-center gap-2 mb-4">
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
            Background
          </span>
        </div>

        <SplitText
          text="EDUCATION"
          as="h2"
          type="chars"
          stagger={0.08}
          className="mb-12"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 5rem)" }}
        />

        {/* Education cards */}
        <div style={{ marginBottom: "4rem" }}>
          {education.map((edu, i) => (
            <ScrollZoom key={i} fromScale={0.9}>
              <motion.div
                whileHover={{ x: 8 }}
                className="rounded-2xl"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  padding: "32px",
                }}
              >
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent-y)",
                    marginBottom: "8px",
                  }}
                >
                  {edu.period}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  }}
                >
                  {edu.institution}
                </h3>
                <p
                  className="mt-2 text-lg"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--text-muted)",
                  }}
                >
                  {edu.degree}
                </p>
                {edu.grade && (
                  <span
                    className="inline-block mt-3 rounded-full text-xs"
                    style={{
                      background: "var(--accent-g)22",
                      color: "var(--accent-g)",
                      fontFamily: "var(--font-mono)",
                      border: "1px solid var(--accent-g)44",
                      padding: "4px 12px",
                    }}
                  >
                    {edu.grade}
                  </span>
                )}
              </motion.div>
            </ScrollZoom>
          ))}
        </div>

        {/* Position of Responsibility */}
        <SplitText
          text="LEADERSHIP"
          as="h2"
          type="chars"
          stagger={0.08}
          className="mb-8"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        />

        <div style={{ marginBottom: "4rem" }}>
          {responsibilities.map((pos, i) => (
            <ScrollZoom key={i} fromScale={0.9}>
              <motion.div
                whileHover={{ x: 8 }}
                className="rounded-2xl"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  padding: "32px",
                }}
              >
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent-b)",
                    marginBottom: "8px",
                  }}
                >
                  {pos.period}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  }}
                >
                  {pos.role}
                </h3>
                <p
                  className="mt-2 text-lg"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--text-muted)",
                  }}
                >
                  {pos.organization}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {pos.description}
                </p>
              </motion.div>
            </ScrollZoom>
          ))}
        </div>

        {/* Research spotlight */}
        <SplitText
          text="RESEARCH"
          as="h2"
          type="chars"
          stagger={0.08}
          className="mb-8"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        />

        <ScrollZoom fromScale={0.9}>
          <a
            href={research.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl relative overflow-hidden cursor-pointer"
              style={{
                background: "var(--bg)",
                border: "2px solid var(--accent-p)33",
                boxShadow: "0 0 60px rgba(255,63,164,0.08)",
                padding: "32px",
              }}
            >
              <div
                className="absolute top-0 right-0 rounded-full opacity-10"
                style={{
                  width: "160px",
                  height: "160px",
                  background: "var(--accent-p)",
                  filter: "blur(60px)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <p
                className="text-xs uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-p)",
                  marginBottom: "8px",
                }}
              >
                {research.publication}
              </p>
              <h3
                className="text-2xl md:text-3xl"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                {research.title}
              </h3>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {research.description}
              </p>
            </motion.div>
          </a>
        </ScrollZoom>
      </div>
    </section>
  );
}
