// EDITABLE: Sección especial de etiquetas para productos locales
const WA_ETIQUETAS =
  "https://wa.me/56998441157?text=Hola%2C%20quiero%20cotizar%20etiquetas%20para%20mi%20producto.%20Necesito%20orientaci%C3%B3n%20sobre%20tama%C3%B1o%2C%20material%20y%20cantidad.";

const TIPOS = [
  { icon: "🥩", label: "Etiquetas para cecinas",       color: "bg-[#F72585]/10 border-[#F72585]/30 text-[#F72585]" },
  { icon: "🍷", label: "Etiquetas para vinos",          color: "bg-[#0B1B4D]/10 border-[#0B1B4D]/20 text-[#0B1B4D]" },
  { icon: "🫙", label: "Etiquetas para conservas",      color: "bg-[#25B6F7]/10 border-[#25B6F7]/30 text-[#25B6F7]" },
  { icon: "🍯", label: "Etiquetas para miel",           color: "bg-[#F9C80E]/20 border-[#F9C80E]/40 text-[#b8900b]" },
  { icon: "🥫", label: "Etiquetas para alimentos",      color: "bg-[#F72585]/10 border-[#F72585]/30 text-[#F72585]" },
  { icon: "🧴", label: "Adhesivos para envases",        color: "bg-[#25B6F7]/10 border-[#25B6F7]/30 text-[#25B6F7]" },
  { icon: "📦", label: "Stickers para packaging",       color: "bg-[#0B1B4D]/10 border-[#0B1B4D]/20 text-[#0B1B4D]" },
  { icon: "🌿", label: "Material para productores locales", color: "bg-[#F9C80E]/20 border-[#F9C80E]/40 text-[#b8900b]" },
];

export default function Etiquetas() {
  return (
    <section id="etiquetas" className="bg-[#F5F7FA] py-20 px-4 relative overflow-hidden">
      {/* Decoración */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F72585]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#25B6F7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#F72585] font-bold text-sm uppercase tracking-widest">
            Productos locales
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B4D] mt-2 mb-5">
            Etiquetas para productos que{" "}
            <span className="text-[#F72585]">necesitan verse profesionales</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Trabajamos con{" "}
            <strong className="text-[#0B1B4D]">
              cecinas, vinos, conservas, miel, alimentos, productos gourmet
            </strong>{" "}
            y marcas locales que necesitan etiquetas, adhesivos y packaging con
            mejor presentación.
          </p>
        </div>

        {/* Grid de tipos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {TIPOS.map((t) => (
            <div
              key={t.label}
              className={`${t.color} border rounded-2xl p-5 text-center hover:-translate-y-0.5 transition-all duration-200 bg-white shadow-sm hover:shadow-md`}
            >
              <div className="text-3xl mb-3">{t.icon}</div>
              <p className="font-bold text-sm leading-tight text-[#0B1B4D]">{t.label}</p>
            </div>
          ))}
        </div>

        {/* Franja CTA */}
        <div className="bg-[#0B1B4D] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          {/* Decoración */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F72585]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-40 h-40 bg-[#25B6F7]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-[#F9C80E]/20 border border-[#F9C80E]/40 text-[#F9C80E] text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              Para productores y marcas locales
            </div>
            <p className="text-white text-2xl font-black mb-3">
              Dale mejor presentación a tus productos
            </p>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Vende con una imagen más profesional. Te asesoramos en formato, tamaño,
              cantidad y material.
            </p>
            <a
              href={WA_ETIQUETAS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#F72585] hover:bg-[#d4166c] active:scale-95 text-white font-black text-lg px-8 py-4 rounded-full shadow-xl shadow-[#F72585]/30 transition-all duration-200"
            >
              <WAIcon />
              Cotizar etiquetas para mi producto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function WAIcon() {
  return (
    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
