import type { MetadataRoute } from "next";
import { works } from "@/data/portfolio";

const BASE = "https://nealdaftary.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const workRoutes: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${BASE}/works/${w.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...workRoutes,
    { url: `${BASE}/blog/memorylens-llm-memory-benchmark`,          lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/blog/spectrascann-industrial-ai-defect-detection`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/blog/solv-ai-voice-complaint-management`,         lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}
