// EDITABLE: Cambia dirección, teléfono, Instagram y links aquí
const INFO = {
  nombre:       "Impresora Color Ltda",
  direccion:    "Arauco 1060, Chillán, Chile",
  whatsapp:     "+56 9 9844 1157",
  waUrl:        "https://wa.me/56998441157?text=Hola%2C%20quiero%20cotizar%20un%20trabajo%20de%20imprenta",
  instagram:    "@impresoracolorchillan",
  instagramUrl: "https://www.instagram.com/impresoracolorchillan",
  // EDITABLE: Link exacto de Google Maps (NO cambiar a búsqueda genérica)
  mapsUrl:
    "https://www.google.com/maps/place/Impresora+Color+Ltda./@-36.6124899,-72.1037117,13z/data=!4m6!3m5!1s0x9669282ecbefa02d:0xd52cfa17b8d7d88d!8m2!3d-36.6130779!4d-72.1051356!16s%2Fg%2F12lvg43y1?hl=es&entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D",
};

const SERVICIOS_FOOTER = [
  "Flyers", "Stickers", "Tarjetas", "Pendones",
  "Menús", "Imanes", "Etiquetas", "Packaging",
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1B4D]">
      {/* Banda CTA superior */}
      <div className="bg-[#F72585] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-white font-black text-2xl sm:text-3xl mb-2">
            ¿Listo para mejorar la imagen de tu negocio?
          </h3>
          <p className="text-pink-100 mb-7 text-sm sm:text-base">
            Atención rápida por WhatsApp · Imprenta en Chillán · Trabajos para negocios, productos y emprendedores
          </p>
          <a
            href={INFO.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#F72585] hover:bg-gray-100 font-black text-lg px-8 py-4 rounded-full shadow-xl transition-colors"
          >
            <WAIcon className="w-6 h-6" />
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Cuerpo del footer */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Columna empresa */}
        <div className="lg:col-span-2">
          {/* Logo */}
          <div className="flex items-center gap-1 mb-5">
            <span className="text-white font-black text-xl">Impresora</span>
            <span className="text-[#F72585] font-black text-xl">Color</span>
            <span className="text-white/40 font-semibold text-xs ml-0.5">Ltda.</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            Imprenta en Chillán. Flyers, stickers, tarjetas, pendones, menús,
            imanes, etiquetas y material gráfico para tu negocio.
          </p>
          {/* Confianza badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "Atención rápida por WhatsApp",
              "Imprenta en Chillán",
              "Etiquetas para productos",
            ].map((b) => (
              <span
                key={b}
                className="bg-white/10 text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-white/10"
              >
                {b}
              </span>
            ))}
          </div>
          {/* Redes sociales */}
          <div className="flex items-center gap-3">
            <a
              href={INFO.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 hover:bg-[#F72585] border border-white/10 hover:border-[#F72585] rounded-xl flex items-center justify-center transition-all duration-200"
              aria-label="WhatsApp"
            >
              <WAIcon className="w-5 h-5 text-white" />
            </a>
            <a
              href={INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 hover:bg-[#F72585] border border-white/10 hover:border-[#F72585] rounded-xl flex items-center justify-center transition-all duration-200"
              aria-label="Instagram"
            >
              <IGIcon className="w-5 h-5 text-white" />
            </a>
            <a
              href={INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 hover:bg-[#F72585] border border-white/10 hover:border-[#F72585] rounded-xl flex items-center justify-center transition-all duration-200"
              aria-label="Google Maps"
            >
              <MapIcon className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Columna servicios */}
        <div>
          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-5">
            Servicios
          </h4>
          <ul className="space-y-2.5">
            {SERVICIOS_FOOTER.map((s) => (
              <li key={s}>
                <a
                  href="#servicios"
                  className="text-gray-400 hover:text-[#F72585] text-sm transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-[#F72585] rounded-full shrink-0" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna contacto */}
        <div>
          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-5">
            Contacto
          </h4>
          <ul className="space-y-5">
            <li>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Dirección</p>
              {/* EDITABLE: Cambia la dirección aquí */}
              <a
                href={INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#F72585] text-sm transition-colors"
              >
                {INFO.direccion}
              </a>
            </li>
            <li>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Ver ubicación</p>
              <a
                href={INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25B6F7] hover:text-[#F72585] text-sm transition-colors font-medium"
              >
                Encuéntranos en Google Maps →
              </a>
            </li>
            <li>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">WhatsApp</p>
              {/* EDITABLE: Cambia el número aquí */}
              <a
                href={INFO.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#F72585] text-sm transition-colors"
              >
                {INFO.whatsapp}
              </a>
            </li>
            <li>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Instagram</p>
              {/* EDITABLE: Cambia el usuario de Instagram aquí */}
              <a
                href={INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#F72585] text-sm transition-colors"
              >
                {INFO.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Pie */}
      <div className="border-t border-white/10 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} {INFO.nombre} · Chillán, Chile</span>
          <span>Imprenta en Chillán · Arauco 1060</span>
        </div>
      </div>
    </footer>
  );
}

function WAIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IGIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
