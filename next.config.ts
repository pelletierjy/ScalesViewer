import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  distDir: "build",
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "/" : "",
  basePath: "",
};

export default nextConfig;
