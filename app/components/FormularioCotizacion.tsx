"use client";
import { useState } from "react";

const PRODUCTOS = [
  "Flyer",
  "Sticker",
  "Tarjeta de presentación",
  "Pendón",
  "Lona",
  "Otro",
];

type Estado = "idle" | "enviando" | "ok" | "error";

export default function FormularioCotizacion() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    producto: "",
    cantidadTamano: "",
    mensaje: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEstado(res.ok ? "ok" : "error");
    } catch {
      setEstado("error");
    }
  }

  return (
    <section id="cotizar" className="bg-[#2D3E9F] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="text-[#E91E8F] font-bold text-sm uppercase tracking-widest">
            Cotización online
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">
            Solicita tu{" "}
            <span className="text-[#47B7E8]">cotización gratis</span>
          </h2>
          <p className="text-blue-200 text-lg">
            Completa el formulario y te respondemos a la brevedad.
          </p>
        </div>

        {estado === "ok" ? (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center">
            <div className="w-16 h-16 bg-[#E91E8F] rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white font-black text-2xl mb-3">¡Solicitud enviada!</h3>
            <p className="text-blue-200 text-base">
              Recibimos tu cotización. Te contactaremos pronto por teléfono o WhatsApp.
            </p>
            <button
              onClick={() => {
                setEstado("idle");
                setForm({ nombre: "", telefono: "", producto: "", cantidadTamano: "", mensaje: "" });
              }}
              className="mt-8 text-[#47B7E8] font-bold underline underline-offset-4 hover:text-white transition-colors text-sm"
            >
              Enviar otra solicitud
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 space-y-5"
          >
            {/* Nombre y teléfono */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-blue-100 text-sm font-semibold mb-1.5">
                  Nombre completo <span className="text-[#E91E8F]">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-[#E91E8F] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-blue-100 text-sm font-semibold mb-1.5">
                  Teléfono <span className="text-[#E91E8F]">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  placeholder="+56 9 XXXX XXXX"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-[#E91E8F] transition-colors text-sm"
                />
              </div>
            </div>

            {/* Tipo de producto */}
            <div>
              <label className="block text-blue-100 text-sm font-semibold mb-1.5">
                Tipo de producto <span className="text-[#E91E8F]">*</span>
              </label>
              <select
                name="producto"
                value={form.producto}
                onChange={handleChange}
                required
                className="w-full bg-[#1e2e7a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E91E8F] transition-colors text-sm appearance-none"
              >
                <option value="" disabled>
                  Selecciona un producto
                </option>
                {PRODUCTOS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Cantidad y tamaño */}
            <div>
              <label className="block text-blue-100 text-sm font-semibold mb-1.5">
                Cantidad y tamaño
              </label>
              <input
                type="text"
                name="cantidadTamano"
                value={form.cantidadTamano}
                onChange={handleChange}
                placeholder="Ej: 500 unidades, 10x15 cm"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-[#E91E8F] transition-colors text-sm"
              />
            </div>

            {/* Mensaje adicional */}
            <div>
              <label className="block text-blue-100 text-sm font-semibold mb-1.5">
                Mensaje adicional
              </label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={4}
                placeholder="Cuéntanos más sobre tu pedido: material, colores, archivo, fecha de entrega, etc."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-[#E91E8F] transition-colors text-sm resize-none"
              />
            </div>

            {estado === "error" && (
              <p className="text-red-300 text-sm text-center">
                Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.
              </p>
            )}

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="w-full bg-[#E91E8F] hover:bg-[#d4166c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors text-base shadow-lg shadow-[#E91E8F]/30"
            >
              {estado === "enviando" ? "Enviando..." : "Solicitar cotización"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
