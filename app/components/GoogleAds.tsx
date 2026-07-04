"use client";

import Script from "next/script";
import { useEffect } from "react";

// Etiqueta de Google Ads (cuenta Impresoracolor 137-965-2676)
export const GOOGLE_ADS_ID = "AW-434671504";
// Conversión: Clic WhatsApp (Web) — ID acción 7643890302
const CONV_WHATSAPP = "AW-434671504/rD-SCP6E8rwcEJCfos8B";
// Conversión: Formulario Cotización (Web) — ID acción 7643478371
export const CONV_FORMULARIO = "AW-434671504/nebXCOPy2LwcEJCfos8B";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Dispara una conversión de Google Ads (no hace nada si gtag no cargó). */
export function trackConversion(sendTo: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: sendTo });
  }
}

/**
 * Carga gtag.js una sola vez (layout raíz) y registra la conversión
 * "Clic WhatsApp" para cualquier enlace wa.me del sitio, incluidos
 * los que se agreguen a futuro (listener global con `closest`).
 */
export default function GoogleAds() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const link = target?.closest?.(
        'a[href*="wa.me"], a[href*="api.whatsapp.com"]'
      );
      if (link) trackConversion(CONV_WHATSAPP);
    }
    // Fase de captura: se dispara aunque el enlace abra en pestaña nueva
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_ADS_ID}');
      `}</Script>
    </>
  );
}
