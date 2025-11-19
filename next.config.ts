import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  reactCompiler: true,
  turbopack: {
    root: "./",
  },
};

export default nextConfig;
