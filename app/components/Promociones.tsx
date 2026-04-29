// EDITABLE: Modifica los packs, textos y mensajes de WhatsApp según temporada
const PHONE = "56998441157";
function waLink(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

const PACKS = [
  {
    emoji: "🚀",
    badge: "Para emprendedores",
    nombre: "Pack Emprendedor",
    incluye: ["Tarjetas de presentación", "Stickers personalizados", "Flyers publicitarios"],
    descripcion: "Ideal para quienes están partiendo o quieren mejorar la presentación de su marca.",
    boton: "Cotizar Pack Emprendedor",
    wa: "Hola, quiero cotizar el Pack Emprendedor.",
    destaca: false,
    acento: "#47B7E8",
  },
  {
    emoji: "🍽️",
    badge: "Para locales de comida",
    nombre: "Pack Restaurante",
    incluye: ["Menús impresos", "Stickers personalizados", "Imanes publicitarios"],
    descripcion: "Perfecto para restaurantes, cafeterías, food trucks y locales de comida.",
    boton: "Cotizar Pack Restaurante",
    wa: "Hola, quiero cotizar el Pack Restaurante.",
    destaca: true,
    acento: "#E91E8F",
  },
  {
    emoji: "🏪",
    badge: "Para ferias y eventos",
    nombre: "Pack Feria o Evento",
    incluye: ["Pendón", "Flyers publicitarios", "Tarjetas de presentación"],
    descripcion: "Para destacar tu negocio en ferias, eventos, exposiciones y vitrinas.",
    boton: "Cotizar Pack Feria",
    wa: "Hola, quiero cotizar el Pack Feria o Evento.",
    destaca: false,
    acento: "#F47A20",
  },
  {
    emoji: "💼",
    badge: "Para negocios establecidos",
    nombre: "Pack Marca Profesional",
    incluye: ["Tarjetas de presentación", "Etiquetas adhesivas", "Adhesivos de marca"],
    descripcion: "Para negocios que quieren verse más ordenados, confiables y profesionales.",
    boton: "Cotizar Pack Marca",
    wa: "Hola, quiero cotizar el Pack Marca Profesional.",
    destaca: false,
    acento: "#2D3E9F",
  },
  {
    emoji: "🥩",
    badge: "Para productores locales",
    nombre: "Pack Producto Local",
    incluye: ["Etiquetas para productos", "Stickers para packaging", "Material gráfico para envases"],
    descripcion:
      "Ideal para cecinas, vinos, conservas, miel, alimentos y marcas locales que quieren mejorar la presentación.",
    boton: "Cotizar Pack Producto Local",
    wa: "Hola, quiero cotizar el Pack Producto Local para etiquetas y packaging.",
    destaca: true,
    acento: "#7DBA2F",
  },
];

export default function Promociones() {
  return (
    <section id="promociones" className="bg-[#F6F8FC] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#E91E8F] font-bold text-sm uppercase tracking-widest">
            Promociones
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D3E9F] mt-2 mb-4">
            Packs <span className="text-[#E91E8F]">especiales</span> para tu negocio
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Elige el pack que más se adapta o escríbenos para armar uno a tu medida.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKS.map((p) => (
            <div
              key={p.nombre}
              className={`relative bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                p.destaca
                  ? "border-2 shadow-xl"
                  : "border border-gray-200 hover:border-gray-300 hover:shadow-lg"
              }`}
              style={p.destaca ? { borderColor: p.acento, boxShadow: `0 20px 40px ${p.acento}20` } : {}}
            >
              {/* Barra de color superior */}
              <div
                className="h-1.5 w-full"
                style={{ background: `linear-gradient(to right, ${p.acento}, ${p.acento}88)` }}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start gap-3 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${p.acento}15` }}
                  >
                    {p.emoji}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{p.badge}</span>
                    <h3 className="text-[#2D3E9F] font-black text-lg leading-tight">{p.nombre}</h3>
                  </div>
                </div>

                {/* Incluye */}
                <ul className="space-y-2 mb-5 flex-1">
                  {p.incluye.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-black"
                        style={{ background: p.acento }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Descripción */}
                <p className="text-gray-400 text-sm mb-5 leading-relaxed border-t border-gray-100 pt-4">
                  {p.descripcion}
                </p>

                {/* Botón */}
                <a
                  href={waLink(p.wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-bold py-3 px-5 rounded-xl text-sm transition-all duration-200 text-white hover:opacity-90 active:scale-95"
                  style={{ background: p.acento }}
                >
                  <WAIcon />
                  {p.boton}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4 text-sm">
            ¿Necesitas algo distinto? Armamos el pack a tu medida.
          </p>
          <a
            href={waLink("Hola, quiero cotizar un pack personalizado para mi negocio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#E91E8F] text-[#E91E8F] hover:bg-[#E91E8F] hover:text-white font-bold px-7 py-3 rounded-full transition-all duration-200 text-sm"
          >
            <WAIcon />
            Cotizar pack personalizado
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
