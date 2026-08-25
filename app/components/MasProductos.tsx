// Sin duplicados con las cards de Servicios (dípticos y pendón roller ya tienen card propia).
// Cada ítem es cotizable por WhatsApp con mensaje precargado.
const PRODUCTOS: { label: string; wa: string }[] = [
  { label: "Afiches", wa: "afiches" },
  { label: "Talonarios autocopiativos", wa: "talonarios autocopiativos" },
  { label: "Entradas personalizadas", wa: "entradas personalizadas" },
  { label: "Invitaciones", wa: "invitaciones" },
  { label: "Cuadernos corporativos", wa: "cuadernos corporativos" },
  { label: "Libretas personalizadas", wa: "libretas personalizadas" },
  { label: "Recetarios", wa: "recetarios" },
  { label: "Carnets veterinarios", wa: "carnets veterinarios" },
  { label: "Palomas publicitarias", wa: "palomas publicitarias" },
  { label: "Lonas de PVC", wa: "lonas de PVC" },
  { label: "Señaléticas", wa: "señaléticas" },
  { label: "Etiquetas para botellas de agua", wa: "etiquetas para botellas de agua" },
  { label: "Stickers transparentes", wa: "stickers transparentes" },
  { label: "Adhesivo impreso por m²", wa: "adhesivo impreso por metro cuadrado" },
  { label: "Adhesivo montado en trovicel", wa: "adhesivo montado en trovicel" },
  { label: "Patentes para camiones", wa: "patentes para camión" },
];

const PHONE = "56998441157";
const waLink = (producto: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(`Hola, quiero cotizar ${producto}.`)}`;

const WA_URL =
  "https://wa.me/56998441157?text=Hola%2C%20busco%20un%20producto%20que%20no%20veo%20en%20su%20p%C3%A1gina.%20%C2%BFMe%20pueden%20ayudar%3F";

export default function MasProductos() {
  return (
    <section id="mas-productos" className="bg-gray-50 border-t border-gray-100 py-14 px-4 scroll-mt-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[#47B7E8] font-bold text-xs uppercase tracking-widest">
            Catálogo completo
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2D3E9F] mt-1 mb-2">
            ¿Buscas algo más?
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            También producimos estos trabajos. Si no ves lo que necesitas, consúltanos.
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 mb-8">
          {PRODUCTOS.map((producto) => (
            <li key={producto.label}>
              <a
                href={waLink(producto.wa)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#E91E8F] transition-colors"
              >
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#47B7E8]/15 flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 text-[#47B7E8]"
                  fill="none"
                  viewBox="0 0 10 8"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 4l2.5 2.5L9 1" />
                </svg>
              </span>
              {producto.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold px-6 py-3 rounded-full transition-colors duration-200 shadow-sm"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.106 1.522 5.829L.057 23.868a.5.5 0 00.621.601l6.266-1.643A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 01-5.028-1.383l-.36-.214-3.729.978.995-3.636-.234-.374A9.786 9.786 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
            </svg>
            Consulta por WhatsApp si no ves lo que buscas
          </a>
        </div>
      </div>
    </section>
  );
}
