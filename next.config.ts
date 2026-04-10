import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default withPWA({
  dest: "public",
  disable: !isProd,
  register: true,
  skipWaiting: true,
  runtimeCaching: []
})(nextConfig);
