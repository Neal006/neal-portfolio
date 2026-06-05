import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Technical Writing — AI/ML Engineering Notes",
  description:
    "Technical deep-dives by Neal Daftary — AI & ML Engineer at Nirma University. Covers LLM memory benchmarking, industrial Computer Vision, RAG architecture, and ISRO-funded research.",
};

const POSTS = [
  {
    slug: "memorylens-llm-memory-benchmark",
    title: "MemoryLens: Benchmarking LLM Memory Decay Across 100 Conversation Turns",
    date: "2026-01-15",
    tags: ["LLM", "RAG", "Open Source", "Benchmarking"],
    excerpt:
      "I built MemoryLens after noticing that no publicly available framework quantified how different memory architectures degrade over extended conversations. Here's what I found.",
  },
  {
    slug: "spectrascann-industrial-ai-defect-detection",
    title: "SpectraScan: Building a Real-Time Industrial AI Paint Defect Detection System",
    date: "2026-03-10",
    tags: ["Computer Vision", "DINOv2", "OpenVINO", "Industrial AI"],
    excerpt:
      "How we built a full-stack industrial defect detection platform using DINOv2, OpenVINO, and a FastAPI streaming pipeline — and secured 4th National Rank at the Mitsubishi Electric Cup.",
  },
  {
    slug: "solv-ai-voice-complaint-management",
    title: "SOLV.ai: Cutting Voice AI Inference Cost by 99.9% with ONNX Ensembles",
    date: "2025-11-20",
    tags: ["ONNX", "DistilBERT", "LLM", "Agentic AI"],
    excerpt:
      "We replaced a $1,500/M GPT-3.5 pipeline with a $1.83/M dual-model ONNX ensemble and a 6-state FSM. This is how we did it.",
  },
];

const tagStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.55rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--accent-y)",
  border: "1px solid var(--accent-y)",
  borderRadius: "999px",
  padding: "3px 10px",
};

export default function BlogIndex() {
  return (
    <>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          lineHeight: 0.9,
          color: "var(--text)",
          marginBottom: "1rem",
        }}
      >
        TECHNICAL
        <br />
        <span style={{ WebkitTextStroke: "2px var(--text)", color: "transparent" }}>WRITING</span>
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.95rem",
          color: "var(--text-muted)",
          lineHeight: 1.7,
          marginBottom: "4rem",
          maxWidth: "50ch",
        }}
      >
        Deep-dives into AI architecture decisions, benchmark results, and engineering trade-offs from projects I've shipped.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              style={{
                padding: "32px 0",
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                {post.tags.map((t) => (
                  <span key={t} style={tagStyle}>{t}</span>
                ))}
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  color: "var(--text)",
                  lineHeight: 1.3,
                  marginBottom: "10px",
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                  marginBottom: "12px",
                }}
              >
                {post.excerpt}
              </p>
              <time
                dateTime={post.date}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
