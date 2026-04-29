// EDITABLE: Cambia los beneficios en el array BENEFICIOS
const BENEFICIOS = [
  {
    color: "bg-[#E91E8F]/10 text-[#E91E8F]",
    icon: "⚡",
    titulo: "Atención rápida por WhatsApp",
    descripcion: "Cotiza en minutos enviándonos tu idea, medidas y cantidad directamente por WhatsApp.",
  },
  {
    color: "bg-[#47B7E8]/10 text-[#47B7E8]",
    icon: "📍",
    titulo: "Ubicación céntrica en Chillán",
    descripcion: "Estamos en Arauco 1060, fácil de encontrar en el centro de Chillán.",
  },
  {
    color: "bg-[#F5C51B]/20 text-[#c49700]",
    icon: "🏪",
    titulo: "Para negocios, emprendedores y eventos",
    descripcion: "Atendemos restaurantes, tiendas, ferias, food trucks y todo tipo de negocio local.",
  },
  {
    color: "bg-[#E91E8F]/10 text-[#E91E8F]",
    icon: "🏷️",
    titulo: "Etiquetas para todo tipo de productos",
    descripcion: "Alimentos, cecinas, vinos, conservas, miel, envases y más. Listo para vender.",
  },
  {
    color: "bg-[#47B7E8]/10 text-[#47B7E8]",
    icon: "📣",
    titulo: "Material publicitario listo para vender",
    descripcion: "Flyers, pendones, stickers y tarjetas diseñados para que tu negocio destaque.",
  },
  {
    color: "bg-[#7DBA2F]/10 text-[#5d8c23]",
    icon: "💡",
    titulo: "Asesoría incluida",
    descripcion: "Te orientamos con formato, tamaño, cantidad y material para cada tipo de trabajo.",
  },
  {
    color: "bg-[#F47A20]/10 text-[#d4600a]",
    icon: "🎯",
    titulo: "Variedad en un solo lugar",
    descripcion: "Todo lo que necesitas para imprimir y presentar mejor tu negocio o producto.",
  },
];

export default function Beneficios() {
  return (
    <section id="beneficios" className="bg-[#F6F8FC] py-20 px-4 relative overflow-hidden">
      {/* Franja superior decorativa */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E91E8F] via-[#47B7E8] to-[#7DBA2F]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#47B7E8] font-bold text-sm uppercase tracking-widest">
            Por qué elegirnos
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D3E9F] mt-2 mb-4">
            ¿Por qué elegir{" "}
            <span className="text-[#E91E8F]">Impresora Color</span>{" "}
            <span className="text-[#7DBA2F]">Ltda?</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Atención rápida · Imprenta en Chillán · Trabajos para negocios, productos y emprendedores
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFICIOS.map((b) => (
            <div
              key={b.titulo}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#E91E8F]/20 hover:shadow-lg hover:shadow-[#E91E8F]/5 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div
                className={`w-12 h-12 ${b.color} rounded-xl flex items-center justify-center text-xl mb-4`}
              >
                {b.icon}
              </div>
              <h3 className="text-[#2D3E9F] font-black text-base mb-2">{b.titulo}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
