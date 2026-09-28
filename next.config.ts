import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
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

  // Headers de seguridad de bajo riesgo (BLOQUE 4 de la corrección
  // pre-lanzamiento). A propósito NO se agrega un Content-Security-Policy
  // completo todavía: el sitio carga Flow.cl, Google Ads/Analytics, Meta
  // Pixel y las fuentes/analytics de Vercel, y un CSP mal afinado puede
  // romper cualquiera de esos scripts en producción sin que se note hasta
  // que alguien intente pagar o el pixel deje de disparar. Eso queda para
  // más adelante, con más tiempo para probar cada dominio permitido.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // HTTPS obligatorio por 2 años, incluyendo subdominios. Sin
            // "preload": eso significa enviar el dominio a la lista
            // precargada de los navegadores, una decisión aparte y no
            // fácilmente reversible que le corresponde tomar a Marcelo,
            // no algo para activar de paso acá.
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          {
            // Evita que el navegador intente adivinar el tipo de un
            // archivo si el Content-Type no calza (protege contra XSS
            // vía archivos subidos que se sirvan con un tipo incorrecto).
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // No manda la URL completa como referrer a otros orígenes,
            // solo el origen — evita filtrar rutas internas (con datos
            // como número de pedido) a servicios de terceros.
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // El sitio no usa cámara, micrófono ni geolocalización — se
            // desactivan explícitamente. No afecta a Flow, Google Ads,
            // Analytics ni Meta Pixel, que no piden estos permisos.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            // Protección contra clickjacking: nadie puede incrustar el
            // sitio en un <iframe> de otro dominio. Esto NO afecta a los
            // iframes que EL SITIO incrusta (como el mapa de Ubicacion.tsx)
            // — eso lo controla el header de la respuesta de ese otro
            // sitio, no el nuestro.
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
