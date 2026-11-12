import { Resend } from "resend";
import { NextRequest } from "next/server";
import { escapeHtml } from "@/lib/escapeHtml";
import { obtenerIp, verificarLimite, registrarSolicitud, respuestaLimiteExcedido } from "@/lib/publicRateLimit";

/**
 * Cotización de CALENDARIOS 2027 (pedidos corporativos desde 200 unidades).
 *
 * Es un endpoint aparte del /api/cotizar general porque:
 *  - pide datos distintos (empresa, cantidad por tramo, fecha, comuna, logo);
 *  - marca en el asunto si el pedido está bajo el mínimo de 200, para que
 *    Cecilia priorice los grandes sin abrir cada correo;
 *  - registra de dónde vino el cliente (Google Ads, Meta, web directa) para
 *    medir la campaña sin depender de que alguien lo pregunte.
 *
 * Usa el mismo límite de solicitudes que /api/cotizar (comparten la cuota).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function texto(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
function lista(v: unknown, max: number): string[] {
  return Array.isArray(v) ? v.filter((x) => typeof x === "string").map((x) => x.trim().slice(0, 60)).slice(0, max) : [];
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Cotizaciones <onboarding@resend.dev>";
const TO_EMAIL = process.env.RESEND_TO_EMAIL ?? "contacto@impresoracolor.cl";

// Tramos válidos: cualquier otro valor se rechaza (evita basura en el asunto).
const TRAMOS_CANTIDAD = [
  "Menos de 200",
  "200 a 499",
  "500 a 999",
  "1.000 a 4.999",
  "5.000 o más",
] as const;

function origenLegible(o: Record<string, string>): string {
  if (o.gclid || o.utm_source === "google") return "Google Ads";
  if (o.fbclid || ["facebook", "instagram", "meta", "fb", "ig"].includes(o.utm_source)) return "Meta (Facebook / Instagram)";
  if (o.utm_source) return o.utm_source;
  return "Web directa / orgánico";
}

export async function POST(request: NextRequest) {
  const ip = obtenerIp(request);
  const limite = await verificarLimite(ip, "cotizar");
  if (limite.excedido) return respuestaLimiteExcedido(limite.segundosRestantes);

  let datos: Record<string, unknown>;
  try {
    datos = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Trampa para bots: campo oculto que una persona nunca llena.
  if (texto(datos.sitio, 100)) return Response.json({ ok: true });

  const empresa = texto(datos.empresa, 120);
  const nombre = texto(datos.nombre, 100);
  const telefono = texto(datos.telefono, 30);
  const email = texto(datos.email, 160);
  const comuna = texto(datos.comuna, 60);
  const cantidad = texto(datos.cantidad, 30);
  const tipos = lista(datos.tipos, 6);
  const fecha = texto(datos.fecha, 60);
  const diseno = texto(datos.diseno, 60);
  const mensaje = texto(datos.mensaje, 2000);

  const o = (datos.origen && typeof datos.origen === "object" ? datos.origen : {}) as Record<string, unknown>;
  const origen: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "gclid", "fbclid", "referrer"]) {
    origen[k] = texto(o[k], 300);
  }

  if (!empresa || !nombre || !telefono || !cantidad) {
    return Response.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }
  if (!(TRAMOS_CANTIDAD as readonly string[]).includes(cantidad)) {
    return Response.json({ error: "Cantidad no válida." }, { status: 400 });
  }
  if (telefono.replace(/\D/g, "").length < 8) {
    return Response.json({ error: "El teléfono no es válido." }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return Response.json({ error: "El correo electrónico no es válido." }, { status: 400 });
  }

  await registrarSolicitud(ip, "cotizar");

  const bajoMinimo = cantidad === "Menos de 200";
  const fuente = origenLegible(origen);
  const telLimpio = telefono.replace(/\D/g, "");
  const telWa = telLimpio.startsWith("56") ? telLimpio : `56${telLimpio.replace(/^0+/, "")}`;

  const fila = (k: string, v: string) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555;width:38%;vertical-align:top;">${k}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;white-space:pre-wrap;">${v || "—"}</td>
      </tr>`;

  const tabla = `
    <table style="width:100%;border-collapse:collapse;">
      ${fila("Empresa", escapeHtml(empresa))}
      ${fila("Contacto", escapeHtml(nombre))}
      ${fila("Teléfono", escapeHtml(telefono))}
      ${fila("Email", escapeHtml(email))}
      ${fila("Comuna", escapeHtml(comuna))}
      ${fila("Cantidad", `<strong>${escapeHtml(cantidad)}</strong>`)}
      ${fila("Tipo de calendario", escapeHtml(tipos.join(", ")))}
      ${fila("Lo necesita", escapeHtml(fecha))}
      ${fila("Diseño", escapeHtml(diseno))}
      ${fila("Comentarios", escapeHtml(mensaje))}
    </table>`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      ...(email ? { replyTo: email } : {}),
      subject: `${bajoMinimo ? "[BAJO MÍNIMO] " : ""}Calendarios 2027 · ${cantidad} · ${empresa}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:${bajoMinimo ? "#6B7280" : "#E91E8F"};padding:22px 24px;border-radius:8px 8px 0 0;">
            <p style="color:#fff;opacity:.85;margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">Campaña Calendarios 2027 · ${escapeHtml(fuente)}</p>
            <h1 style="color:#fff;margin:0;font-size:20px;">${escapeHtml(empresa)} — ${escapeHtml(cantidad)} calendarios</h1>
          </div>
          <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
            ${bajoMinimo ? `<p style="background:#FEF3C7;color:#92400E;padding:10px 12px;border-radius:6px;font-size:13px;margin:0 0 16px;">Pidió menos de 200 unidades (bajo el mínimo corporativo). Atender cuando haya tiempo.</p>` : ""}
            ${tabla}
            <p style="margin:22px 0 0;">
              <a href="https://wa.me/${escapeHtml(telWa)}" style="background:#25D366;color:#fff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:999px;display:inline-block;">Responder por WhatsApp</a>
            </p>
            <p style="color:#999;font-size:11px;margin-top:22px;line-height:1.5;">
              Origen: ${escapeHtml(fuente)}${origen.utm_campaign ? ` · campaña ${escapeHtml(origen.utm_campaign)}` : ""}${origen.utm_content ? ` · anuncio ${escapeHtml(origen.utm_content)}` : ""}
            </p>
          </div>
        </div>`,
    });

    if (error) {
      console.error("[cotizar-calendarios] Resend error:", JSON.stringify(error));
      return Response.json({ error: "No se pudo enviar la solicitud." }, { status: 500 });
    }

    if (email) {
      resend.emails
        .send({
          from: FROM_EMAIL,
          to: email,
          subject: "Recibimos tu solicitud de calendarios 2027 — Impresora Color",
          html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#2D3E9F;padding:24px;border-radius:8px 8px 0 0;">
              <h1 style="color:#fff;margin:0;font-size:20px;">¡Recibimos tu solicitud!</h1>
            </div>
            <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
              <p style="color:#333;font-size:15px;margin-top:0;">Hola <strong>${escapeHtml(nombre)}</strong>,</p>
              <p style="color:#555;font-size:14px;line-height:1.6;">
                Recibimos tu solicitud de calendarios 2027 para <strong>${escapeHtml(empresa)}</strong>.
                Te contactaremos dentro de 24 horas hábiles con la cotización.
              </p>
              ${tabla}
              <p style="color:#555;font-size:14px;margin-top:20px;">
                ¿Es urgente? Escríbenos por WhatsApp:
                <a href="https://wa.me/56998441157" style="color:#E91E8F;font-weight:bold;">+56 9 9844 1157</a>
              </p>
            </div>
            <p style="color:#aaa;font-size:12px;margin-top:16px;text-align:center;">Impresora Color Ltda. · Arauco 1060, Chillán · Desde 1991</p>
          </div>`,
        })
        .catch((err) => console.error("[cotizar-calendarios] Auto-reply error:", err));
    }

    return Response.json({ ok: true, calificado: !bajoMinimo });
  } catch (err) {
    console.error("[cotizar-calendarios] Excepción:", err);
    return Response.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
