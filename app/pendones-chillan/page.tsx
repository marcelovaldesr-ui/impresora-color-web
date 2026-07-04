import type { Metadata } from "next";
import PaginaServicio from "@/app/components/PaginaServicio";

export const metadata: Metadata = {
  title: "Pendones y Rollers en Chillán | Impresora Color Ltda",
  description:
    "Pendones tradicionales y rollers retráctiles en Chillán, en 80x200 y 100x200 cm, con o sin estuche de transporte. Entrega en 3-5 días hábiles. Cotiza por WhatsApp.",
  keywords:
    "pendones chillán, roller chillán, pendón roller retráctil, pendones para ferias, pendones para eventos, impresión gran formato chillán, imprenta chillán",
  alternates: { canonical: "/pendones-chillan" },
  openGraph: {
    title: "Pendones y Rollers en Chillán | Impresora Color Ltda",
    description:
      "Pendones y rollers retráctiles en 80x200 y 100x200 cm. Entrega en 3-5 días hábiles en Chillán.",
    type: "website",
    locale: "es_CL",
    url: "https://impresoracolor.cl/pendones-chillan",
  },
};

export default function Page() {
  return (
    <PaginaServicio
      slug="pendones-chillan"
      eyebrow="Gran formato · Chillán"
      h1="Pendones y rollers que"
      h1Acento="se hacen notar"
      intro="Para ferias, eventos, licitaciones y el frontis de tu local: imprimimos pendones tradicionales y rollers retráctiles aquí en Chillán. Los rollers incluyen su estructura para armar y desarmar en segundos, y puedes llevarlo con estuche de transporte para moverlo entre eventos."
      queHacemos={[
        "Rollers retráctiles con estructura incluida, listos para usar.",
        "Pendones tradicionales para colgar en frontis, ferias y eventos.",
        "Impresión a todo color para campañas, promociones y presencia de marca.",
      ]}
      specs={[
        { label: "Tamaños", valor: "80x200 cm y 100x200 cm" },
        { label: "Estuche", valor: "Con o sin estuche de transporte, tú eliges" },
        { label: "Entrega", valor: "3-5 días hábiles" },
        { label: "Archivo", valor: "Si no tienes diseño, consúltanos por apoyo en diseño" },
      ]}
      faq={[
        {
          q: "¿Qué diferencia hay entre pendón y roller?",
          a: "El pendón tradicional se cuelga (frontis, muros, ferias). El roller retráctil trae su propia estructura: se arma en segundos, se guarda enrollado y es ideal para eventos y stands.",
        },
        {
          q: "¿Hacen trabajos para emprendimientos?",
          a: "Sí, trabajamos con emprendedores, restaurantes, tiendas, ferias, food trucks, productores locales y negocios de Chillán.",
        },
        {
          q: "¿Cómo cotizo más rápido?",
          a: "Envíanos por WhatsApp el tamaño que necesitas (80x200 o 100x200 cm), si lo quieres con estuche, tu archivo si lo tienes y la fecha en que lo necesitas.",
        },
      ]}
      waMensaje="Hola, quiero cotizar un pendón o roller retráctil."
      waLabel="Cotizar pendón por WhatsApp"
      serviceName="Pendones y rollers"
    />
  );
}
