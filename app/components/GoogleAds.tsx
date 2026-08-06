"use client";

import Script from "next/script";
import { useEffect } from "react";

// Etiqueta de Google Ads (cuenta Impresoracolor 137-965-2676)
export const GOOGLE_ADS_ID = "AW-434671504";
// Conversión: Clic WhatsApp (Web) — ID acción 7643890302
const CONV_WHATSAPP = "AW-434671504/rD-SCP6E8rwcEJCfos8B";
// Conversión: Formulario Cotización (Web) — ID acción 7643478371
export const CONV_FORMULARIO = "AW-434671504/nebXCOPy2LwcEJCfos8B";

// Conversión: Compra en la tienda online.
// Se crea en Google Ads (Objetivos → Conversiones → Nueva acción → Sitio web,
// categoría "Compra", valor variable) y se pega la etiqueta completa
// "AW-434671504/xxxxxxxxxxxx" en NEXT_PUBLIC_ADS_CONV_COMPRA.
// Mientras esté vacía, la compra igual se registra en GA4.
export const CONV_COMPRA = process.env.NEXT_PUBLIC_ADS_CONV_COMPRA ?? "";

// Propiedad de GA4 ("G-XXXXXXX"). Si no está definida, no se carga nada extra.
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export interface ItemCompra {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

/**
 * Eventos de embudo de GA4 (view_item, add_to_cart, begin_checkout).
 * Solo van a GA4: no son conversiones de Google Ads y no afectan las pujas.
 * Sirven para responder dónde se cae la gente antes de comprar.
 */
export function trackEcommerce(
  evento: 'view_item' | 'add_to_cart' | 'begin_checkout',
  datos: { valor: number; items: ItemCompra[] }
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!GA4_ID) return;

  window.gtag("event", evento, {
    send_to: GA4_ID,
    value: datos.valor,
    currency: "CLP",
    items: datos.items,
  });
}

/**
 * Registra una compra en GA4 y en Google Ads.
 * Se llama una sola vez por número de orden: la página de confirmación se
 * recarga o se comparte con frecuencia, y sin este control la misma venta se
 * contaría varias veces y ensuciaría el CPA y el ROAS.
 */
export function trackPurchase(datos: {
  orden: string;
  valor: number;
  items: ItemCompra[];
}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const clave = `ic_purchase_${datos.orden}`;
  try {
    if (window.sessionStorage.getItem(clave)) return;
    window.sessionStorage.setItem(clave, "1");
  } catch {
    // Modo incógnito sin sessionStorage: preferimos medir de más que de menos
  }

  window.gtag("event", "purchase", {
    transaction_id: datos.orden,
    value: datos.valor,
    currency: "CLP",
    items: datos.items,
  });

  if (CONV_COMPRA) {
    window.gtag("event", "conversion", {
      send_to: CONV_COMPRA,
      value: datos.valor,
      currency: "CLP",
      transaction_id: datos.orden,
    });
  }
}

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
        ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
      `}</Script>
    </>
  );
}
