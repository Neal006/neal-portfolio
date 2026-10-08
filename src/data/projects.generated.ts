/* Every project from github.com/Neal006 (non-empty repos), written up from READMEs.
   `weight` 1-5 ranks significance. Curated overrides live in projects.ts. */
import type { Project } from "./types";

export const repoProjects: Project[] = [
  {
    "slug": "mcptail",
    "title": "mcptail",
    "tagline": "Passive wiretap, token attribution and replay for MCP servers, one command",
    "description": "A Node CLI that wraps every stdio MCP server in Claude Code, Cursor and VS Code configs with a transparent byte-for-byte proxy, records traffic to local JSONL, and serves a dashboard. It shows a live timeline of tool calls with latency and status, payloads, per-tool p50/p95 latency and estimated token usage per server/tool, and can replay any captured call against a fresh server.",
    "highlights": [
      "One-command setup (npx mcptail init) rewrites client configs with timestamped backups; mcptail remove restores them",
      "Never blocks or mutates traffic; degrades to a plain pipe if recording fails",
      "Supports Claude Code, Cursor and VS Code MCP configs; 100% local, no telemetry",
      "Published on npm with CI"
    ],
    "stack": [
      "TypeScript",
      "Node.js",
      "Model Context Protocol",
      "JSON-RPC",
      "npm"
    ],
    "category": "Dev Tools",
    "year": 2026,
    "repo": "https://github.com/Neal006/mcptail",
    "homepage": null,
    "private": false,
    "weight": 5
  },
  {
    "slug": "minutes",
    "title": "Minutes",
    "tagline": "AI meeting notes with live transcription, action items and ask-your-meetings search",
    "description": "A mini-Circleback: record meetings in the browser or an Electron desktop app (with system-audio loopback), stream 20-second chunks to a Node/Express + SQLite server that transcribes them live with local Whisper, then extracts summary, decisions and action items via OpenRouter free models. Search uses SQLite FTS5/BM25 and Q&A answers are grounded in retrieved excerpts with citations.",
    "highlights": [
      "43/43 content checks passed on 5 scripted meetings recorded end to end; 3-8% word error rate",
      "Notes ready 18-50 s after stop; local whisper-base.en at ~2.3 s per 20 s chunk on a laptop CPU",
      "$0 stack: local Whisper, OpenRouter free-model fallback chains, idempotent chunk uploads and crash recovery",
      "16 server tests + 17 end-to-end tests plus a Docker smoke test in CI"
    ],
    "stack": [
      "TypeScript",
      "React 19",
      "Electron",
      "Express 5",
      "SQLite FTS5",
      "Whisper",
      "OpenRouter",
      "Docker"
    ],
    "category": "Full-Stack",
    "year": 2026,
    "repo": "https://github.com/Neal006/minutes",
    "homepage": null,
    "private": false,
    "weight": 5
  },
  {
    "slug": "memorylens",
    "title": "MemoryLens",
    "tagline": "Open-source benchmark measuring how LLM memory architectures forget over long chats",
    "description": "A pip-installable benchmark (memorylens-bench) that measures fact recall and token cost of LLM memory strategies (naive history, RAG, chunked RAG, cascading, summary, entity, graph, FAISS) across 100-200 conversation turns. Core metrics are deterministic and need no API key; an optional answer+judge pipeline evaluates real LLMs, and results can be fitted to Ebbinghaus forgetting curves.",
    "highlights": [
      "8 memory architectures, 6 metrics, 4 domain scenarios, multi-seed mean +/- std",
      "Naive history collapses to 35.0% recall at 100 turns; rag_chunked keeps 100% at ~1/21 the tokens",
      "200-turn stress test: only cascading memory holds 100% recall (naive 7.5%, bounded rag_chunked 5.0%)",
      "Published on PyPI with CLI, Python API, Streamlit dashboard, FastAPI REST API; CI on Python 3.10-3.13"
    ],
    "stack": [
      "Python",
      "FAISS",
      "FastAPI",
      "Streamlit",
      "Plotly",
      "Groq/OpenAI/Anthropic SDKs",
      "GitHub Actions",
      "PyPI"
    ],
    "category": "Research",
    "year": 2026,
    "repo": "https://github.com/Neal006/memorylens-bench",
    "homepage": "https://github.com/Neal006/memorylens",
    "private": false,
    "weight": 5
  },
  {
    "slug": "helioops",
    "title": "HelioOps",
    "tagline": "Turns solar storms into cited, machine-verified advisories for critical industries",
    "description": "A team project that detects coronal mass ejections from CCOR-1/SOHO coronagraph imagery, fuses NASA DONKI, GOES and DSCOVR signals into a storm event, and predicts GPS error and HF radio blackout with calibrated LightGBM quantile models. A RAG layer over aviation, grid, maritime and telecom rulebooks writes per-industry action lists, and a verifier checks every number against the regulations before a human sees it.",
    "highlights": [
      "29-hour warning window on the replayed 2024-10 G4 storm; full pipeline runs in 8 s with 51 streamed events",
      "6 LightGBM quantile models; 95% interval coverage of 95.9% (GPS) and 94.2% (HF)",
      "Regulation corpus of 918 chunks across 5 collections; 4 of 4 advisories verified, 1 of 1 unsafe value caught",
      "284 backend tests; live product deployed"
    ],
    "stack": [
      "Python",
      "FastAPI",
      "LightGBM",
      "RAG",
      "BGE embeddings",
      "ChromaDB",
      "Next.js",
      "Docker"
    ],
    "category": "Machine Learning",
    "year": 2026,
    "repo": "https://github.com/Neal006/HelioOps",
    "homepage": "https://helioops.dpdns.org",
    "private": false,
    "weight": 5
  },
  {
    "slug": "entity-resolution",
    "title": "Business Entity Resolution (Amazon ML Challenge 2026)",
    "tagline": "Matching business records across three noisy sources at 1.7M x 10M scale",
    "description": "Team entry for the Amazon ML Challenge 2026: for each deduplicated reference entity, find matching records in two other noisy sources, scored by macro F0.5. The pipeline uses word TF-IDF blocking with document-frequency pruning and chunked sparse matmul to cut ~10M candidates per entity to a few dozen, then a LightGBM pairwise classifier over ~30 fuzzy-match features with a threshold tuned on out-of-fold predictions.",
    "highlights": [
      "Blocking engineered to survive 1.7M x 10M records; recall ceiling measured at K = 5/10/20/30/50",
      "~30 pair features (rapidfuzz ratios, Jaccard, containment, numeric agreement, rank/gap)",
      "Country-partitioned candidate generation handles France (15% of test, absent from train)",
      "GroupKFold by entity, submission validator, append-only experiment log"
    ],
    "stack": [
      "Python",
      "LightGBM",
      "scikit-learn",
      "SciPy sparse",
      "rapidfuzz",
      "pandas",
      "AWS S3"
    ],
    "category": "Machine Learning",
    "year": 2026,
    "repo": "https://github.com/Neal006/cudacommandos",
    "homepage": null,
    "private": false,
    "weight": 4
  },
  {
    "slug": "noonshift",
    "title": "Noonshift",
    "tagline": "Deadline-aware EV charging that shifts load into clean, cheap grid hours",
    "description": "Built at HACKOUT'26: a site-level scheduler that asks drivers one pre-filled question at plug-in and re-solves a linear program every 5 minutes across all connectors, minimising marginal CO2 and tariff cost under site power limits and every driver's ready-by deadline. Plans are pushed to chargers via OCPP 1.6J SetChargingProfile and streamed to a driver app and ops dashboard over WebSockets, with a layered fail-safe fallback chain.",
    "highlights": [
      "Replay of 36 real Caltech ACN sessions: CO2 23.0 kg -> 7.1 kg (-69%) for the same 378.9 kWh",
      "0 missed deadlines and 0 solver fallbacks across 530 solves (max 59 ms)",
      "Elastic LP of ~11k variables solved in under 100 ms with scipy/HiGHS",
      "Honest cross-checks reported: -64% on a July solar day, -1.8% on a January gas day"
    ],
    "stack": [
      "Python",
      "FastAPI",
      "SciPy/HiGHS",
      "OCPP 1.6J",
      "WebSockets",
      "WattTime API"
    ],
    "category": "Systems",
    "year": 2026,
    "repo": "https://github.com/Neal006/hackout2026",
    "homepage": null,
    "private": false,
    "weight": 4
  },
  {
    "slug": "tradeflow-erp",
    "title": "TradeFlow ERP",
    "tagline": "Desktop ERP for import/export logistics companies",
    "description": "Private Electron desktop ERP for import/export logistics, with a React renderer talking to a Node main process through a role-guarded, Zod-validated IPC router over SQLite via Drizzle ORM. CI, security scanning and release workflows are set up.",
    "highlights": [
      "11/11 GST tax calculation tests passing in CI"
    ],
    "stack": [
      "TypeScript",
      "Electron",
      "React",
      "SQLite",
      "Drizzle ORM",
      "Zod",
      "Tailwind CSS"
    ],
    "category": "Full-Stack",
    "year": 2026,
    "repo": null,
    "homepage": null,
    "private": true,
    "weight": 4
  },
  {
    "slug": "canon",
    "title": "canon",
    "tagline": "Continuous integration for creative work: lint stories against a versioned bible",
    "description": "A Python CLI that treats a creative bible (characters, facts, timeline, voice rules) as typed YAML and lints scripts, scenes and campaign copy against it, failing CI on contradictions. Deterministic rules (unknown entities, timeline order, forbidden terms) run offline with zero tokens; IBM Granite on watsonx.ai is called only for semantic contradictions, and every model finding is verified against the cited fact and source line before being shown.",
    "highlights": [
      "Built for the IBM AI Builders Challenge (July: Reimagine Creative Industries with AI)",
      "Offline mode needs no API key or network and still fails the build on deterministic errors",
      "Model claims are discarded unless they cite a fact actually sent and text actually on the cited line",
      "canon draft generates grounded scenes with a grounded_on block citing the facts used"
    ],
    "stack": [
      "Python",
      "IBM Granite",
      "watsonx.ai",
      "YAML",
      "GitHub Actions"
    ],
    "category": "LLMs & Agents",
    "year": 2026,
    "repo": "https://github.com/Neal006/canon",
    "homepage": null,
    "private": false,
    "weight": 4
  },
  {
    "slug": "fashion-retrieval",
    "title": "Decompose-and-Verify Fashion Retrieval",
    "tagline": "Compositional fashion search that verifies color-garment binding CLIP gets wrong",
    "description": "A hybrid retrieval system for queries like 'a red tie and a white shirt': it parses queries into clauses, recalls with Marqo-FashionSigLIP over FAISS, then reranks with min-pooled per-clause similarity, exact attribute matching against a SmolVLM-captioned index, and BM25. A local web dashboard serves top-5 results with a binding badge, and an eval suite ablates CLIP vs SigLIP vs hybrid with a color-swap hard-negative test.",
    "highlights": [
      "Corpus of 1,150 images (1,000 Fashionpedia + 150 Pexels top-up for missing environments)",
      "~150-250 ms per-query latency on CPU, measured end to end",
      "Fixed a style field that was 99.7% 'other' via single-token grammar-constrained classification",
      "Runs on a 4 GB RTX 3050 laptop GPU"
    ],
    "stack": [
      "Python",
      "SigLIP",
      "SmolVLM",
      "FAISS",
      "BM25",
      "PyTorch",
      "outlines",
      "FastAPI"
    ],
    "category": "Computer Vision",
    "year": 2026,
    "repo": "https://github.com/Neal006/multimodal-fashion-retrieval",
    "homepage": null,
    "private": false,
    "weight": 4
  },
  {
    "slug": "bah2026",
    "title": "Shack-Hartmann Wavefront Sensor Pipeline",
    "tagline": "Real-time adaptive-optics wavefront reconstruction with a live digital twin",
    "description": "A BAH 2026 (Problem Statement 9) solution that processes frames from a simulated 10x10 lenslet Shack-Hartmann sensor at 200 Hz: it reconstructs wavefront phase, estimates Fried parameter r0 and coherence time tau0, and outputs deformable-mirror actuator commands within a 5 ms per-frame budget. It includes a first-principles synthetic turbulence generator and a Streamlit digital twin that visualises every stage live.",
    "highlights": [
      "Mean pipeline latency 2.21 ms (p95 2.61 ms) vs a 5 ms target",
      "r0 and tau0 estimated within 6.2% of ground truth",
      "0/121 DM actuator saturation; 6/6 validation checks pass",
      "Live demo deployed on Streamlit Cloud"
    ],
    "stack": [
      "Python",
      "NumPy",
      "SciPy",
      "Streamlit",
      "Plotly"
    ],
    "category": "Research",
    "year": 2026,
    "repo": "https://github.com/Neal006/bah2026",
    "homepage": "https://alpha-aveonix.streamlit.app/",
    "private": false,
    "weight": 4
  },
  {
    "slug": "candidateranker",
    "title": "Redrob Candidate Ranker",
    "tagline": "CPU-only hybrid ranker for 100K candidates in under 5 minutes, no network",
    "description": "A ranking system for an Intelligent Candidate Discovery challenge that ranks a 100,000-candidate pool against a job description under a 5-minute, 16 GB, CPU-only, offline budget. It fuses BM25 and dense bge-small (ONNX int8) retrieval with RRF, adds structured role/experience/domain/recency scorers, a behavioral availability multiplier, a honeypot filter and optional cross-encoder rerank.",
    "highlights": [
      "Ranks a 100K pool to a spec-compliant top-100 under a 5-minute CPU budget",
      "Hard filter for ~80 adversarial honeypot profiles (>10% in top 100 disqualifies)",
      "Deliberately framework-free: no LangChain/LlamaIndex; brute-force numpy matmul search",
      "Deterministic, bit-stable reproduction with vendored model weights"
    ],
    "stack": [
      "Python",
      "fastembed",
      "BGE embeddings",
      "ONNX",
      "BM25",
      "NumPy"
    ],
    "category": "Machine Learning",
    "year": 2026,
    "repo": "https://github.com/Neal006/CandidateRanker",
    "homepage": null,
    "private": false,
    "weight": 4
  },
  {
    "slug": "sacredmindai",
    "title": "SacredMindAI",
    "tagline": "Multifaith RAG assistant grounded in cited primary scripture across 8 traditions",
    "description": "A retrieval-augmented assistant that helps people work through personal problems using primary texts from eight faiths, refusing when retrieval confidence is low. It combines FAISS + BM25 hybrid retrieval with Reciprocal Rank Fusion, cross-encoder reranking, a four-factor confidence scorer and a three-tier safety filter, with SSE streaming, Supabase chat history and a 19-language voice pipeline.",
    "highlights": [
      "Corpus of 16,622 chunks across Islam, Christianity, Judaism, Buddhism, Hinduism, Jainism, Sikhism and Taoism",
      "Voice agent supporting 19 languages",
      "10-layer LangSmith observability stack with online LLM-as-judge evaluation",
      "Llama 3.3 70B via Groq; React 18 + TypeScript frontend"
    ],
    "stack": [
      "Python",
      "FastAPI",
      "FAISS",
      "BM25",
      "Groq Llama 3.3",
      "React",
      "Supabase",
      "LangSmith"
    ],
    "category": "LLMs & Agents",
    "year": 2026,
    "repo": "https://github.com/Neal006/sacredmindai",
    "homepage": null,
    "private": false,
    "weight": 4
  },
  {
    "slug": "lumin-ai",
    "title": "LUMIN.AI",
    "tagline": "Solar-plant inverter risk monitoring with explainable ML and GenAI operator guidance",
    "description": "A HACKaMINeD 2026 team project (Neal as ML engineer) that monitors utility-scale solar inverters in real time, predicts failures with an Optuna-tuned 3-class XGBoost risk classifier with SHAP explanations, and turns predictions into plain-English guidance and maintenance tickets via a RAG layer on Groq Llama 3.3 70B. Delivered as four independently deployable services including a Next.js operator/admin dashboard.",
    "highlights": [
      "0% hallucination rate across 27 ablation test cases (3 models x 9 cases x 5 metrics)",
      "~1.0 s average LLM response time",
      "Monitors 12 inverters across 3 plants with a 15 s simulator cycle",
      "LangSmith observability and per-prediction SHAP attribution"
    ],
    "stack": [
      "Python",
      "XGBoost",
      "Optuna",
      "SHAP",
      "FastAPI",
      "Groq Llama 3.3",
      "Next.js",
      "MySQL (AWS RDS)"
    ],
    "category": "Machine Learning",
    "year": 2026,
    "repo": "https://github.com/Neal006/LuMinAI",
    "homepage": null,
    "private": false,
    "weight": 4
  },
  {
    "slug": "solv-ai",
    "title": "SOLV.ai",
    "tagline": "Voice-first complaint triage: ONNX NLP classification plus LLM resolution plans",
    "description": "A hackathon (Tark Shaastra, LDCE) system that ingests customer complaints by voice, text or web, classifies category, sentiment and priority with an ONNX-accelerated DistilBERT + MiniLM ensemble, generates resolution plans with LLMs, and persists everything to a role-based dashboard with SLA tracking. Includes speech-to-text for code-switched Hindi-English and a voice agent with a local fallback model.",
    "highlights": [
      "~12 ms NLP inference per prediction (ONNX + CUDA) vs ~35 ms PyTorch eager",
      "100% category accuracy in ablation tests",
      "LLM ablation of 10 models x 4 scenarios x 3 tasks; winner Llama 3.3 70B at 96.9%",
      "~1.4 s average LLM resolution latency; 2-4 s voice agent turn"
    ],
    "stack": [
      "Python",
      "ONNX Runtime",
      "DistilBERT",
      "FastAPI",
      "Groq Llama 3.3",
      "Ollama",
      "Next.js",
      "LangSmith"
    ],
    "category": "LLMs & Agents",
    "year": 2026,
    "repo": "https://github.com/Neal006/lakshya-ldce",
    "homepage": null,
    "private": false,
    "weight": 4
  },
  {
    "slug": "spgs-net",
    "title": "SPGS-Net",
    "tagline": "Prior-guided segmentation network for multi-defect detection on industrial surfaces",
    "description": "A research architecture for industrial surface defect detection that combines frozen DINOv2 patch features, a classical ML model (XGBoost/Isolation Forest) producing spatial defect priors, and an Attention U-Net for pixel-precise segmentation with real-world area estimation. Includes a technical paper draft aimed at journal publication.",
    "highlights": [
      "DINOv2 + XGBoost prior + Attention U-Net pipeline for small-data defect segmentation",
      "Defect area estimation preserving geometric fidelity (no resizing)",
      "Accompanying ~700-line technical paper documenting the method"
    ],
    "stack": [
      "Python",
      "PyTorch",
      "DINOv2",
      "XGBoost",
      "U-Net"
    ],
    "category": "Computer Vision",
    "year": 2026,
    "repo": "https://github.com/Neal006/SPGS-Net",
    "homepage": null,
    "private": false,
    "weight": 4
  },
  {
    "slug": "geopulse",
    "title": "GeoPulse",
    "tagline": "Traffic demand forecasting by geohash and time, Flipkart GFG hackathon",
    "description": "A competition pipeline that predicts normalized traffic demand for geohash x timestamp pairs, scored by 100 x R^2. It uses leakage-safe out-of-fold target encoding, grouped imputation and 24 temporal/geographic features, and compares LightGBM, XGBoost and CatBoost with CV-objective Optuna tuning.",
    "highlights": [
      "Best LightGBM: 96.17 CV (5-fold) and 91.08 leaderboard score",
      "Optuna tuning lifted leaderboard from 88.22 (default) to 91.08",
      "OOF target encoding with geohash backoff chain to prevent leakage"
    ],
    "stack": [
      "Python",
      "LightGBM",
      "XGBoost",
      "CatBoost",
      "Optuna",
      "pandas"
    ],
    "category": "Machine Learning",
    "year": 2026,
    "repo": "https://github.com/Neal006/GeoPulse",
    "homepage": null,
    "private": false,
    "weight": 3
  },
  {
    "slug": "navkaar-ai",
    "title": "NavkaarAI",
    "tagline": "WhatsApp AI agent platform for Shopify D2C brands: cart recovery, CX, broadcasts",
    "description": "A monorepo for a WhatsApp agent SaaS: a Next.js dashboard and API routes, BullMQ background workers, a Supabase Postgres database with row-level security, and Claude-powered prompts for abandoned-cart recovery, customer support and broadcast campaigns via the Meta WhatsApp Cloud API and Shopify OAuth.",
    "highlights": [
      "Monorepo with web app, queue workers, and shared db/ai/queue packages",
      "Claude Sonnet with GPT-4o-mini fallback",
      "Tiered pricing plans defined (free to agency)"
    ],
    "stack": [
      "TypeScript",
      "Next.js 14",
      "BullMQ",
      "Upstash Redis",
      "Supabase",
      "Claude API",
      "WhatsApp Cloud API",
      "Shopify"
    ],
    "category": "LLMs & Agents",
    "year": 2026,
    "repo": "https://github.com/Neal006/navkaar-ai",
    "homepage": null,
    "private": false,
    "weight": 3
  },
  {
    "slug": "ghostnet",
    "title": "GhostNet",
    "tagline": "Secure real-time communication app with a hacker-themed UI",
    "description": "Private real-time messaging app built with React, Vite and Zustand on a Supabase backend, packaged as an Electron desktop app.",
    "highlights": [],
    "stack": [
      "TypeScript",
      "React",
      "Vite",
      "Supabase",
      "Electron",
      "Zustand",
      "Tailwind CSS"
    ],
    "category": "Full-Stack",
    "year": 2026,
    "repo": null,
    "homepage": null,
    "private": true,
    "weight": 3
  },
  {
    "slug": "crow-hire",
    "title": "Crow Sandbox Demo Generator",
    "tagline": "Paste a URL or OpenAPI spec and instantly chat with an agent that knows your product",
    "description": "A Next.js prototype built as a portfolio project for Crow (YC W26): prospects paste a product URL, OpenAPI spec or pick a template, the app crawls and infers entities, then shows a mock product UI next to a GPT-4o-mini function-calling agent that executes simulated CRUD actions. Includes session sharing and expiry, guardrails and an analytics dashboard for the sales team.",
    "highlights": [
      "Real URL crawling with entity inference; ~9 s pipeline for templates",
      "OpenAI function calling with regex fallback when no key is set",
      "Sessions with 30-minute inactivity and 7-day hard expiry, 50-message caps, injection guards",
      "Analytics: first-action conversion, agent miss rate, common queries"
    ],
    "stack": [
      "TypeScript",
      "Next.js 16",
      "Tailwind CSS",
      "OpenAI API"
    ],
    "category": "LLMs & Agents",
    "year": 2026,
    "repo": "https://github.com/Neal006/crow-hire",
    "homepage": null,
    "private": false,
    "weight": 3
  },
  {
    "slug": "rag-chatbot",
    "title": "Company Website RAG Chatbot",
    "tagline": "Guardrailed RAG chatbot with streaming answers over a scraped knowledge base",
    "description": "A FastAPI RAG chatbot that embeds a scraped company knowledge base with local MiniLM sentence-transformers into ChromaDB and answers via Groq (Qwen3-32B) with SSE streaming. Guardrails cover profanity, prompt injection, off-topic queries and PII, with rate limiting and a Railway deployment config.",
    "highlights": [
      "~430 MB total memory footprint to fit a free hosting tier",
      "Four guardrail layers: profanity, injection regex, off-topic filter, PII detection",
      "Dockerised with tests for guardrails and streaming"
    ],
    "stack": [
      "Python",
      "FastAPI",
      "ChromaDB",
      "sentence-transformers",
      "Groq",
      "Docker",
      "Railway"
    ],
    "category": "LLMs & Agents",
    "year": 2026,
    "repo": "https://github.com/Neal006/iatnetworks-chatbot",
    "homepage": null,
    "private": false,
    "weight": 3
  },
  {
    "slug": "spectrascan",
    "title": "CON-SOL-E Vision System",
    "tagline": "Industrial vision R&D: DINO-based defect segmentation, hole calibration, PLC link",
    "description": "A collection of industrial machine-vision modules: experimental defect-segmentation architectures (DINO + custom FPN/U-Net decoders, DINO + XGBoost + Mask R-CNN/SAM, YOLO + SAM, SPGS-Net), an orange-peel surface-defect detector, an Optuna-tuned hole calibration method, and a Python interface for PLC communication.",
    "highlights": [
      "Several defect-segmentation architectures documented and compared",
      "Hole-calibration algorithm with Optuna hyperparameter search",
      "Python-to-PLC communication interface for shop-floor integration"
    ],
    "stack": [
      "Python",
      "PyTorch",
      "DINOv2",
      "SAM",
      "YOLO",
      "XGBoost",
      "Optuna"
    ],
    "category": "Computer Vision",
    "year": 2026,
    "repo": "https://github.com/Neal006/CON-SOL-E_VISION_SYSTEM",
    "homepage": null,
    "private": false,
    "weight": 3
  },
  {
    "slug": "robotic-arm-ssl",
    "title": "Robotic Arm Fault Detection (SSL)",
    "tagline": "Self-supervised fault detection for robotic arms benchmarked against classic ML",
    "description": "Implementation and results for a research paper on robotic-arm fault detection using self-supervised learning, compared against SVM, Logistic Regression, Naive Bayes, CatBoost and QDA on multi-GB arm sensor and network capture data. The framework runs 10 repeated experiments and reports accuracy, F1, precision, recall, AUC and inference time with 95% confidence intervals.",
    "highlights": [
      "Benchmarks SSL against 5 classical classifiers",
      "10-run experimental framework with 95% confidence intervals",
      "Built on ~7.4 GB of sensor CSVs and packet captures"
    ],
    "stack": [
      "Python",
      "scikit-learn",
      "CatBoost",
      "PyTorch",
      "pandas",
      "Matplotlib"
    ],
    "category": "Research",
    "year": 2025,
    "repo": "https://github.com/Neal006/CatBoost_Anomaly_Detection_implementation",
    "homepage": null,
    "private": false,
    "weight": 3
  },
  {
    "slug": "visual-search",
    "title": "Jersey Pattern Matcher",
    "tagline": "Visual search over a 15,000-image jersey catalogue with YOLO and DINOv2",
    "description": "A Streamlit app that segments garments with a DeepFashion2 YOLOv8 segmentation model, embeds them, and searches a vector index built from a 15,000+ image catalogue to find visually similar jersey patterns, with GPU acceleration via CUDA.",
    "highlights": [
      "Indexes a 15,000+ image catalogue for similarity search",
      "YOLOv8 garment segmentation + DINOv2 embeddings + FAISS index",
      "Incremental re-indexing when catalogue images change"
    ],
    "stack": [
      "Python",
      "YOLOv8",
      "DINOv2",
      "FAISS",
      "PyTorch",
      "Streamlit"
    ],
    "category": "Computer Vision",
    "year": 2025,
    "repo": "https://github.com/Neal006/pfme",
    "homepage": null,
    "private": false,
    "weight": 3
  },
  {
    "slug": "dmid",
    "title": "Private Medical-Imaging Privacy Research",
    "tagline": "Differentially private deep learning for mammography lesion segmentation (research)",
    "description": "Private research project on differentially private segmentation of breast lesions in mammography. Currently dataset analysis, a literature review and a research blueprint; no training code yet.",
    "highlights": [],
    "stack": [
      "Python",
      "PyTorch",
      "Opacus (planned)",
      "pydicom"
    ],
    "category": "Research",
    "year": 2026,
    "repo": null,
    "homepage": null,
    "private": true,
    "weight": 2
  },
  {
    "slug": "saola",
    "title": "SAOLA",
    "tagline": "Rust-native, offline-first agentic workbench for non-CS professionals",
    "description": "Private product in planning: a Rust-native, offline-first agent workbench aimed at hardware, compliance and industrial professionals. The repo currently holds a PRD, deep dive and implementation plan only; no code yet.",
    "highlights": [],
    "stack": [
      "Rust",
      "Tauri (planned)",
      "Leptos (planned)",
      "mistral.rs (planned)"
    ],
    "category": "LLMs & Agents",
    "year": 2026,
    "repo": null,
    "homepage": null,
    "private": true,
    "weight": 2
  },
  {
    "slug": "wigglywoosh",
    "title": "Dog Activity Classification",
    "tagline": "Fusing video and IMU signals to classify dog activity",
    "description": "A single-file pipeline that classifies dog activity by combining YOLOv8n dog detection with masked optical flow on video and accelerometer/gyroscope intensity from IMU CSVs. It removes animated watermark pixels, then fuses the two modalities with reliability weighting, streak caps, hard overrides and label smoothing.",
    "highlights": [
      "Two-modality fusion: video (YOLOv8n + optical flow) and IMU",
      "Watermark masking learned from IMU-quiet frames",
      "All thresholds centralised in a config, no inline magic numbers"
    ],
    "stack": [
      "Python",
      "YOLOv8",
      "OpenCV",
      "NumPy"
    ],
    "category": "Computer Vision",
    "year": 2026,
    "repo": "https://github.com/Neal006/wigglywoosh",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "client-lead-generation",
    "title": "Lead Generation Pipeline",
    "tagline": "Scraping and enrichment pipeline for discovering client leads",
    "description": "A Python discovery pipeline that scrapes prospects, enriches them and writes outputs, organised as a phase-1 discovery stage with config and logging. No README.",
    "highlights": [],
    "stack": [
      "Python"
    ],
    "category": "Dev Tools",
    "year": 2026,
    "repo": "https://github.com/Neal006/client-lead-generation",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "layman-ai-assignment",
    "title": "Padel Player Tracking",
    "tagline": "YOLO + BoT-SORT tracking of players, racket and court boundary in match video",
    "description": "A computer-vision assignment that detects and tracks up to four players inside a court polygon with Ultralytics YOLO and a custom BoT-SORT config, stabilising track IDs, plus separate racket and court-boundary modules.",
    "highlights": [
      "Custom ID stabiliser to keep player identities consistent",
      "Court-polygon filtering of detections"
    ],
    "stack": [
      "Python",
      "YOLO",
      "BoT-SORT",
      "OpenCV"
    ],
    "category": "Computer Vision",
    "year": 2026,
    "repo": "https://github.com/Neal006/layman_ai_assignment",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "con-sol-e-5.0",
    "title": "CON-SOL-E 5.0 Frontend",
    "tagline": "Next.js frontend for the CON-SOL-E industrial vision project",
    "description": "A Next.js + TypeScript app scaffolded with create-next-app, companion to the CON-SOL-E vision system. The README is the default template, so its exact feature set is not documented.",
    "highlights": [],
    "stack": [
      "TypeScript",
      "Next.js"
    ],
    "category": "Full-Stack",
    "year": 2026,
    "repo": "https://github.com/Neal006/CON-SOL-E_5.0",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "mzhub",
    "title": "MZHub Marketing Website",
    "tagline": "Next.js marketing site for an AI platform serving faith communities",
    "description": "A team marketing website for MZHub, an AI-powered spiritual technology platform for temples, ashrams and other faith communities, built with the Next.js 14 App Router, shadcn/ui, Framer Motion animations, dark/light theming and MDX blog infrastructure.",
    "highlights": [
      "Next.js 14 App Router + TypeScript with shadcn/ui component library",
      "MDX blog and project pages, dynamic sitemap and Open Graph SEO"
    ],
    "stack": [
      "TypeScript",
      "Next.js 14",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "MDX"
    ],
    "category": "Full-Stack",
    "year": 2026,
    "repo": "https://github.com/Neal006/mzhub",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "innovative-assignmentds",
    "title": "Stock Manager (C + Streamlit)",
    "tagline": "Data-structures assignment: C stock manager with a Streamlit analytics dashboard",
    "description": "A university data-structures assignment pairing a C program for managing stock records with a Streamlit + Plotly dashboard that analyses stock performance from CSV.",
    "highlights": [],
    "stack": [
      "C",
      "Python",
      "Streamlit",
      "Plotly"
    ],
    "category": "Learning",
    "year": 2025,
    "repo": "https://github.com/Neal006/Innovative_AssignmentDS",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "stress-heatmap-microservice",
    "title": "Workplace Stress Heatmap",
    "tagline": "Flask API + static frontend visualising workplace stress by company",
    "description": "A small microservice that serves company stress data through a Flask API (deployable to Google Cloud Run) to a static heatmap frontend on Firebase Hosting, with optional Firestore integration and input validators.",
    "highlights": [
      "Cloud Run backend + Firebase Hosting frontend deployment guide"
    ],
    "stack": [
      "Python",
      "Flask",
      "Google Cloud Run",
      "Firebase",
      "Firestore",
      "JavaScript"
    ],
    "category": "Full-Stack",
    "year": 2025,
    "repo": "https://github.com/Neal006/stress_heatmap_microservice",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "transaction-fraud-detection-system",
    "title": "Transaction Fraud Detection",
    "tagline": "Ensemble fraud detection with LIME explanations, alerts and a live dashboard",
    "description": "A fraud detection system that trains an ensemble (Random Forest, Gradient Boosting, neural network) on transaction data, explains predictions with LIME, generates contextual insights and compliance checks, sends email alerts for high-risk transactions, and visualises trends in a Dash dashboard.",
    "highlights": [
      "Ensemble of 3 model families with LIME explanations",
      "Email alerting and HTML risk reports"
    ],
    "stack": [
      "Python",
      "scikit-learn",
      "LIME",
      "Dash",
      "pandas"
    ],
    "category": "Machine Learning",
    "year": 2025,
    "repo": "https://github.com/Neal006/transaction-fraud-detection-system",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "odoo-recommender",
    "title": "SkillSwap Recommender",
    "tagline": "TF-IDF recommendation engine matching users for a skill-swap platform",
    "description": "A Flask app for the SkillSwap platform (Odoo hackathon) that combines user skills, descriptions, feedback and sought skills into text features and recommends matches with TF-IDF and cosine similarity.",
    "highlights": [],
    "stack": [
      "Python",
      "Flask",
      "scikit-learn",
      "pandas"
    ],
    "category": "Machine Learning",
    "year": 2025,
    "repo": "https://github.com/Neal006/Odoo-recommender",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "python-backend-n",
    "title": "Jersey Vision Inference API",
    "tagline": "FastAPI server exposing YOLOv8 segmentation, DINOv2 embeddings and FAISS search",
    "description": "A FastAPI inference backend for the jersey pattern matcher with REST endpoints for YOLOv8 segmentation polygons, DINOv2 feature extraction and FAISS vector search.",
    "highlights": [
      "/yolo, /dino and /faiss endpoints for segmentation, embeddings and similarity search"
    ],
    "stack": [
      "Python",
      "FastAPI",
      "YOLOv8",
      "DINOv2",
      "FAISS"
    ],
    "category": "Computer Vision",
    "year": 2025,
    "repo": "https://github.com/Neal006/python-backend-n",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "server-frontend",
    "title": "Jersey Design Studio",
    "tagline": "React frontend for AI-powered jersey design search with crop and polygon overlays",
    "description": "A React + TypeScript + Vite web app where users upload artwork, crop it, see detected regions as polygon overlays, and browse a grid of similar jersey designs returned by the vision backend.",
    "highlights": [
      "Deployed on Vercel",
      "Crop, polygon detection overlays and similar-design grid"
    ],
    "stack": [
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS"
    ],
    "category": "Full-Stack",
    "year": 2025,
    "repo": "https://github.com/Neal006/server-frontend",
    "homepage": "https://server-frontend-two.vercel.app",
    "private": false,
    "weight": 2
  },
  {
    "slug": "rtchatwvd-neal",
    "title": "Real-Time Chat App",
    "tagline": "Flask-SocketIO real-time chat with login and persistent rooms",
    "description": "A real-time chat application built with Flask, Flask-SocketIO and SQLAlchemy, with user authentication via Flask-Login, forms and database migrations.",
    "highlights": [],
    "stack": [
      "Python",
      "Flask",
      "Socket.IO",
      "SQLAlchemy"
    ],
    "category": "Full-Stack",
    "year": 2025,
    "repo": "https://github.com/Neal006/RTCHATWVD_NEAL",
    "homepage": null,
    "private": false,
    "weight": 2
  },
  {
    "slug": "chefx",
    "title": "ChefX",
    "tagline": "AI recipe assistant with Gemini, YouTube tutorials and kitchen unit conversion",
    "description": "A Flask web app with Firebase auth and Firestore that generates recipes with Google Gemini, finds YouTube tutorial videos, converts kitchen measurements, caches recipes and exports them to PDF, deployed on Render.",
    "highlights": [],
    "stack": [
      "Python",
      "Flask",
      "Gemini API",
      "YouTube Data API",
      "Firebase",
      "Firestore"
    ],
    "category": "Full-Stack",
    "year": 2025,
    "repo": "https://github.com/Neal006/CHEFX",
    "homepage": null,
    "private": false,
    "weight": 2
  }
];
