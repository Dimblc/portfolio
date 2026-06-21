import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath: "/portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
