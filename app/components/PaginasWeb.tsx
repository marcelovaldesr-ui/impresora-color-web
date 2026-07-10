import Reveal from "./Reveal";
import ChatDemo from "./ChatDemo";
import Parallax from "./Parallax";
import TiltCard from "./TiltCard";
import TituloReveal from "./TituloReveal";

// EDITABLE: Servicio de diseño de páginas web para negocios locales (línea nueva de Impresora Color)
// Número personal de Marcelo — este servicio se ofrece a nombre de Impresora Color pero los mensajes deben llegar a él, no al WhatsApp general de la tienda
const PHONE = "56965950344";
function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

type Plan = {
  nombre: string;
  precioDesde: string;
  descripcion: string;
  entrega: string;
  incluye: string[];
  destacado?: boolean;
  wa: string;
};

const PLANES: Plan[] = [
  {
    nombre: "Sitio Básico",
    precioDesde: "Desde $150.000",
    descripcion: "Una página para presentar tu negocio y que te encuentren en Google.",
    entrega: "5-7 días hábiles",
    incluye: [
      "Diseño de una página (inicio, servicios, contacto)",
      "Botón directo a WhatsApp",
      "Optimizado para celular",
      "Dominio y hosting incluidos el primer año",
    ],
    wa: "Hola, quiero cotizar un Sitio Básico (página web para mi negocio).",
  },
  {
    nombre: "Sitio Profesional",
    precioDesde: "Desde $280.000",
    descripcion: "Varias secciones, formulario de contacto y mejor posicionamiento en buscadores.",
    entrega: "7-10 días hábiles",
    incluye: [
      "Todo lo del Sitio Básico",
      "Múltiples secciones (galería, testimonios, FAQ)",
      "Formulario de contacto por correo",
      "SEO local para aparecer en búsquedas de Chillán",
    ],
    destacado: true,
    wa: "Hola, quiero cotizar un Sitio Profesional (página web con varias secciones).",
  },
  {
    nombre: "Tienda Online",
    precioDesde: "Conversemos tu caso",
    descripcion: "Catálogo de productos, carrito de compras y pagos en línea.",
    entrega: "A convenir",
    incluye: [
      "Todo lo del Sitio Profesional",
      "Catálogo de productos con precios",
      "Carrito de compras",
      "Pagos en línea integrados",
    ],
    wa: "Hola, quiero cotizar una Tienda Online para mi negocio.",
  },
];

export default function PaginasWeb() {
  return (
    <section id="paginas-web" className="bg-[#0F1730] py-20 px-4 scroll-mt-16 relative overflow-hidden">
      {/* Blobs de gradiente difuminado con parallax — profundidad de agencia digital */}
      <Parallax ariaHidden speed={0.18} className="absolute -top-24 -left-24">
        <div className="w-80 h-80 rounded-full bg-[#47B7E8]/20 blur-3xl" />
      </Parallax>
      <Parallax ariaHidden speed={-0.12} className="absolute top-1/3 -right-20">
        <div className="w-96 h-96 rounded-full bg-[#E91E8F]/15 blur-3xl" />
      </Parallax>
      <Parallax ariaHidden speed={0.1} className="absolute -bottom-20 left-1/3">
        <div className="w-72 h-72 rounded-full bg-[#7DBA2F]/10 blur-3xl" />
      </Parallax>
      {/* Grano sutil — textura de impresión */}
      <div aria-hidden="true" className="grain absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-center mb-16">
          <Reveal className="text-center lg:text-left">
            <span className="text-[#47B7E8] font-bold text-sm uppercase tracking-widest">
              Servicio digital
            </span>
            <TituloReveal
              className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4"
              segmentos={[
                { t: "Diseño de" },
                {
                  t: "Páginas Web",
                  c: "text-transparent bg-clip-text bg-gradient-to-r from-[#47B7E8] via-[#E91E8F] to-[#47B7E8] bg-[length:200%_auto] animate-[gradient-pan_5s_linear_infinite]",
                },
                { t: "para tu negocio" },
              ]}
            />
            <p className="text-gray-300 max-w-2xl mx-auto lg:mx-0 text-base">
              Si imprimimos tus tarjetas o tu pendón, también podemos crear la página web
              de tu negocio. De hecho, este mismo sitio que estás viendo lo diseñamos nosotros.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <ChatDemo />
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {PLANES.map((p, i) => (
            <Reveal key={p.nombre} delay={i * 120} className="h-full">
            <TiltCard className="h-full rounded-2xl">
            <div
              className={`rounded-2xl p-6 flex flex-col h-full ${
                p.destacado
                  ? "bg-white border-2 border-[#47B7E8] shadow-2xl shadow-[#47B7E8]/20 sm:-translate-y-2 animate-[pulse-glow_3s_ease-in-out_infinite] motion-reduce:animate-none"
                  : "bg-white/5 border border-white/10 hover:bg-white/[0.08]"
              }`}
            >
              {p.destacado && (
                <span className="self-start mb-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-[#47B7E8]">
                  Más elegido
                </span>
              )}
              <h3 className={`font-black text-lg mb-1 ${p.destacado ? "text-[#2D3E9F]" : "text-white"}`}>
                {p.nombre}
              </h3>
              <p className={`font-black text-2xl mb-2 ${p.destacado ? "text-[#E91E8F]" : "text-[#47B7E8]"}`}>
                {p.precioDesde}
              </p>
              <p className={`text-sm mb-4 flex-1 ${p.destacado ? "text-gray-600" : "text-gray-300"}`}>
                {p.descripcion}
              </p>
              <ul className="space-y-2 mb-5">
                {p.incluye.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2 text-xs ${p.destacado ? "text-gray-700" : "text-gray-300"}`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${p.destacado ? "text-[#7DBA2F]" : "text-[#47B7E8]"}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className={`text-[11px] font-semibold mb-3 ${p.destacado ? "text-[#2D3E9F]" : "text-gray-400"}`}>
                Entrega: {p.entrega}
              </p>
              <a
                href={waLink(p.wa)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 font-bold text-sm py-2.5 px-4 rounded-xl transition-colors duration-200 ${
                  p.destacado
                    ? "bg-[#E91E8F] hover:bg-[#c8186e] text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <WAIcon />
                Cotizar por WhatsApp
              </a>
            </div>
            </TiltCard>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          Precios de referencia, el valor final depende del alcance de tu proyecto.
        </p>
      </div>
    </section>
  );
}

function WAIcon() {
  return (
    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
