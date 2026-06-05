export const personal = {
  name: "Neal Daftary",
  title: "AI & Machine Learning Engineer",
  tagline: "Computer Vision · LLM/RAG Systems · Full-Stack AI",
  bio: "Neal Daftary — an AI Engineer, Researcher & 3rd Year Undergrad at Nirma University who doesn't just study the field, I actively ship in it. From building real-time computer vision systems for sports analytics to ISRO-funded lunar surface imagery research, I operate at the intersection of deep learning, LLMs, and full-stack production AI. IEEE Published Journal Paper, 2x National Finalist, and leading a 150-member ACM chapter. I don't just learn AI, I build with it.",
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
  ],
  categories: [
    {
      label: "Languages",
      color: "#4B8BBE",
      items: ["Python", "TypeScript", "SQL"],
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
        "Railway",
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
    role: "AI Engineer Intern (Remote)",
    description:
      "Built a production visual jersey search engine for 8xSports: YOLOv8 object detection + DINOv2 384-dim feature extraction + LBP texture analysis + FAISS vector index across 301 athlete profiles at 645ms end-to-end latency.",
    accentColor: "#f7c948",
  },
  {
    id: "exp2",
    period: "Oct 2025 – Dec 2025",
    company: "MZHub Faithtech",
    role: "AI Software Engineering Intern (Remote)",
    description:
      "Shipped the MZHub Faithtech enterprise platform on Azure App Services: +57% Lighthouse performance, +40% SEO via Next.js SSR, Core Web Vitals tuning, and bundle tree-shaking. Led R&D on AI OCR pipelines, agentic AI workflows, and knowledge-grounded RAG chatbots for the spiritual technology product roadmap.",
    accentColor: "#4af0f0",
  },
  {
    id: "exp3",
    period: "Jan 2026 – Present",
    company: "Nirma University — ISRO Research",
    role: "Undergraduate Student Researcher (Hybrid)",
    description:
      "ISRO-funded research at Nirma University: developing a deep learning Computer Vision pipeline on Chandrayaan-2 TMC-2 and OHRC lunar imagery for automated detection, semantic segmentation, and morphometric analysis of craters, rilles, and domes — outputs feeding lunar rover navigation and ISRO mission planning systems.",
    accentColor: "#ff3fa4",
  },
];

export const education = [
  {
    period: "Aug 2024 – May 2028",
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
  title: "Robotic Arm Fault Detection Using CatBoost Classifier",
  publication: "IEEE Sensors Letters — SCI Q3 · IF 2.2 · Jan 2026",
  description:
    "Predictive industrial fault detection using the CASPER robotic arm dataset. CatBoost-based ensemble approach outperforming SVM, Logistic Regression, Naive Bayes, and Quadratic Discriminant Analysis baselines across all evaluation metrics.",
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
      "Real-time visual jersey search engine at 645ms: YOLOv8 detection + DINOv2 384-dim feature extraction + LBP texture analysis + FAISS across 301 profiles. Built at 8xSports — earned Letter of Recommendation.",
    year: "2025",
    tags: ["YOLOv8", "DINOv2", "FAISS", "OpenCV"],
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
];

export const ongoingWorks = [
  {
    id: "og1",
    title: "Navkaar.ai",
    category: "AI / Agentic",
    description:
      "AI-powered intelligent assistant platform built on modern LLM orchestration and agentic workflows. Provides contextual guidance, multi-step reasoning, and decision support — designed to navigate complex queries end-to-end.",
    year: "2026",
    tags: ["LLM", "Agentic AI", "Next.js", "TypeScript"],
    github: "https://github.com/Neal006/navkaar-ai",
    liveLink: "",
    accentColor: "#E50020",
  },
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
  "LeetCode Rating: 1507",
];
