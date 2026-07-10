"use client";
// Tarjeta con inclinación 3D al pasar el mouse + brillo que sigue el cursor.
// Solo desktop (pointer: fine), respeta prefers-reduced-motion.
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Inclinación máxima en grados */
  maxTilt?: number;
  /** Brillo radial que sigue el cursor */
  glare?: boolean;
};

export default function TiltCard({ children, className = "", maxTilt = 6, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * maxTilt * 2).toFixed(2)}deg) rotateY(${((px - 0.5) * maxTilt * 2).toFixed(2)}deg) scale(1.012)`;
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group/tilt relative transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
      {glare && enabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.16), transparent 55%)",
          }}
        />
      )}
    </div>
  );
}
