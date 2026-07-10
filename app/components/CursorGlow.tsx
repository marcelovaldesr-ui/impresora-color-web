"use client";
// Cursor con estela — toque de portafolio. Punto fucsia + halo que sigue con
// retardo y crece sobre elementos interactivos. Solo desktop (pointer: fine),
// respeta prefers-reduced-motion y no oculta el cursor nativo.
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduced || !dot || !ring) return;

    let mx = -100, my = -100;   // posición real del mouse
    let rx = -100, ry = -100;   // posición del halo (con retardo)
    let scale = 1, targetScale = 1;
    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!active) {
        active = true;
        rx = mx; ry = my;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const t = e.target as Element | null;
      targetScale = t?.closest?.("a, button, [role='button'], input, textarea, select") ? 1.9 : 1;
    };

    const onLeave = () => {
      active = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      ring.style.backgroundColor = scale > 1.3 ? "rgba(233, 30, 143, 0.07)" : "transparent";
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[90] w-2 h-2 rounded-full bg-[#E91E8F] pointer-events-none opacity-0 hidden lg:block"
        style={{ transition: "opacity 0.3s" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[90] w-9 h-9 rounded-full border-2 border-[#E91E8F]/40 pointer-events-none opacity-0 hidden lg:block"
        style={{ transition: "opacity 0.3s, background-color 0.3s" }}
      />
    </>
  );
}
