"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only set up horizontal scroll on desktop (md+ breakpoint)
    if (window.innerWidth < 768) return;

    const container = containerRef.current!;
    const track = trackRef.current!;
    if (!container || !track) return;

    const scrollAmount = track.scrollWidth - window.innerWidth;

    const mainTween = gsap.to(track, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollAmount}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      mainTween.scrollTrigger?.kill();
      mainTween.kill();
    };
  }, []);

  return (
    <>
      {/* ─── Mobile: vertical card layout (hidden on md+) ─── */}
      <section
        id="experience"
        className="md:hidden"
        style={{
          background: "var(--bg)",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
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
            Experience
          </span>
        </div>

        <h2
          className="mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3.5rem",
            lineHeight: 0.95,
            color: "var(--text)",
          }}
        >
          EXP
          <span style={{ color: "var(--accent-y)" }}>ER</span>
          IENCE
        </h2>

        <div className="flex flex-col gap-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="rounded-2xl flex flex-col justify-between"
              style={{
                padding: "28px",
                background: "var(--bg-card)",
                border: `2px solid ${exp.accentColor}44`,
                boxShadow: `0 0 40px ${exp.accentColor}18`,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: exp.accentColor,
                    letterSpacing: "0.1em",
                  }}
                >
                  {exp.period}
                </p>
                <h3
                  className="mt-3 text-2xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--text)",
                  }}
                >
                  {exp.company}
                </h3>
                <p
                  className="mt-1 text-sm italic"
                  style={{
                    color: exp.accentColor,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {exp.role}
                </p>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {exp.description}
                </p>
              </div>
              <div
                className="rounded-full mt-6"
                style={{ width: "48px", height: "4px", background: exp.accentColor }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Desktop: horizontal scroll layout (hidden on mobile) ─── */}
      <section
        ref={containerRef}
        className="hidden md:block relative"
        style={{ background: "var(--bg)", height: "100vh", overflow: "hidden" }}
      >
        {/* Section label (pinned) */}
        <div className="absolute top-8 left-8 z-20">
          <div className="flex items-center gap-2">
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
              Experience
            </span>
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex items-center gap-10"
          style={{
            height: "100vh",
            width: "max-content",
            paddingLeft: "8vw",
            paddingRight: "15vw",
          }}
        >
          {/* Intro card */}
          <div className="shrink-0" style={{ width: "320px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "4rem",
                lineHeight: 0.95,
                color: "var(--text)",
              }}
            >
              EXP
              <span style={{ color: "var(--accent-y)" }}>ER</span>
              IENCE
            </h2>
            <p
              className="mt-4 text-lg"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Scroll to explore →
            </p>
          </div>

          {/* Experience cards */}
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="shrink-0 rounded-2xl flex flex-col justify-between"
              style={{
                width: "360px",
                height: "400px",
                padding: "32px",
                background: "var(--bg-card)",
                border: `2px solid ${exp.accentColor}44`,
                boxShadow: `0 0 40px ${exp.accentColor}18`,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: exp.accentColor,
                    letterSpacing: "0.1em",
                  }}
                >
                  {exp.period}
                </p>
                <h3
                  className="mt-3 text-2xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--text)",
                  }}
                >
                  {exp.company}
                </h3>
                <p
                  className="mt-1 text-sm italic"
                  style={{
                    color: exp.accentColor,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {exp.role}
                </p>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {exp.description}
                </p>
              </div>
              <div
                className="rounded-full mt-6"
                style={{ width: "48px", height: "4px", background: exp.accentColor }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
