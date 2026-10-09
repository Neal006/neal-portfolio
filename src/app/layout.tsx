import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Script from "next/script";
import LenisWrapper from "@/components/layout/LenisWrapper";
import ClientShell from "@/components/layout/ClientShell";
import { personal, publication } from "@/data/profile";
import "./globals.css";

/* ── Self-hosted fonts via next/font ── */
const interTight = Inter_Tight({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans-tight",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SEO = {
  title: "Neal Daftary | Software & AI Engineer · Open-Source Contributor",
  description:
    "Neal Daftary, Software & AI Engineer from Ahmedabad. SWE intern at Curriculo; merged contributor to Google DeepMind, Hugging Face Transformers, OpenCV, Anthropic and Cloudflare. IEEE-published, HACKaMINeD 2026 winner.",
  url: personal.site,
  image: `${personal.site}/og`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: { default: SEO.title, template: "%s | Neal Daftary" },
  description: SEO.description,
  keywords: [
    "Neal Daftary",
    "Neal Daftary portfolio",
    "Software Engineer India",
    "AI Engineer Ahmedabad",
    "Machine Learning Engineer India",
    "Open source contributor Google DeepMind",
    "JAX Privacy contributor",
    "Hugging Face Transformers contributor",
    "OpenCV contributor",
    "Claude Code Action contributor",
    "Cloudflare workers-sdk contributor",
    "Curriculo software engineer",
    "Nirma University AI ML",
    "IEEE Sensors Letters CatBoost",
    "HACKaMINeD 2026 winner",
    "Mitsubishi Electric Cup 2026",
    "Minutes AI meeting notes",
    "HelioOps space weather",
    "mcptail MCP observability",
    "MemoryLens LLM memory benchmark",
  ],
  authors: [{ name: personal.name, url: SEO.url }],
  creator: personal.name,
  publisher: personal.name,
  applicationName: "Neal Daftary",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SEO.url,
    title: SEO.title,
    description: SEO.description,
    siteName: personal.name,
    images: [{ url: SEO.image, width: 1200, height: 630, alt: SEO.title, type: "image/png" }],
    firstName: personal.first,
    lastName: personal.last,
    username: personal.github,
  },
  twitter: { card: "summary_large_image", title: SEO.title, description: SEO.description, images: [SEO.image] },
  alternates: { canonical: SEO.url },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SEO.url}/#person`,
      name: personal.name,
      url: SEO.url,
      image: `${SEO.url}${personal.photo}`,
      jobTitle: personal.role,
      description: SEO.description,
      email: `mailto:${personal.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
      sameAs: [personal.githubUrl, personal.linkedinUrl, publication.url],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Nirma University", url: "https://nirmauni.ac.in" },
      worksFor: { "@type": "Organization", name: "Curriculo", url: "https://curriculo.me/" },
      knowsAbout: [
        "Machine Learning", "Computer Vision", "Large Language Models", "RAG", "Agentic AI", "MLOps",
        "Next.js", "NestJS", "FastAPI", "PostgreSQL", "Kubernetes", "AWS", "JAX", "PyTorch",
      ],
      award: [
        "Winner, Aubergine Track, HACKaMINeD National Hackathon 2026",
        "National Rank 4, Mitsubishi Electric Cup 2026",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      "@id": publication.url,
      headline: publication.title,
      author: { "@id": `${SEO.url}/#person` },
      publisher: { "@type": "Organization", name: "IEEE" },
      isPartOf: { "@type": "Periodical", name: publication.venue, issn: "2475-1472" },
      datePublished: "2026-01",
      url: publication.url,
    },
    {
      "@type": "WebSite",
      "@id": `${SEO.url}/#website`,
      url: SEO.url,
      name: personal.name,
      publisher: { "@id": `${SEO.url}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning /* data-intro-seen is set by the pre-paint script below */
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Pre-paint: hide the preloader for returning / reduced-motion visitors before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('nd-intro-seen')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-intro-seen','')}catch(e){}",
          }}
        />
        <noscript>
          <style>{".preloader{display:none!important}"}</style>
        </noscript>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ClientShell />
        {/* All Framer Motion animations respect prefers-reduced-motion */}
        <MotionConfig reducedMotion="user">
          <LenisWrapper>{children}</LenisWrapper>
        </MotionConfig>
      </body>
    </html>
  );
}
