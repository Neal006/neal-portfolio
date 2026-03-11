"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/animations/SplitText";
import ScrollZoom from "@/components/animations/ScrollZoom";
import { personal } from "@/data/portfolio";

const contactItems = [
  { icon: "📧", label: personal.contact.email, color: "#4af0f0" },
  { icon: "📱", label: personal.contact.phone, color: "#6aff8a" },
  { icon: "🐙", label: personal.contact.github, color: "#f0ede6" },
  { icon: "🔗", label: "LinkedIn", color: "#0077B5" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--bg)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
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
            About Me
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Polaroid photo */}
          <ScrollZoom fromScale={0.75} className="flex justify-center">
            <motion.div
              initial={{ rotate: -6 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative inline-block"
              style={{
                background: "white",
                padding: "16px 16px 48px",
                boxShadow: "6px 8px 40px rgba(0,0,0,0.45)",
                border: "1px solid #ddd",
              }}
            >
              {/* Sticky tape top corners */}
              {[-30, 30].map((rot, i) => (
                <div
                  key={i}
                  className={`absolute ${
                    i === 0 ? "-top-4 left-6" : "-top-4 right-6"
                  }`}
                  style={{
                    width: 40,
                    height: 14,
                    background: "rgba(247,201,72,0.7)",
                    transform: `rotate(${rot}deg)`,
                    borderRadius: 2,
                  }}
                />
              ))}
              <div
                className="w-64 h-72 overflow-hidden rounded-sm"
                style={{ background: "var(--bg-elevated)" }}
              >
                <img
                  src="/images/avatar.png"
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Sticker decorations */}
              <div
                className="absolute -top-5 -left-5 text-4xl"
                style={{ transform: "rotate(-15deg)" }}
              >
                🤖
              </div>
              <div
                className="absolute -bottom-4 -right-4 text-3xl"
                style={{ transform: "rotate(10deg)" }}
              >
                🧠
              </div>
              {/* Name caption */}
              <p
                className="text-center mt-3 text-sm font-bold"
                style={{
                  color: "#1a1a1a",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {personal.name}
              </p>
            </motion.div>
          </ScrollZoom>

          {/* Text content */}
          <div>
            <SplitText
              text="Hello!"
              as="h2"
              type="chars"
              stagger={0.08}
              variant="mask-reveal"
              className="mb-6"
              style={{ fontFamily: "var(--font-heading)", fontSize: "4.5rem", fontWeight: 800 }}
            />

            <SplitText
              text={personal.bio}
              as="p"
              type="words"
              stagger={0.04}
              className="mb-8"
              style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--text-muted)" }}
            />

            {/* Contact badges */}
            <div className="grid grid-cols-2 gap-3">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.04, x: 4 }}
                  className="flex items-center gap-3 rounded-xl"
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid ${item.color}33`,
                    padding: "12px 16px",
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span
                    className="text-xs truncate"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: item.color,
                    }}
                  >
                    {item.label}
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
