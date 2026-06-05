import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOLV.ai: Cutting Voice AI Inference Cost by 99.9% with ONNX Ensembles",
  description:
    "Neal Daftary replaced a $1,500/M GPT-3.5 voice AI pipeline with a $1.83/M dual-model ONNX ensemble using DistilBERT-MNLI and MiniLM-L6, reducing latency from 35ms to 12ms (65%) with 100% category accuracy.",
  keywords: [
    "SOLV.ai voice complaint management",
    "ONNX DistilBERT inference optimisation",
    "voice AI FMCG",
    "LLM cost reduction ONNX",
    "MiniLM-L6 classification",
    "agentic AI voice pipeline",
    "FSM agent orchestration",
    "Groq Ollama fallback LLM",
    "Neal Daftary ONNX",
    "AI cost reduction engineering",
    "TTS Groq pipeline",
  ],
  openGraph: {
    title: "SOLV.ai: 99.9% Cost Reduction on Voice AI with ONNX",
    description: "From $1,500/M to $1.83/M. How a dual-model ONNX ensemble replaced GPT-3.5 for FMCG voice complaint management.",
    type: "article",
    authors: ["Neal Daftary"],
    publishedTime: "2025-11-20",
  },
};

const prose: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", maxWidth: "65ch" };
const h2Style: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "var(--text)", marginTop: "3rem", marginBottom: "1rem", letterSpacing: "0.02em" };
const codeBlock: React.CSSProperties = { background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "20px 24px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent-y)", overflowX: "auto", lineHeight: 1.7, margin: "1.5rem 0" };

export default function SolvAiPost() {
  return (
    <article itemScope itemType="https://schema.org/TechArticle">
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          {["ONNX", "Voice AI", "Agentic AI", "Cost Optimisation", "LLM Engineering"].map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-y)", border: "1px solid var(--accent-y)", borderRadius: "999px", padding: "3px 10px" }}>{t}</span>
          ))}
        </div>
        <time dateTime="2025-11-20" itemProp="datePublished" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>
          November 20, 2025
        </time>
        <h1 itemProp="headline" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1, letterSpacing: "0.01em", color: "var(--text)", marginBottom: "1.5rem" }}>
          SOLV.AI: CUTTING VOICE AI INFERENCE COST BY 99.9% WITH ONNX ENSEMBLES
        </h1>
        <p style={{ ...prose, fontSize: "1.1rem", color: "var(--text)", lineHeight: 1.6 }}>
          The brief: build an AI voice complaint management system for an FMCG brand that
          categorises, analyses, and responds to customer calls automatically. The first prototype
          used GPT-3.5 end-to-end and cost $1,500 per million tokens. The shipped system costs
          $1.83. Here&apos;s how.
        </p>
      </div>

      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--accent-y)30", borderRadius: "var(--radius-md)", padding: "28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "24px", margin: "2rem 0" }}>
        {[
          { val: "99.9%", label: "Cost reduction" },
          { val: "65%", label: "Latency reduction" },
          { val: "100%", label: "Category accuracy" },
          { val: "$1.83/M", label: "vs $1,500 GPT-3.5" },
        ].map((s) => (
          <div key={s.label}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--accent-y)", lineHeight: 1, display: "block" }}>{s.val}</span>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "6px" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>THE ORIGINAL PIPELINE (AND ITS PROBLEM)</h2>
      <p style={prose}>
        GPT-3.5-turbo is excellent at NLU but catastrophically expensive when every
        customer call goes through it. FMCG complaint volumes are high — thousands of calls daily —
        meaning the cost model doesn&apos;t survive contact with production traffic.
      </p>

      <h2 style={h2Style}>THE ONNX ENSEMBLE APPROACH</h2>
      <div style={codeBlock}>
        {`Input audio (STT via Groq Whisper)
    ↓
Dual-model ONNX ensemble (12ms total):
  ├── DistilBERT-MNLI (zero-shot classification, INT8)
  └── MiniLM-L6-v2   (semantic similarity scoring)
    ↓
VADER sentiment analysis (rule-based, ~0ms)
    ↓
6-state FSM agent orchestration
  ├── State: Greeting / Intent / Clarify / Resolve / Escalate / Close
  └── 5 specialised agents (one per resolution path)
    ↓
Groq LLM (primary) → Ollama local (fallback)
    ↓
Dual TTS: ElevenLabs (primary) → pyttsx3 (fallback)`}
      </div>

      <h2 style={h2Style}>WHY ONNX + DISTILBERT INSTEAD OF GPT?</h2>
      <p style={prose}>
        Intent classification is a solved problem for narrow domains. DistilBERT-MNLI in ONNX
        INT8 achieves 100% accuracy on the FMCG complaint taxonomy (product quality, delivery,
        billing, returns) at 12ms latency. GPT-3.5 adds latency, cost, and non-determinism
        to a task that doesn&apos;t require it.
      </p>
      <p style={{ ...prose, marginTop: "1rem" }}>
        The 6-state FSM ensures predictable state transitions. Agentic loops with LLMs are
        powerful but unpredictable — for a voice interaction where every second counts, a
        deterministic FSM with LLM generation only at the response layer gives you the best
        of both worlds.
      </p>

      <h2 style={h2Style}>THE DUAL-FALLBACK ARCHITECTURE</h2>
      <p style={prose}>
        Every critical path has a fallback. If Groq&apos;s API is unavailable, the system routes
        to a locally-running Ollama instance (Llama-3.1-8B). If ElevenLabs TTS is down, pyttsx3
        handles synthesis locally. Zero downtime in production.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <a href="https://github.com/Neal006" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 24px", background: "var(--accent-y)", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", borderRadius: "4px", fontWeight: 700 }}>
          GitHub Profile →
        </a>
      </div>

      <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }} itemProp="author" itemScope itemType="https://schema.org/Person">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          Written by <span itemProp="name">Neal Daftary</span> — <span itemProp="jobTitle">AI & ML Engineer</span>, <span itemProp="affiliation">Nirma University, Ahmedabad</span>
        </p>
      </div>
    </article>
  );
}
