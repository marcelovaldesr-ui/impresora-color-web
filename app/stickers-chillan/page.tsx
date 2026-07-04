import type { Metadata } from "next";
import PaginaServicio from "@/app/components/PaginaServicio";

export const metadata: Metadata = {
  title: "Stickers Personalizados en Chillán | Impresora Color Ltda",
  description:
    "Stickers personalizados en Chillán: circulares, cuadrados o rectangulares, desde 50 unidades, en 5, 8, 10 cm o tamaño personalizado. Entrega en 2-4 días hábiles. Cotiza por WhatsApp.",
  keywords:
    "stickers chillán, stickers personalizados, calcomanías chillán, stickers para packaging, stickers para emprendimientos, adhesivos personalizados ñuble, imprenta chillán",
  alternates: { canonical: "/stickers-chillan" },
  openGraph: {
    title: "Stickers Personalizados en Chillán | Impresora Color Ltda",
    description:
      "Stickers circulares, cuadrados o rectangulares desde 50 unidades. Entrega en 2-4 días hábiles en Chillán.",
    type: "website",
    locale: "es_CL",
    url: "https://impresoracolor.cl/stickers-chillan",
  },
};

export default function Page() {
  return (
    <PaginaServicio
      slug="stickers-chillan"
      eyebrow="Stickers · Chillán"
      h1="Stickers personalizados que"
      h1Acento="pegan tu marca en todas partes"
      intro="Para packaging, promociones, envases y regalos: los stickers son la forma más económica de poner tu marca en circulación. Los imprimimos aquí en Chillán desde 50 unidades, así que no necesitas pedir miles para partir."
      queHacemos={[
        "Stickers para productos, envases y packaging de marca.",
        "Stickers de cierre de caja y bolsas para emprendimientos.",
        "Calcomanías para promociones, eventos y campañas.",
      ]}
      specs={[
        { label: "Formas", valor: "Circular, cuadrado o rectangular" },
        { label: "Tamaños", valor: "5, 8, 10 cm o personalizado" },
        { label: "Cantidad mínima", valor: "Desde 50 unidades" },
        { label: "Entrega", valor: "2-4 días hábiles" },
      ]}
      faq={[
        {
          q: "¿Puedo imprimir stickers personalizados?",
          a: "Sí, hacemos stickers para productos, packaging, promociones, envases y marcas.",
        },
        {
          q: "¿Hacen trabajos para emprendimientos?",
          a: "Sí, trabajamos con emprendedores, restaurantes, tiendas, ferias, food trucks, productores locales y negocios de Chillán.",
        },
        {
          q: "¿Cómo cotizo más rápido?",
          a: "Envíanos por WhatsApp la forma y tamaño del sticker, la cantidad, tu archivo si lo tienes y la fecha en que lo necesitas.",
        },
      ]}
      waMensaje="Hola, quiero cotizar stickers personalizados."
      waLabel="Cotizar stickers por WhatsApp"
      serviceName="Stickers personalizados"
    />
  );
}
