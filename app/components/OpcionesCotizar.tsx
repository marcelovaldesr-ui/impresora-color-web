"use client";
import { useState } from "react";

const PHONE = "56998441157";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hola, quiero cotizar un trabajo de imprenta")}`;

const PRODUCTOS = [
  "Flyer",
  "Sticker",
  "Tarjeta de presentación",
  "Pendón",
  "Roller retráctil",
  "Lona",
  "Etiqueta adhesiva",
  "Otro",
];

type Estado = "idle" | "enviando" | "ok" | "error";

export default function OpcionesCotizar() {
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
    <section id="cotizar" className="bg-[#F8FAFF] py-16 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <span className="text-[#E91E8F] font-bold text-sm uppercase tracking-widest">
            Cotización sin costo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D3E9F] mt-2 mb-3">
            ¿Cómo prefieres cotizar?
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Elige la opción que más te acomoda. Respondemos rápido por ambos canales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* ── Opción 1: WhatsApp ── */}
          <div
            className="rounded-3xl overflow-hidden shadow-lg flex flex-col h-full"
            style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
          >
            <div className="p-8 flex flex-col flex-1">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <WAIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-black text-2xl mb-3">Por WhatsApp</h3>
              <p className="text-white/80 text-base mb-6 flex-1">
                Envíanos un mensaje directo. Atención inmediata en horario de atención.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Respuesta en minutos",
                  "Adjunta tu archivo o imagen",
                  "Atención personalizada",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                    <span className="w-5 h-5 bg-white/25 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-[#128C7E] hover:bg-green-50 font-black text-base px-6 py-4 rounded-2xl transition-all duration-200 shadow-md"
              >
                <WAIcon className="w-5 h-5" />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>

          {/* ── Opción 2: Formulario por email ── */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="w-14 h-14 bg-[#E91E8F]/10 rounded-2xl flex items-center justify-center mb-6">
                <EmailIcon className="w-8 h-8 text-[#E91E8F]" />
              </div>
              <h3 className="text-[#2D3E9F] font-black text-2xl mb-2">Por correo electrónico</h3>
              <p className="text-gray-500 text-sm mb-6">
                Completa el formulario y te respondemos en{" "}
                <strong className="text-[#2D3E9F]">menos de 24 horas</strong>.
              </p>

              {estado === "ok" ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-[#E91E8F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-[#2D3E9F] font-black text-xl mb-2">¡Solicitud enviada!</h4>
                  <p className="text-gray-500 text-sm">
                    Recibimos tu cotización. Te contactaremos pronto por teléfono o email.
                  </p>
                  <button
                    onClick={() => {
                      setEstado("idle");
                      setForm({ nombre: "", telefono: "", email: "", producto: "", cantidadTamano: "", mensaje: "" });
                    }}
                    className="mt-6 text-[#E91E8F] font-bold underline underline-offset-4 hover:text-[#2D3E9F] transition-colors text-sm"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                        Nombre <span className="text-[#E91E8F]">*</span>
                      </label>
                      <input
                        type="text" name="nombre" value={form.nombre} onChange={handleChange}
                        required placeholder="Tu nombre"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                        Teléfono <span className="text-[#E91E8F]">*</span>
                      </label>
                      <input
                        type="tel" name="telefono" value={form.telefono} onChange={handleChange}
                        required placeholder="+56 9 XXXX XXXX"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Correo electrónico <span className="text-[#E91E8F]">*</span>
                    </label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      required placeholder="tu@correo.com"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                        Producto <span className="text-[#E91E8F]">*</span>
                      </label>
                      <select
                        name="producto" value={form.producto} onChange={handleChange} required
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 bg-white focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm appearance-none"
                      >
                        <option value="" disabled>Selecciona...</option>
                        {PRODUCTOS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                        Cantidad / tamaño
                      </label>
                      <input
                        type="text" name="cantidadTamano" value={form.cantidadTamano} onChange={handleChange}
                        placeholder="Ej: 500 uds, 10×15 cm"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Mensaje adicional
                    </label>
                    <textarea
                      name="mensaje" value={form.mensaje} onChange={handleChange} rows={3}
                      placeholder="Material, colores, archivo, fecha de entrega..."
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E91E8F] focus:ring-1 focus:ring-[#E91E8F]/30 transition-colors text-sm resize-none"
                    />
                  </div>

                  {estado === "error" && (
                    <p className="text-red-500 text-sm text-center bg-red-50 border border-red-100 rounded-xl py-2.5">
                      Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={estado === "enviando"}
                    className="w-full bg-[#E91E8F] hover:bg-[#d4166c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-[#E91E8F]/25"
                  >
                    {estado === "enviando" ? "Enviando..." : "Solicitar cotización"}
                  </button>

                  <p className="text-center text-gray-400 text-xs">
                    Sin compromiso · Respuesta en menos de 24 horas
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function WAIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
