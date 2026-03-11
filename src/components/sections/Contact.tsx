"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/animations/SplitText";
import MagneticButton from "@/components/animations/MagneticButton";
import MarqueeStrip from "@/components/animations/MarqueeStrip";
import { personal } from "@/data/portfolio";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        paddingTop: "7rem",
        paddingBottom: "2rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
    >
      {/* Background accent blobs */}
      <div
        className="absolute rounded-full opacity-10"
        style={{
          bottom: 0,
          left: 0,
          width: "256px",
          height: "256px",
          background: "var(--accent-y)",
          filter: "blur(80px)",
          transform: "translate(-30%, 30%)",
        }}
      />
      <div
        className="absolute rounded-full opacity-10"
        style={{
          top: 0,
          right: 0,
          width: "192px",
          height: "192px",
          background: "var(--accent-b)",
          filter: "blur(60px)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="text-center relative z-10" style={{ maxWidth: "56rem", marginLeft: "auto", marginRight: "auto" }}>
        {/* Section label */}
        <div className="flex items-center justify-center gap-2 mb-8">
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
            Get in Touch
          </span>
          <div className="w-8 h-px" style={{ background: "var(--accent-y)" }} />
        </div>

        <SplitText
          text="LET'S WORK"
          as="h2"
          type="chars"
          stagger={0.06}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            lineHeight: 1,
          }}
        />
        <SplitText
          text="TOGETHER"
          as="h2"
          type="chars"
          stagger={0.06}
          delay={0.3}
          className="mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            lineHeight: 1,
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-lg max-w-xl mx-auto"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-muted)",
            marginBottom: "3rem",
          }}
        >
          Got a project in mind? I&apos;d love to hear about it. Let&apos;s
          build something amazing together.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
          style={{ marginBottom: "3rem" }}
        >
          <MagneticButton
            className="rounded-full text-sm uppercase tracking-widest font-bold transition-all"
            style={{
              padding: "16px 40px",
              background: "var(--accent-y)",
              color: "#000",
              fontFamily: "var(--font-mono)",
              border: "none",
            }}
            onClick={() => {
              const a = document.createElement("a");
              a.href = "/proofs/Neal_Daftary_Resume.pdf";
              a.download = "Neal_Daftary_Resume.pdf";
              a.click();
            }}
          >
            Download Resume 📄
          </MagneticButton>

          <MagneticButton
            className="rounded-full text-sm uppercase tracking-widest font-bold transition-all"
            style={{
              padding: "16px 40px",
              background: "transparent",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              border: "2px solid var(--border)",
            }}
            onClick={() =>
              window.open(
                `https://github.com/${personal.contact.github}`,
                "_blank"
              )
            }
          >
            GitHub →
          </MagneticButton>

          <MagneticButton
            className="rounded-full text-sm uppercase tracking-widest font-bold transition-all"
            style={{
              padding: "16px 40px",
              background: "transparent",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              border: "2px solid var(--border)",
            }}
            onClick={() =>
              window.open(
                `https://linkedin.com/in/${personal.contact.linkedin}`,
                "_blank"
              )
            }
          >
            LinkedIn →
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-5"
          style={{ marginBottom: "4rem" }}
        >
          {[
            { label: "Open to Work", color: "var(--accent-g)" },
            { label: "AI/ML", color: "var(--accent-b)" },
            { label: "Computer Vision", color: "var(--accent-p)" },
            { label: "Full Stack", color: "var(--accent-y)" },
          ].map((badge, i) => (
            <motion.span
              key={badge.label}
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: (i - 1.5) * 3 }}
              viewport={{ once: true }}
              transition={{
                delay: 1 + i * 0.1,
                type: "spring",
                stiffness: 300,
              }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                padding: "10px 20px",
                background: `${badge.color}22`,
                color: badge.color,
                border: `2px solid ${badge.color}55`,
                fontFamily: "var(--font-mono)",
              }}
            >
              {badge.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <MarqueeStrip
          items={[
            personal.contact.email,
            "✦",
            personal.contact.phone,
            "✦",
            "GitHub: " + personal.contact.github,
          ]}
          speed={60}
          className="py-3"
        />
      </div>
    </section>
  );
}
