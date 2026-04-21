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
  webpack: (config) => {
    // react-pdf uses canvas which isn't available server-side
    config.resolve.alias.canvas = false
    return config
  },
  turbopack: {},
};

export default nextConfig;
