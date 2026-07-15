export const personal = {
  name: "Neal Daftary",
  title: "AI & Machine Learning Engineer",
  tagline: "Computer Vision · LLM/RAG Systems · Full-Stack AI",
  bio: "Neal Daftary — an AI Engineer, Researcher & 3rd Year Undergrad at Nirma University who doesn't just study the field, I actively ship in it. From building real-time computer vision systems for sports analytics to contributing production code to Google DeepMind's differential privacy library, I operate at the intersection of deep learning, LLMs, and full-stack production AI. IEEE Published Journal Paper, 2x National Finalist, and leading a 150-member ACM chapter. I don't just learn AI, I build with it.",
  photo: "/images/avatar.png",
  contact: {
    phone: "+91-9106497430",
    email: "builtbyneal@gmail.com",
    github: "Neal006",
    linkedin: "neal-daftary-45743731a",
  },
};

export const skills = {
  software: [
    { name: "Python", icon: "🐍", color: "#4B8BBE" },
    { name: "TypeScript", icon: "📘", color: "#3178C6" },
    { name: "SQL", icon: "🗄️", color: "#CC4B4B" },
    { name: "PyTorch", icon: "🔥", color: "#EE4C2C" },
    { name: "LangChain", icon: "🔗", color: "#2D9E6B" },
    { name: "FastAPI", icon: "⚡", color: "#26A69A" },
    { name: "Next.js", icon: "▲", color: "#A0A0A0" },
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Docker", icon: "🐳", color: "#2496ED" },
    { name: "Groq", icon: "⚡", color: "#F55036" },
    { name: "FAISS", icon: "🔍", color: "#7C8CF0" },
    { name: "ChromaDB", icon: "🗃️", color: "#E84393" },
    { name: "HuggingFace", icon: "🤗", color: "#FFD21E" },
    { name: "ONNX", icon: "⚙️", color: "#6670C7" },
    { name: "YOLOv8", icon: "👁️", color: "#C8B833" },
    { name: "DINOv2", icon: "🦕", color: "#34D058" },
    { name: "OpenCV", icon: "📷", color: "#5C3EE8" },
    { name: "Azure", icon: "🔷", color: "#3A96DD" },
    { name: "MLflow", icon: "📊", color: "#1DA462" },
    { name: "scikit-learn", icon: "🧮", color: "#F7931E" },
    { name: "Streamlit", icon: "🌊", color: "#FF4B4B" },
    { name: "XGBoost", icon: "🚀", color: "#189AB4" },
    { name: "C++", icon: "🔧", color: "#00599C" },
    { name: "JavaScript", icon: "🟨", color: "#F7DF1E" },
    { name: "Node.js", icon: "🟢", color: "#339933" },
    { name: "Redis", icon: "📮", color: "#DC382D" },
    { name: "PostgreSQL", icon: "🐘", color: "#336791" },
    { name: "TensorRT", icon: "🚄", color: "#76B900" },
    { name: "SegFormer", icon: "🧩", color: "#8E44AD" },
    { name: "SAM2", icon: "✂️", color: "#FF6F61" },
    { name: "LangGraph", icon: "🕸️", color: "#1B7F5C" },
    { name: "LangSmith", icon: "🧵", color: "#3FBF7F" },
    { name: "DVC", icon: "📦", color: "#945DD6" },
    { name: "Airflow", icon: "🌬️", color: "#017CEE" },
    { name: "Grafana", icon: "📈", color: "#F46800" },
    { name: "AWS", icon: "☁️", color: "#FF9900" },
    { name: "Vercel", icon: "▲", color: "#666666" },
    { name: "Google Colab", icon: "📓", color: "#F9AB00" },
    { name: "Claude Code", icon: "🤖", color: "#D97757" },
  ],
  categories: [
    {
      label: "Languages",
      color: "#4B8BBE",
      items: ["Python", "TypeScript", "JavaScript", "C++", "SQL"],
    },
    {
      label: "AI / LLM / RAG",
      color: "#F55036",
      items: [
        "RAG Pipelines",
        "LLM Orchestration",
        "Prompt Engineering",
        "Guardrails",
        "Agentic Workflows",
        "LangGraph Agents",
      ],
    },
    {
      label: "Computer Vision",
      color: "#C8B833",
      items: [
        "Object Detection",
        "Semantic Segmentation",
        "Instance Segmentation",
        "CNN / ViT",
        "Image & Video Inference",
        "TensorRT Deployment",
      ],
    },
    {
      label: "ML",
      color: "#F7931E",
      items: [
        "Supervised & Unsupervised",
        "XAI / SHAP",
        "Anomaly Detection",
        "Hyperparameter Tuning",
        "ONNX Optimization",
        "MLOps (DVC / Airflow / Grafana)",
      ],
    },
    {
      label: "Full-Stack & Cloud",
      color: "#3A96DD",
      items: [
        "REST APIs",
        "SSE",
        "Docker",
        "GitHub Actions",
        "Azure App Services",
        "AWS (S3 / ECR / ECS / SageMaker)",
        "Redis / BullMQ",
        "PostgreSQL",
        "Railway",
        "Vercel",
      ],
    },
  ],
  personal: [
    "Computer Vision",
    "LLM / RAG Systems",
    "Deep Learning",
    "Research",
    "Full-Stack AI",
    "Leadership",
  ],
};

export const stats = [
  { value: "20+",  label: "Projects Shipped" },
  { value: "1",    label: "IEEE Publication" },
  { value: "12+",  label: "Freelance Projects" },
  { value: "1 yr", label: "Work Experience" },
];

export const experience = [
  {
    id: "exp1",
    period: "Jun 2025 – Sept 2025",
    company: "8xSports",
    role: "AI Intern (Remote)",
    description:
      "Maintained sub-800ms retrieval latency at 50× scale (15,000 athlete profiles) via a FAISS IVF-PQ/OPQ index with GPU batch encoding and nightly incremental updates. Cut edge-device inference to sub-20ms by fine-tuning YOLOv8s and exporting to ONNX + TensorRT FP16. Improved re-identification robustness under occlusion by fusing DINOv2 ViT-S/14 patch embeddings with LBP texture histograms.",
    accentColor: "#f7c948",
  },
  {
    id: "exp2",
    period: "Oct 2025 – Dec 2025",
    company: "MZHubtech",
    role: "Software Engineering Intern (Remote)",
    description:
      "Achieved +57% performance and +40% SEO gains (Core Web Vitals) by deploying an SSR Next.js app to Azure App Service via a GitHub Actions CI/CD pipeline. Integrated Azure Cosmos DB and SendGrid SMTP for scalable data persistence and automated transactional email. Shaped the product roadmap through R&D on agentic AI workflows and CX-automation chatbots.",
    accentColor: "#4af0f0",
  },
  {
    id: "exp3",
    period: "Jul 2026 – Present",
    company: "Google DeepMind",
    role: "Open Source Contributor (Remote)",
    description:
      "Contributing production code to jax_privacy, Google DeepMind's JAX-based differential privacy library — authoring and merging pull requests that extend its DP feature set, and refactoring the chex dependency to simplify setup for downstream users. Contributions reviewed and approved by the maintainer team.",
    accentColor: "#b18cff",
  },
];

export const education = [
  {
    period: "Sep 2024 – Jun 2028",
    institution: "Institute Of Technology, Nirma University",
    degree: "B.Tech in CSE (Artificial Intelligence & Machine Learning)",
    grade: "CGPA: 7.77 | JEE Mains 2024: 97.62 percentile",
  },
];

export const responsibilities = [
  {
    period: "Sept 2025 – Present",
    role: "Student Chairperson",
    organization: "Association for Computing Machinery (ACM) ITNU",
    description:
      "Leading 150+ member technical community. Launched 'Prompt to Prototype' and mentorship tracks across AI/ML, Data Science, Cybersecurity, and Web Dev.",
  },
];

export const research = {
  title: "CatBoost-Driven Anomaly Detection in Industrial Robotic Arms",
  publication: "IEEE Sensors Letters — SCI Q3 · IF 2.2 · Jan 2026",
  description:
    "Predictive industrial fault detection on 200K+ samples from the CASPER robotic arm dataset. CatBoost-based ensemble approach outperforming SVM, Logistic Regression, Naive Bayes, and Quadratic Discriminant Analysis baselines across all evaluation metrics.",
  link: "https://ieeexplore.ieee.org/document/11359621",
  stats: [
    { value: "97.20%", label: "Precision" },
    { value: "0.9718", label: "F1 Score" },
    { value: "4",      label: "Baselines Beat" },
  ],
  tags: ["CatBoost", "Fault Detection", "Robotics", "IEEE", "Sensors"],
};

export const works = [
  {
    id: "w9",
    title: "SOLV.ai",
    category: "AI / Voice / NLP",
    description:
      "AI-Powered Voice Complaint Management System for FMCG. Dual-model ONNX ensemble (DistilBERT-MNLI + MiniLM-L6) + VADER sentiment; 6-state FSM with 5 agents; dual LLM (Groq/Ollama) + dual TTS fallback. 65% latency reduction (35ms→12ms), 100% category accuracy. $1.83/M vs $1,500 GPT-3.5.",
    year: "2025",
    tags: ["ONNX", "DistilBERT", "FastAPI", "Groq"],
    link: "https://github.com/Neal006",
  },
  {
    id: "w10",
    title: "Production RAG Chatbot",
    category: "AI / LLM / RAG",
    description:
      "Production RAG chatbot for IAT Networks (ISP). Query expansion → MiniLM → ChromaDB (top-8) → reranking (top-4) → Groq SSE. 4-layer GuardRail (injection regex, PII, domain filter). Dockerized on Railway. 0% injection bypass, <800ms TTFT, zero downtime.",
    year: "2025",
    tags: ["ChromaDB", "Groq", "FastAPI", "Docker"],
    link: "https://github.com/Neal006/iatnetworks-chatbot",
  },
  {
    id: "w11",
    title: "MemoryLens",
    category: "AI / Research / LLM",
    description:
      "Open-source benchmark for LLM memory decay across long conversations. 3 backends (Naive, RAG, Cascading Temporal) × 5 content-based metrics. Cascading Temporal achieves 5.45× recall/token vs naive at T=100 with 78% lower cost. Streamlit dashboard + CI via GitHub Actions.",
    year: "2025",
    tags: ["Groq", "sentence-transformers", "Streamlit", "GitHub Actions"],
    link: "https://github.com/Neal006/memorylens",
  },
  {
    id: "w1",
    title: "Lumin.AI",
    category: "AI / Predictive Maintenance",
    description:
      "AI-Powered Solar Inverter Predictive Maintenance Platform. Architected a 7-stage ETL pipeline, built hybrid Isolation Forest & XGBoost risk engine, deployed as FastAPI microservice with SHAP explainability. Track Winner & Top-5 National at HACKaMINeD 2026.",
    year: "2026",
    tags: ["Python", "XGBoost", "FastAPI", "SHAP"],
    link: "https://github.com/Neal006/Fantastic4",
  },
  {
    id: "w2",
    title: "SpectraScan",
    category: "Computer Vision",
    description:
      "AI-Powered Defect Detection for Paint Inspection. 4th National Rank at 6th Mitsubishi Electric Cup 2026. DINOv2/FPN-UNet segmentation with 92.35% accuracy, 86% dimensional validation precision. MLflow tracking and Optuna tuning.",
    year: "2026",
    tags: ["DINOv2", "U-Net", "MLflow", "Optuna"],
    link: "https://github.com/Neal006/CON-SOL-E_VISION_SYSTEM",
  },
  {
    id: "w8",
    title: "MZHub.in",
    category: "Web / Product Engineering",
    description:
      "Enterprise-grade customer engagement platform for MZHub — an AI-powered spiritual technology platform for religious institutions worldwide. Led SEO, design strategy, and engineered serverless contact automation with Azure Cosmos DB.",
    year: "2025",
    tags: ["SEO", "Azure Cosmos DB", "SMTP", "Next.js"],
    link: "https://mzhub.in",
  },
  {
    id: "w5",
    title: "Visual Search Engine",
    category: "Computer Vision",
    description:
      "Real-time athlete re-identification system scaled to 15,000 profiles at sub-800ms retrieval: FAISS IVF-PQ/OPQ index with GPU batch encoding, YOLOv8s fine-tuned to sub-20ms edge inference (ONNX + TensorRT FP16), DINOv2 ViT-S/14 + LBP fusion for occlusion robustness. Built at 8xSports — earned Letter of Recommendation.",
    year: "2025",
    tags: ["YOLOv8", "DINOv2", "FAISS", "TensorRT"],
    link: "https://github.com/Neal006/pfme",
  },
  {
    id: "w7",
    title: "Transaction Fraud Detection",
    category: "AI / Full-Stack",
    description:
      "End-to-end fraud detection system: Isolation Forest + Flask + Pandas + SQLAlchemy for real-time transaction analysis, intelligent risk scoring, and anomaly detection with interactive dashboards and JWT authentication.",
    year: "2025",
    tags: ["Flask", "SQLAlchemy", "Isolation Forest", "Pandas"],
    link: "https://github.com/Neal006/transaction-fraud-detection-system",
  },
  {
    id: "w12",
    title: "Navkaar.ai",
    category: "AI / Agentic",
    description:
      "AI WhatsApp agent platform for Shopify D2C brands. Integrates Meta's WhatsApp Cloud API with Claude (GPT-4o-mini fallback) over Shopify OAuth to recover abandoned carts and automate support at 20K+ messages/mo per merchant. Async backend on BullMQ workers (Railway) + Upstash Redis, Supabase Postgres with Row-Level Security for tenant isolation. Production Turborepo monorepo shipped to zero known bugs across 10+ resolved issues.",
    year: "2026",
    tags: ["Next.js", "BullMQ", "Redis", "Supabase"],
    link: "https://github.com/Neal006/navkaar-ai",
  },
  {
    id: "w13",
    title: "mcptail",
    category: "Dev Tools / Observability",
    description:
      "Zero-config observability tool for MCP servers. A transparent MCP proxy replacing manual console.error debugging with a single-command wiretap across Claude Code, Cursor, and VS Code — 100% local capture, no cloud dependency. Live SSE dashboard with per-tool token cost, p50/p95 latency, searchable timeline, and one-click replay. Gated by 57 automated tests across 9 suites (Biome, tsc, Vitest) on every commit.",
    year: "2026",
    tags: ["TypeScript", "Preact", "Vite", "Node"],
    link: "https://github.com/Neal006/mcptail",
  },
];

export const ongoingWorks = [
  {
    id: "og2",
    title: "Logistic ERP",
    category: "Web / Full-Stack",
    description:
      "Full-stack logistics ERP system for end-to-end supply chain management. Real-time shipment tracking, inventory management, vendor coordination, and operational dashboards — engineered for scale.",
    year: "2026",
    tags: ["ERP", "Logistics", "TypeScript", "Full-Stack"],
    github: "https://github.com/Neal006/logistic-erp",
    liveLink: "",
    accentColor: "#0058FF",
  },
];

export const achievements = [
  "Track Winner & Top-5 National, HACKaMINeD 2026 (2,200+ participants) — LUMIN.AI",
  "4th National, 6th Mitsubishi Electric Cup 2026 — SpectraScan (92.35% segmentation)",
  "Published IEEE Sensors Letters (SCI Q3, IF 2.2, 2026) — 97.20% precision",
  "Letter of Recommendation from 8x Sports for high-impact CV work",
  "Student Chairperson – ACM ITNU, leading 150+ member community",
  "Advanced Learning Algorithms – DeepLearning.AI (Stanford) – 99.77%",
  "Complete MLOps Bootcamp – Udemy",
  "LeetCode Rating: 1507",
];
