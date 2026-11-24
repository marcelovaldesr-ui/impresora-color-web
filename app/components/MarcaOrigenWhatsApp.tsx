"use client";

// Marca de origen en el texto de WhatsApp.
//
// Google no le dice a WhatsApp de dónde viene la persona, así que la única
// forma de saber si una conversación la trajo un anuncio de Google, uno de
// Meta o una visita gratis es el texto que ya viene escrito al abrir el chat.
// Este componente agrega al final de ese texto una marca corta:
//
//   (vengo de Google)        la visita llegó con gclid / gbraid / wbraid
//   (vi su anuncio en Meta)  la visita llegó con fbclid
//   (vengo de la web)        cualquier otra visita
//
// El asistente de Gestión (app/api/tino/webhook/route.ts, ORIGEN_POR_FRAGMENTO)
// lee esas frases. Si se cambia el texto acá, hay que cambiarlo allá.
//
// La marca del anuncio se guarda 30 días en este navegador: mucha gente vuelve
// días después a escribir, y esa venta también la trajo el anuncio.

import { useEffect } from "react";

const CLAVE = "ic_origen_v1";
const DURA_MS = 30 * 24 * 60 * 60 * 1000;

type Origen = "google" | "meta";

function leer(): Origen | null {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return null;
    const { o, t } = JSON.parse(raw) as { o: Origen; t: number };
    return Date.now() - t < DURA_MS ? o : null;
  } catch {
    return null;
  }
}

function marca(o: Origen | null): string {
  if (o === "google") return "(vengo de Google)";
  if (o === "meta") return "(vi su anuncio en Meta)";
  return "(vengo de la web)";
}

const YA_MARCADO = /\((vengo de google|los encontré en google|vi su anuncio en meta|vengo de la web)\)/i;

export default function MarcaOrigenWhatsApp() {
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const o: Origen | null =
        p.get("gclid") || p.get("gbraid") || p.get("wbraid")
          ? "google"
          : p.get("fbclid")
            ? "meta"
            : null;
      if (o) localStorage.setItem(CLAVE, JSON.stringify({ o, t: Date.now() }));
    } catch {
      /* sin storage: se marca como web */
    }

    function alHacerClic(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a?.href) return;
      let url: URL;
      try {
        url = new URL(a.href);
      } catch {
        return;
      }
      if (url.hostname !== "wa.me" && url.hostname !== "api.whatsapp.com") return;
      const texto = url.searchParams.get("text") ?? "Hola";
      if (YA_MARCADO.test(texto)) return;
      url.searchParams.set("text", `${texto} ${marca(leer())}`);
      a.href = url.toString();
    }

    // Fase de captura: corre antes de que el navegador siga el enlace.
    document.addEventListener("click", alHacerClic, true);
    return () => document.removeEventListener("click", alHacerClic, true);
  }, []);

  return null;
}
