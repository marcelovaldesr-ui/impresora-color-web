import type { Metadata } from "next";
import PaginaServicio from "@/app/components/PaginaServicio";

export const metadata: Metadata = {
  title: "Etiquetas para Cecinas y Alimentos en Chillán | Impresora Color Ltda",
  description:
    "Etiquetas adhesivas para cecinas, vinos, conservas, miel y alimentos en Chillán. 35 años imprimiendo para productores locales de Ñuble. Cotiza por WhatsApp con respuesta en menos de 24 horas.",
  keywords:
    "etiquetas para cecinas, etiquetas para vinos, etiquetas adhesivas chillán, etiquetas para alimentos, etiquetas para miel, etiquetas productos gourmet ñuble, imprenta chillán",
  alternates: { canonical: "/etiquetas-cecinas" },
  openGraph: {
    title: "Etiquetas para Cecinas y Alimentos en Chillán | Impresora Color Ltda",
    description:
      "Etiquetas adhesivas para cecinas, vinos, conservas y alimentos. 35 años imprimiendo para productores locales de Ñuble.",
    type: "website",
    locale: "es_CL",
    url: "https://impresoracolor.cl/etiquetas-cecinas",
  },
};

export default function Page() {
  return (
    <PaginaServicio
      slug="etiquetas-cecinas"
      eyebrow="Etiquetas · Chillán y Ñuble"
      h1="Etiquetas para cecinas y alimentos que"
      h1Acento="venden en el mesón"
      intro="Los productores de Ñuble llevan 35 años etiquetando con nosotros: cecinas, vinos, conservas, miel y productos gourmet. Una etiqueta bien impresa hace que tu producto se vea profesional en la feria, el almacén o el supermercado — y nosotros la imprimimos aquí mismo en Chillán, sin esperas de despacho desde Santiago."
      queHacemos={[
        "Etiquetas adhesivas para cecinas, longanizas y productos cárnicos.",
        "Etiquetas para vinos, licores y cervezas artesanales.",
        "Etiquetas para conservas, mermeladas, miel y productos gourmet.",
        "Etiquetas para envases, frascos, bolsas, cajas y botellas.",
        "Stickers para packaging y cierre de cajas con tu marca.",
      ]}
      specs={[
        { label: "Superficies", valor: "Adhesivos de alta calidad para todo tipo de superficie" },
        { label: "Orientación", valor: "Te ayudamos a definir tamaño, material y cantidad según tu envase" },
      ]}
      faq={[
        {
          q: "¿Hacen etiquetas para cecinas o vinos?",
          a: "Sí, hacemos etiquetas adhesivas para cecinas, vinos, conservas, alimentos, miel, productos gourmet y marcas locales.",
        },
        {
          q: "¿Puedo pedir etiquetas para mi emprendimiento?",
          a: "Sí, puedes cotizar etiquetas para envases, bolsas, frascos, cajas, botellas y packaging. Te orientamos con tamaño, cantidad y material.",
        },
        {
          q: "¿Cómo cotizo más rápido?",
          a: "Envíanos por WhatsApp el producto que necesitas etiquetar, cantidad, tamaño aproximado, archivo si lo tienes y fecha en que lo necesitas.",
        },
      ]}
      waMensaje="Hola, quiero cotizar etiquetas para mi producto (cecinas/alimentos). Necesito orientación sobre tamaño, material y cantidad."
      waLabel="Cotizar etiquetas por WhatsApp"
      serviceName="Etiquetas para cecinas y alimentos"
    />
  );
}
