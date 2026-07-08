"use client";
// Barra fina de progreso de scroll con los colores de marca, fija arriba de todo.
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    let raf = 0;

    const actualizar = () => {
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      const pct = alto > 0 ? (window.scrollY / alto) * 100 : 0;
      setProgreso(pct);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(actualizar);
    };

    actualizar();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#E91E8F] via-[#47B7E8] to-[#7DBA2F] motion-reduce:transition-none"
        style={{ width: `${progreso}%`, transition: "width 100ms linear" }}
      />
    </div>
  );
}
