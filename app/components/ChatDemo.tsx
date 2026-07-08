"use client";
// Mockup animado de un chat de WhatsApp — demuestra atención rápida y sirve
// de vitrina del nivel de detalle que se puede lograr en un sitio a medida.
import { useEffect, useRef, useState } from "react";

type Mensaje = { de: "cliente" | "nosotros"; texto: string };

const CONVERSACION: Mensaje[] = [
  { de: "cliente", texto: "Hola! ¿Hacen páginas web para negocios? 👀" },
  { de: "nosotros", texto: "¡Hola! Sí 😊 Tenemos planes desde $150.000. ¿Qué tipo de negocio tienes?" },
  { de: "cliente", texto: "Una peluquería, quiero que se vea profesional" },
  { de: "nosotros", texto: "Perfecto, te armamos un sitio con fotos, servicios y botón de WhatsApp directo 👌" },
];

const PASO_MS = 1900;
const TYPING_MS = 950;
const PAUSA_FINAL_MS = 2600;

export default function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(false);
  const [visibles, setVisibles] = useState(0);
  const [escribiendo, setEscribiendo] = useState<"cliente" | "nosotros" | null>(null);

  // Arranca la animación solo cuando el mockup entra en pantalla
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivo(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activo) return;

    const prefiereMenosMovimiento =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let cancelado = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (prefiereMenosMovimiento) {
      timeouts.push(setTimeout(() => !cancelado && setVisibles(CONVERSACION.length), 0));
      return () => {
        cancelado = true;
        timeouts.forEach(clearTimeout);
      };
    }

    function ciclo() {
      setVisibles(0);
      setEscribiendo(null);

      CONVERSACION.forEach((msg, i) => {
        timeouts.push(
          setTimeout(() => {
            if (cancelado) return;
            setEscribiendo(msg.de);
          }, i * PASO_MS)
        );
        timeouts.push(
          setTimeout(() => {
            if (cancelado) return;
            setEscribiendo(null);
            setVisibles(i + 1);
          }, i * PASO_MS + TYPING_MS)
        );
      });

      const total = CONVERSACION.length * PASO_MS + PAUSA_FINAL_MS;
      timeouts.push(setTimeout(() => !cancelado && ciclo(), total));
    }

    ciclo();
    return () => {
      cancelado = true;
      timeouts.forEach(clearTimeout);
    };
  }, [activo]);

  return (
    <div ref={ref} className="w-full max-w-sm mx-auto">
      <div className="rounded-3xl bg-[#111b2e] border border-white/10 shadow-2xl overflow-hidden">
        {/* Encabezado estilo WhatsApp */}
        <div className="flex items-center gap-3 bg-[#1F2C47] px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-[#47B7E8] flex items-center justify-center font-black text-white text-sm shrink-0">
            IC
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">Impresora Color · Web</p>
            <p className="text-[#7DBA2F] text-[11px] font-medium">en línea</p>
          </div>
        </div>

        {/* Cuerpo del chat */}
        <div className="px-3 py-4 min-h-[220px] flex flex-col justify-end gap-2 bg-[radial-gradient(circle_at_top,rgba(71,183,232,0.08),transparent_60%)]">
          {CONVERSACION.slice(0, visibles).map((m, i) => (
            <div
              key={i}
              className={`animate-[fade-in-up_0.35s_ease-out_both] max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
                m.de === "cliente"
                  ? "self-start bg-white/10 text-gray-100 rounded-bl-sm"
                  : "self-end bg-[#7DBA2F]/90 text-white rounded-br-sm"
              }`}
            >
              {m.texto}
            </div>
          ))}

          {escribiendo && (
            <div
              className={`flex items-center gap-1 rounded-2xl px-3.5 py-2.5 w-fit ${
                escribiendo === "cliente"
                  ? "self-start bg-white/10 rounded-bl-sm"
                  : "self-end bg-[#7DBA2F]/90 rounded-br-sm"
              }`}
              aria-label="Escribiendo…"
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-white/80 animate-[float-y_0.9s_ease-in-out_infinite]"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
