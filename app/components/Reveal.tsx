"use client";
// Envoltorio reutilizable: anima fade-in + slide-up cuando la sección entra en pantalla.
// Sin dependencias externas (IntersectionObserver nativo) para no arriesgar el build.
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retraso en ms antes de iniciar la animación una vez visible */
  delay?: number;
  /** Desplazamiento inicial en px */
  y?: number;
};

export default function Reveal({ children, className = "", delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0"
      } ${className}`}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
        transform: visible ? undefined : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}
