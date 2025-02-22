import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * https://nextjs.org/docs/basic-features/image-optimization
   * Settings are the defaults
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'images.eu.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'news.airbnb.com',
      },
    ],
  },
};

export default nextConfig;
