import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Cap optimizer requests at 1920: every source asset is 1440-4267px wide,
    // and 2048/3840 requests exceed most sources, which 404s in the optimizer.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
