"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_SERVICIOS } from "@/lib/servicios-nav";

// EDITABLE: Cambia los enlaces si cambia el número o redes
const WHATSAPP_URL =
  "https://wa.me/56998441157?text=Hola%2C%20quiero%20cotizar%20un%20trabajo%20de%20imprenta";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servOpen, setServOpen] = useState(false);
  const [servMovil, setServMovil] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — resalta el link de la sección visible en el viewport
  useEffect(() => {
    const ids = ["servicios", "paginas-web", "promociones", "galeria", "ubicacion", "faq"];
    const elementos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elementos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    elementos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md border-b border-gray-100" : "shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo / Marca */}
        <a href="/" className="flex items-center gap-2.5 select-none">
          <Image
            src="/brand/logo-impresora-color.jpg.jpeg"
            alt="Impresora Color Ltda"
            width={40}
            height={40}
            className="rounded-md object-cover shrink-0"
            priority
          />
          <span className="font-black text-lg tracking-tight text-[#2D3E9F]">
            Impresora
          </span>
          <span className="font-black text-lg text-[#E91E8F] tracking-tight -ml-1.5">
            Color
          </span>
        </a>

        {/* Links escritorio */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium">
          {/* Dropdown Servicios — todos los servicios visibles de una */}
          <div
            className="relative"
            onMouseEnter={() => setServOpen(true)}
            onMouseLeave={() => setServOpen(false)}
          >
            <a
              href="/#servicios"
              aria-expanded={servOpen}
              aria-haspopup="true"
              onFocus={() => setServOpen(true)}
              className={`flex items-center gap-1 transition-colors py-5 ${
                activeId === "servicios" ? "text-[#E91E8F] font-bold" : "text-gray-600 hover:text-[#E91E8F]"
              }`}
            >
              Servicios
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${servOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            {servOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[720px] bg-white border border-gray-100 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-x-6 gap-y-4">
                {NAV_SERVICIOS.map((cat) => (
                  <div key={cat.categoria}>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: cat.color }}>
                      {cat.categoria}
                    </p>
                    <ul className="space-y-0.5">
                      {cat.items.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            onClick={() => setServOpen(false)}
                            className="block text-[13px] text-gray-600 hover:text-[#E91E8F] py-1 transition-colors"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <a
                  href="/#servicios"
                  onClick={() => setServOpen(false)}
                  className="col-span-3 text-center text-xs font-bold text-[#2D3E9F] hover:text-[#E91E8F] border-t border-gray-100 pt-3 transition-colors"
                >
                  Ver todos los servicios →
                </a>
              </div>
            )}
          </div>
          {[
            { href: "/#paginas-web", label: "Páginas Web" },
            { href: "/#promociones", label: "Promociones" },
            { href: "/#galeria", label: "Galería" },
            { href: "/#ubicacion", label: "Ubicación" },
            { href: "/#faq", label: "FAQ" },
          ].map((item) => {
            const id = item.href.replace("/#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  activeId === id ? "text-[#E91E8F] font-bold" : "text-gray-600 hover:text-[#E91E8F]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <Link
            href="/tienda"
            className="text-[#2D3E9F] font-bold hover:text-[#E91E8F] transition-colors border-b-2 border-[#2D3E9F] pb-0.5"
          >
            Tienda
          </Link>
        </div>

        {/* CTAs escritorio */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/#cotizar"
            className="flex items-center gap-2 bg-[#E91E8F] hover:bg-[#c8186e] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors shadow-lg shadow-[#E91E8F]/25"
          >
            Cotizar ahora
          </a>
        </div>

        {/* Menú móvil botón */}
        <button
          className="md:hidden p-2 rounded-lg text-[#2D3E9F]"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
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
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl px-4 pb-5 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain">
          <button
            onClick={() => setServMovil(!servMovil)}
            aria-expanded={servMovil}
            className="w-full flex items-center justify-between py-3.5 text-gray-700 border-b border-gray-100 text-sm font-medium"
          >
            Servicios
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${servMovil ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {servMovil && (
            <div className="pb-2 border-b border-gray-100">
              {NAV_SERVICIOS.map((cat) => (
                <div key={cat.categoria} className="pt-3">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 px-1" style={{ color: cat.color }}>
                    {cat.categoria}
                  </p>
                  {cat.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 px-1 text-sm text-gray-600"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
          {[
            { href: "/#paginas-web", label: "Páginas Web" },
            { href: "/#promociones", label: "Promociones" },
            { href: "/#galeria", label: "Galería" },
            { href: "/#ubicacion", label: "Ubicación" },
            { href: "/#faq", label: "Preguntas Frecuentes" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center py-3.5 text-gray-700 hover:text-[#E91E8F] border-b border-gray-100 text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/tienda"
            onClick={() => setOpen(false)}
            className="flex items-center py-3.5 text-[#2D3E9F] font-bold border-b border-gray-100 text-sm transition-colors"
          >
            🛒 Tienda Online
          </Link>
          <div className="flex flex-col gap-3 mt-4">
            <a
              href="/#cotizar"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#E91E8F] text-white font-bold py-3.5 rounded-full text-sm"
            >
              Cotizar ahora
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-full text-sm"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
