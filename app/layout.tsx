import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imprenta en Chillán | Flyers, Stickers, Tarjetas, Pendones y Etiquetas",
  description:
    "Impresora Color Ltda en Chillán. Cotiza flyers, stickers, tarjetas, pendones, menús, imanes, etiquetas para productos, etiquetas para cecinas, etiquetas para vinos y material publicitario para tu negocio. Atención rápida por WhatsApp. Ubicados en Arauco 1060, Chillán.",
  keywords:
    "imprenta chillán, flyers chillán, stickers chillán, tarjetas de presentación chillán, pendones chillán, etiquetas para cecinas, etiquetas para vinos, etiquetas adhesivas, impresión publicitaria, material gráfico chillán",
  openGraph: {
    title: "Imprenta en Chillán | Impresora Color Ltda",
    description:
      "Flyers, stickers, tarjetas, pendones, menús, imanes y etiquetas para productos. Atención por WhatsApp. Arauco 1060, Chillán.",
    type: "website",
    locale: "es_CL",
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
        <Analytics />
      </body>
    </html>
  );
}
