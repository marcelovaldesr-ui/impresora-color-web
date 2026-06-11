import type { NextConfig } from "next";

// CSP aplicada SOLO a respuestas HTML (no a assets estáticos).
// Next.js 16 App Router + Tailwind v4 + Google Ads.
const csp = [
  "default-src 'self'",
  // 'unsafe-inline': scripts inline de RSC (self.__next_f) y gtag init
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://*.g.doubleclick.net",
  // style-src: CSS de Next.js (/_next/static), estilos inline de Tailwind/React,
  // fonts.googleapis.com por si next/font/google hace requests en runtime
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // font-src: fuentes de /_next/static/media y Google Fonts CDN
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google.com https://www.google.cl https://googleads.g.doubleclick.net https://*.g.doubleclick.net https://pagead2.googlesyndication.com https://images.unsplash.com https://www.andessalud.cl",
  // connect-src: fetch a /api/cotizar, gtag beacons, Google Analytics
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
        // Excluir assets estáticos y rutas de API del CSP
        // (el CSP lo hace valer el browser desde la respuesta HTML, no desde los assets)
        source: "/((?!_next/static|_next/image|favicon\\.ico|api/).*)",
        headers: [{ key: "Content-Security-Policy", value: csp }],
      },
    ];
  },
};

export default nextConfig;
