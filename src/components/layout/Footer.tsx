"use client";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { personal } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-16 px-6 border-t"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            className="text-5xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            {personal.name.split(" ")[0].toUpperCase()}
            <span style={{ color: "var(--accent-y)" }}>.</span>
          </span>
        </motion.div>

        {/* Social links */}
        <div className="flex gap-4">
          {[
            {
              label: "GitHub",
              href: `https://github.com/${personal.contact.github}`,
            },
            {
              label: "LinkedIn",
              href: `https://linkedin.com/in/${personal.contact.linkedin}`,
            },
            { label: "Email", href: `mailto:${personal.contact.email}` },
          ].map((link) => (
            <MagneticButton
              key={link.label}
              className="px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                background: "transparent",
              }}
              onClick={() => window.open(link.href, "_blank")}
            >
              {link.label}
            </MagneticButton>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="text-xs"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
          }}
        >
          © {year} {personal.name}. Built with ✦
        </p>
      </div>
    </footer>
  );
}
