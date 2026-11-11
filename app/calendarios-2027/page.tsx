import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFloat from "@/app/components/WhatsAppFloat";
import FormularioCalendarios from "./FormularioCalendarios";

/**
 * Landing de la campaña CALENDARIOS 2027 (nov-dic 2026).
 * Público: empresas de Ñuble que regalan calendarios con su marca
 * (minimarkets, supermercados, distribuidoras, ferreterías, agrícolas…).
 * Pedido corporativo mínimo: 500 unidades.
 *
 * Medición:
 *  - Formulario 500+  → conversión "Formulario Cotización (Web)" en Google Ads
 *                       + evento Lead en el píxel de Meta.
 *  - Clic a WhatsApp  → conversión "Clic WhatsApp (Web)" + Contact (listener global).
 *  - El mensaje de WhatsApp de esta página es distinto al de los anuncios de
 *    Meta, así en el chat se sabe de dónde vino cada cliente.
 */

const PHONE = "56998441157";
const WA_MSG = "Hola, vengo de la web y quiero cotizar calendarios 2027 para mi empresa.";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`;

export const metadata: Metadata = {
  title: "Calendarios 2027 con tu logo en Chillán | Impresora Color",
  description:
    "Calendarios 2027 personalizados para empresas de Ñuble: comerciales de taco, con fleje metálico, murales, de escritorio e imán, con tu logo. Producción propia en Chillán desde 1991. Pedidos desde 500 unidades.",
  keywords:
    "calendarios 2027 chillán, calendario de taco, calendario con fleje, calendarios personalizados empresas, calendarios con logo ñuble, calendarios publicitarios, calendarios corporativos, imprenta chillán",
  alternates: { canonical: "/calendarios-2027" },
  openGraph: {
    title: "Calendarios 2027 para tu empresa · Impresos en Chillán",
    description: "De taco, con fleje, murales, de escritorio e imán con tu logo. Producción propia, desde 500 unidades.",
    type: "website",
    locale: "es_CL",
    url: "https://impresoracolor.cl/calendarios-2027",
    images: [{ url: "/images/calendario-taco-2027.jpg", width: 1200, height: 1200 }],
  },
};

const MODELOS = [
  {
    img: "/images/calendario-taco-2027.jpg",
    nombre: "Comercial de taco",
    medida: "Publicidad + bloque de 12 hojas",
    texto:
      "El favorito de nuestros clientes. Arriba tu publicidad a todo color (productos, teléfono, dirección y redes); abajo el taco con un mes por hoja. Tu negocio queda a la vista cada vez que alguien mira la fecha.",
    destacado: true,
  },
  {
    img: "/images/calendario-fleje-2027.jpg",
    nombre: "Lámina única con fleje metálico",
    medida: "Los 12 meses en una hoja",
    texto: "Una sola lámina con todo el año y fleje metálico arriba y abajo para colgar. Mucho espacio para tu marca.",
  },
  {
    img: "/images/calendario-mural.jpg",
    nombre: "Mural",
    medida: "33 × 45 cm aprox.",
    texto: "Con anillado y una foto por mes. Tu marca a la vista los 12 meses.",
  },
  {
    img: "/images/calendario-escritorio.jpg",
    nombre: "Escritorio",
    medida: "22 × 14 cm aprox.",
    texto: "Con anillado metálico. Ideal para clientes de oficina, proveedores y distribuidores.",
  },
  {
    img: "/images/calendario-iman.jpg",
    nombre: "Imán",
    medida: "Formato refrigerador",
    texto: "Económico para grandes volúmenes. Perfecto para minimarkets y reparto a domicilio.",
  },
];

const COMPARACION = [
  ["Dónde se imprime", "Aquí en Chillán, en nuestro taller", "En Santiago u otra ciudad"],
  ["Si algo sale mal", "Lo corregimos y reimprimimos aquí mismo", "Hay que esperar otro despacho"],
  ["Plazos de diciembre", "Sin depender de transporte", "Riesgo de atrasos en temporada alta"],
  ["Con quién hablas", "Con quien imprime tu pedido", "Con un intermediario"],
  ["Revisión de prueba", "Ves la prueba antes de imprimir", "Muchas veces solo un PDF"],
];

const PASOS = [
  ["Cotiza", "Cuéntanos cantidad, tipo y fecha. Te respondemos dentro de 24 horas hábiles."],
  ["Diseño", "Nos mandas tu logo y armamos el diseño con tu marca. Tú lo apruebas."],
  ["Producción", "Imprimimos y terminamos en nuestro taller de Chillán."],
  ["Retiro", "Retiras en Arauco 1060, Chillán. Despacho solo en casos especiales."],
];

const FAQ = [
  {
    q: "¿Cuál es el pedido mínimo?",
    a: "Nuestra línea corporativa de calendarios parte en 500 unidades. Si necesitas menos, escríbenos igual y te orientamos.",
  },
  {
    q: "¿Hasta cuándo reciben pedidos?",
    a: "Recibimos pedidos hasta mediados de diciembre. Mientras antes cotices, más holgura tenemos para diseño y producción.",
  },
  {
    q: "¿Cuánto cuestan?",
    a: "El precio depende del tipo de calendario, la cantidad y las terminaciones. Por eso cotizamos cada pedido: mientras más unidades, menor el valor por calendario.",
  },
  {
    q: "¿Tienen que hacerme el diseño?",
    a: "Si tienes tu logo, armamos el calendario con tu marca y te enviamos una prueba para aprobar. Si ya tienes el diseño completo, lo imprimimos tal cual.",
  },
  {
    q: "¿Hacen despacho?",
    a: "La entrega es con retiro en nuestro local de Arauco 1060, Chillán. En casos especiales coordinamos la entrega.",
  },
  {
    q: "¿Emiten factura?",
    a: "Sí, somos Impresora Color Ltda. y emitimos factura electrónica para que tu empresa la registre como gasto de publicidad.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Calendarios 2027 personalizados para empresas",
    areaServed: "Región de Ñuble, Chile",
    url: "https://impresoracolor.cl/calendarios-2027",
    provider: {
      "@type": "LocalBusiness",
      name: "Impresora Color Ltda",
      telephone: "+56998441157",
      foundingDate: "1991",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Arauco 1060",
        addressLocality: "Chillán",
        addressRegion: "Ñuble",
        addressCountry: "CL",
      },
    },
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white">
        <div className="h-1.5 bg-gradient-to-r from-[#E91E8F] via-[#47B7E8] via-[#7DBA2F] via-[#F5C51B] to-[#F47A20]" />

        {/* HERO */}
        <section className="relative overflow-hidden bg-[#FAFBFF]">
          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div>
              <p className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#E91E8F] bg-[#E91E8F]/8 px-3 py-1.5 rounded-full mb-5">
                Temporada 2027 · Pedidos corporativos
              </p>
              <h1 className="text-4xl sm:text-6xl font-black text-[#111827] leading-[1.04] tracking-tight mb-6 text-balance">
                Calendarios 2027 <span className="text-[#E91E8F]">con tu logo</span>, impresos en Chillán
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl text-pretty">
                Regala a tus clientes algo que van a mirar los 365 días. Calendarios de taco, con fleje, murales, de escritorio e imán con tu marca,
                hechos en nuestro propio taller. Sin intermediarios ni despachos desde Santiago.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-9">
                <a
                  href="#cotizar"
                  className="inline-flex items-center justify-center bg-[#E91E8F] hover:bg-[#c8186e] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-[#E91E8F]/25 transition-colors"
                >
                  Cotizar mis calendarios
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-[#25D366] text-[#111827] font-bold text-base px-8 py-4 rounded-full transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]" aria-hidden="true" />
                  Prefiero WhatsApp
                </a>
              </div>

              <dl className="grid grid-cols-3 gap-4 max-w-lg">
                {[
                  ["500+", "unidades por pedido"],
                  ["1991", "imprimiendo en Chillán"],
                  ["100%", "producción propia"],
                ].map(([n, l]) => (
                  <div key={l} className="border-l-2 border-[#E91E8F] pl-3">
                    <dt className="text-2xl sm:text-3xl font-black text-[#2D3E9F] tabular-nums">{n}</dt>
                    <dd className="text-xs text-gray-500 font-medium leading-snug mt-0.5">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[330px]">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#E91E8F]/15 via-[#47B7E8]/15 to-[#F5C51B]/15 rounded-[3rem] blur-2xl" aria-hidden="true" />
              <div className="relative rounded-[2.2rem] bg-[#111827] p-2.5 shadow-2xl">
                <video
                  className="w-full aspect-[9/16] rounded-[1.8rem] object-cover bg-black"
                  src="/videos/calendarios-2027.mp4"
                  poster="/videos/calendarios-2027-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Video: calendarios 2027 impresos en Chillán"
                />
              </div>
            </div>
          </div>
        </section>

        {/* MODELOS */}
        <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E91E8F] mb-3">Modelos</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mb-10 text-balance">Elige el calendario que va con tu negocio</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODELOS.map((m) => (
              <article
                key={m.nombre}
                className={`group bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#2D3E9F]/8 transition-shadow ${
                  m.destacado ? "sm:col-span-2 lg:row-span-1 grid sm:grid-cols-2 border-[#E91E8F]/40 ring-1 ring-[#E91E8F]/20" : "border-gray-100"
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-gray-50 ${
                    m.destacado ? "aspect-square sm:aspect-auto sm:h-full sm:min-h-[420px]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={m.img}
                    alt={`Calendario 2027 ${m.nombre.toLowerCase()} personalizado`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {m.destacado && (
                    <span className="absolute top-4 left-4 bg-[#E91E8F] text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                      ★ El más pedido
                    </span>
                  )}
                </div>
                <div className={m.destacado ? "p-6 sm:p-8 flex flex-col justify-center" : "p-5"}>
                  <h3 className={`font-black text-[#111827] ${m.destacado ? "text-2xl sm:text-3xl mb-1" : "text-lg"}`}>{m.nombre}</h3>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">{m.medida}</p>
                  <p className={`text-gray-600 leading-relaxed ${m.destacado ? "text-base mb-6" : "text-sm"}`}>{m.texto}</p>
                  {m.destacado && (
                    <a
                      href="#cotizar"
                      className="self-start inline-flex items-center bg-[#E91E8F] hover:bg-[#c8186e] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
                    >
                      Cotizar calendario de taco
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* POR QUÉ DIRECTO */}
        <section className="bg-[#111827] text-white">
          <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#F5C51B] mb-3">Directo con la imprenta</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-balance">¿Por qué no comprarle a un intermediario?</h2>
            <p className="text-white/65 mb-10 max-w-2xl">
              En diciembre todo el mundo pide calendarios al mismo tiempo. Tener la imprenta en la misma ciudad es la diferencia entre llegar a tiempo o no.
            </p>
            {/* En celular cada fila se apila; desde sm es una tabla de 3 columnas */}
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="hidden sm:grid grid-cols-[0.8fr_1.2fr_1fr] bg-white/5 text-sm">
                <div className="p-4" />
                <div className="p-4 font-black text-[#F5C51B]">Impresora Color</div>
                <div className="p-4 font-semibold text-white/50">Intermediario</div>
              </div>
              {COMPARACION.map(([k, a, b]) => (
                <div key={k} className="grid sm:grid-cols-[0.8fr_1.2fr_1fr] border-t border-white/10 first:border-t-0 sm:first:border-t text-sm px-4 py-4 sm:p-0 gap-1.5 sm:gap-0">
                  <div className="sm:p-4 text-xs sm:text-sm uppercase sm:normal-case tracking-wider sm:tracking-normal font-bold sm:font-semibold text-white/45 sm:text-white/70">{k}</div>
                  <div className="sm:p-4 font-semibold"><span className="text-[#F5C51B]">✓</span> {a}</div>
                  <div className="sm:p-4 text-white/45"><span className="sm:hidden">Intermediario: </span>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E91E8F] mb-3">Cómo funciona</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mb-10">De tu logo a la pared de tus clientes</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PASOS.map(([t, d], i) => (
              <li key={t} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-6">
                <span className="block text-4xl font-black text-[#E91E8F]/25 tabular-nums mb-3">0{i + 1}</span>
                <h3 className="font-black text-[#111827] text-lg mb-2">{t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FORMULARIO */}
        <section id="cotizar" className="scroll-mt-20 bg-gradient-to-b from-[#FAFBFF] to-white">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E91E8F] mb-3">Cotización</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mb-4 text-balance">Cotiza tus calendarios 2027</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Completa los datos y te enviamos la cotización dentro de 24 horas hábiles. Recibimos pedidos hasta mediados de diciembre.
              </p>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                {[
                  "Pedidos corporativos desde 500 unidades",
                  "Prueba de diseño antes de imprimir",
                  "Factura electrónica para tu empresa",
                  "Retiro en Arauco 1060, Chillán",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E91E8F] shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#2D3E9F] hover:text-[#E91E8F] transition-colors">
                ¿Más rápido? Escríbenos por WhatsApp →
              </a>
            </div>
            <FormularioCalendarios waUrl={WA_URL} />
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
          <h2 className="text-3xl font-black text-[#111827] mb-8">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group bg-white border border-gray-200 rounded-2xl px-6 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold text-[15px] text-[#111827]">
                  {item.q}
                  <span className="text-[#E91E8F] transition-transform duration-200 group-open:rotate-45 text-xl leading-none" aria-hidden="true">+</span>
                </summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat mensaje={WA_MSG} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
