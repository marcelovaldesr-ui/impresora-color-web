"use client";
// Título que se revela palabra por palabra al entrar en pantalla (estilo
// portafolio). Cada palabra sube desde un contenedor con overflow oculto.
import { Fragment, useEffect, useRef, useState } from "react";

type Segmento = {
  /** Texto del segmento */
  t: string;
  /** Clases extra (color, gradiente…) aplicadas a cada palabra del segmento */
  c?: string;
};

type Props = {
  segmentos: Segmento[];
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export default function TituloReveal({ segmentos, className = "", as = "h2" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  let idx = 0;

  return (
    <Tag ref={ref} className={className}>
      {segmentos.map((seg, si) => (
        <Fragment key={si}>
          {seg.t.split(" ").filter(Boolean).map((palabra, wi) => {
            const delay = idx++ * 45;
            return (
              <Fragment key={wi}>
                <span
                  className="inline-block overflow-hidden align-bottom"
                  style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
                >
                  <span
                    className={`inline-block transition-[transform,opacity] duration-500 ease-out will-change-transform ${seg.c ?? ""} ${
                      visible ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
                    }`}
                    style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
                  >
                    {palabra}
                  </span>
                </span>{" "}
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </Tag>
  );
}
