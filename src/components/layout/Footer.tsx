"use client";
import { personal } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
        padding: "24px 40px",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          © {new Date().getFullYear()} {personal.name} — All rights reserved
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            letterSpacing: "0.08em",
            color: "var(--text)",
          }}
        >
          {personal.name.split(" ")[0].toUpperCase()}
          <span style={{ color: "var(--accent-y)" }}>.</span>
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Built with ✦ in Ahmedabad
        </span>
      </div>
    </footer>
  );
}
