export interface WorkDetail {
  tagline: string;
  overview: string;
  features: string[];
  specs: { label: string; value: string }[];
}

export const workDetails: Record<string, WorkDetail> = {
  w9: {
    tagline: "AI-powered voice complaint management at $1.83 / million tokens.",
    overview:
      "SOLV.ai replaces expensive LLM API calls with a lean on-device ONNX pipeline for FMCG complaint triage. A dual-model ensemble — DistilBERT-MNLI for zero-shot classification and MiniLM-L6 for semantic similarity — runs inside a 6-state FSM that orchestrates 5 specialised agents. Dual LLM fallback (Groq → Ollama) and dual TTS ensure continuity if any single service degrades. The result: 65% latency reduction and 100% category accuracy at a fraction of GPT-3.5 cost.",
    features: [
      "Dual-model ONNX ensemble — DistilBERT-MNLI + MiniLM-L6 for zero-shot classification",
      "6-state finite state machine with 5 specialised AI agents for complaint routing",
      "Dual LLM fallback (Groq → Ollama) + dual TTS pipeline for high availability",
      "65% latency reduction — inference time dropped from 35ms to 12ms",
      "100% category accuracy across all tested complaint types",
      "Cost: $1.83 / million tokens vs $1,500 / million for GPT-3.5",
    ],
    specs: [
      { label: "Domain", value: "FMCG Voice AI" },
      { label: "Latency", value: "12ms (down from 35ms — 65% reduction)" },
      { label: "Accuracy", value: "100% category classification" },
      { label: "Cost", value: "$1.83 / M tokens (vs $1,500 GPT-3.5)" },
      { label: "Architecture", value: "6-state FSM, 5-agent pipeline" },
    ],
  },

  w10: {
    tagline: "Production RAG chatbot for IAT Networks — 0% injection bypass.",
    overview:
      "A fully productionised RAG chatbot deployed for IAT Networks, a regional ISP. The retrieval pipeline chains query expansion through MiniLM embeddings into ChromaDB (top-8 retrieval), followed by cross-encoder reranking to surface the top-4 most relevant chunks before handing off to Groq's SSE streaming API. A 4-layer GuardRail stack — injection regex, PII detection, domain filter, and toxicity gate — ensures no adversarial prompt escapes. Dockerised on Railway with zero downtime across all deployments.",
    features: [
      "Query expansion → MiniLM embedding → ChromaDB top-8 retrieval pipeline",
      "Cross-encoder reranking to top-4 for precision context delivery",
      "4-layer GuardRail: injection regex, PII filter, domain filter, toxicity gate",
      "Groq SSE streaming responses — <800ms time-to-first-token",
      "Dockerised on Railway with zero-downtime continuous deployment",
      "0% injection bypass rate across full adversarial test suite",
    ],
    specs: [
      { label: "Client", value: "IAT Networks (ISP)" },
      { label: "TTFT", value: "<800ms time-to-first-token" },
      { label: "Security", value: "0% injection bypass" },
      { label: "Uptime", value: "Zero downtime (Railway)" },
      { label: "Retrieval", value: "ChromaDB top-8 → cross-encoder rerank top-4" },
    ],
  },

  w11: {
    tagline: "Open-source LLM memory benchmark — 5.45× recall/token at T=100.",
    overview:
      "MemoryLens is an open-source framework for rigorous comparison of LLM memory architectures across long conversations. Three backends — Naive (full context), RAG (semantic retrieval), and Cascading Temporal (hierarchical decay) — are evaluated against five content-based metrics at conversation lengths up to T=100. The headline result: Cascading Temporal achieves 5.45× recall per token over naive at T=100 with 78% lower cost. All results are surfaced in a Streamlit dashboard with automated CI via GitHub Actions.",
    features: [
      "3 memory backends: Naive full-context, RAG retrieval, Cascading Temporal",
      "5 content-based evaluation metrics for memory quality scoring",
      "Cascading Temporal achieves 5.45× recall/token vs naive at T=100",
      "78% lower token cost vs naive full-context approach at T=100",
      "Streamlit interactive dashboard for result exploration and visualisation",
      "CI/CD automated testing and regression checks via GitHub Actions",
    ],
    specs: [
      { label: "Type", value: "Open-source LLM benchmark" },
      { label: "Recall", value: "5.45× improvement (Cascading Temporal vs Naive)" },
      { label: "Cost Reduction", value: "78% at T=100 vs naive" },
      { label: "Backends", value: "Naive · RAG · Cascading Temporal" },
      { label: "Metrics", value: "5 content-based evaluation metrics" },
    ],
  },

  w1: {
    tagline: "Track Winner & Top-5 National at HACKaMINeD 2026 — AI solar maintenance.",
    overview:
      "Lumin.AI is an AI-powered predictive maintenance platform for solar inverters. A 7-stage ETL pipeline ingests inverter telemetry, which feeds a hybrid risk engine combining Isolation Forest for unsupervised anomaly detection with XGBoost for supervised fault classification. Predictions are served as a FastAPI microservice with SHAP-based explainability, enabling field engineers to understand why a unit is flagged at risk. The project won the Track at HACKaMINeD 2026 and placed Top-5 nationally across 2,200+ participants.",
    features: [
      "7-stage ETL pipeline for solar inverter sensor data ingestion and normalisation",
      "Hybrid Isolation Forest + XGBoost ensemble risk scoring engine",
      "SHAP feature attribution for interpretable, auditable risk predictions",
      "FastAPI microservice with real-time inference endpoint",
      "Track Winner & Top-5 National at HACKaMINeD 2026 (2,200+ participants)",
    ],
    specs: [
      { label: "Domain", value: "Solar Inverter Predictive Maintenance" },
      { label: "Award", value: "Track Winner — HACKaMINeD 2026" },
      { label: "Rank", value: "Top-5 National (2,200+ teams)" },
      { label: "Model", value: "Hybrid Isolation Forest + XGBoost" },
      { label: "Explainability", value: "SHAP feature attribution" },
    ],
  },

  w2: {
    tagline: "4th National — Mitsubishi Electric Cup 2026. 92.35% defect accuracy.",
    overview:
      "SpectraScan is an AI-powered defect detection system for industrial paint quality inspection, developed for the 6th Mitsubishi Electric Cup 2026 where it achieved 4th National Rank. The segmentation backbone combines DINOv2 feature extraction with an FPN-UNet decoder, reaching 92.35% detection accuracy and 86% dimensional validation precision on the competition dataset. Experiment tracking is handled by MLflow and hyperparameter search by Optuna, ensuring reproducible results across training runs.",
    features: [
      "DINOv2 + FPN-UNet segmentation architecture for pixel-level defect localisation",
      "92.35% overall defect detection accuracy on paint surface imagery",
      "86% dimensional validation precision for quality control measurement",
      "MLflow experiment tracking for reproducible multi-run comparisons",
      "Optuna automated hyperparameter optimisation for peak performance",
      "4th National Rank — 6th Mitsubishi Electric Cup 2026",
    ],
    specs: [
      { label: "Competition", value: "6th Mitsubishi Electric Cup 2026" },
      { label: "Rank", value: "4th National" },
      { label: "Accuracy", value: "92.35% defect detection" },
      { label: "Precision", value: "86% dimensional validation" },
      { label: "Architecture", value: "DINOv2 + FPN-UNet semantic segmentation" },
    ],
  },

  w8: {
    tagline: "Enterprise platform for MZHub Faithtech — +57% Lighthouse on Azure.",
    overview:
      "MZHub.in is the enterprise customer engagement platform for MZHub Faithtech, a spiritual technology company serving religious institutions worldwide. The project delivered a +57% Lighthouse performance uplift and +40% SEO improvement via Next.js SSR, Core Web Vitals tuning, and aggressive bundle tree-shaking. The platform is deployed on Azure App Services with serverless contact automation backed by Azure Cosmos DB. Concurrently led R&D on AI OCR pipelines, agentic workflows, and knowledge-grounded RAG chatbots for the product roadmap.",
    features: [
      "+57% Lighthouse performance via Next.js SSR and bundle tree-shaking",
      "+40% SEO improvement through structured data and Core Web Vitals tuning",
      "Azure App Services production deployment with CI/CD pipeline",
      "Serverless contact automation backed by Azure Cosmos DB",
      "R&D leadership on AI OCR pipelines and RAG chatbots for roadmap",
    ],
    specs: [
      { label: "Client", value: "MZHub Faithtech" },
      { label: "Performance", value: "+57% Lighthouse score uplift" },
      { label: "SEO", value: "+40% via SSR + structured data" },
      { label: "Platform", value: "Azure App Services" },
      { label: "Database", value: "Azure Cosmos DB (serverless)" },
    ],
  },

  w4: {
    tagline: "IEEE Sensors Letters 2026 — 97.20% precision, F1 0.9718 on 200K+ samples.",
    overview:
      "Published in IEEE Sensors Letters (SCI Q3, Impact Factor 2.2), this research introduces a CatBoost-driven anomaly detection framework for fault detection in industrial robotic arms using the CASPER sensor dataset. CatBoost's native handling of categorical features and robust gradient boosting achieves 97.20% precision and an F1 score of 0.9718 on 200K+ samples — outperforming SVM and Random Forest baselines. SHAP analysis provides feature-level attribution for each predicted anomaly, critical for maintenance engineers requiring explanations.",
    features: [
      "CatBoost gradient boosting optimised for industrial fault classification",
      "97.20% precision on 200K+ CASPER robotic arm sensor samples",
      "F1 score 0.9718 — outperforms SVM and Random Forest baselines",
      "SHAP feature attribution for anomaly explainability and root-cause analysis",
      "Published in IEEE Sensors Letters (SCI Q3, Impact Factor 2.2, 2026)",
    ],
    specs: [
      { label: "Publication", value: "IEEE Sensors Letters (SCI Q3, IF 2.2, 2026)" },
      { label: "Precision", value: "97.20%" },
      { label: "F1 Score", value: "0.9718" },
      { label: "Dataset", value: "200K+ CASPER sensor samples" },
      { label: "Baselines", value: "Outperforms SVM and Random Forest" },
    ],
  },

  w5: {
    tagline: "645ms visual jersey search at 8xSports — Letter of Recommendation.",
    overview:
      "Built during the 8xSports AI Engineering internship, this visual search engine locates jersey matches across 301 athlete profiles at 645ms end-to-end. YOLOv8 detects and crops jersey regions in a frame; DINOv2 extracts 384-dimensional feature embeddings; LBP texture analysis captures weave patterns; all vectors are indexed in FAISS for sub-millisecond approximate nearest-neighbour retrieval. The system runs in production at 8xSports and earned a Letter of Recommendation from the engineering team.",
    features: [
      "YOLOv8 object detection for precise jersey localisation and cropping",
      "DINOv2 384-dimensional feature extraction for rich visual embeddings",
      "LBP texture analysis for jersey weave pattern discrimination",
      "FAISS approximate nearest-neighbour index across 301 athlete profiles",
      "645ms end-to-end production latency under real workload",
      "Earned Letter of Recommendation from 8xSports engineering team",
    ],
    specs: [
      { label: "Employer", value: "8xSports (AI Engineering Intern)" },
      { label: "Latency", value: "645ms end-to-end" },
      { label: "Index Size", value: "301 athlete profiles" },
      { label: "Embedding", value: "DINOv2 384-dim features" },
      { label: "Outcome", value: "Letter of Recommendation" },
    ],
  },

  w7: {
    tagline: "End-to-end real-time fraud detection — Isolation Forest + JWT-secured API.",
    overview:
      "An end-to-end transaction fraud detection system combining unsupervised anomaly detection with a production-ready Flask API. Isolation Forest scores each transaction in real time, flagging anomalies based on deviation from learned normal behaviour. The Flask REST API handles authentication via JWT with role-based access control; SQLAlchemy ORM manages transaction persistence and audit logging; Pandas powers the feature engineering pipeline. An interactive dashboard visualises risk distributions and flagged transaction clusters.",
    features: [
      "Isolation Forest unsupervised anomaly detection for real-time risk scoring",
      "Configurable risk threshold tuning for precision/recall trade-off control",
      "Flask REST API with JWT authentication and role-based access control",
      "SQLAlchemy ORM for transaction persistence and full audit trail",
      "Pandas feature engineering pipeline for behavioural signal extraction",
      "Interactive analytical dashboards for fraud pattern visualisation",
    ],
    specs: [
      { label: "Algorithm", value: "Isolation Forest (unsupervised)" },
      { label: "API", value: "Flask REST with JWT auth" },
      { label: "Database", value: "SQLAlchemy ORM" },
      { label: "Scoring", value: "Real-time per-transaction risk scoring" },
      { label: "Auth", value: "JWT + role-based access control" },
    ],
  },

  w6: {
    tagline: "Intelligent cooking assistant — global recipe database, AI chatbot, appliance integration.",
    overview:
      "ChefX is a next-generation cooking assistant platform that merges a global recipe database with smart appliance integration and an AI-powered chatbot. Users receive personalised recipe recommendations, manage dietary profiles, and discover cooking content through YouTube API integration. Firebase provides the real-time backend enabling multi-platform sync, while the AI chatbot handles ingredient substitutions, scaling, and step-by-step guidance.",
    features: [
      "Global recipe database with intelligent ingredient-based search",
      "AI-powered chatbot for recipe recommendations and cooking guidance",
      "Smart appliance integration via IoT APIs for automated cooking programs",
      "Dietary management and nutritional tracking per user profile",
      "YouTube API integration for contextual cooking video discovery",
      "Firebase real-time backend for cross-platform data synchronisation",
    ],
    specs: [
      { label: "Type", value: "AI Cooking Assistant Platform" },
      { label: "Backend", value: "Firebase real-time database" },
      { label: "AI", value: "Conversational recipe chatbot" },
      { label: "APIs", value: "YouTube API + smart appliance IoT" },
      { label: "Platform", value: "Web (multi-platform)" },
    ],
  },
};
