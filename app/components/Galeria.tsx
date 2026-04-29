// EDITABLE: Para agregar imágenes reales, reemplaza el div del placeholder por:
//   <img src="/images/<nombre>.jpg" alt="..." className="w-full h-full object-cover" />
// Los archivos van en: public/images/

const PHONE = "56998441157";
function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

const TRABAJOS = [
  // Publicidad y emprendimientos
  {
    imagen: "flyers",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
    acento: "#E91E8F",
    nombre: "Flyers publicitarios",
    frase: "Diseñados para captar atención y generar más ventas.",
    wa: "Hola, me gustó un trabajo de flyers y quiero cotizar algo similar.",
  },
  {
    imagen: "stickers",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
    acento: "#47B7E8",
    nombre: "Stickers personalizados",
    frase: "Para tu marca, producto o emprendimiento.",
    wa: "Hola, me gustó un trabajo de stickers y quiero cotizar algo similar.",
  },
  {
    imagen: "tarjetas",
    bg: "from-[#2D3E9F] to-[#3A4EB0]",
    acento: "#2D3E9F",
    nombre: "Tarjetas de presentación",
    frase: "Primera impresión profesional para tu negocio.",
    wa: "Hola, me gustaron las tarjetas y quiero cotizar.",
  },
  {
    imagen: "pendones",
    bg: "from-[#F47A20] to-[#E91E8F]",
    acento: "#F47A20",
    nombre: "Pendones",
    frase: "Visibilidad total en ferias, locales y eventos.",
    wa: "Hola, me gustó el pendón y quiero cotizar uno.",
  },
  {
    imagen: "menus",
    bg: "from-[#47B7E8] to-[#7DBA2F]",
    acento: "#47B7E8",
    nombre: "Menús para locales",
    frase: "Presentación profesional para tu restaurant o cafetería.",
    wa: "Hola, me gustaron los menús y quiero cotizar para mi local.",
  },
  {
    imagen: "imanes",
    bg: "from-[#F5C51B] to-[#F47A20]",
    acento: "#F5C51B",
    nombre: "Imanes publicitarios",
    frase: "Tu marca presente todos los días.",
    wa: "Hola, me gustaron los imanes y quiero cotizar.",
  },
  // Etiquetas y productos
  {
    imagen: "etiquetas-productos",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
    acento: "#E91E8F",
    nombre: "Etiquetas para productos",
    frase: "Para alimentos, envases y marcas locales.",
    wa: "Hola, me gustaron las etiquetas y quiero cotizar.",
  },
  {
    imagen: "etiquetas-cecinas",
    bg: "from-[#F47A20] to-[#2D3E9F]",
    acento: "#F47A20",
    nombre: "Etiquetas para cecinas",
    frase: "Presentación profesional para cortes y embutidos.",
    wa: "Hola, quiero cotizar etiquetas para cecinas.",
  },
  {
    imagen: "etiquetas-vinos",
    bg: "from-[#2D3E9F] to-[#47B7E8]",
    acento: "#47B7E8",
    nombre: "Etiquetas para vinos",
    frase: "Diseños que dan valor y carácter a tu botella.",
    wa: "Hola, quiero cotizar etiquetas para vinos.",
  },
  {
    imagen: "packaging",
    bg: "from-[#7DBA2F] to-[#47B7E8]",
    acento: "#7DBA2F",
    nombre: "Stickers para packaging",
    frase: "Adhesivos para bolsas, cajas y empaques de marca.",
    wa: "Hola, quiero cotizar stickers para packaging.",
  },
  // Oficina, colegios y empresas
  {
    imagen: "fotocopias",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
    acento: "#47B7E8",
    nombre: "Fotocopias e impresiones",
    frase: "Copias e impresiones rápidas para documentos, trabajos y empresas.",
    wa: "Hola, quiero cotizar fotocopias e impresiones.",
  },
  {
    imagen: "anillados",
    bg: "from-[#7DBA2F] to-[#2D3E9F]",
    acento: "#7DBA2F",
    nombre: "Anillados",
    frase: "Terminación práctica para trabajos, manuales e informes.",
    wa: "Hola, quiero cotizar anillados.",
  },
  {
    imagen: "empastados",
    bg: "from-[#F47A20] to-[#2D3E9F]",
    acento: "#F47A20",
    nombre: "Empastados",
    frase: "Presentación firme y profesional para documentos importantes.",
    wa: "Hola, quiero cotizar empastados.",
  },
  {
    imagen: "diplomas",
    bg: "from-[#F5C51B] to-[#F47A20]",
    acento: "#F5C51B",
    nombre: "Diplomas",
    frase: "Para cursos, reconocimientos, colegios y capacitaciones.",
    wa: "Hola, quiero cotizar diplomas.",
  },
  {
    imagen: "carpetas-corporativas",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
    acento: "#E91E8F",
    nombre: "Carpetas corporativas",
    frase: "Imagen profesional para propuestas y presentaciones.",
    wa: "Hola, quiero cotizar carpetas corporativas.",
  },
  {
    imagen: "calendarios",
    bg: "from-[#F47A20] to-[#E91E8F]",
    acento: "#F47A20",
    nombre: "Calendarios",
    frase: "Personalizados para empresas, regalos y promociones.",
    wa: "Hola, quiero cotizar calendarios personalizados.",
  },
];

export default function Galeria() {
  return (
    <section id="galeria" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#E91E8F] font-bold text-sm uppercase tracking-widest">
            Galería
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D3E9F] mt-2 mb-4">
            Trabajos que <span className="text-[#E91E8F]">ayudan a vender</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Cada impresión está pensada para que tu negocio, producto o empresa
            destaque y genere más resultados.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {TRABAJOS.map((t) => (
            <div
              key={t.nombre}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#E91E8F]/40 hover:shadow-xl hover:shadow-[#E91E8F]/8 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Placeholder visual */}
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
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-sm mb-1 leading-tight text-[#2D3E9F]">
                  {t.nombre}
                </h3>
                <p className="text-gray-500 text-xs flex-1 leading-relaxed">
                  {t.frase}
                </p>
                <a
                  href={waLink(t.wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-center border border-gray-200 hover:bg-[#E91E8F] hover:border-[#E91E8F] hover:text-white text-[#2D3E9F] text-xs font-bold py-2 px-3 rounded-xl transition-all duration-200"
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
