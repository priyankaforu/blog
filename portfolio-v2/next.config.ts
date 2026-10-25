import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    // The post list moved from /blog to the home page; post pages stay at /blog/<name>.
    return [{ source: "/blog", destination: "/", permanent: true }];
  },
};

export default nextConfig;
