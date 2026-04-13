import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/Barber-Shop" : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: configuredBasePath,
  assetPrefix: configuredBasePath ? `${configuredBasePath}/` : undefined,
  images: {
    unoptimized: true,
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
