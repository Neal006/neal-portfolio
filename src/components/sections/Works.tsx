"use client";
import { motion } from "framer-motion";
import ScrollZoom from "@/components/animations/ScrollZoom";
import SplitText from "@/components/animations/SplitText";
import { works } from "@/data/portfolio";

export default function Works() {
  return (
    <section
      id="works"
      style={{
        background: "var(--bg)",
        paddingTop: "7rem",
        paddingBottom: "7rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}>
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
            Projects
          </span>
        </div>

        <SplitText
          text="WORKS"
          as="h2"
          type="chars"
          stagger={0.1}
          className="mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 10vw, 10rem)",
            lineHeight: 1,
          }}
        />

        {/* Project cards — stacked vertically with proper gaps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {works.map((work, i) => (
            <ScrollZoom
              key={work.id}
              fromScale={0.85}
              className={`flex flex-col md:flex-row items-center ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
              style={{ gap: "3rem" }}
            >
              {/* Project visual */}
              <motion.div
                className="flex-1 w-full rounded-2xl overflow-hidden relative"
                style={{
                  background: "var(--bg-elevated)",
                  aspectRatio: "16/9",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {work.id === "w5" ? (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-card)" }}>
                    <img
                      src="/proofs/visualsearch.png"
                      alt={work.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : work.id === "w4" ? (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-card)" }}>
                    <img
                      src="/proofs/research.png"
                      alt={work.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : work.id === "w2" ? (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-card)" }}>
                    <img
                      src="/proofs/spectrascann.png"
                      alt={work.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : work.id === "w1" ? (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-card)" }}>
                    <img
                      src="/proofs/luminai.jpeg"
                      alt={work.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : work.id === "w6" ? (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-card)" }}>
                    <img
                      src="/proofs/chefx.png"
                      alt={work.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : work.id === "w7" ? (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-card)" }}>
                    <img
                      src="/proofs/tfd.jpeg"
                      alt={work.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : work.id === "w8" ? (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-card)" }}>
                    <img
                      src="/proofs/mzhub.png"
                      alt={work.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${
                        work.tags?.[0] === "Python"
                          ? "#3776AB22"
                          : work.tags?.[0] === "DINOv2"
                          ? "#EE4C2C22"
                          : "#4af0f022"
                      }, var(--bg-card))`,
                    }}
                  >
                    <span
                      className="text-6xl opacity-30"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}

                {/* Category badge */}
                <div
                  className="absolute top-4 right-4 rounded-full text-xs font-bold"
                  style={{
                    background: "var(--accent-y)",
                    color: "#000",
                    fontFamily: "var(--font-mono)",
                    padding: "4px 12px",
                  }}
                >
                  {work.category}
                </div>
              </motion.div>

              {/* Info */}
              <div style={{ width: "100%", maxWidth: "300px", flexShrink: 0 }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--accent-y)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {work.year}
                </p>
                <h3
                  className="mt-2 text-3xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {work.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {work.description}
                </p>

                {/* Tags */}
                {work.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded text-[10px] uppercase tracking-wider"
                        style={{
                          background: "var(--bg-elevated)",
                          color: "var(--accent-b)",
                          fontFamily: "var(--font-mono)",
                          border: "1px solid var(--border)",
                          padding: "4px 8px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <motion.a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 rounded-full flex items-center justify-center text-sm no-underline"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "var(--text)",
                    color: "var(--bg)",
                  }}
                  whileHover={{ scale: 1.2, rotate: 45 }}
                >
                  →
                </motion.a>
              </div>
            </ScrollZoom>
          ))}
        </div>
      </div>
    </section>
  );
}
