// EDITABLE: Cambia dirección, enlace de Maps y WhatsApp aquí
// ⚠️  Link exacto de Google Maps para Impresora Color Ltda. (NO cambiar a búsqueda genérica)
const MAPS_URL =
  "https://www.google.com/maps/place/Impresora+Color+Ltda./@-36.6124899,-72.1037117,13z/data=!4m6!3m5!1s0x9669282ecbefa02d:0xd52cfa17b8d7d88d!8m2!3d-36.6130779!4d-72.1051356!16s%2Fg%2F12lvg43y1?hl=es&entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D";

const WA_URL =
  "https://wa.me/56998441157?text=Hola%2C%20quiero%20cotizar%20un%20trabajo%20de%20imprenta";

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#E91E8F] font-bold text-sm uppercase tracking-widest">
            Ubicación
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D3E9F] mt-2 mb-4">
            Estamos en el{" "}
            <span className="text-[#E91E8F]">centro de Chillán</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Estamos en{" "}
            <strong className="text-[#2D3E9F]">Arauco 1060, Chillán</strong>.
            Escríbenos por WhatsApp y te ayudamos a cotizar tus impresos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Tarjeta de ubicación visual */}
          <div className="bg-gradient-to-b from-[#2D3E9F] to-[#1a2880] rounded-2xl overflow-hidden shadow-xl flex flex-col">
            {/* Mini mapa decorativo */}
            <div className="h-52 relative overflow-hidden bg-[#2D3E9F]/80 flex items-center justify-center">
              {/* Cuadrícula estilo mapa */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#47B7E8 1px, transparent 1px), linear-gradient(90deg, #47B7E8 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Pin */}
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-[#E91E8F] rounded-full flex items-center justify-center mx-auto mb-3 shadow-2xl shadow-[#E91E8F]/50">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <p className="text-white font-black text-xl">Arauco 1060</p>
                <p className="text-gray-400 text-sm">Chillán, Ñuble, Chile</p>
              </div>
            </div>

            {/* Info dentro de la tarjeta */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#E91E8F]/20 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#E91E8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Dirección</p>
                    {/* EDITABLE: Cambia la dirección aquí */}
                    <p className="text-white font-bold text-sm">Arauco 1060, Chillán, Chile</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#25D366]/20 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">WhatsApp</p>
                    {/* EDITABLE: Cambia el número aquí */}
                    <p className="text-white font-bold text-sm">+56 9 9844 1157</p>
                  </div>
                </div>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#E91E8F] hover:bg-[#c8186e] text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Encuéntranos en Google Maps
              </a>
            </div>
          </div>

          {/* Panel derecho: info y CTA */}
          <div className="flex flex-col gap-5">
            {/* Tarjeta principal */}
            <div className="bg-[#F5F7FA] border border-gray-200 rounded-2xl p-7 flex-1">
              <h3 className="text-[#2D3E9F] font-black text-xl mb-3">
                ¿Cómo cotizar rápido?
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Envíanos por WhatsApp el producto que necesitas, cantidad,
                tamaño y material. Si tienes el archivo, mándalo también.
                Te respondemos rápido.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "Dinos qué producto necesitas",
                  "Indica cantidad y tamaño",
                  "Comparte tu archivo si lo tienes",
                  "Recibe tu cotización rápido",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-[#E91E8F] text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#E91E8F] hover:bg-[#c8186e] text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
              >
                <WAIcon />
                Cotizar por WhatsApp ahora
              </a>
            </div>

            {/* Tarjeta Instagram */}
            <div className="bg-gradient-to-r from-[#E91E8F]/10 to-[#47B7E8]/10 border border-[#E91E8F]/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <svg className="w-6 h-6 fill-[#E91E8F]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <p className="text-[#2D3E9F] font-black text-sm">Síguenos en Instagram</p>
                {/* EDITABLE: Cambia el usuario de Instagram aquí */}
                <a
                  href="https://www.instagram.com/impresoracolorchillan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E91E8F] text-sm font-semibold hover:underline"
                >
                  @impresoracolorchillan
                </a>
              </div>
            </div>
          </div>
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
