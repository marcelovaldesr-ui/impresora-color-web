// EDITABLE: Agrega, quita o cambia servicios en los arrays de cada categoría
import Image from "next/image";

const PHONE = "56998441157";
function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

type Servicio = {
  imagen: string;
  imagenUrl?: string;
  imagenAlt?: string;
  titulo: string;
  descripcion: string;
  boton: string;
  wa: string;
  acento: string;
  bg: string;
};

// ── Categoría 1: Publicidad y emprendimientos ─────────────────────────────────
const PUBLICIDAD: Servicio[] = [
  {
    imagen: "flyers",
    imagenUrl: "/images/FLYER.jpg",
    imagenAlt: "Flyers publicitarios impresos a color para publicidad y promociones",
    titulo: "Flyers publicitarios",
    descripcion: "Diseñados para captar atención y generar más ventas.",
    boton: "Cotizar flyers",
    wa: "Hola, quiero cotizar flyers publicitarios.",
    acento: "#E91E8F",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
  },
  {
    imagen: "stickers",
    imagenUrl: "/images/sitkers.png",
    imagenAlt: "Stickers personalizados para marca, emprendimiento o producto",
    titulo: "Stickers personalizados",
    descripcion: "Para tu marca, producto o emprendimiento.",
    boton: "Cotizar stickers",
    wa: "Hola, quiero cotizar stickers personalizados.",
    acento: "#47B7E8",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
  },
  {
    imagen: "etiquetas-adhesivas",
    imagenUrl: "/images/etiquetas.png",
    imagenAlt: "Etiquetas adhesivas para productos, cecinas, vinos y alimentos",
    titulo: "Etiquetas adhesivas",
    descripcion: "Para productos, cecinas, vinos, alimentos, envases y marcas locales. Adhesivos de alta calidad para todo tipo de superficie.",
    boton: "Cotizar etiquetas",
    wa: "Hola, quiero cotizar etiquetas para mi producto. Necesito orientación sobre tamaño, material y cantidad.",
    acento: "#E91E8F",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
  },
  {
    imagen: "tarjetas",
    imagenUrl: "/images/tarjetas.png",
    imagenAlt: "Tarjetas de presentación profesionales impresas",
    titulo: "Tarjetas de presentación",
    descripcion: "Primera impresión profesional para tu negocio.",
    boton: "Cotizar tarjetas",
    wa: "Hola, quiero cotizar tarjetas de presentación.",
    acento: "#2D3E9F",
    bg: "from-[#2D3E9F] to-[#3A4EB0]",
  },
  {
    imagen: "pendones",
    imagenUrl: "/images/roler.png",
    imagenAlt: "Pendones y lonas publicitarias para ferias, locales y eventos",
    titulo: "Pendones",
    descripcion: "Visibilidad total en ferias, locales y eventos.",
    boton: "Cotizar pendones",
    wa: "Hola, quiero cotizar un pendón.",
    acento: "#F47A20",
    bg: "from-[#F47A20] to-[#E91E8F]",
  },
  {
    imagen: "menus",
    imagenUrl: "/images/Menus.png",
    imagenAlt: "Menús impresos para restaurantes, cafeterías y locales gastronómicos",
    titulo: "Menús para locales",
    descripcion: "Presentación profesional para tu restaurante o cafetería.",
    boton: "Cotizar menús",
    wa: "Hola, quiero cotizar menús para mi local.",
    acento: "#47B7E8",
    bg: "from-[#47B7E8] to-[#7DBA2F]",
  },
  {
    imagen: "imanes",
    imagenUrl: "/images/imanes-publicitarios.png",
    imagenAlt: "Imanes publicitarios personalizados con logo y datos de contacto",
    titulo: "Imanes publicitarios",
    descripcion: "Tu marca presente todos los días.",
    boton: "Cotizar imanes",
    wa: "Hola, quiero cotizar imanes publicitarios.",
    acento: "#F5C51B",
    bg: "from-[#F5C51B] to-[#F47A20]",
  },
  {
    imagen: "packaging",
    imagenUrl: "/images/100-stickers-cierre-de-caja.jpg",
    imagenAlt: "Stickers adhesivos para packaging, bolsas y empaques de marca",
    titulo: "Stickers para packaging",
    descripcion: "Adhesivos para bolsas, cajas y empaques de marca.",
    boton: "Cotizar packaging",
    wa: "Hola, quiero cotizar stickers para packaging.",
    acento: "#7DBA2F",
    bg: "from-[#7DBA2F] to-[#47B7E8]",
  },
  {
    imagen: "dipticos",
    imagenUrl: "/images/triptico.png",
    imagenAlt: "Dípticos y trípticos impresos para empresas, clínicas y eventos",
    titulo: "Dípticos y trípticos",
    descripcion: "Material informativo plegado para empresas, eventos, clínicas y negocios que quieren comunicar más.",
    boton: "Cotizar dípticos",
    wa: "Hola, quiero cotizar dípticos o trípticos.",
    acento: "#E91E8F",
    bg: "from-[#E91E8F] to-[#47B7E8]",
  },
];

// ── Categoría 2: Oficina, colegios y empresas ────────────────────────────────
const OFICINA: Servicio[] = [
  {
    imagen: "fotocopias",
    imagenUrl: "/images/fotocopias.png",
    imagenAlt: "Fotocopias rápidas para documentos, trabajos y trámites",
    titulo: "Fotocopias",
    descripcion: "Copias rápidas y claras para documentos, trabajos y trámites.",
    boton: "Cotizar fotocopias",
    wa: "Hola, quiero cotizar fotocopias.",
    acento: "#47B7E8",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
  },
  {
    imagen: "impresiones",
    imagenUrl: "/images/IMPRESIONES.png",
    imagenAlt: "Impresiones para documentos, presentaciones y material de estudio",
    titulo: "Impresiones",
    descripcion: "Impresiones para documentos, presentaciones, material de estudio y empresas.",
    boton: "Cotizar impresiones",
    wa: "Hola, quiero cotizar impresiones.",
    acento: "#2D3E9F",
    bg: "from-[#2D3E9F] to-[#3A4EB0]",
  },
  {
    imagen: "anillados",
    imagenUrl: "/images/anillados.png",
    imagenAlt: "Anillados para trabajos, manuales, informes y documentos",
    titulo: "Anillados",
    descripcion: "Terminación práctica y ordenada para trabajos, manuales, informes y documentos.",
    boton: "Cotizar anillados",
    wa: "Hola, quiero cotizar anillados.",
    acento: "#7DBA2F",
    bg: "from-[#7DBA2F] to-[#2D3E9F]",
  },
  {
    imagen: "timbres",
    imagenUrl: "/images/timbres.png",
    imagenAlt: "Timbres personalizados de caucho y automáticos para empresas y profesionales",
    titulo: "Timbres personalizados",
    descripcion: "Timbres de caucho y automáticos para empresas, profesionales y uso personal.",
    boton: "Cotizar timbres",
    wa: "Hola, quiero cotizar timbres personalizados.",
    acento: "#2D3E9F",
    bg: "from-[#2D3E9F] to-[#47B7E8]",
  },
  {
    imagen: "empastados",
    imagenUrl: "/images/empastado.png",
    imagenAlt: "Empastados para documentos importantes y presentaciones profesionales",
    titulo: "Empastados",
    descripcion: "Presentación firme y profesional para documentos importantes.",
    boton: "Cotizar empastados",
    wa: "Hola, quiero cotizar empastados.",
    acento: "#F47A20",
    bg: "from-[#F47A20] to-[#2D3E9F]",
  },
  {
    imagen: "diplomas",
    imagenUrl: "/images/diplomas.jpg",
    imagenAlt: "Diplomas impresos para cursos, reconocimientos y eventos",
    titulo: "Diplomas",
    descripcion: "Diplomas impresos para cursos, reconocimientos, colegios, eventos y capacitaciones.",
    boton: "Cotizar diplomas",
    wa: "Hola, quiero cotizar diplomas.",
    acento: "#F5C51B",
    bg: "from-[#F5C51B] to-[#F47A20]",
  },
  {
    imagen: "sobres",
    imagenUrl: "/images/Sobres.png",
    imagenAlt: "Sobres personalizados para empresas e instituciones",
    titulo: "Sobres",
    descripcion: "Sobres personalizados para empresas, instituciones y presentaciones corporativas.",
    boton: "Cotizar sobres",
    wa: "Hola, quiero cotizar sobres personalizados.",
    acento: "#47B7E8",
    bg: "from-[#2D3E9F] to-[#47B7E8]",
  },
  {
    imagen: "carpetas-corporativas",
    imagenUrl: "/images/carpertas.png",
    imagenAlt: "Carpetas corporativas con imagen profesional",
    titulo: "Carpetas corporativas",
    descripcion: "Carpetas con imagen profesional para propuestas, documentos y presentaciones.",
    boton: "Cotizar carpetas",
    wa: "Hola, quiero cotizar carpetas corporativas.",
    acento: "#E91E8F",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
  },
  {
    imagen: "reglamentos",
    imagenUrl: "/images/reglamenot-interno.jpg",
    imagenAlt: "Reglamentos internos y manuales empresariales impresos",
    titulo: "Reglamentos internos",
    descripcion: "Impresión y terminación de reglamentos, manuales y documentos empresariales.",
    boton: "Cotizar reglamentos",
    wa: "Hola, quiero cotizar reglamentos internos.",
    acento: "#2D3E9F",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
  },
  {
    imagen: "calendarios",
    imagenUrl: "/images/calendarios.jpg",
    imagenAlt: "Calendarios personalizados para empresas y regalos corporativos",
    titulo: "Calendarios",
    descripcion: "Calendarios personalizados para empresas, regalos corporativos y promociones.",
    boton: "Cotizar calendarios",
    wa: "Hola, quiero cotizar calendarios personalizados.",
    acento: "#F47A20",
    bg: "from-[#F47A20] to-[#E91E8F]",
  },
];

// ── Componente de tarjeta ─────────────────────────────────────────────────────
function TarjetaServicio({ s }: { s: Servicio }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#E91E8F]/40 hover:shadow-xl hover:shadow-[#E91E8F]/8 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className={`relative h-36 bg-gradient-to-br ${s.bg} overflow-hidden flex items-center justify-center`}>
        {s.imagenUrl ? (
          <>
            <Image
              src={s.imagenUrl}
              alt={s.imagenAlt ?? s.titulo}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              unoptimized={s.imagenUrl.startsWith("http")}
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                backgroundSize: "14px 14px",
              }}
            />
            <p className="relative z-10 text-white/20 font-black text-4xl uppercase tracking-widest text-center px-2 leading-tight">
              {s.titulo.split(" ")[0]}
            </p>
          </>
        )}
        <span
          className="absolute bottom-3 left-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full text-white z-10"
          style={{ background: s.acento }}
        >
          {s.titulo}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 bg-white">
        <h3 className="text-[#2D3E9F] font-black text-sm mb-1.5 leading-tight">{s.titulo}</h3>
        <p className="text-gray-500 text-xs leading-relaxed flex-1">{s.descripcion}</p>
        <a
          href={waLink(s.wa)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 bg-[#2D3E9F] hover:bg-[#E91E8F] text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors duration-200"
        >
          <WAIcon />
          {s.boton}
        </a>
      </div>
    </div>
  );
}

// ── Separador de categoría ────────────────────────────────────────────────────
function CategoriaHeader({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 mt-14 first:mt-0">
      <span className="h-0.5 w-8 rounded-full" style={{ background: color }} />
      <span className="font-black text-xs uppercase tracking-widest" style={{ color }}>
        {label}
      </span>
      <span className="h-0.5 flex-1 bg-gray-200 rounded-full" />
    </div>
  );
}

// ── Sección principal ─────────────────────────────────────────────────────────
export default function Servicios() {
  return (
    <section id="servicios" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#E91E8F] font-bold text-sm uppercase tracking-widest">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D3E9F] mt-2 mb-4">
            Todo lo que necesitas para{" "}
            <span className="text-[#E91E8F]">tu negocio,</span>{" "}
            <span className="text-[#47B7E8]">tus productos</span>{" "}
            y tu{" "}
            <span className="text-[#7DBA2F]">empresa</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Publicidad, etiquetas, fotocopias, impresiones, anillados y mucho más.
            Atención rápida por WhatsApp desde Chillán.
          </p>
        </div>

        {/* ── Categoría 1 ── */}
        <CategoriaHeader label="Publicidad y emprendimientos" color="#E91E8F" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PUBLICIDAD.map((s) => <TarjetaServicio key={s.titulo} s={s} />)}
        </div>

        {/* ── Categoría 2 ── */}
        <CategoriaHeader label="Oficina, colegios y empresas" color="#47B7E8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {OFICINA.map((s) => <TarjetaServicio key={s.titulo} s={s} />)}
        </div>

        {/* CTA inferior */}
        <div className="text-center mt-14">
          <p className="text-gray-500 mb-4 text-sm">
            ¿No ves lo que necesitas? Escríbenos y te orientamos.
          </p>
          <a
            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hola, quiero cotizar material gráfico para mi negocio.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#E91E8F] text-[#E91E8F] hover:bg-[#E91E8F] hover:text-white font-bold px-7 py-3 rounded-full transition-all duration-200 text-sm"
          >
            <WAIcon />
            Consultar por WhatsApp
          </a>
        </div>
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
