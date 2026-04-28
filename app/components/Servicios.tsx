// EDITABLE: Agrega, quita o cambia servicios en el array SERVICIOS
// Para agregar imagen real a una tarjeta:
//   1. Copia la imagen a public/images/<nombre>.jpg
//   2. Reemplaza el componente <ProductVisual> de esa tarjeta por:
//      <img src="/images/<nombre>.jpg" alt="..." className="w-full h-full object-cover" />

const PHONE = "56998441157";
function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

type Servicio = {
  imagen: string;      // Ruta futura: public/images/<imagen>.jpg
  titulo: string;
  descripcion: string;
  boton: string;
  wa: string;
  acento: string;      // Color de acento del header
  bg: string;          // Color de fondo del header
};

const SERVICIOS: Servicio[] = [
  {
    imagen: "flyers",                           // → public/images/flyers.jpg
    titulo: "Flyers publicitarios",
    descripcion: "Diseñados para captar atención y generar más ventas.",
    boton: "Cotizar flyers",
    wa: "Hola, quiero cotizar flyers publicitarios.",
    acento: "#F72585",
    bg: "from-[#F72585] to-[#0B1B4D]",
  },
  {
    imagen: "stickers",                         // → public/images/stickers.jpg
    titulo: "Stickers personalizados",
    descripcion: "Para tu marca, producto o emprendimiento.",
    boton: "Cotizar stickers",
    wa: "Hola, quiero cotizar stickers personalizados.",
    acento: "#25B6F7",
    bg: "from-[#25B6F7] to-[#0B1B4D]",
  },
  {
    imagen: "tarjetas",                         // → public/images/tarjetas.jpg
    titulo: "Tarjetas de presentación",
    descripcion: "Primera impresión profesional para tu negocio.",
    boton: "Cotizar tarjetas",
    wa: "Hola, quiero cotizar tarjetas de presentación.",
    acento: "#F9C80E",
    bg: "from-[#0B1B4D] to-[#1a2d6e]",
  },
  {
    imagen: "pendones",                         // → public/images/pendones.jpg
    titulo: "Pendones",
    descripcion: "Visibilidad total en ferias, locales y eventos.",
    boton: "Cotizar pendones",
    wa: "Hola, quiero cotizar un pendón.",
    acento: "#F72585",
    bg: "from-[#0B1B4D] to-[#F72585]/60",
  },
  {
    imagen: "menus",                            // → public/images/menus.jpg
    titulo: "Menús para locales",
    descripcion: "Presentación profesional para tu restaurante o cafetería.",
    boton: "Cotizar menús",
    wa: "Hola, quiero cotizar menús para mi local.",
    acento: "#25B6F7",
    bg: "from-[#25B6F7] to-[#0B1B4D]",
  },
  {
    imagen: "imanes",                           // → public/images/imanes.jpg
    titulo: "Imanes publicitarios",
    descripcion: "Tu marca presente todos los días.",
    boton: "Cotizar imanes",
    wa: "Hola, quiero cotizar imanes publicitarios.",
    acento: "#F9C80E",
    bg: "from-[#F9C80E] to-[#F72585]",
  },
  {
    imagen: "etiquetas-productos",              // → public/images/etiquetas-productos.jpg
    titulo: "Etiquetas para productos",
    descripcion: "Para alimentos, envases y marcas locales.",
    boton: "Cotizar etiquetas",
    wa: "Hola, quiero cotizar etiquetas para productos. Tengo un emprendimiento y necesito orientación.",
    acento: "#F72585",
    bg: "from-[#F72585] to-[#0B1B4D]",
  },
  {
    imagen: "etiquetas-cecinas",                // → public/images/etiquetas-cecinas.jpg
    titulo: "Etiquetas para cecinas",
    descripcion: "Presentación profesional para cortes y embutidos.",
    boton: "Cotizar etiquetas cecinas",
    wa: "Hola, quiero cotizar etiquetas para cecinas.",
    acento: "#F9C80E",
    bg: "from-[#0B1B4D] to-[#F9C80E]/50",
  },
  {
    imagen: "etiquetas-vinos",                  // → public/images/etiquetas-vinos.jpg
    titulo: "Etiquetas para vinos",
    descripcion: "Diseños que dan valor y carácter a tu botella.",
    boton: "Cotizar etiquetas vinos",
    wa: "Hola, quiero cotizar etiquetas para vinos.",
    acento: "#25B6F7",
    bg: "from-[#0B1B4D] to-[#25B6F7]/50",
  },
  {
    imagen: "packaging",                        // → public/images/packaging.jpg
    titulo: "Stickers para packaging",
    descripcion: "Adhesivos para bolsas, cajas y empaques de marca.",
    boton: "Cotizar packaging",
    wa: "Hola, quiero cotizar stickers para packaging.",
    acento: "#F72585",
    bg: "from-[#F72585] to-[#25B6F7]",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#F72585] font-bold text-sm uppercase tracking-widest">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B4D] mt-2 mb-4">
            Todo lo que necesitas para{" "}
            <span className="text-[#F72585]">promocionar tu negocio</span> y{" "}
            <span className="text-[#25B6F7]">presentar mejor tus productos</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            También trabajamos con{" "}
            <strong className="text-[#0B1B4D]">
              productores locales, marcas de alimentos, cecinas, vinos y conservas
            </strong>{" "}
            que necesitan etiquetas y material gráfico para vender mejor.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICIOS.map((s) => (
            <div
              key={s.titulo}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#F72585]/40 hover:shadow-xl hover:shadow-[#F72585]/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Área de imagen
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  EDITABLE: Para usar imagen real reemplaza el
                  div de abajo por:
                  <img
                    src="/images/{s.imagen}.jpg"
                    alt={s.titulo}
                    className="w-full h-44 object-cover"
                  />
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              <div
                className={`relative h-44 bg-gradient-to-br ${s.bg} overflow-hidden flex items-center justify-center`}
              >
                {/* Patrón sutil de fondo */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                    backgroundSize: "14px 14px",
                  }}
                />
                {/* Nombre del producto como watermark */}
                <p className="relative z-10 text-white/20 font-black text-4xl uppercase tracking-widest text-center px-2 leading-tight placeholder-text">
                  {s.titulo.split(" ")[0]}
                </p>
                {/* Badge del tipo */}
                <span
                  className="absolute bottom-3 left-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                  style={{ background: s.acento, color: "#fff" }}
                >
                  {/* EDITABLE: Archivo imagen → public/images/{s.imagen}.jpg */}
                  {s.titulo}
                </span>
              </div>

              {/* Cuerpo */}
              <div className="p-5 flex flex-col flex-1 bg-white">
                <h3 className="text-[#0B1B4D] font-black text-base mb-2 leading-tight">
                  {s.titulo}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {s.descripcion}
                </p>
                <a
                  href={waLink(s.wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 bg-[#0B1B4D] hover:bg-[#F72585] text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-colors duration-200"
                >
                  <WAIcon />
                  Quiero algo así
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA inferior */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4 text-sm">
            ¿No ves lo que necesitas? Escríbenos y te orientamos.
          </p>
          <a
            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hola, quiero cotizar material gráfico para mi negocio.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#F72585] text-[#F72585] hover:bg-[#F72585] hover:text-white font-bold px-7 py-3 rounded-full transition-all duration-200 text-sm"
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
