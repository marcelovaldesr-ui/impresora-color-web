// Plantilla compartida para páginas de servicio (SEO local).
// Server component: sin JS de cliente, el acordeón usa <details> nativo.
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

const PHONE = "56998441157";

export type FAQItem = { q: string; a: string };

export type ServicioPageProps = {
  slug: string;
  eyebrow: string;
  h1: string;
  h1Acento: string;
  intro: string;
  queHacemos: string[];
  specs?: { label: string; valor: string }[];
  faq: FAQItem[];
  waMensaje: string;
  waLabel: string;
  serviceName: string;
};

export default function PaginaServicio(p: ServicioPageProps) {
  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(p.waMensaje)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: p.serviceName,
        provider: {
          "@type": "LocalBusiness",
          name: "Impresora Color Ltda",
          telephone: "+56998441157",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Arauco 1060",
            addressLocality: "Chillán",
            addressRegion: "Ñuble",
            addressCountry: "CL",
          },
        },
        areaServed: "Chillán, Ñuble, Chile",
        url: `https://impresoracolor.cl/${p.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://impresoracolor.cl/" },
          { "@type": "ListItem", position: 2, name: p.serviceName, item: `https://impresoracolor.cl/${p.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white">
        {/* Franja CMYK — identidad de marca */}
        <div className="h-1.5 bg-gradient-to-r from-[#E91E8F] via-[#47B7E8] via-[#7DBA2F] via-[#F5C51B] to-[#F47A20]" />

        <div className="max-w-3xl mx-auto px-4 py-14">
          {/* Breadcrumb */}
          <nav aria-label="Ruta de navegación" className="text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-[#E91E8F] transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-[#2D3E9F] font-semibold">{p.serviceName}</span>
          </nav>

          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#E91E8F] mb-4">
            {p.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] leading-[1.1] mb-6 text-balance">
            {p.h1} <span className="text-[#E91E8F]">{p.h1Acento}</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 text-pretty">{p.intro}</p>

          {/* CTA principal */}
          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#E91E8F] hover:bg-[#c8186e] text-white font-bold text-base px-7 py-4 rounded-full shadow-lg shadow-[#E91E8F]/25 transition-colors duration-200"
            >
              <WAIcon className="w-5 h-5" />
              {p.waLabel}
            </a>
            <Link
              href="/#cotizar"
              className="inline-flex items-center justify-center gap-2 border border-[#2D3E9F]/25 text-[#2D3E9F] hover:bg-[#2D3E9F]/5 font-medium text-sm px-6 py-4 rounded-full transition-colors duration-200"
            >
              Prefiero el formulario de cotización
            </Link>
          </div>

          {/* Qué imprimimos */}
          <h2 className="text-2xl font-black text-[#2D3E9F] mb-5">¿Qué imprimimos?</h2>
          <ul className="space-y-3 mb-12">
            {p.queHacemos.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 bg-[#E91E8F] rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* Datos concretos */}
          {p.specs && p.specs.length > 0 && (
            <>
              <h2 className="text-2xl font-black text-[#2D3E9F] mb-5">Datos útiles</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {p.specs.map((s) => (
                  <div key={s.label} className="bg-[#F6F8FC] border border-gray-100 rounded-2xl p-5">
                    <dt className="text-xs font-bold uppercase tracking-widest text-[#E91E8F] mb-1.5">{s.label}</dt>
                    <dd className="text-[#2D3E9F] font-bold text-sm leading-relaxed">{s.valor}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {/* Confianza */}
          <div className="bg-[#F6F8FC] border border-gray-100 rounded-2xl p-6 mb-12 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { n: "35", label: "años en Chillán" },
              { n: "<24h", label: "tiempo de respuesta" },
              { n: "100%", label: "impresión local" },
            ].map(({ n, label }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-[#2D3E9F] tabular-nums">{n}</span>
                <span className="text-xs text-gray-500 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* FAQ del servicio */}
          <h2 className="text-2xl font-black text-[#2D3E9F] mb-5">Preguntas frecuentes</h2>
          <div className="space-y-3 mb-14">
            {p.faq.map((item) => (
              <details key={item.q} className="group bg-white border border-gray-200 rounded-2xl px-6 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold text-sm text-[#2D3E9F]">
                  {item.q}
                  <span className="text-[#E91E8F] transition-transform duration-200 group-open:rotate-45 text-xl leading-none" aria-hidden="true">+</span>
                </summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>

          {/* CTA de cierre */}
          <div className="text-center bg-gradient-to-br from-[#2D3E9F] to-[#1f2c73] rounded-3xl p-10">
            <h2 className="text-white font-black text-2xl mb-3">¿Listo para cotizar?</h2>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
              Cuéntanos qué necesitas, la cantidad y para cuándo. Te respondemos en menos de 24 horas.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#E91E8F] hover:bg-[#c8186e] text-white font-bold text-base px-7 py-4 rounded-full shadow-lg transition-colors duration-200"
            >
              <WAIcon className="w-5 h-5" />
              {p.waLabel}
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

function WAIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
