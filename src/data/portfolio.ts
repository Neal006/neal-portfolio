export const personal = {
  name: "Neal Daftary",
  title: "AI & Machine Learning Engineer",
  tagline: "Computer Vision · Research · Full-Stack AI",
  bio: "AI Enthusiast based in India, pursuing B.Tech in AI & ML at Nirma University. Experienced in developing end-to-end AI pipelines and deploying data-driven solutions — from computer vision systems to predictive maintenance platforms.",
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
    { name: "PyTorch", icon: "🔥", color: "#EE4C2C" },
    { name: "TensorFlow", icon: "🧠", color: "#FF8F00" },
    { name: "Machine Learning", icon: "⚙️", color: "#7C8CF0" },
    { name: "Deep Learning", icon: "🧬", color: "#E06050" },
    { name: "Computer Vision", icon: "👁️", color: "#C8B833" },
    { name: "NLP", icon: "💬", color: "#48C78E" },
    { name: "Generative AI", icon: "✨", color: "#C565E0" },
    { name: "OpenCV", icon: "📷", color: "#7B68EE" },
    { name: "Next.js", icon: "▲", color: "#A0A0A0" },
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "FastAPI", icon: "⚡", color: "#26A69A" },
    { name: "Docker", icon: "🐳", color: "#2496ED" },
    { name: "GCP", icon: "☁️", color: "#4A90D9" },
    { name: "Azure", icon: "🔷", color: "#3A96DD" },
  ],
  personal: [
    "Computer Vision",
    "Deep Learning",
    "Research",
    "Full-Stack",
    "Leadership",
    "Problem Solving",
  ],
};

export const experience = [
  {
    id: "exp1",
    period: "June 2025 – Sept 2025",
    company: "8x Sports",
    role: "Computer Vision Engineer (Remote)",
    description:
      "Developed visual search engine with YOLOv8 object detection, DINOv2 features, OpenCV texture analysis. Implemented FAISS for millisecond-latency semantic similarity search. Earned a Letter of Recommendation for high-impact technical execution.",
    accentColor: "#f7c948",
  },
  {
    id: "exp2",
    period: "Oct 2025 – Dec 2025",
    company: "MZHUB Faithtech",
    role: "Product Engineering Intern (Remote)",
    description:
      "Led end-to-end product and technical research for AI-driven solutions (AI OCR, agentic AI, CX automation, knowledge-grounded chatbots). Built and optimized the website frontend for performance and SEO.",
    accentColor: "#4af0f0",
  },
  {
    id: "exp3",
    period: "Jan 2026 – Present",
    company: "Nirma University",
    role: "Student Researcher (Hybrid)",
    description:
      "Working under a project of Indian Space Research Organisation (ISRO). Developing AI system for automated detection, segmentation and morphometric analysis of lunar surface features using deep learning on Chandrayaan-2 imagery.",
    accentColor: "#ff3fa4",
  },
];

export const education = [
  {
    period: "Aug 2024 – May 2028",
    institution: "Institute Of Technology, Nirma University",
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    grade: "CGPA: 7.95 (till 3rd Sem)",
  },
];

export const responsibilities = [
  {
    period: "Sept 2025 – Present",
    role: "Student Chairperson",
    organization: "Association of Computer Machinery (ACM) ITNU",
    description:
      "Leading 200+ member technical community, organizing workshops and speaker sessions.",
  },
];

export const research = {
  title: "CatBoost-Driven Anomaly Detection in Industrial Robotic Arms",
  publication: "IEEE Sensors Letters (2026)",
  description:
    "Published a CatBoost anomaly detection framework for robotic arm fault detection achieving 97.20% accuracy and 0.9718 F1-score on 200K+ CASPER sensor samples, outperforming SSL and traditional ML baselines.",
  link: "https://ieeexplore.ieee.org/document/11359621",
};

export const works = [
  {
    id: "w1",
    title: "Lumin.AI",
    category: "AI / Predictive Maintenance",
    description:
      "AI-Powered Solar Inverter Predictive Maintenance Platform. Architected a 7-stage ETL pipeline, built hybrid Isolation Forest & XGBoost risk engine, deployed as FastAPI microservice with SHAP explainability.",
    year: "2026",
    tags: ["Python", "XGBoost", "FastAPI", "SHAP"],
    link: "https://github.com/Neal006/Fantastic4",
  },
  {
    id: "w2",
    title: "SpectraScan",
    category: "Computer Vision",
    description:
      "AI-Powered Defect Detection for Paint Inspection. Secured 4th National Rank at 6th Mitsubishi Electric Cup 2026. DINOv2/FPN-UNet segmentation with MLflow tracking and Optuna tuning.",
    year: "2026",
    tags: ["DINOv2", "U-Net", "MLflow", "Optuna"],
    link: "https://github.com/Neal006/CON-SOL-E_VISION_SYSTEM",
  },
  {
    id: "w8",
    title: "MZHub.in",
    category: "Web / Product Engineering",
    description:
      "Built the enterprise-grade customer engagement platform for MZHub — an AI-powered spiritual technology platform for religious institutions worldwide. Led SEO optimization, design strategy, and engineered serverless contact automation using SMTP with Azure Cosmos DB.",
    year: "2025",
    tags: ["SEO", "Azure Cosmos DB", "SMTP", "Next.js"],
    link: "https://mzhub.in",
  },
  {
    id: "w4",
    title: "CatBoost-Driven Anomaly Detection in Industrial Robotic Arms",
    category: "Research",
    description:
    "published in IEEE Sensors Letters with 97.20% accuracy on 200K+ sensor samples.",
    year: "2025",
    tags: ["CatBoost", "IEEE", "Anomaly Detection"],
    link: "https://github.com/Neal006/CatBoost_Anomaly_Detection_implementation",
  },
  {
    id: "w5",
    title: "Visual Search Engine",
    category: "Computer Vision",
    description:
      "Built visual search engine with YOLOv8 detection, DINOv2 feature extraction, and FAISS for millisecond-latency semantic similarity search at 8x Sports.",
    year: "2025",
    tags: ["YOLOv8", "DINOv2", "FAISS", "OpenCV"],
    link: "https://github.com/Neal006/pfme",
  },
  {
    id: "w7",
    title: "Transaction Fraud Detection",
    category: "AI / Full-Stack",
    description:
      "End-to-end fraud detection system leveraging Isolation Forest, Flask, Pandas, SQLAlchemy for real-time transaction analysis, intelligent risk scoring, and anomaly detection with interactive dashboards and JWT-based authentication.",
    year: "2025",
    tags: ["Flask", "SQLAlchemy", "Isolation Forest", "Pandas"],
    link: "https://github.com/Neal006/transaction-fraud-detection-system",
  },
  {
    id: "w6",
    title: "ChefX",
    category: "AI / Full-Stack",
    description:
      "Next-gen intelligent cooking assistant platform. Blends a massive global recipe database with smart appliance integration and dietary management, delivered via a slick multi-platform user experience.",
    year: "2025",
    tags: ["Firebase", "YouTube API", "Chatbot", "AI"],
    link: "https://github.com/Neal006/chefx",
  },
];

export const achievements = [
  "Winner – Aubergine Track, HackAMined National Hackathon (2026) — Top 5 Overall among 400+ teams",
  "4th National Rank – 6th Mitsubishi Electric Cup 2026",
  "Published in IEEE Sensors Letters (2026)",
  "Letter of Recommendation from 8x Sports for high-impact CV work",
  "Student Chairperson – ACM ITNU, leading 200+ member community",
  "Advanced Learning Algorithms – DeepLearning.AI (Stanford) – 99.77%",
];
