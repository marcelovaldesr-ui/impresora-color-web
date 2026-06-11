import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://*.g.doubleclick.net",
  "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://*.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google.com https://www.google.cl https://googleads.g.doubleclick.net https://*.g.doubleclick.net https://pagead2.googlesyndication.com https://images.unsplash.com https://www.andessalud.cl",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.google.com https://*.g.doubleclick.net",
  "frame-src https://td.doubleclick.net https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.andessalud.cl",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "Content-Security-Policy", value: csp }],
      },
    ];
  },
};

export default nextConfig;
