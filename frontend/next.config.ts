import type { NextConfig } from "next";

// Fail the production build loudly if the real backend URL is missing.
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set. Set it to the deployed backend URL " +
      "before building for production (e.g. https://modliq-1.onrender.com)."
  );
}

const nextConfig: NextConfig = {
  turbopack: {},
  // Ensure webpack HMR WebSocket connects smoothly
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  async rewrites() {
    let backendUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").trim();
    if (!/^https?:\/\//.test(backendUrl)) {
      backendUrl = `http://${backendUrl}`;
    }
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
