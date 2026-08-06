import type { MetadataRoute } from "next";
import { PRODUCTOS } from "@/lib/productos";
import { TIENDA_EN_CONSTRUCCION } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://impresoracolor.cl";
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/etiquetas-cecinas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/pendones-chillan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/stickers-chillan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/terminos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // La tienda y sus fichas entran al sitemap recién cuando está abierta:
    // ofrecer a Google páginas que muestran "próximamente" desperdicia rastreo.
    ...(TIENDA_EN_CONSTRUCCION
      ? []
      : [
          {
            url: `${base}/tienda`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
          },
          ...PRODUCTOS.map((p) => ({
            url: `${base}/tienda/${p.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          })),
        ]),
  ];
}
