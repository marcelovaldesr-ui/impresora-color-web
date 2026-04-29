// EDITABLE: Agrega, quita o cambia servicios en los arrays de cada categoría

const PHONE = "56998441157";
function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

type Servicio = {
  imagen: string;
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
    titulo: "Flyers publicitarios",
    descripcion: "Diseñados para captar atención y generar más ventas.",
    boton: "Cotizar flyers",
    wa: "Hola, quiero cotizar flyers publicitarios.",
    acento: "#E91E8F",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
  },
  {
    imagen: "stickers",
    titulo: "Stickers personalizados",
    descripcion: "Para tu marca, producto o emprendimiento.",
    boton: "Cotizar stickers",
    wa: "Hola, quiero cotizar stickers personalizados.",
    acento: "#47B7E8",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
  },
  {
    imagen: "tarjetas",
    titulo: "Tarjetas de presentación",
    descripcion: "Primera impresión profesional para tu negocio.",
    boton: "Cotizar tarjetas",
    wa: "Hola, quiero cotizar tarjetas de presentación.",
    acento: "#2D3E9F",
    bg: "from-[#2D3E9F] to-[#3A4EB0]",
  },
  {
    imagen: "pendones",
    titulo: "Pendones",
    descripcion: "Visibilidad total en ferias, locales y eventos.",
    boton: "Cotizar pendones",
    wa: "Hola, quiero cotizar un pendón.",
    acento: "#F47A20",
    bg: "from-[#F47A20] to-[#E91E8F]",
  },
  {
    imagen: "menus",
    titulo: "Menús para locales",
    descripcion: "Presentación profesional para tu restaurante o cafetería.",
    boton: "Cotizar menús",
    wa: "Hola, quiero cotizar menús para mi local.",
    acento: "#47B7E8",
    bg: "from-[#47B7E8] to-[#7DBA2F]",
  },
  {
    imagen: "imanes",
    titulo: "Imanes publicitarios",
    descripcion: "Tu marca presente todos los días.",
    boton: "Cotizar imanes",
    wa: "Hola, quiero cotizar imanes publicitarios.",
    acento: "#F5C51B",
    bg: "from-[#F5C51B] to-[#F47A20]",
  },
  {
    imagen: "packaging",
    titulo: "Stickers para packaging",
    descripcion: "Adhesivos para bolsas, cajas y empaques de marca.",
    boton: "Cotizar packaging",
    wa: "Hola, quiero cotizar stickers para packaging.",
    acento: "#7DBA2F",
    bg: "from-[#7DBA2F] to-[#47B7E8]",
  },
];

// ── Categoría 2: Etiquetas y productos ───────────────────────────────────────
const ETIQUETAS: Servicio[] = [
  {
    imagen: "etiquetas-adhesivas",
    titulo: "Etiquetas adhesivas",
    descripcion: "Adhesivos de alta calidad para todo tipo de superficie, envases y packaging.",
    boton: "Cotizar etiquetas",
    wa: "Hola, quiero cotizar etiquetas adhesivas.",
    acento: "#E91E8F",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
  },
  {
    imagen: "etiquetas-productos",
    titulo: "Etiquetas para productos",
    descripcion: "Para alimentos, envases y marcas locales.",
    boton: "Cotizar etiquetas",
    wa: "Hola, quiero cotizar etiquetas para productos. Tengo un emprendimiento y necesito orientación.",
    acento: "#7DBA2F",
    bg: "from-[#7DBA2F] to-[#2D3E9F]",
  },
  {
    imagen: "etiquetas-cecinas",
    titulo: "Etiquetas para cecinas",
    descripcion: "Presentación profesional para cortes y embutidos.",
    boton: "Cotizar etiquetas cecinas",
    wa: "Hola, quiero cotizar etiquetas para cecinas.",
    acento: "#F47A20",
    bg: "from-[#F47A20] to-[#2D3E9F]",
  },
  {
    imagen: "etiquetas-vinos",
    titulo: "Etiquetas para vinos",
    descripcion: "Diseños que dan valor y carácter a tu botella.",
    boton: "Cotizar etiquetas vinos",
    wa: "Hola, quiero cotizar etiquetas para vinos.",
    acento: "#47B7E8",
    bg: "from-[#2D3E9F] to-[#47B7E8]",
  },
  {
    imagen: "etiquetas-alimentos",
    titulo: "Etiquetas para alimentos",
    descripcion: "Etiquetas para conservas, miel, productos gourmet y marcas locales.",
    boton: "Cotizar etiquetas alimentos",
    wa: "Hola, quiero cotizar etiquetas para alimentos.",
    acento: "#7DBA2F",
    bg: "from-[#7DBA2F] to-[#47B7E8]",
  },
];

// ── Categoría 3: Oficina, colegios y empresas ─────────────────────────────────
const OFICINA: Servicio[] = [
  {
    imagen: "fotocopias",
    titulo: "Fotocopias",
    descripcion: "Copias rápidas y claras para documentos, trabajos y trámites.",
    boton: "Cotizar fotocopias",
    wa: "Hola, quiero cotizar fotocopias.",
    acento: "#47B7E8",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
  },
  {
    imagen: "impresiones",
    titulo: "Impresiones",
    descripcion: "Impresiones para documentos, presentaciones, material de estudio y empresas.",
    boton: "Cotizar impresiones",
    wa: "Hola, quiero cotizar impresiones.",
    acento: "#2D3E9F",
    bg: "from-[#2D3E9F] to-[#3A4EB0]",
  },
  {
    imagen: "anillados",
    titulo: "Anillados",
    descripcion: "Terminación práctica y ordenada para trabajos, manuales, informes y documentos.",
    boton: "Cotizar anillados",
    wa: "Hola, quiero cotizar anillados.",
    acento: "#7DBA2F",
    bg: "from-[#7DBA2F] to-[#2D3E9F]",
  },
  {
    imagen: "empastados",
    titulo: "Empastados",
    descripcion: "Presentación firme y profesional para documentos importantes.",
    boton: "Cotizar empastados",
    wa: "Hola, quiero cotizar empastados.",
    acento: "#F47A20",
    bg: "from-[#F47A20] to-[#2D3E9F]",
  },
  {
    imagen: "diplomas",
    titulo: "Diplomas",
    descripcion: "Diplomas impresos para cursos, reconocimientos, colegios, eventos y capacitaciones.",
    boton: "Cotizar diplomas",
    wa: "Hola, quiero cotizar diplomas.",
    acento: "#F5C51B",
    bg: "from-[#F5C51B] to-[#F47A20]",
  },
  {
    imagen: "sobres",
    titulo: "Sobres",
    descripcion: "Sobres personalizados para empresas, instituciones y presentaciones corporativas.",
    boton: "Cotizar sobres",
    wa: "Hola, quiero cotizar sobres personalizados.",
    acento: "#47B7E8",
    bg: "from-[#2D3E9F] to-[#47B7E8]",
  },
  {
    imagen: "carpetas-corporativas",
    titulo: "Carpetas corporativas",
    descripcion: "Carpetas con imagen profesional para propuestas, documentos y presentaciones.",
    boton: "Cotizar carpetas",
    wa: "Hola, quiero cotizar carpetas corporativas.",
    acento: "#E91E8F",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
  },
  {
    imagen: "reglamentos",
    titulo: "Reglamentos internos",
    descripcion: "Impresión y terminación de reglamentos, manuales y documentos empresariales.",
    boton: "Cotizar reglamentos",
    wa: "Hola, quiero cotizar reglamentos internos.",
    acento: "#2D3E9F",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
  },
  {
    imagen: "calendarios",
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
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "14px 14px",
          }}
        />
        <p className="relative z-10 text-white/20 font-black text-4xl uppercase tracking-widest text-center px-2 leading-tight placeholder-text">
          {s.titulo.split(" ")[0]}
        </p>
        <span
          className="absolute bottom-3 left-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full text-white"
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
        <CategoriaHeader label="Etiquetas y productos" color="#7DBA2F" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {ETIQUETAS.map((s) => <TarjetaServicio key={s.titulo} s={s} />)}
        </div>

        {/* ── Categoría 3 ── */}
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
