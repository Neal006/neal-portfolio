import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
  compress: true,
  async redirects() {
    // Old per-project pages were folded into the homepage index.
    return [{ source: "/works/:id", destination: "/#work", permanent: true }];
  },
};

export default nextConfig;
