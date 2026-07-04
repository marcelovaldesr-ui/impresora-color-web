import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAds from "./components/GoogleAds";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.impresoracolor.cl"),
  title: "Imprenta en Chillán | Flyers, Stickers, Credenciales, Pendones y Etiquetas",
  description:
    "Impresora Color Ltda en Chillán. Cotiza flyers, stickers, tarjetas, pendones, menús, imanes, etiquetas, impresión de carnet e credenciales con tecnología Fargo, bolsas personalizadas con estampado por sublimación y material publicitario para tu negocio. Atención rápida por WhatsApp. Arauco 1060, Chillán.",
  keywords:
    "imprenta chillán, flyers chillán, stickers chillán, tarjetas de presentación chillán, pendones chillán, etiquetas para cecinas, etiquetas para vinos, etiquetas adhesivas, impresión publicitaria, material gráfico chillán, fotocopias chillán, impresiones chillán, anillados chillán, empastados chillán, diplomas chillán, carpetas corporativas chillán, calendarios chillán, anillado de documentos chillán, impresión de carnet chillán, credenciales institucionales chillán, credenciales fargo chillán, carnets de socio chillán, control de acceso chillán, bolsas personalizadas chillán, estampado sublimación chillán, merchandising chillán",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Imprenta en Chillán | Impresora Color Ltda",
    description:
      "Flyers, stickers, tarjetas, pendones, menús, imanes y etiquetas para productos. Atención por WhatsApp. Arauco 1060, Chillán.",
    type: "website",
    locale: "es_CL",
    url: "https://www.impresoracolor.cl/",
    siteName: "Impresora Color Ltda",
    images: [
      {
        url: "/brand/banner-impresora-color-35años.png",
        width: 1024,
        height: 682,
        alt: "Impresora Color Ltda - Imprenta en Chillán",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imprenta en Chillán | Impresora Color Ltda",
    description:
      "Flyers, stickers, tarjetas, pendones, menús, imanes y etiquetas para productos. Atención por WhatsApp. Arauco 1060, Chillán.",
    images: ["/brand/banner-impresora-color-35años.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Impresora Color Ltda",
  url: "https://www.impresoracolor.cl/",
  telephone: "+56998441157",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Arauco 1060",
    addressLocality: "Chillán",
    addressRegion: "Ñuble",
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -36.6130779,
    longitude: -72.1051356,
  },
  sameAs: [
    "https://www.instagram.com/impresoracolorchillan",
    "https://www.google.com/maps/place/Impresora+Color+Ltda./@-36.6124899,-72.1037117,13z/data=!4m6!3m5!1s0x9669282ecbefa02d:0xd52cfa17b8d7d88d!8m2!3d-36.6130779!4d-72.1051356!16s%2Fg%2F12lvg43y1?hl=es&entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de imprenta",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flyers" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stickers personalizados" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tarjetas de presentación" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pendones" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Menús" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Imanes publicitarios" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Etiquetas adhesivas" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Etiquetas para cecinas" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Etiquetas para vinos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Etiquetas para alimentos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stickers para packaging" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Impresión de carnet y credenciales Chillán" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Credenciales institucionales Fargo Chillán" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bolsas personalizadas sublimación Chillán" } },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        <GoogleAds />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
