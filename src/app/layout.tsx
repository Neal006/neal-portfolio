import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Syne, DM_Sans, Space_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import Script from "next/script";
import LenisWrapper from "@/components/layout/LenisWrapper";
import ClientShell from "@/components/layout/ClientShell";
import "./globals.css";

/* ── Self-hosted fonts via next/font — eliminates render-blocking CDN link ── */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const syne = Syne({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const spaceMono = Space_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});


const SEO = {
  name: "Neal Daftary",
  title: "Neal Daftary — AI & ML Engineer | Computer Vision · LLM · RAG Systems",
  description:
    "Neal Daftary — AI & ML Engineer, Ahmedabad. B.Tech CSE (AI & ML) at Nirma University. Builds production Computer Vision, RAG chatbots & LLM systems. ISRO researcher. IEEE published. HACKaMINeD 2026 winner.",
  url: "https://neal-daftary.vercel.app",
  image: "https://neal-daftary.vercel.app/og",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#E5001A",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: {
    default: SEO.title,
    template: `%s | Neal Daftary`,
  },
  description: SEO.description,
  keywords: [
    "Neal Daftary",
    "Neal Daftary AI Engineer",
    "Neal Daftary portfolio",
    "Neal Daftary Nirma University",
    "AI Engineer India",
    "AI Engineer Ahmedabad",
    "Machine Learning Engineer India",
    "Computer Vision Engineer India",
    "LLM Engineer India",
    "RAG pipeline engineer",
    "YOLOv8 engineer India",
    "DINOv2 feature extraction",
    "FAISS visual search",
    "Nirma University AI ML student",
    "ISRO Chandrayaan-2 research",
    "IEEE Sensors Letters published",
    "HACKaMINeD 2026 winner",
    "Mitsubishi Electric Cup 2026",
    "SpectraScan defect detection AI",
    "MemoryLens LLM benchmark",
    "Lumin AI solar maintenance",
    "SOLV AI voice complaint system",
    "Production RAG chatbot",
    "LangChain RAG developer",
    "FastAPI AI microservice",
    "Next.js AI engineer",
    "ACM ITNU Student Chairperson",
    "8xSports AI intern",
    "MZHub Faithtech engineer",
    "builtbyneal",
  ],
  authors: [{ name: "Neal Daftary", url: SEO.url }],
  creator: "Neal Daftary",
  publisher: "Neal Daftary",
  applicationName: "Neal Daftary Portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SEO.url,
    title: SEO.title,
    description: SEO.description,
    siteName: "Neal Daftary",
    images: [
      {
        url: SEO.image,
        width: 1200,
        height: 630,
        alt: "Neal Daftary — AI & ML Engineer | Computer Vision · LLM · RAG",
        type: "image/png",
      },
    ],
    firstName: "Neal",
    lastName: "Daftary",
    username: "Neal006",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [SEO.image],
    creator: "@Neal006",
    site: "@Neal006",
  },
  alternates: {
    canonical: SEO.url,
    languages: { "en-US": SEO.url },
  },
  verification: {
    google: "google-site-verification",
  },
  category: "technology",
};

/* ── JSON-LD structured data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* Person */
    {
      "@type": "Person",
      "@id": `${SEO.url}/#person`,
      name: "Neal Daftary",
      alternateName: "builtbyneal",
      url: SEO.url,
      image: {
        "@type": "ImageObject",
        url: `${SEO.url}/images/avatar.png`,
        width: 400,
        height: 400,
      },
      jobTitle: "AI & Machine Learning Engineer",
      description: SEO.description,
      email: "builtbyneal@gmail.com",
      telephone: "+91-9106497430",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/Neal006",
        "https://linkedin.com/in/neal-daftary-45743731a",
        "https://ieeexplore.ieee.org/document/11359621",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Institute of Technology, Nirma University",
        url: "https://nirmauni.ac.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ahmedabad",
          addressCountry: "IN",
        },
      },
      worksFor: [
        {
          "@type": "Organization",
          name: "Nirma University — ISRO Research Project",
          description: "ISRO-funded undergraduate research on Chandrayaan-2 lunar imagery analysis",
        },
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Computer Vision",
        "Large Language Models",
        "RAG Systems",
        "LangChain",
        "PyTorch",
        "YOLOv8",
        "DINOv2",
        "FAISS",
        "FastAPI",
        "Next.js",
        "Python",
        "TypeScript",
        "Anomaly Detection",
        "Lunar Image Segmentation",
      ],
      award: [
        "Track Winner & Top-5 National — HACKaMINeD 2026",
        "4th National Rank — Mitsubishi Electric Cup 2026 (SpectraScan)",
        "IEEE Sensors Letters Publication 2026 — CatBoost Anomaly Detection",
        "Letter of Recommendation — 8xSports",
      ],
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "AI Engineer Intern",
          occupationLocation: { "@type": "Organization", name: "8xSports" },
          description:
            "Built 645ms visual jersey search engine using YOLOv8, DINOv2, FAISS across 301 athlete profiles",
          startDate: "2025-06",
          endDate: "2025-09",
        },
        {
          "@type": "Occupation",
          name: "AI Software Engineering Intern",
          occupationLocation: {
            "@type": "Organization",
            name: "MZHub Faithtech",
            url: "https://mzhub.in",
          },
          description:
            "Shipped Next.js platform on Azure App Services — +57% Lighthouse, +40% SEO",
          startDate: "2025-10",
          endDate: "2025-12",
        },
        {
          "@type": "Occupation",
          name: "Undergraduate Researcher",
          occupationLocation: {
            "@type": "CollegeOrUniversity",
            name: "Nirma University — ISRO Research",
          },
          description:
            "ISRO-funded deep learning pipeline on Chandrayaan-2 TMC-2 and OHRC lunar imagery",
          startDate: "2026-01",
        },
      ],
    },

    /* ScholarlyArticle — IEEE paper */
    {
      "@type": "ScholarlyArticle",
      "@id": "https://ieeexplore.ieee.org/document/11359621",
      name: "Robotic Arm Fault Detection Using CatBoost Classifier",
      headline: "CatBoost-Driven Anomaly Detection in Industrial Robotic Arms",
      author: { "@id": `${SEO.url}/#person` },
      publisher: {
        "@type": "Organization",
        name: "IEEE",
        url: "https://ieee.org",
      },
      isPartOf: {
        "@type": "Periodical",
        name: "IEEE Sensors Letters",
        issn: "2475-1472",
      },
      datePublished: "2026-01",
      url: "https://ieeexplore.ieee.org/document/11359621",
      description:
        "CatBoost anomaly detection framework for industrial robotic arm fault detection achieving 97.20% precision and F1 score 0.9718 on 200K+ CASPER sensor samples.",
      keywords: ["CatBoost", "Anomaly Detection", "Robotics", "Fault Detection", "IEEE Sensors"],
    },

    /* WebSite */
    {
      "@type": "WebSite",
      "@id": `${SEO.url}/#website`,
      url: SEO.url,
      name: "Neal Daftary",
      description: SEO.description,
      publisher: { "@id": `${SEO.url}/#person` },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SEO.url}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },

    /* ProfilePage */
    {
      "@type": "ProfilePage",
      "@id": `${SEO.url}/#webpage`,
      url: SEO.url,
      name: SEO.title,
      isPartOf: { "@id": `${SEO.url}/#website` },
      about: { "@id": `${SEO.url}/#person` },
      description: SEO.description,
      datePublished: "2024-08-01",
      dateModified: "2026-06-04",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SEO.url,
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
        >
          {/* ClientShell: cursor + scroll-progress — ssr:false via Client Component wrapper */}
          <ClientShell />
          {/* MotionConfig: all Framer Motion animations auto-respect prefers-reduced-motion */}
          <MotionConfig reducedMotion="user">
            <LenisWrapper>
              {children}
            </LenisWrapper>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
