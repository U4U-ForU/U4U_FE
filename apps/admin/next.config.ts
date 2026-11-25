import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.s3.ap-northeast-2.amazonaws.com",
        pathname: "/submission/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/items",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
