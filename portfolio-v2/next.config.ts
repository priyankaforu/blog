import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'jadaworks.com' },
      { protocol: 'https', hostname: 'postmaker.online' },
      { protocol: 'https', hostname: 'doodlenotes.art' },
      { protocol: 'https', hostname: 'studde.app' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

export default nextConfig;
