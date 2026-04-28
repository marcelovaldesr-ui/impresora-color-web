"use client";
import { useState } from "react";

// EDITABLE: Agrega o modifica preguntas frecuentes en el array PREGUNTAS
const PREGUNTAS = [
  {
    q: "¿Puedo cotizar por WhatsApp?",
    a: "Sí, puedes enviar tu idea, medidas, cantidad y archivo si lo tienes. Te orientamos rápido.",
  },
  {
    q: "¿Hacen trabajos para emprendimientos?",
    a: "Sí, trabajamos con emprendedores, restaurantes, tiendas, ferias, food trucks, productores locales y negocios de Chillán.",
  },
  {
    q: "¿Puedo imprimir stickers personalizados?",
    a: "Sí, hacemos stickers para productos, packaging, promociones, envases y marcas.",
  },
  {
    q: "¿Hacen etiquetas para cecinas o vinos?",
    a: "Sí, hacemos etiquetas adhesivas para cecinas, vinos, conservas, alimentos, miel, productos gourmet y marcas locales.",
  },
  {
    q: "¿Puedo pedir etiquetas para mi emprendimiento?",
    a: "Sí, puedes cotizar etiquetas para envases, bolsas, frascos, cajas, botellas y packaging. Te orientamos con tamaño, cantidad y material.",
  },
  {
    q: "¿Tienen diseño gráfico?",
    a: "Puedes consultarnos por apoyo en diseño o preparación de archivos para impresión.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Estamos en Arauco 1060, Chillán, Chile.",
  },
  {
    q: "¿Cómo cotizo más rápido?",
    a: "Envíanos por WhatsApp el producto que necesitas, cantidad, tamaño, material, archivo si lo tienes y fecha en que lo necesitas.",
  },
];

export default function FAQ() {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#F5F7FA] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[#F72585] font-bold text-sm uppercase tracking-widest">
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B4D] mt-2 mb-4">
            ¿Tienes dudas?{" "}
            <span className="text-[#F72585]">Aquí las respondemos</span>
          </h2>
        </div>

        {/* Acordeón */}
        <div className="space-y-3">
          {PREGUNTAS.map((item, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 ${
                abierto === i
                  ? "border-[#F72585]/40 shadow-lg shadow-[#F72585]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left gap-4"
                onClick={() => setAbierto(abierto === i ? null : i)}
              >
                <span className="text-[#0B1B4D] font-bold text-sm sm:text-base leading-snug">
                  {item.q}
                </span>
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    abierto === i
                      ? "bg-[#F72585] text-white rotate-180"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {abierto === i && (
                <div className="px-5 pb-5">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">¿Tienes otra pregunta? Escríbenos directamente.</p>
          <a
            href="https://wa.me/56998441157?text=Hola%2C%20tengo%20una%20consulta%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F72585] hover:bg-[#d4166c] text-white font-bold px-8 py-4 rounded-full transition-colors shadow-lg shadow-[#F72585]/25"
          >
            <WAIcon />
            Preguntarnos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function WAIcon() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
