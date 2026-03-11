"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import TornEdge from "@/components/animations/TornEdge";
import MarqueeStrip from "@/components/animations/MarqueeStrip";
import { personal } from "@/data/portfolio";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { scale: 0.55, opacity: 0, y: 60 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2 }
    )
      .fromTo(
        yearRef.current,
        { scale: 0, rotation: -20 },
        { scale: 1, rotation: -8, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        ".hero-tagline span",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        "-=0.2"
      );

    // Floating star particles
    gsap.to(".hero-star", {
      y: "random(-20, 20)",
      x: "random(-15, 15)",
      rotation: "random(-30, 30)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.4,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const starPositions = [
    "top-[10%] left-[5%]",
    "top-[8%] right-[12%]",
    "top-[20%] right-[5%]",
    "bottom-[35%] left-[3%]",
    "bottom-[25%] right-[6%]",
    "top-[40%] left-[15%]",
    "bottom-[45%] right-[15%]",
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)", minHeight: "100vh", paddingBottom: "120px" }}
    >
      {/* Decorative stars */}
      {starPositions.map((pos, i) => (
        <svg
          key={i}
          className={`hero-star absolute ${pos}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <polygon
            points="12,2 14.5,9 22,9 16,14 18.5,21 12,16.5 5.5,21 8,14 2,9 9.5,9"
            fill="none"
            stroke="var(--accent-y)"
            strokeWidth="1.5"
          />
        </svg>
      ))}

      {/* Accent blobs */}
      <div
        className="absolute top-0 left-0 w-40 h-40 opacity-70"
        style={{
          background: "#f7c948",
          clipPath: "polygon(0 0, 60% 0, 100% 40%, 0 100%)",
        }}
      />
      <div
        className="absolute bottom-28 right-0 w-32 h-48 opacity-60"
        style={{
          background: "#ff3fa4",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 70%)",
        }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full opacity-20"
        style={{
          background: "#4af0f0",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 text-center px-4" style={{ marginTop: "-40px" }}>
        {/* Year badge */}
        <div
          ref={yearRef}
          className="inline-block mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.1rem",
            fontWeight: 700,
            background: "var(--bg)",
            color: "var(--text)",
            border: "2px solid var(--text)",
            borderRadius: "40px",
            padding: "4px 18px",
            transform: "rotate(-8deg)",
            display: "inline-block",
          }}
        >
          {new Date().getFullYear()}
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 18vw, 16rem)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
            color: "var(--text)",
          }}
        >
          NEAL <span style={{ color: "var(--accent-y)" }}>D</span>AFTARY
        </h1>

        {/* Tagline */}
        <p
          className="hero-tagline mt-3"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
          }}
        >
          {[
            "Computer Vision",
            "✦",
            "Research",
            "✦",
            "Full-Stack AI",
          ].map((w, i) => (
            <span
              key={i}
              style={{
                color: i % 2 === 1 ? "var(--accent-y)" : "inherit",
              }}
            >
              {w}{" "}
            </span>
          ))}
        </p>

        {/* CTA */}
        <div className="hero-cta mt-8">
          <a
            href="#works"
            className="inline-block px-8 py-3 rounded-full font-bold tracking-widest uppercase text-sm transition-transform hover:scale-105"
            style={{
              background: "var(--text)",
              color: "var(--bg)",
              fontFamily: "var(--font-mono)",
            }}
          >
            View Works →
          </a>
        </div>
      </div>

      {/* Marquee — placed at the very bottom, not overlapping content */}
      <div
        className="absolute bottom-0 w-full"
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <MarqueeStrip
          items={[
            "Research",
            "Computer Vision",
            "Full-Stack AI",
          ]}
          className="py-3"
        />
      </div>
    </section>
  );
}
