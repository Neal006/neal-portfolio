import { repoProjects } from "./projects.generated";
import type { Project, ProjectCategory } from "./types";

/* Resume-sourced facts and showcase extras layered over the README write-ups. */
const OVERRIDES: Record<string, Partial<Project>> = {
  minutes: {
    tagline: "AI meeting notes delivered 9–28 s after the call ends — at $0 AI cost.",
    description:
      "An AI meeting-notes app that streams audio to Groq Whisper and extracts summaries, decisions and action items with free OpenRouter LLMs. A free-model-only guard, per-call provenance logging, fallback chains and a silent-audio filter keep AI spend at $0 — verified against OpenRouter's own records.",
    highlights: [
      "Summaries, decisions and action items 9–28 s after a meeting ends",
      "$0 AI cost: free-model guard, provenance logging, fallback chains, silent-audio filter",
      "18 unit tests, 17 browser e2e tests and a no-mocks live test",
      "CI → Docker → Argo CD pipeline deploying to Oracle Always Free for $0/month",
    ],
    stack: ["TypeScript", "React", "Express", "SQLite", "Groq Whisper", "OpenRouter", "Kubernetes", "Argo CD"],
    metric: { value: "$0", label: "monthly AI + infra cost" },
  },
  helioops: {
    homepage: "https://helioops.dpdns.org/",
    highlights: [
      "29-hour warning window on the replayed Oct 2024 G4 storm; full pipeline in 8 s",
      "6 LightGBM quantile models with 95.9% (GPS) / 94.2% (HF) interval coverage",
      "Kubernetes on AWS EKS (Terraform), staging + production, Argo CD GitOps",
      "284 backend tests; CI lints, tests and builds multi-stage Docker images before every deploy",
    ],
    stack: ["Python", "FastAPI", "OpenCV", "LightGBM", "ChromaDB RAG", "Next.js", "AWS EKS", "Terraform"],
    metric: { value: "29h", label: "storm warning lead time" },
  },
  mcptail: { metric: { value: "1", label: "command to wiretap every MCP server" } },
  memorylens: {
    homepage: null,
    metric: { value: "1/21", label: "the tokens at 100% recall" },
  },
  noonshift: { metric: { value: "−69%", label: "CO₂ on 36 real charging sessions" } },
  "lumin-ai": {
    award: "Winner · HACKaMINeD 2026",
    metric: { value: "0%", label: "hallucination across 27 ablations" },
  },
  spectrascan: {
    title: "SpectraScan",
    tagline: "Industrial paint-defect vision system — DINOv2 segmentation wired to a PLC.",
    award: "National Rank 4 · Mitsubishi Electric Cup 2026",
    metric: { value: "#4", label: "nationally, factory automation" },
  },
  "fashion-retrieval": { metric: { value: "~200ms", label: "per query on CPU" } },
  "visual-search": {
    title: "Jersey Visual Search",
    description:
      "Built at 8xSports: YOLOv8 crops the jersey, DINOv2 embeds it, and a FAISS index finds visually similar designs across a 15,000+ image catalogue, GPU-accelerated with CUDA.",
  },
  "entity-resolution": { title: "Entity Resolution @ Amazon ML Challenge" },
};

const FEATURED = [
  "minutes",
  "helioops",
  "mcptail",
  "memorylens",
  "noonshift",
  "lumin-ai",
  "spectrascan",
  "fashion-retrieval",
] as const;

export const projects: Project[] = repoProjects
  .map((p) => ({ ...p, ...OVERRIDES[p.slug], featured: (FEATURED as readonly string[]).includes(p.slug) }))
  .sort((a, b) => b.weight - a.weight || b.year - a.year);

export const featuredProjects: Project[] = FEATURED.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is Project => p !== undefined,
);

export const projectCategories: ProjectCategory[] = [...new Set(projects.map((p) => p.category))];
