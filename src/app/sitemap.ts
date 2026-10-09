import type { MetadataRoute } from "next";
import { personal } from "@/data/profile";

const BLOG_POSTS = [
  "memorylens-llm-memory-benchmark",
  "spectrascann-industrial-ai-defect-detection",
  "solv-ai-voice-complaint-management",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: personal.site, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${personal.site}/blog`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...BLOG_POSTS.map((slug) => ({
      url: `${personal.site}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
