import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { default: "Blog", template: "%s | Neal Daftary" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <nav
        style={{
          padding: "20px 40px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            letterSpacing: "0.08em",
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          NEAL<span style={{ color: "var(--accent-y)" }}>.</span>
        </Link>
        <Link
          href="/#works"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            textDecoration: "none",
          }}
        >
          ← Back to Portfolio
        </Link>
      </nav>
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "5rem 24px 8rem" }}>
        {children}
      </main>
    </div>
  );
}
