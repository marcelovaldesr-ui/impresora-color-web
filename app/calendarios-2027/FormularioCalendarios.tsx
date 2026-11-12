"use client";

import { useEffect, useRef, useState } from "react";
import { trackMeta } from "@/app/components/MetaPixel";
import { trackConversion, CONV_FORMULARIO } from "@/app/components/GoogleAds";

const TRAMOS = ["200 a 499", "500 a 999", "1.000 a 4.999", "5.000 o más", "Menos de 200"];
const TIPOS = ["De taco (comercial)", "Lámina con fleje", "Mural", "Escritorio", "Imán", "Aún no sé"];
const FECHAS = ["Antes del 15 de diciembre", "Antes de Navidad", "Primera quincena de enero", "Tengo flexibilidad"];
const COMUNAS = [
  "Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Quillón", "Coihueco", "Yungay",
  "San Nicolás", "Pinto", "El Carmen", "Quirihue", "Otra comuna de Ñuble", "Fuera de Ñuble",
];
const DISENO = ["Tengo logo / diseño listo", "Necesito que me ayuden con el diseño"];

type Estado = "idle" | "enviando" | "ok" | "error";

/** Lee de dónde vino la visita (UTM, gclid, fbclid) para que el correo diga el origen. */
function leerOrigen(): Record<string, string> {
  const o: Record<string, string> = {};
  try {
    const p = new URLSearchParams(window.location.search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "gclid", "fbclid"]) {
      const v = p.get(k);
      if (v) o[k] = v;
    }
    if (Object.keys(o).length) sessionStorage.setItem("ic_origen_cal", JSON.stringify(o));
    else Object.assign(o, JSON.parse(sessionStorage.getItem("ic_origen_cal") ?? "{}"));
  } catch {
    // sin sessionStorage: se envía lo que haya en la URL
  }
  o.referrer = document.referrer || "";
  return o;
}

export default function FormularioCalendarios({ waUrl }: { waUrl: string }) {
  const [estado, setEstado] = useState<Estado>("idle");
  const [error, setError] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [tipos, setTipos] = useState<string[]>([]);
  // Se lee al cargar (guarda los UTM en la sesión) y se usa al enviar; no necesita re-render.
  const origen = useRef<Record<string, string>>({});

  useEffect(() => {
    origen.current = leerOrigen();
  }, []);

  function toggleTipo(t: string) {
    setTipos((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cantidad) {
      setError("Elige la cantidad aproximada.");
      return;
    }
    setEstado("enviando");
    setError("");
    const f = new FormData(e.currentTarget);
    const cuerpo = {
      empresa: f.get("empresa"),
      nombre: f.get("nombre"),
      telefono: f.get("telefono"),
      email: f.get("email"),
      comuna: f.get("comuna"),
      fecha: f.get("fecha"),
      diseno: f.get("diseno"),
      mensaje: f.get("mensaje"),
      sitio: f.get("sitio"),
      cantidad,
      tipos,
      origen: origen.current,
    };
    try {
      const r = await fetch("/api/cotizar-calendarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "No se pudo enviar.");
      // Solo los pedidos de 200+ cuentan como conversión: así Google y Meta
      // aprenden a buscar empresas que compran volumen, no pedidos chicos.
      if (j.calificado) {
        trackConversion(CONV_FORMULARIO);
        trackMeta("Lead", { content_name: "Calendarios 2027", content_category: cantidad });
      }
      setEstado("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar.");
      setEstado("error");
    }
  }

  if (estado === "ok") {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-[#2D3E9F]/5 p-8 sm:p-10 text-center">
        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-[#E91E8F]/10 text-[#E91E8F] flex items-center justify-center text-2xl font-black">✓</div>
        <h3 className="text-2xl font-black text-[#111827] mb-3">¡Recibimos tu solicitud!</h3>
        <p className="text-gray-600 leading-relaxed mb-7 max-w-md mx-auto">
          Te enviaremos la cotización dentro de 24 horas hábiles. Si quieres adelantar, mándanos tu logo por WhatsApp.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1daa55] text-white font-bold px-7 py-3.5 rounded-full transition-colors"
        >
          Enviar mi logo por WhatsApp
        </a>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-[#2D3E9F] focus:ring-2 focus:ring-[#2D3E9F]/15 outline-none transition";
  const label = "block text-sm font-bold text-[#111827] mb-1.5";
  const chip = (activo: boolean) =>
    `px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors cursor-pointer select-none ${
      activo ? "bg-[#2D3E9F] border-[#2D3E9F] text-white" : "bg-white border-gray-200 text-gray-700 hover:border-[#2D3E9F]/40"
    }`;

  return (
    <form
      onSubmit={enviar}
      className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-[#2D3E9F]/5 p-6 sm:p-9 space-y-6"
      noValidate={false}
    >
      {/* Cantidad primero: es lo que define si el pedido es para nosotros */}
      <fieldset>
        <legend className={label}>¿Cuántos calendarios necesitas? *</legend>
        <div className="flex flex-wrap gap-2">
          {TRAMOS.map((t) => (
            <button type="button" key={t} onClick={() => setCantidad(t)} className={chip(cantidad === t)} aria-pressed={cantidad === t}>
              {t}
            </button>
          ))}
        </div>
        {cantidad === "Menos de 200" && (
          <p className="mt-3 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            Nuestra línea corporativa parte en 200 unidades. Igual puedes enviarnos tu solicitud y te contamos qué opción te conviene.
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend className={label}>Tipo de calendario</legend>
        <div className="flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <button type="button" key={t} onClick={() => toggleTipo(t)} className={chip(tipos.includes(t))} aria-pressed={tipos.includes(t)}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="empresa" className={label}>Empresa o negocio *</label>
          <input id="empresa" name="empresa" required maxLength={120} className={input} placeholder="Ej: Minimarket Los Aromos" />
        </div>
        <div>
          <label htmlFor="nombre" className={label}>Tu nombre *</label>
          <input id="nombre" name="nombre" required maxLength={100} className={input} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="telefono" className={label}>WhatsApp / teléfono *</label>
          <input id="telefono" name="telefono" required type="tel" inputMode="tel" maxLength={30} className={input} placeholder="+56 9 ..." autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Correo <span className="font-normal text-gray-400">(opcional)</span></label>
          <input id="email" name="email" type="email" maxLength={160} className={input} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="comuna" className={label}>Comuna</label>
          <select id="comuna" name="comuna" className={input} defaultValue="">
            <option value="" disabled>Elige una comuna</option>
            {COMUNAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="fecha" className={label}>¿Para cuándo los necesitas?</label>
          <select id="fecha" name="fecha" className={input} defaultValue="">
            <option value="" disabled>Elige una fecha</option>
            {FECHAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="diseno" className={label}>Diseño</label>
        <select id="diseno" name="diseno" className={input} defaultValue="">
          <option value="" disabled>¿Tienes tu logo o diseño?</option>
          {DISENO.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className={label}>Comentarios <span className="font-normal text-gray-400">(opcional)</span></label>
        <textarea id="mensaje" name="mensaje" rows={3} maxLength={2000} className={input} placeholder="Medidas, fotos que quieres usar, sucursales, etc." />
      </div>

      {/* Trampa anti-bots: oculto para personas */}
      <input type="text" name="sitio" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="w-full bg-[#E91E8F] hover:bg-[#c8186e] disabled:opacity-60 text-white font-bold text-base px-7 py-4 rounded-full shadow-lg shadow-[#E91E8F]/25 transition-colors"
      >
        {estado === "enviando" ? "Enviando…" : "Pedir cotización de calendarios"}
      </button>
      <p className="text-xs text-gray-400 text-center">Respondemos dentro de 24 horas hábiles. Sin compromiso.</p>
    </form>
  );
}
