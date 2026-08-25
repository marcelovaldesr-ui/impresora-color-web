const TESTIMONIOS = [
  {
    nombre: "María José Sepúlveda",
    cargo: "Emprendedora Chillán",
    texto:
      "Pedí mis primeras etiquetas para mis mermeladas artesanales y quedé encantada. La atención fue súper rápida y el resultado profesional. Mis productos ahora se ven mucho mejor en la feria.",
    color: "#E91E8F",
    bg: "bg-[#E91E8F]",
  },
  {
    nombre: "Carlos Muñoz",
    cargo: "Restaurante El Rincón, Chillán",
    texto:
      "Nos hicieron los menús y los pendones para el local. Excelente calidad y los tuvimos listos antes de lo esperado. Los recomiendo sin dudarlo.",
    color: "#2D3E9F",
    bg: "bg-[#2D3E9F]",
  },
  {
    nombre: "Valentina Torres",
    cargo: "Boutique Valentina, Chillán",
    texto:
      "Llevo 3 años trabajando con ellos para mis tarjetas y stickers. Siempre cumplen con los plazos y la calidad es consistente. Son de confianza.",
    color: "#47B7E8",
    bg: "bg-[#47B7E8]",
  },
  {
    nombre: "Roberto Cisternas",
    cargo: "Constructora RC, Chillán",
    texto:
      "Necesitaba carpetas corporativas y material para una licitación con urgencia. Me respondieron de inmediato y entregaron perfecto. Muy profesionales.",
    color: "#7DBA2F",
    bg: "bg-[#7DBA2F]",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 estrellas">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#F5C51B]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonios() {
  return (
    <section id="testimonios" className="bg-white py-20 px-4 relative overflow-hidden scroll-mt-28">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E91E8F] via-[#47B7E8] to-[#7DBA2F]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="text-[#E91E8F] font-bold text-sm uppercase tracking-widest">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D3E9F] mt-2 mb-4">
            Lo que dicen{" "}
            <span className="text-[#E91E8F]">nuestros clientes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TESTIMONIOS.map((t) => {
            const inicial = t.nombre.charAt(0);
            return (
              <div
                key={t.nombre}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#E91E8F]/20 transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-4"
              >
                <Stars />
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  &ldquo;{t.texto}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div
                    className={`w-10 h-10 ${t.bg} rounded-full flex items-center justify-center text-white font-black text-base shrink-0`}
                  >
                    {inicial}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#2D3E9F]">{t.nombre}</p>
                    <p className="text-gray-400 text-xs">{t.cargo}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
