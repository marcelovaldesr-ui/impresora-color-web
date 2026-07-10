"use client";
// Desplaza suavemente su contenido según el scroll (profundidad de portafolio).
// Solo calcula cuando el elemento está cerca del viewport (IntersectionObserver
// + requestAnimationFrame). Respeta prefers-reduced-motion.
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Factor de velocidad: positivo sube al hacer scroll, negativo baja */
  speed?: number;
  ariaHidden?: boolean;
};

export default function Parallax({ children, className = "", speed = 0.15, ariaHidden }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (reduced || !outer || !inner) return;

    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      const r = outer.getBoundingClientRect();
      const off = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      inner.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) onScroll();
      },
      { rootMargin: "200px" }
    );

    io.observe(outer);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={outerRef} className={className} aria-hidden={ariaHidden}>
      <div ref={innerRef} className="will-change-transform">{children}</div>
    </div>
  );
}
