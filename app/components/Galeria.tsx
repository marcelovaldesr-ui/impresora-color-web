import Image from "next/image";

const PHONE = "56998441157";
function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

type Trabajo = {
  imagenUrl: string;
  imagenAlt: string;
  bg: string;
  acento: string;
  nombre: string;
  frase: string;
  wa: string;
  objectFit?: "cover" | "contain";
};

const TRABAJOS: Trabajo[] = [
  // Publicidad y emprendimientos
  {
    imagenUrl: "/images/FLYER.jpg",
    imagenAlt: "Flyers publicitarios impresos a color para publicidad y promociones",
    objectFit: "contain",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
    acento: "#E91E8F",
    nombre: "Flyers publicitarios",
    frase: "Diseñados para captar atención y generar más ventas.",
    wa: "Hola, me gustó un trabajo de flyers y quiero cotizar algo similar.",
  },
  {
    imagenUrl: "/images/sitkers.png",
    imagenAlt: "Stickers personalizados para marca, emprendimiento o producto",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
    acento: "#47B7E8",
    nombre: "Stickers personalizados",
    frase: "Para tu marca, producto o emprendimiento.",
    wa: "Hola, me gustó un trabajo de stickers y quiero cotizar algo similar.",
  },
  {
    imagenUrl: "/images/tarjetas.png",
    imagenAlt: "Tarjetas de presentación profesionales impresas",
    bg: "from-[#2D3E9F] to-[#3A4EB0]",
    acento: "#2D3E9F",
    nombre: "Tarjetas de presentación",
    frase: "Primera impresión profesional para tu negocio.",
    wa: "Hola, me gustaron las tarjetas y quiero cotizar.",
  },
  {
    imagenUrl: "/images/pendon2.png",
    imagenAlt: "Pendones y lonas publicitarias para ferias, locales y eventos",
    objectFit: "contain",
    bg: "from-[#F47A20] to-[#E91E8F]",
    acento: "#F47A20",
    nombre: "Pendones",
    frase: "Visibilidad total en ferias, locales y eventos.",
    wa: "Hola, me gustó el pendón y quiero cotizar uno.",
  },
  {
    imagenUrl: "/images/Menus.png",
    imagenAlt: "Menús impresos para restaurantes, cafeterías y locales gastronómicos",
    bg: "from-[#47B7E8] to-[#7DBA2F]",
    acento: "#47B7E8",
    nombre: "Menús para locales",
    frase: "Presentación profesional para tu restaurant o cafetería.",
    wa: "Hola, me gustaron los menús y quiero cotizar para mi local.",
  },
  {
    imagenUrl: "/images/imanes-publicitarios.png",
    imagenAlt: "Imanes publicitarios personalizados con logo y datos de contacto",
    bg: "from-[#F5C51B] to-[#F47A20]",
    acento: "#F5C51B",
    nombre: "Imanes publicitarios",
    frase: "Tu marca presente todos los días.",
    wa: "Hola, me gustaron los imanes y quiero cotizar.",
  },
  {
    imagenUrl: "/images/triptico.png",
    imagenAlt: "Dípticos y trípticos impresos para empresas, clínicas y eventos",
    bg: "from-[#E91E8F] to-[#47B7E8]",
    acento: "#E91E8F",
    nombre: "Dípticos y trípticos",
    frase: "Material informativo plegado para empresas y eventos.",
    wa: "Hola, quiero cotizar dípticos o trípticos.",
  },
  // Etiquetas y packaging
  {
    imagenUrl: "/images/etiquetas.png",
    imagenAlt: "Etiquetas adhesivas para productos, cecinas, vinos y alimentos",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
    acento: "#E91E8F",
    nombre: "Etiquetas adhesivas",
    frase: "Para productos, cecinas, vinos, alimentos y marcas locales.",
    wa: "Hola, me gustaron las etiquetas y quiero cotizar.",
  },
  {
    imagenUrl: "/images/100-stickers-cierre-de-caja.jpg",
    imagenAlt: "Stickers adhesivos para packaging, bolsas y empaques de marca",
    bg: "from-[#7DBA2F] to-[#47B7E8]",
    acento: "#7DBA2F",
    nombre: "Stickers para packaging",
    frase: "Adhesivos para bolsas, cajas y empaques de marca.",
    wa: "Hola, quiero cotizar stickers para packaging.",
  },
  // Oficina, colegios y empresas
  {
    imagenUrl: "/images/fotocopias.png",
    imagenAlt: "Fotocopias rápidas para documentos, trabajos y trámites",
    bg: "from-[#47B7E8] to-[#2D3E9F]",
    acento: "#47B7E8",
    nombre: "Fotocopias",
    frase: "Copias rápidas y claras para documentos, trabajos y trámites.",
    wa: "Hola, quiero cotizar fotocopias.",
  },
  {
    imagenUrl: "/images/IMPRESIONES.png",
    imagenAlt: "Impresiones para documentos, presentaciones y material de estudio",
    bg: "from-[#2D3E9F] to-[#3A4EB0]",
    acento: "#2D3E9F",
    nombre: "Impresiones",
    frase: "Para documentos, presentaciones, material de estudio y empresas.",
    wa: "Hola, quiero cotizar impresiones.",
  },
  {
    imagenUrl: "/images/anillados.png",
    imagenAlt: "Anillados para trabajos, manuales, informes y documentos",
    bg: "from-[#7DBA2F] to-[#2D3E9F]",
    acento: "#7DBA2F",
    nombre: "Anillados",
    frase: "Terminación práctica para trabajos, manuales e informes.",
    wa: "Hola, quiero cotizar anillados.",
  },
  {
    imagenUrl: "/images/empastado.png",
    imagenAlt: "Empastados para documentos importantes y presentaciones profesionales",
    bg: "from-[#F47A20] to-[#2D3E9F]",
    acento: "#F47A20",
    nombre: "Empastados",
    frase: "Presentación firme y profesional para documentos importantes.",
    wa: "Hola, quiero cotizar empastados.",
  },
  {
    imagenUrl: "/images/diplomas.jpg",
    imagenAlt: "Diplomas impresos para cursos, reconocimientos y eventos",
    bg: "from-[#F5C51B] to-[#F47A20]",
    acento: "#F5C51B",
    nombre: "Diplomas",
    frase: "Para cursos, reconocimientos, colegios y capacitaciones.",
    wa: "Hola, quiero cotizar diplomas.",
  },
  {
    imagenUrl: "/images/carpertas.png",
    imagenAlt: "Carpetas corporativas con imagen profesional",
    bg: "from-[#E91E8F] to-[#2D3E9F]",
    acento: "#E91E8F",
    nombre: "Carpetas corporativas",
    frase: "Imagen profesional para propuestas y presentaciones.",
    wa: "Hola, quiero cotizar carpetas corporativas.",
  },
  {
    imagenUrl: "/images/calendarios.jpg",
    imagenAlt: "Calendarios personalizados para empresas y regalos corporativos",
    bg: "from-[#F47A20] to-[#E91E8F]",
    acento: "#F47A20",
    nombre: "Calendarios",
    frase: "Personalizados para empresas, regalos y promociones.",
    wa: "Hola, quiero cotizar calendarios personalizados.",
  },
  {
    imagenUrl: "/images/timbres.png",
    imagenAlt: "Timbres personalizados de caucho y automáticos para empresas y profesionales",
    bg: "from-[#2D3E9F] to-[#47B7E8]",
    acento: "#2D3E9F",
    nombre: "Timbres personalizados",
    frase: "De caucho y automáticos para empresas y profesionales.",
    wa: "Hola, quiero cotizar timbres personalizados.",
  },
];

export default function Galeria() {
  return (
    <section id="galeria" className="bg-white py-20 px-4 scroll-mt-28">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {TRABAJOS.map((t) => (
            <div
              key={t.nombre}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#E91E8F]/40 hover:shadow-xl hover:shadow-[#E91E8F]/8 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div
                className={`relative h-40 overflow-hidden ${t.objectFit === "contain" ? "bg-[#f8f8f8]" : `bg-gradient-to-br ${t.bg}`}`}
              >
                <Image
                  src={t.imagenUrl}
                  alt={t.imagenAlt}
                  fill
                  className={t.objectFit === "contain" ? "object-contain p-3" : "object-cover"}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {t.objectFit !== "contain" && (
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                )}
              </div>

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
