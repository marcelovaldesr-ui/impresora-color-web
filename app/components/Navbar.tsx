"use client";
import { useState, useEffect } from "react";

// EDITABLE: Cambia los enlaces si cambia el número o redes
const WHATSAPP_URL =
  "https://wa.me/56998441157?text=Hola%2C%20quiero%20cotizar%20un%20trabajo%20de%20imprenta";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg shadow-black/10 border-b border-gray-100"
          : "bg-[#0B1B4D]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo / Marca */}
        <a href="#hero" className="flex items-center gap-1 select-none">
          <span
            className={`font-black text-lg tracking-tight transition-colors ${
              scrolled ? "text-[#0B1B4D]" : "text-white"
            }`}
          >
            Impresora
          </span>
          <span className="font-black text-lg text-[#F72585] tracking-tight">
            Color
          </span>
          <span
            className={`font-semibold text-xs ml-0.5 transition-colors ${
              scrolled ? "text-gray-400" : "text-white/60"
            }`}
          >
            Ltda.
          </span>
        </a>

        {/* Links escritorio */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium">
          {[
            { href: "#servicios", label: "Servicios" },
            { href: "#etiquetas", label: "Etiquetas" },
            { href: "#promociones", label: "Promociones" },
            { href: "#galeria", label: "Galería" },
            { href: "#ubicacion", label: "Ubicación" },
            { href: "#faq", label: "FAQ" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hover:text-[#F72585] transition-colors ${
                scrolled ? "text-gray-600" : "text-white/80"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA escritorio */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-[#F72585] hover:bg-[#d4166c] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors shadow-lg shadow-[#F72585]/30"
        >
          <WhatsAppIcon />
          Cotizar ahora
        </a>

        {/* Menú móvil botón */}
        <button
          className={`md:hidden p-2 rounded-lg ${
            scrolled ? "text-[#0B1B4D]" : "text-white"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl px-4 pb-5">
          {[
            { href: "#servicios", label: "Servicios" },
            { href: "#etiquetas", label: "Etiquetas" },
            { href: "#promociones", label: "Promociones" },
            { href: "#galeria", label: "Galería" },
            { href: "#ubicacion", label: "Ubicación" },
            { href: "#faq", label: "Preguntas Frecuentes" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center py-3.5 text-gray-700 hover:text-[#F72585] border-b border-gray-100 text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-4 bg-[#F72585] text-white font-bold py-3.5 rounded-full text-sm"
          >
            <WhatsAppIcon />
            Cotizar por WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
