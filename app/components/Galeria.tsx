// EDITABLE: Para agregar imágenes reales, reemplaza el div del placeholder por:
//   <img src="/images/<nombre>.jpg" alt="..." className="w-full h-full object-cover" />
// Los archivos van en: public/images/

const PHONE = "56998441157";
function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

const TRABAJOS = [
  {
    imagen: "flyers",           // → public/images/flyers.jpg
    bg: "from-[#F72585] to-[#0B1B4D]",
    acento: "#F72585",
    nombre: "Flyers publicitarios",
    frase: "Diseñados para captar atención y generar más ventas.",
    wa: "Hola, me gustó un trabajo de flyers y quiero cotizar algo similar.",
  },
  {
    imagen: "stickers",         // → public/images/stickers.jpg
    bg: "from-[#25B6F7] to-[#0B1B4D]",
    acento: "#25B6F7",
    nombre: "Stickers personalizados",
    frase: "Para tu marca, producto o emprendimiento.",
    wa: "Hola, me gustó un trabajo de stickers y quiero cotizar algo similar.",
  },
  {
    imagen: "tarjetas",         // → public/images/tarjetas.jpg
    bg: "from-[#0B1B4D] to-[#1a2d6e]",
    acento: "#F9C80E",
    nombre: "Tarjetas de presentación",
    frase: "Primera impresión profesional para tu negocio.",
    wa: "Hola, me gustaron las tarjetas y quiero cotizar.",
  },
  {
    imagen: "pendones",         // → public/images/pendones.jpg
    bg: "from-[#F72585]/80 to-[#0B1B4D]",
    acento: "#F72585",
    nombre: "Pendones",
    frase: "Visibilidad total en ferias, locales y eventos.",
    wa: "Hola, me gustó el pendón y quiero cotizar uno.",
  },
  {
    imagen: "menus",            // → public/images/menus.jpg
    bg: "from-[#25B6F7] to-[#0B1B4D]",
    acento: "#25B6F7",
    nombre: "Menús para locales",
    frase: "Presentación profesional para tu restaurant o cafetería.",
    wa: "Hola, me gustaron los menús y quiero cotizar para mi local.",
  },
  {
    imagen: "imanes",           // → public/images/imanes.jpg
    bg: "from-[#F9C80E] to-[#F72585]",
    acento: "#F9C80E",
    nombre: "Imanes publicitarios",
    frase: "Tu marca presente todos los días.",
    wa: "Hola, me gustaron los imanes y quiero cotizar.",
  },
  {
    imagen: "etiquetas-productos", // → public/images/etiquetas-productos.jpg
    bg: "from-[#F72585] to-[#0B1B4D]",
    acento: "#F72585",
    nombre: "Etiquetas para productos",
    frase: "Para alimentos, envases y marcas locales.",
    wa: "Hola, me gustaron las etiquetas y quiero cotizar.",
  },
  {
    imagen: "etiquetas-cecinas",   // → public/images/etiquetas-cecinas.jpg
    bg: "from-[#F9C80E]/70 to-[#0B1B4D]",
    acento: "#F9C80E",
    nombre: "Etiquetas para cecinas",
    frase: "Presentación profesional para cortes y embutidos.",
    wa: "Hola, quiero cotizar etiquetas para cecinas.",
  },
  {
    imagen: "etiquetas-vinos",     // → public/images/etiquetas-vinos.jpg
    bg: "from-[#0B1B4D] to-[#25B6F7]/60",
    acento: "#25B6F7",
    nombre: "Etiquetas para vinos",
    frase: "Diseños que dan valor y carácter a tu botella.",
    wa: "Hola, quiero cotizar etiquetas para vinos.",
  },
  {
    imagen: "packaging",           // → public/images/packaging.jpg
    bg: "from-[#F72585] to-[#25B6F7]",
    acento: "#F72585",
    nombre: "Stickers para packaging",
    frase: "Adhesivos para bolsas, cajas y empaques de marca.",
    wa: "Hola, quiero cotizar stickers para packaging.",
  },
];

export default function Galeria() {
  return (
    <section id="galeria" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#F72585] font-bold text-sm uppercase tracking-widest">
            Galería
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B4D] mt-2 mb-4">
            Trabajos que <span className="text-[#F72585]">ayudan a vender</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Cada impresión está pensada para que tu negocio o producto destaque
            y genere más ventas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {TRABAJOS.map((t) => (
            <div
              key={t.nombre}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#F72585]/40 hover:shadow-xl hover:shadow-[#F72585]/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Placeholder visual del producto
                  EDITABLE: Reemplaza este bloque por tu imagen real:
                  <img src="/images/{t.imagen}.jpg" alt={t.nombre} className="w-full h-40 object-cover" /> */}
              <div
                className={`relative h-40 bg-gradient-to-br ${t.bg} overflow-hidden flex items-center justify-center`}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                    backgroundSize: "12px 12px",
                  }}
                />
                <p className="relative text-white/20 font-black text-3xl uppercase tracking-widest text-center px-2 leading-tight placeholder-text">
                  {t.nombre.split(" ").slice(0, 2).join("\n")}
                </p>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3
                  className="font-bold text-sm mb-1 leading-tight"
                  style={{ color: "#0B1B4D" }}
                >
                  {t.nombre}
                </h3>
                <p className="text-gray-500 text-xs flex-1 leading-relaxed">
                  {t.frase}
                </p>
                <a
                  href={waLink(t.wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-center border border-gray-200 hover:bg-[#F72585] hover:border-[#F72585] hover:text-white text-[#0B1B4D] text-xs font-bold py-2 px-3 rounded-xl transition-all duration-200"
                >
                  Quiero algo así
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
