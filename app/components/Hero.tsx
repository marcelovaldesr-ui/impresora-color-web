import Image from "next/image";

// EDITABLE: Cambia textos del hero, links y frase de confianza aquí
const WHATSAPP_URL =
  "https://wa.me/56998441157?text=Hola%2C%20quiero%20cotizar%20un%20trabajo%20de%20imprenta";

// EDITABLE: Link exacto de Google Maps para Impresora Color Ltda.
const MAPS_URL =
  "https://www.google.com/maps/place/Impresora+Color+Ltda./@-36.6124899,-72.1037117,13z/data=!4m6!3m5!1s0x9669282ecbefa02d:0xd52cfa17b8d7d88d!8m2!3d-36.6130779!4d-72.1051356!16s%2Fg%2F12lvg43y1?hl=es&entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-[#0B1B4D] pt-16 overflow-hidden"
    >
      {/* Esferas de luz de fondo */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#F72585]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#25B6F7]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9C80E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Columna izquierda: texto */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#25B6F7]/20 border border-[#25B6F7]/40 text-[#25B6F7] text-sm font-semibold px-4 py-2 rounded-full mb-7">
            <span className="w-2 h-2 bg-[#25B6F7] rounded-full animate-pulse shrink-0" />
            Imprenta en Chillán · Arauco 1060
          </div>

          {/* Título */}
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-[54px] font-black text-white leading-[1.1] mb-6">
            <span className="text-[#F72585]">Impresos y etiquetas</span>{" "}
            para que{" "}
            <span className="text-[#F9C80E]">tu negocio</span>{" "}
            <span className="relative inline-block">
              venda más
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#F72585] rounded-full" />
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-gray-300 text-lg leading-relaxed mb-9 max-w-lg">
            Flyers, stickers, tarjetas, pendones, menús, imanes y etiquetas
            adhesivas para <strong className="text-white">emprendedores, productores locales</strong> y
            negocios de Chillán.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#F72585] hover:bg-[#d4166c] active:scale-95 text-white font-black text-lg px-8 py-4 rounded-full shadow-2xl shadow-[#F72585]/30 transition-all duration-200"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Cotizar por WhatsApp
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-200"
            >
              <LocationIcon className="w-5 h-5" />
              Ver ubicación
            </a>
          </div>

          {/* Frase de confianza */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {[
              "Atención rápida por WhatsApp",
              "Arauco 1060, Chillán",
              "Material gráfico para negocios y productos locales",
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[#25B6F7] font-medium">
                {i > 0 && <span className="text-white/20">·</span>}
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Columna derecha: imagen de marca */}
        <div className="hidden lg:flex items-center justify-center relative h-[500px]">
          <Image
            src="/brand/banner-impresora-color.jpg.jpeg"
            alt="Impresora Color Ltda - Imprenta en Chillán"
            width={1024}
            height={682}
            className="w-full h-full object-contain rounded-2xl drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Barra inferior de servicios */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-wrap justify-center gap-2.5">
          {["Flyers", "Stickers", "Tarjetas", "Pendones", "Menús", "Imanes", "Etiquetas", "Packaging"].map(
            (s) => (
              <span
                key={s}
                className="bg-white/10 text-gray-300 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/10"
              >
                {s}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}


function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
