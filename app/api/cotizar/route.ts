import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { nombre, telefono, producto, cantidadTamano, mensaje } =
    await request.json();

  if (!nombre || !telefono || !producto) {
    return Response.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Cotizaciones <onboarding@resend.dev>",
    to: "impresoracolor3@gmail.com",
    subject: `Nueva solicitud de cotización - ${nombre}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2D3E9F; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Nueva solicitud de cotización</h1>
        </div>
        <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
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
        </div>
        <p style="color: #aaa; font-size: 12px; margin-top: 16px; text-align: center;">
          Impresora Color Ltda. · Arauco 1060, Chillán
        </p>
      </div>
    `,
  });

  if (error) {
    return Response.json({ error: "No se pudo enviar el correo." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
