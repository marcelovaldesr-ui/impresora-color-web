"use client";
// Barra rápida de navegación por secciones — aparece al scrollear y deja
// saltar directo a cualquier sección de la portada sin tener que bajar todo.
import { useEffect, useState } from "react";

const SECCIONES = [
  { id: "servicios", label: "Servicios", color: "#E91E8F" },
  { id: "mas-productos", label: "Más productos", color: "#47B7E8" },
  { id: "paginas-web", label: "Páginas Web", color: "#7DBA2F" },
  { id: "beneficios", label: "Beneficios", color: "#F5C51B" },
  { id: "clientes", label: "Clientes", color: "#F47A20" },
  { id: "testimonios", label: "Testimonios", color: "#2D3E9F" },
  { id: "galeria", label: "Galería", color: "#E91E8F" },
  { id: "ubicacion", label: "Ubicación", color: "#47B7E8" },
  { id: "faq", label: "FAQ", color: "#7DBA2F" },
];

export default function BarraSecciones() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Se muestra solo después de pasar el Hero, para no duplicar la barra de
  // categorías que ya vive ahí arriba.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — resalta la sección visible en el viewport
  useEffect(() => {
    const elementos = SECCIONES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elementos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    elementos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 py-2.5 min-w-max">
          {SECCIONES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors duration-200 ${
                activeId === s.id ? "text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
              style={activeId === s.id ? { backgroundColor: s.color } : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
