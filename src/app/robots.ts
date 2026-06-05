import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://neal-daftary.vercel.app/sitemap.xml",
    host: "https://neal-daftary.vercel.app",
  };
}
