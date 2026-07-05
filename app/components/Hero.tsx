import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/56998441157?text=Hola%2C%20quiero%20cotizar%20un%20trabajo%20de%20imprenta";

const MAPS_URL =
  "https://www.google.com/maps/place/Impresora+Color+Ltda./@-36.6124899,-72.1037117,13z/data=!4m6!3m5!1s0x9669282ecbefa02d:0xd52cfa17b8d7d88d!8m2!3d-36.6130779!4d-72.1051356!16s%2Fg%2F12lvg43y1?hl=es&entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D";

const PILLS = [
  { label: "Flyers",     href: "#servicios", color: "#E91E8F" },
  { label: "Stickers",   href: "#servicios", color: "#47B7E8" },
  { label: "Tarjetas",   href: "#servicios", color: "#2D3E9F" },
  { label: "Pendones",   href: "#servicios", color: "#F47A20" },
  { label: "Menús",      href: "#servicios", color: "#7DBA2F" },
  { label: "Imanes",     href: "#servicios", color: "#F5C51B" },
  { label: "Etiquetas",  href: "#etiquetas", color: "#E91E8F" },
  { label: "Packaging",  href: "#etiquetas", color: "#47B7E8" },
  { label: "Credenciales", href: "#servicio-credenciales-fargo", color: "#2D3E9F" },
  { label: "Bolsas",     href: "#servicio-bolsas-sublimacion", color: "#F47A20" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col bg-[#FAFBFF] pt-16 overflow-hidden scroll-mt-16"
    >
      {/* Franja CMYK superior — identidad de marca */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E91E8F] via-[#47B7E8] via-[#7DBA2F] via-[#F5C51B] to-[#F47A20]" />

      {/* Crop marks — esquina superior izquierda */}
      <CropMark className="absolute top-20 left-4 text-[#2D3E9F]/20" />
      {/* Crop marks — esquina superior derecha */}
      <CropMark className="absolute top-20 right-4 text-[#2D3E9F]/20 rotate-90" />
      {/* Crop marks — esquina inferior izquierda */}
      <CropMark className="absolute bottom-16 left-4 text-[#2D3E9F]/20 -rotate-90" />
      {/* Crop marks — esquina inferior derecha */}
      <CropMark className="absolute bottom-16 right-4 text-[#2D3E9F]/20 rotate-180" />

      {/* "35" como marca de agua tipográfica */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[22rem] font-black text-[#2D3E9F]/[0.04] leading-none select-none pointer-events-none hidden lg:block"
      >
        35
      </span>

      {/* Grid principal */}
      <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">

        {/* Columna izquierda */}
        <div>
          {/* Eyebrow — año de fundación como dato estructural */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#E91E8F] mb-5">
            Imprenta en Chillán · Desde 1989
          </p>

          {/* H1 — un solo color base, un solo acento */}
          <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-black text-[#111827] leading-[1.08] mb-6 text-balance">
            Flyers, stickers y etiquetas que{" "}
            <span className="relative inline-block text-[#E91E8F]">
              hacen vender
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#E91E8F] rounded-full"
              />
            </span>
          </h1>

          {/* Subtítulo — específico, no genérico */}
          <p className="text-gray-600 text-lg leading-relaxed mb-9 max-w-lg text-pretty">
            Imprimimos para emprendedores, productores locales y negocios de Chillán
            que necesitan materiales de calidad{" "}
            <strong className="text-[#2D3E9F] font-semibold">sin esperar semanas ni gastar de más.</strong>
          </p>

          {/* CTAs con jerarquía clara */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#E91E8F] hover:bg-[#c8186e] active:scale-[0.98] text-white font-bold text-base px-7 py-4 rounded-full shadow-lg shadow-[#E91E8F]/25 transition-[background-color,transform] duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Cotizar por WhatsApp
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#2D3E9F]/25 text-[#2D3E9F] hover:bg-[#2D3E9F]/6 font-medium text-sm px-6 py-4 rounded-full transition-colors duration-200"
            >
              <LocationIcon className="w-4 h-4" />
              Arauco 1060, Chillán
            </a>
          </div>

          {/* Trust strip — 3 datos concretos, sin repetición */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { n: "35", label: "años en Chillán" },
              { n: "<24h", label: "tiempo de respuesta" },
              { n: "100%", label: "impresión local" },
            ].map(({ n, label }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-[#2D3E9F] tabular-nums">{n}</span>
                <span className="text-xs text-gray-500 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha — imagen con marco de registro */}
        <div className="hidden md:block relative">
          {/* Marco decorativo tipo ficha de color */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#E91E8F]/8 via-[#47B7E8]/6 to-[#2D3E9F]/8" />

          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#2D3E9F]/10">
            <Image
              src="/brand/banner-impresora-color-35años.png"
              alt="Trabajos de imprenta de Impresora Color Ltda — Chillán"
              width={1024}
              height={682}
              className="w-full h-auto block"
              priority
            />
            {/* Barra de colores CMYK en el borde inferior de la imagen */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-2 flex"
            >
              {["#E91E8F", "#47B7E8", "#7DBA2F", "#F5C51B", "#F47A20", "#2D3E9F"].map((c) => (
                <span key={c} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior — pills como anchors navegables */}
      <div className="relative z-10 border-t border-gray-200/60 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-2">
          {PILLS.map((p) => (
            <a
              key={p.label}
              href={p.href}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full border transition-opacity duration-150 hover:opacity-80"
              style={{
                color: p.color,
                borderColor: `${p.color}40`,
                backgroundColor: `${p.color}10`,
              }}
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CropMark({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Línea horizontal */}
      <line x1="0" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1" />
      <line x1="15" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
      {/* Línea vertical */}
      <line x1="12" y1="0" x2="12" y2="9" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="15" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
      {/* Cruz central */}
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
