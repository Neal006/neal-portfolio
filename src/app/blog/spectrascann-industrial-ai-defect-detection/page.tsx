import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpectraScan: Building a Real-Time Industrial AI Paint Defect Detection System",
  description:
    "Neal Daftary built SpectraScan (CON-SOL-E Vision Pro) — an industrial Computer Vision platform for automotive paint defect detection using DINOv2, OpenVINO, FastAPI, and a PLC-driven gantry. 4th National Rank at Mitsubishi Electric Cup 2026.",
  keywords: [
    "SpectraScan industrial AI",
    "paint defect detection AI",
    "DINOv2 semantic segmentation",
    "OpenVINO inference optimisation",
    "industrial computer vision system",
    "Mitsubishi Electric Cup 2026",
    "automotive defect detection deep learning",
    "CON-SOL-E Vision Pro",
    "Neal Daftary computer vision",
    "FastAPI streaming computer vision",
    "PLC gantry AI integration",
    "Nirma University computer vision project",
  ],
  openGraph: {
    title: "SpectraScan: Industrial AI Paint Defect Detection",
    description: "4th National Rank at Mitsubishi Electric Cup 2026. Real-time DINOv2 + OpenVINO defect detection for automotive paint inspection.",
    type: "article",
    authors: ["Neal Daftary"],
    publishedTime: "2026-03-10",
  },
};

const prose: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", maxWidth: "65ch" };
const h2Style: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "var(--text)", marginTop: "3rem", marginBottom: "1rem", letterSpacing: "0.02em" };
const codeBlock: React.CSSProperties = { background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "20px 24px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent-y)", overflowX: "auto", lineHeight: 1.7, margin: "1.5rem 0" };

export default function SpectraScanPost() {
  return (
    <article itemScope itemType="https://schema.org/TechArticle">
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          {["Computer Vision", "DINOv2", "OpenVINO", "Industrial AI", "Mitsubishi Electric Cup"].map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-y)", border: "1px solid var(--accent-y)", borderRadius: "999px", padding: "3px 10px" }}>{t}</span>
          ))}
        </div>
        <time dateTime="2026-03-10" itemProp="datePublished" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>
          March 10, 2026
        </time>
        <h1 itemProp="headline" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1, letterSpacing: "0.01em", color: "var(--text)", marginBottom: "1.5rem" }}>
          SPECTRASCANN: BUILDING A REAL-TIME INDUSTRIAL AI PAINT DEFECT DETECTION SYSTEM
        </h1>
        <p style={{ ...prose, fontSize: "1.1rem", color: "var(--text)", lineHeight: 1.6 }}>
          SpectraScan (shipped as CON-SOL-E Vision Pro) is a full-stack industrial AI platform for
          automotive paint quality inspection. It won 4th National Rank at the 6th Mitsubishi
          Electric Cup 2026 competing against teams from IITs, NITs, and top engineering colleges.
        </p>
      </div>

      {/* Results */}
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--accent-y)30", borderRadius: "var(--radius-md)", padding: "28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "24px", margin: "2rem 0" }}>
        {[
          { val: "4th", label: "National Rank" },
          { val: "92.35%", label: "Segmentation accuracy" },
          { val: "<500ms", label: "End-to-end latency" },
          { val: "3", label: "Defect classes detected" },
        ].map((s) => (
          <div key={s.label}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--accent-y)", lineHeight: 1, display: "block" }}>{s.val}</span>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "6px" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>THE PROBLEM: PAINT DEFECTS IN AUTOMOTIVE MANUFACTURING</h2>
      <p style={prose}>
        Automotive door panels reject rates from paint defects — dust inclusions, scratches, and
        rundown (drips) — cost manufacturers millions annually. Manual visual inspection is
        inconsistent, subjective, and slow. The brief: build a system that detects all three defect
        classes in real-time and triggers a PLC-controlled CNC gantry for automated remediation.
      </p>

      <h2 style={h2Style}>ARCHITECTURE OVERVIEW</h2>
      <div style={codeBlock}>
        {`Camera capture (FLIR industrial)
    ↓
DINOv2 ViT-B/14 backbone (OpenVINO INT8, ~180ms)
    ↓
FPN-UNet segmentation head (defect mask generation)
    ↓
FastAPI SSE stream → Electron.js desktop client
    ↓
PLC serial bridge → CNC gantry XY positioning
    ↓
PDF inspection report (defect coordinates, severity)`}
      </div>

      <h2 style={h2Style}>WHY DINOV2 + OPENVINO?</h2>
      <p style={prose}>
        DINOv2&apos;s self-supervised ViT features generalise remarkably well to industrial textures
        without domain-specific pretraining — critical when you have limited labelled defect data.
        OpenVINO INT8 quantisation on an Intel iGPU brought inference from 850ms to sub-500ms
        without meaningful accuracy degradation, enabling real-time feedback on the production line.
      </p>
      <p style={{ ...prose, marginTop: "1rem" }}>
        Alternatives considered: YOLOv8-seg (too fast but lower precision on subtle paint texture
        defects), SAM (too slow for real-time), ResNet50 FPN (insufficient feature richness for
        the rundown class).
      </p>

      <h2 style={h2Style}>THE RAG CHATBOT MODULE</h2>
      <p style={prose}>
        SpectraScan ships an embedded local RAG chatbot (Phi-3-mini + ChromaDB) that allows factory
        operators to query inspection history, defect statistics, and maintenance logs in natural
        language — no cloud dependency, all inference runs on-device. This was built using LangChain
        with a custom chunking strategy optimised for structured PDF inspection report text.
      </p>

      <h2 style={h2Style}>TRAINING DETAILS</h2>
      <div style={codeBlock}>
        {`Dataset:     Custom-labelled automotive door panel images
             3 classes: Dust, Scratch, Rundown
Backbone:    DINOv2 ViT-B/14 (frozen)
Head:        FPN-UNet (trained from scratch)
Tracking:    MLflow experiment tracking
Tuning:      Optuna hyperparameter search (150 trials)
Accuracy:    92.35% mIoU on test split`}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <a href="https://github.com/Neal006/CON-SOL-E_VISION_SYSTEM" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 24px", background: "var(--accent-y)", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", borderRadius: "4px", fontWeight: 700 }}>
          View on GitHub →
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
