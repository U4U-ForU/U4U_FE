import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/items",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
