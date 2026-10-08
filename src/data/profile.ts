/* Resume content (public/proofs/Neal_Daftary_Resume.pdf, Oct 2026). */
import type { OssHighlight, Role } from "./types";

export const personal = {
  name: "Neal Daftary",
  first: "Neal",
  last: "Daftary",
  role: "Software & AI Engineer",
  location: "Ahmedabad, India",
  timezone: "Asia/Kolkata",
  status: "SWE Intern @ Curriculo",
  pitch:
    "I build AI products end to end — from the model to the Kubernetes cluster — and fix the open-source libraries they run on.",
  email: "nealdaftary0405@gmail.com",
  github: "Neal006",
  githubUrl: "https://github.com/Neal006",
  linkedinUrl: "https://www.linkedin.com/in/neal-daftary-45743731a/",
  resume: "/proofs/Neal_Daftary_Resume.pdf",
  site: "https://neal-daftary.vercel.app",
  photo: "/images/avatar.png",
};

export const education = {
  school: "Nirma University",
  degree: "B.Tech in Computer Science & Engineering (AI & ML)",
  period: "2024 — 2028",
  detail: "CGPA 7.7 (through 4th semester)",
  location: "Ahmedabad, India",
};

export const experience: Role[] = [
  {
    company: "Curriculo",
    role: "Software Engineering Intern",
    period: "Aug 2026 — Present",
    location: "Remote",
    current: true,
    url: "https://curriculo.me/",
    points: [
      "Built real-time notifications that merge 5 event sources into a single SQL query.",
      "Translated job pages into 200 locales via NLLB + caching, cutting 30–60 DB lookups per page to 1.",
      "Shipped the curriculo.me redesign in 8 languages on Cloudflare Pages, preserving SEO with 12 URL redirects.",
      "Deployed to AWS (EC2, RDS, S3) through CI/CD and closed a cross-tenant data leak in the Gmail integration.",
    ],
    stack: ["NestJS", "PostgreSQL", "Next.js", "AWS", "Cloudflare", "NLLB"],
  },
  {
    company: "MZHubtech",
    role: "Software Engineering Intern",
    period: "Oct 2025 — Dec 2025",
    location: "Remote",
    url: "https://www.mzhub.in/",
    points: [
      "Deployed a Next.js 14 SSR app on Azure App Service via GitHub Actions CI/CD.",
      "Wired the frontend to Azure Cosmos DB and SendGrid SMTP for serverless contact automation.",
    ],
    stack: ["Next.js", "Azure", "Cosmos DB", "SendGrid", "GitHub Actions"],
  },
  {
    company: "8xSports",
    role: "AI Engineering Intern",
    period: "Jun 2025 — Sep 2025",
    location: "Remote",
    url: "https://www.8xsports.in/",
    points: [
      "Built a visual search engine that finds similar jerseys across a 15,000+ image catalogue.",
      "Cropped jerseys with YOLOv8 and matched DINO feature vectors, GPU-accelerated with CUDA.",
      "Earned a Letter of Recommendation for high-impact execution.",
    ],
    stack: ["YOLOv8", "DINOv2", "FAISS", "CUDA", "PyTorch"],
  },
];

export const LOR_URL =
  "https://www.dropbox.com/scl/fi/ik5xc58n8yzocu64c5c1p/neal_LOR.pdf?rlkey=ipvts289b7fvf11akny1ywerf&st=33ay7dnd&dl=0";

const prs = (repo: string, nums: number[]) =>
  nums.map((n) => ({ number: n, url: `https://github.com/${repo}/pull/${n}` }));

/** Hand-written context for the headline upstream contributions. */
export const ossHighlights: OssHighlight[] = [
  {
    org: "Google DeepMind",
    project: "JAX Privacy",
    summary:
      "Migrated 9 modules off chex to optax.ArrayTree / jax.typing, raised the jax/jaxlib floor, and fixed CI type-checks and docs.",
    prs: prs("google-deepmind/jax_privacy", [301, 304, 316, 321, 333]),
  },
  {
    org: "Google DeepMind",
    project: "TORAX",
    summary:
      "Rebuilt the Plotly animation slider — 2.5× faster render and a 76% smaller payload, closing an issue open since 2024.",
    prs: prs("google-deepmind/torax", [2318]),
  },
  {
    org: "Hugging Face",
    project: "Transformers",
    summary: "Fixed an ImportError that broke model exporters on torch < 2.8 in a 150k★ repo.",
    prs: prs("huggingface/transformers", [47710, 47711]),
  },
  {
    org: "OpenCV",
    project: "OpenCV",
    summary:
      "Made 4 functions — SIFT, inpaint, matchTemplate, findTransformECC — accept boolean masks by relaxing outdated type checks.",
    prs: prs("opencv/opencv", [29676, 29677, 29679, 29681]),
  },
  {
    org: "Anthropic",
    project: "Claude Code Action",
    summary: "Restored tool-result text dropped from job summaries and fixed bot-actor comment filters.",
    prs: prs("anthropics/claude-code-action", [1616, 1619]),
  },
  {
    org: "Cloudflare",
    project: "workers-sdk",
    summary: "Stopped a crash on malformed SSH config values with proper validation and clear errors.",
    prs: prs("cloudflare/workers-sdk", [15088]),
  },
];

export const publication = {
  venue: "IEEE Sensors Letters",
  meta: "SCI Q3 · IF 2.2 · Jan 2026",
  title: "CatBoost Anomaly Detection in Robotic Arms",
  summary:
    "A CatBoost anomaly detector for industrial robotic-arm faults, outperforming SVM, Logistic Regression, Naive Bayes and QDA baselines.",
  url: "https://ieeexplore.ieee.org/document/11359621/",
  stats: [
    { value: "97.20%", label: "Accuracy" },
    { value: "0.9718", label: "F1-score" },
    { value: "4", label: "Baselines beaten" },
  ],
};

export const achievements = [
  {
    title: "Winner, Aubergine Track",
    event: "HACKaMINeD National Hackathon 2026",
    detail: "Top 5 nationally among 2,300+ participants",
  },
  {
    title: "National Rank 4",
    event: "Mitsubishi Electric Cup, 6th Edition (2026)",
    detail: "National-level factory automation competition",
  },
  {
    title: "Published author",
    event: "IEEE Sensors Letters (2026)",
    detail: "CatBoost anomaly detection in robotic arms",
  },
  {
    title: "Letter of Recommendation",
    event: "8xSports (2025)",
    detail: "For high-impact computer vision work",
  },
];

export const leadership = {
  role: "Student Chairperson",
  org: "Nirma University ACM Student Chapter",
  period: "Sep 2025 — Present",
  summary:
    "Leading a 150+ member tech community — launched Prompt to Prototype, a one-day AI build challenge, and mentorship tracks.",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "Rust (learning)"] },
  {
    group: "Full Stack",
    items: ["Next.js", "NestJS", "React", "Prisma", "PostgreSQL", "TanStack Query", "Redis", "BullMQ", "FastAPI", "Node.js", "WebSocket", "REST / SSE"],
  },
  {
    group: "AI / ML",
    items: ["PyTorch", "scikit-learn", "Hugging Face", "OpenCV", "ONNX", "TensorRT", "Optuna", "LangChain", "LangGraph", "LangSmith", "AgentScope", "ChromaDB", "FAISS", "MLflow"],
  },
  {
    group: "Cloud & Ops",
    items: ["AWS (EKS, ECS, S3, CloudFront, RDS)", "Azure", "Docker", "Kubernetes", "Terraform", "Argo CD", "GitHub Actions", "Prometheus", "Grafana", "DVC", "Airflow"],
  },
  {
    group: "Practice",
    items: ["Computer Vision", "RAG", "Agentic AI", "MLOps", "Generative AI", "Prompt Engineering"],
  },
];
