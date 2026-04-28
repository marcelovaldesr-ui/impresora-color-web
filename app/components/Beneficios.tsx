// EDITABLE: Cambia los beneficios en el array BENEFICIOS
const BENEFICIOS = [
  {
    color: "bg-[#F72585]/10 text-[#F72585]",
    icon: "⚡",
    titulo: "Atención rápida por WhatsApp",
    descripcion: "Cotiza en minutos enviándonos tu idea, medidas y cantidad directamente por WhatsApp.",
  },
  {
    color: "bg-[#25B6F7]/10 text-[#25B6F7]",
    icon: "📍",
    titulo: "Ubicación céntrica en Chillán",
    descripcion: "Estamos en Arauco 1060, fácil de encontrar en el centro de Chillán.",
  },
  {
    color: "bg-[#F9C80E]/20 text-[#b8900b]",
    icon: "🏪",
    titulo: "Para negocios, emprendedores y eventos",
    descripcion: "Atendemos restaurantes, tiendas, ferias, food trucks y todo tipo de negocio local.",
  },
  {
    color: "bg-[#F72585]/10 text-[#F72585]",
    icon: "🏷️",
    titulo: "Etiquetas para todo tipo de productos",
    descripcion: "Alimentos, cecinas, vinos, conservas, miel, envases y más. Listo para vender.",
  },
  {
    color: "bg-[#25B6F7]/10 text-[#25B6F7]",
    icon: "📣",
    titulo: "Material publicitario listo para vender",
    descripcion: "Flyers, pendones, stickers y tarjetas diseñados para que tu negocio destaque.",
  },
  {
    color: "bg-[#F9C80E]/20 text-[#b8900b]",
    icon: "💡",
    titulo: "Asesoría incluida",
    descripcion: "Te orientamos con formato, tamaño, cantidad y material para cada tipo de trabajo.",
  },
  {
    color: "bg-[#F72585]/10 text-[#F72585]",
    icon: "🎯",
    titulo: "Variedad en un solo lugar",
    descripcion: "Todo lo que necesitas para imprimir y presentar mejor tu negocio o producto.",
  },
];

export default function Beneficios() {
  return (
    <section id="beneficios" className="bg-[#0B1B4D] py-20 px-4 relative overflow-hidden">
      {/* Decoración */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#F72585]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-60 h-60 bg-[#25B6F7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#25B6F7] font-bold text-sm uppercase tracking-widest">
            Por qué elegirnos
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">
            ¿Por qué elegir{" "}
            <span className="text-[#F72585]">Impresora Color</span>{" "}
            <span className="text-[#F9C80E]">Ltda?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Atención rápida · Imprenta en Chillán · Trabajos para negocios, productos y emprendedores
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFICIOS.map((b) => (
            <div
              key={b.titulo}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div
                className={`w-12 h-12 ${b.color} rounded-xl flex items-center justify-center text-xl mb-4`}
              >
                {b.icon}
              </div>
              <h3 className="text-white font-black text-base mb-2">{b.titulo}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{b.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
