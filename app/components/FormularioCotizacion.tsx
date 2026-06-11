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
    email: "",
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
    <section
      id="cotizar"
      className="relative overflow-hidden py-24 px-4"
      style={{
        background: "linear-gradient(135deg, #E91E8F 0%, #2D3E9F 50%, #1a2070 100%)",
      }}
    >
      {/* Patrón decorativo de fondo */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-3xl mx-auto">
        {/* CTA superior */}
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Cotización sin costo
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            ¿Listo para cotizar?
          </h2>
          <p className="text-white/80 text-lg sm:text-xl max-w-xl mx-auto">
            Completa el formulario y te respondemos en{" "}
            <strong className="text-white">menos de 24 horas</strong>.
          </p>

          {/* Puntos de confianza */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: "⚡", text: "Respuesta rápida" },
              { icon: "✅", text: "Sin compromiso" },
              { icon: "📦", text: "Todo tipo de impresos" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                <span className="text-base">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta del formulario */}
        {estado === "ok" ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-2xl">
            <div className="w-16 h-16 bg-[#E91E8F] rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-[#2D3E9F] font-black text-2xl mb-3">¡Solicitud enviada!</h3>
            <p className="text-gray-500 text-base">
              Recibimos tu cotización. Te contactaremos pronto por teléfono o email.
            </p>
            <button
              onClick={() => {
                setEstado("idle");
                setForm({ nombre: "", telefono: "", email: "", producto: "", cantidadTamano: "", mensaje: "" });
              }}
              className="mt-8 text-[#E91E8F] font-bold underline underline-offset-4 hover:text-[#2D3E9F] transition-colors text-sm"
            >
              Enviar otra solicitud
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-5"
          >
            {/* Nombre y teléfono */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                  Nombre completo <span className="text-[#E91E8F]">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                  Teléfono <span className="text-[#E91E8F]">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  placeholder="+56 9 XXXX XXXX"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                Correo electrónico <span className="text-[#E91E8F]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tu@correo.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm"
              />
            </div>

            {/* Tipo de producto */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                Tipo de producto <span className="text-[#E91E8F]">*</span>
              </label>
              <select
                name="producto"
                value={form.producto}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm appearance-none"
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
              <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                Cantidad y tamaño
              </label>
              <input
                type="text"
                name="cantidadTamano"
                value={form.cantidadTamano}
                onChange={handleChange}
                placeholder="Ej: 500 unidades, 10x15 cm"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm"
              />
            </div>

            {/* Mensaje adicional */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                Mensaje adicional
              </label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={4}
                placeholder="Cuéntanos más sobre tu pedido: material, colores, archivo, fecha de entrega, etc."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm resize-none"
              />
            </div>

            {estado === "error" && (
              <p className="text-red-500 text-sm text-center bg-red-50 border border-red-100 rounded-xl py-3">
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

            <p className="text-center text-gray-400 text-xs">
              Sin compromiso · Te respondemos en menos de 24 horas
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
