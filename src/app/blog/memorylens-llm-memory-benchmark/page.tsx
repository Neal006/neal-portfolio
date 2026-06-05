import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MemoryLens: Benchmarking LLM Memory Decay Across 100 Conversation Turns",
  description:
    "Neal Daftary built MemoryLens — the open-source benchmark for LLM memory decay. Compares Naive, RAG, Chunked RAG, Cascading Temporal, and SummaryMemory architectures across 100 conversation turns. Cascading Temporal achieves 5.45× recall/token vs naive truncation.",
  keywords: [
    "LLM memory benchmark",
    "RAG memory decay",
    "LLM long context evaluation",
    "Cascading Temporal memory",
    "sentence-transformers benchmark",
    "LLM conversation memory",
    "MemoryLens open source",
    "Neal Daftary LLM research",
    "Nirma University AI research",
    "Groq LLM evaluation",
    "Ebbinghaus forgetting curve LLM",
    "RAG vs naive truncation benchmark",
  ],
  openGraph: {
    title: "MemoryLens: Benchmarking LLM Memory Decay",
    description: "Open-source framework measuring how AI memory architectures degrade over 100 conversation turns.",
    type: "article",
    authors: ["Neal Daftary"],
    publishedTime: "2026-01-15",
  },
};

const prose: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  lineHeight: 1.8,
  color: "var(--text-muted)",
  maxWidth: "65ch",
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
  color: "var(--text)",
  marginTop: "3rem",
  marginBottom: "1rem",
  letterSpacing: "0.02em",
};

const codeBlock: React.CSSProperties = {
  background: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  padding: "20px 24px",
  fontFamily: "var(--font-mono)",
  fontSize: "0.8rem",
  color: "var(--accent-y)",
  overflowX: "auto",
  lineHeight: 1.7,
  margin: "1.5rem 0",
};

const metric: React.CSSProperties = {
  display: "inline-block",
  fontFamily: "var(--font-display)",
  fontSize: "2.5rem",
  color: "var(--accent-y)",
  lineHeight: 1,
};

export default function MemoryLensPost() {
  return (
    <article itemScope itemType="https://schema.org/TechArticle">
      {/* Meta */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          {["LLM", "RAG", "Open Source", "Benchmarking", "Memory Architecture"].map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent-y)",
                border: "1px solid var(--accent-y)",
                borderRadius: "999px",
                padding: "3px 10px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <time
          dateTime="2026-01-15"
          itemProp="datePublished"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "20px",
          }}
        >
          January 15, 2026
        </time>
        <h1
          itemProp="headline"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            lineHeight: 1,
            letterSpacing: "0.01em",
            color: "var(--text)",
            marginBottom: "1.5rem",
          }}
        >
          MEMORYLENS: BENCHMARKING LLM MEMORY DECAY ACROSS 100 CONVERSATION TURNS
        </h1>
        <p
          itemProp="description"
          style={{ ...prose, fontSize: "1.1rem", color: "var(--text)", lineHeight: 1.6 }}
        >
          I built MemoryLens after noticing a glaring gap: every RAG tutorial claims superior
          recall, but nobody had actually measured how memory architectures degrade as conversations
          grow longer. So I quantified it.
        </p>
      </div>

      {/* Key results callout */}
      <div
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--accent-y)30",
          borderRadius: "var(--radius-md)",
          padding: "28px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "24px",
          margin: "2rem 0",
        }}
      >
        {[
          { val: "5.45×", label: "Recall/token improvement" },
          { val: "85%", label: "Chunked RAG recall @ T=100" },
          { val: "78%", label: "Lower cost vs naive" },
          { val: "100", label: "Conversation turns tested" },
        ].map((s) => (
          <div key={s.label}>
            <span style={metric}>{s.val}</span>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginTop: "6px",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* The problem */}
      <h2 style={h2Style}>THE PROBLEM WITH LLM MEMORY</h2>
      <p style={prose}>
        LLMs forget. When a conversation exceeds the context window, tokens get dropped — and the
        model loses facts it was told 30 messages ago. Naive truncation (just dropping old tokens)
        is the default behaviour in most production chatbots. RAG-based memory retrieves relevant
        chunks instead of dropping them blindly. But how much better is it, really, at turn 50?
        Turn 100?
      </p>
      <p style={{ ...prose, marginTop: "1rem" }}>
        I modelled memory decay using <strong style={{ color: "var(--text)" }}>Ebbinghaus
        forgetting curves</strong> alongside exponential and linear decay models, then ran
        statistical multi-seed benchmarks across five memory backends.
      </p>

      {/* Architectures */}
      <h2 style={h2Style}>FIVE MEMORY ARCHITECTURES TESTED</h2>
      <div style={codeBlock}>
        {`1. Naive           → Sliding window truncation. Baseline.
2. RAG             → Dense retrieval (all-MiniLM-L6-v2) on full history.
3. Chunked RAG     → Chunked dense retrieval, top-8 → rerank top-4.
4. Cascading       → Temporal decay-weighted retrieval. Best efficiency.
5. SummaryMemory   → LLM-generated rolling summaries.`}
      </div>

      {/* Metrics */}
      <h2 style={h2Style}>EVALUATION METRICS</h2>
      <p style={prose}>
        All five metrics are computed without requiring an API key — content-based evaluation only:
      </p>
      <div style={codeBlock}>
        {`Recall@T         — Is the fact present in retrieved context at turn T?
Precision@K      — What fraction of retrieved chunks are relevant?
Temporal Drift   — How much stale/contaminated content leaks through?
Memory Noise     — Ratio of irrelevant content in the context window.
Cascade Efficiency — Recall improvement per token consumed.`}
      </div>

      {/* Results */}
      <h2 style={h2Style}>BENCHMARK RESULTS</h2>
      <p style={prose}>
        At turn 100, Chunked RAG achieves <strong style={{ color: "var(--text)" }}>85% recall
        using 38 tokens/query</strong>. Cascading Temporal delivers{" "}
        <strong style={{ color: "var(--text)" }}>5.45× better recall-per-token efficiency
        than naive truncation</strong>. Naive truncation bottoms out at 31% recall.
      </p>
      <p style={{ ...prose, marginTop: "1rem" }}>
        SummaryMemory showed high recall but suffered from hallucination drift — the LLM-generated
        summaries introduced factual contamination at scale, making it unreliable for high-stakes
        applications.
      </p>

      {/* Why it matters */}
      <h2 style={h2Style}>WHY THIS MATTERS FOR PRODUCTION RAG</h2>
      <p style={prose}>
        If you&apos;re building a customer support chatbot, a coding assistant, or any long-horizon
        conversational AI and using naive truncation, you&apos;re silently losing context that
        directly impacts response quality. MemoryLens gives you a reproducible framework to test
        your memory strategy before it fails in production.
      </p>

      {/* OSS + Links */}
      <h2 style={h2Style}>OPEN SOURCE</h2>
      <p style={prose}>
        MemoryLens is fully open-source. It ships with 24 integration tests, CI via GitHub Actions
        (Python 3.10–3.11), a Streamlit dashboard, and supports Groq, OpenAI, Anthropic, OpenRouter,
        and Ollama as LLM backends — no API key required for the content-based metrics path.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <a
          href="https://github.com/Neal006/memorylens"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 24px",
            background: "var(--accent-y)",
            color: "#000",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: 700,
          }}
        >
          View on GitHub →
        </a>
      </div>

      {/* Author */}
      <div
        style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
        }}
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Written by <span itemProp="name">Neal Daftary</span> —{" "}
          <span itemProp="jobTitle">AI & ML Engineer</span>,{" "}
          <span itemProp="affiliation">Nirma University, Ahmedabad</span>
        </p>
      </div>
    </article>
  );
}
