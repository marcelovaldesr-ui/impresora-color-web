import Link from "next/link";

// Franja de accion (24-nov-2026): despues de la prueba social (clientes y
// testimonios) no habia ningun boton; el que ya se convencio tenia que volver
// arriba. Dos caminos: comprar online o cotizar por WhatsApp.
const WA = `https://wa.me/56998441157?text=${encodeURIComponent("Hola, quiero cotizar un trabajo de impresión.")}`;

export default function CtaDoble({ titulo = "¿Listo para imprimir?" }: { titulo?: string }) {
  return (
    <section className="px-4 py-10 bg-[#F6F8FC]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-[#2D3E9F]">{titulo}</h2>
        <p className="text-gray-600 mt-2 mb-6 text-sm sm:text-base">
          Compra online los productos con precio fijo, o escríbenos y te cotizamos rápido.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tienda"
            className="inline-flex items-center justify-center bg-[#D11A80] hover:bg-[#b5156e] text-white font-bold py-3.5 px-7 rounded-full transition-colors"
          >
            Comprar en la Tienda Online
          </Link>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#2D3E9F] hover:bg-[#24327f] text-white font-bold py-3.5 px-7 rounded-full transition-colors"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
