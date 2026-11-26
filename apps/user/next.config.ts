import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.6"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.s3.ap-northeast-2.amazonaws.com",
        pathname: "/submission/**",
      },
    ],
  },
  // Development keeps Next.js 16's default Turbopack. The production build
  // explicitly uses Webpack because @ducanh2912/next-pwa is a Webpack plugin.
  turbopack: {},
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default process.env.NODE_ENV === "development"
  ? nextConfig
  : withPWA(nextConfig);
