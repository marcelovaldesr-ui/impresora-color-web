import Image from "next/image";

const PHONE = "56998441157";
function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

type Trabajo = {
  imagen: string;
  imagenUrl?: string;
  imagenAlt?: string;
  bg: string;
  acento: string;
  nombre: string;
  frase: string;
  wa: string;
};

const TRABAJOS: Trabajo[] = [
  // Publicidad y emprendimientos
  {
    imagen: "flyers",
    imagenUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80",
    imagenAlt: "Flyers publicitarios impresos a color para publicidad y promociones",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
    acento: "#E91E8F",
    nombre: "Flyers publicitarios",
    frase: "Diseñados para captar atención y generar más ventas.",
    wa: "Hola, me gustó un trabajo de flyers y quiero cotizar algo similar.",
  },
  {
    imagen: "stickers",
    imagenUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    imagenAlt: "Stickers personalizados para marca, emprendimiento o producto",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
    acento: "#47B7E8",
    nombre: "Stickers personalizados",
    frase: "Para tu marca, producto o emprendimiento.",
    wa: "Hola, me gustó un trabajo de stickers y quiero cotizar algo similar.",
  },
  {
    imagen: "tarjetas",
    imagenUrl: "https://images.unsplash.com/photo-1572502742775-c14fa8cbf773?w=600&q=80",
    imagenAlt: "Tarjetas de presentación profesionales impresas",
    bg: "from-[#2D3E9F] to-[#3A4EB0]",
    acento: "#2D3E9F",
    nombre: "Tarjetas de presentación",
    frase: "Primera impresión profesional para tu negocio.",
    wa: "Hola, me gustaron las tarjetas y quiero cotizar.",
  },
  {
    imagen: "pendones",
    imagenUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    imagenAlt: "Pendones y lonas publicitarias para ferias, locales y eventos",
    bg: "from-[#F47A20] to-[#E91E8F]",
    acento: "#F47A20",
    nombre: "Pendones",
    frase: "Visibilidad total en ferias, locales y eventos.",
    wa: "Hola, me gustó el pendón y quiero cotizar uno.",
  },
  {
    imagen: "menus",
    imagenUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    imagenAlt: "Menús impresos para restaurantes, cafeterías y locales gastronómicos",
    bg: "from-[#47B7E8] to-[#7DBA2F]",
    acento: "#47B7E8",
    nombre: "Menús para locales",
    frase: "Presentación profesional para tu restaurant o cafetería.",
    wa: "Hola, me gustaron los menús y quiero cotizar para mi local.",
  },
  {
    imagen: "imanes",
    imagenUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    imagenAlt: "Imanes publicitarios personalizados con logo y datos de contacto",
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
    imagenUrl: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=600&q=80",
    imagenAlt: "Stickers adhesivos para packaging, bolsas y empaques de marca",
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
              <div
                className={`relative h-40 bg-gradient-to-br ${t.bg} overflow-hidden flex items-center justify-center`}
              >
                {t.imagenUrl ? (
                  <>
                    <Image
                      src={t.imagenUrl}
                      alt={t.imagenAlt ?? t.nombre}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                        backgroundSize: "12px 12px",
                      }}
                    />
                    <p className="relative text-white/20 font-black text-3xl uppercase tracking-widest text-center px-2 leading-tight">
                      {t.nombre.split(" ").slice(0, 2).join("\n")}
                    </p>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
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
