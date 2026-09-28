import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Páginas de flujo/transaccionales y el panel admin: sin valor de
      // contenido para Google y no deberían aparecer en resultados de
      // búsqueda. /tienda y /tienda/* NO están acá a propósito — deben
      // seguir siendo indexables apenas la tienda esté abierta al público.
      // Esto es higiene de rastreo, no seguridad: /admin ya está protegido
      // por sesión (BLOQUE 2), no por estar oculto de robots.txt.
      disallow: ["/admin", "/carrito", "/pago", "/confirmacion", "/tienda/preview"],
    },
    sitemap: "https://impresoracolor.cl/sitemap.xml",
  };
}
