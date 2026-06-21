import { Resend } from "resend";
import { NextRequest } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Cotizaciones <onboarding@resend.dev>";
const TO_EMAIL = process.env.RESEND_TO_EMAIL ?? "impresoracolor3@gmail.com";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  const { nombre, telefono, email, producto, cantidadTamano, mensaje } =
    await request.json();

  if (!nombre || !telefono || !email || !producto) {
    return Response.json({ error: "Faltan campos obligatorios." }, { status: 400, headers: CORS_HEADERS });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const tablaHTML = `
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 40%;">Nombre</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${nombre}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Teléfono</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${telefono}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Producto</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${producto}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Cantidad / Tamaño</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${cantidadTamano || "—"}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-weight: bold; color: #555; vertical-align: top;">Mensaje adicional</td>
        <td style="padding: 10px 0; color: #222; white-space: pre-wrap;">${mensaje || "—"}</td>
      </tr>
    </table>
  `;

  try {
    // Email interno al negocio
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Nueva cotización: ${producto} — ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2D3E9F; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nueva solicitud de cotización</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            ${tablaHTML}
          </div>
          <p style="color: #aaa; font-size: 12px; margin-top: 16px; text-align: center;">
            Impresora Color Ltda. · Arauco 1060, Chillán
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[cotizar] Resend error:", JSON.stringify(error));
      return Response.json(
        { error: "No se pudo enviar el correo.", detail: error },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // Confirmación automática al cliente (best-effort)
    resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Recibimos tu solicitud — Impresora Color",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #E91E8F; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">¡Recibimos tu cotización!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="color: #333; font-size: 15px; margin-top: 0;">Hola <strong>${nombre}</strong>,</p>
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              Recibimos tu solicitud de cotización para <strong>${producto}</strong>.
              Te contactaremos en menos de 24 horas por teléfono o email.
            </p>
            <div style="background: #fff; border-radius: 8px; border: 1px solid #e0e0e0; padding: 16px; margin: 20px 0;">
              <p style="color: #888; font-size: 12px; margin: 0 0 12px 0; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Resumen de tu solicitud</p>
              ${tablaHTML}
            </div>
            <p style="color: #555; font-size: 14px;">
              Si necesitas respuesta urgente, escríbenos por WhatsApp:
              <a href="https://wa.me/56998441157" style="color: #E91E8F; font-weight: bold;">+56 9 9844 1157</a>
            </p>
          </div>
          <p style="color: #aaa; font-size: 12px; margin-top: 16px; text-align: center;">
            Impresora Color Ltda. · Arauco 1060, Chillán
          </p>
        </div>
      `,
    }).catch((err) => console.error("[cotizar] Auto-reply error:", err));

    console.log("[cotizar] Email enviado:", data?.id);
    return Response.json({ ok: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error("[cotizar] Excepción inesperada:", err);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
