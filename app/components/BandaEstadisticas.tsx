"use client";
import { useEffect, useRef, useState } from "react";

type Stat = {
  icon: string;
  prefijo?: string;
  numero?: number;
  sufijo?: string;
  textoFijo?: string; // para valores no numéricos, ej. "WhatsApp"
  label: string;
  color: string;
  bg: string;
  border: string;
};

const STATS: Stat[] = [
  {
    icon: "🏆",
    numero: 35,
    sufijo: " años",
    label: "de experiencia",
    color: "#E91E8F",
    bg: "bg-[#E91E8F]/10",
    border: "border-[#E91E8F]/20",
  },
  {
    icon: "😊",
    prefijo: "+",
    numero: 5000,
    label: "clientes satisfechos",
    color: "#2D3E9F",
    bg: "bg-[#2D3E9F]/10",
    border: "border-[#2D3E9F]/20",
  },
  {
    icon: "💬",
    textoFijo: "WhatsApp",
    label: "Atención rápida",
    color: "#47B7E8",
    bg: "bg-[#47B7E8]/10",
    border: "border-[#47B7E8]/20",
  },
];

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);

  return value;
}

function TarjetaStat({ s, run, index }: { s: Stat; run: boolean; index: number }) {
  const contado = useCountUp(s.numero ?? 0, run && s.numero != null);

  return (
    <div
      className={`flex items-center gap-5 ${s.bg} border ${s.border} rounded-2xl px-7 py-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none ${
        run ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: run ? `${index * 120}ms` : "0ms" }}
    >
      <span className="text-4xl shrink-0">{s.icon}</span>
      <div>
        <p className="text-2xl font-black tabular-nums" style={{ color: s.color }}>
          {s.textoFijo ?? `${s.prefijo ?? ""}${contado}${s.sufijo ?? ""}`}
        </p>
        <p className="text-gray-600 font-medium text-sm">{s.label}</p>
      </div>
    </div>
  );
}

export default function BandaEstadisticas() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRun(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white py-10 px-4 border-b border-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STATS.map((s, i) => (
          <TarjetaStat key={s.label} s={s} run={run} index={i} />
        ))}
      </div>
    </section>
  );
}
