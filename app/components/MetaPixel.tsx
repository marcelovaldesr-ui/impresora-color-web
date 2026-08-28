"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * PÍXEL DE META (Facebook/Instagram Ads).
 *
 * Mismo patrón que GoogleAds.tsx: se carga una sola vez desde el layout raíz
 * y NO hace nada mientras no exista el ID. El ID se crea en el Administrador
 * de Eventos de Meta (business.facebook.com → Orígenes de datos → Píxel) y se
 * pega en la variable de entorno:
 *
 *   NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
 *
 * POR QUÉ SE INSTALA ANTES DE HACER ANUNCIOS: el píxel necesita meses
 * acumulando audiencia para que el remarketing sirva. Instalarlo el día que
 * abra la tienda es llegar tarde; instalado hoy, la audiencia ya está
 * construida cuando se necesite.
 *
 * QUÉ MIDE:
 *  - PageView en cada página (automático al cargar).
 *  - "Contact" cuando alguien pincha cualquier enlace wa.me del sitio —
 *    el mismo criterio que usa GoogleAds.tsx para la conversión de WhatsApp,
 *    con el mismo listener global (`closest`), así los dos sistemas cuentan
 *    exactamente lo mismo y los números son comparables.
 *
 * La compra de la tienda online se agrega después con fbq('track','Purchase')
 * en la página de confirmación, junto al trackPurchase de GA4 — no antes de
 * que la tienda reabra.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Dispara un evento estándar del píxel (no hace nada si fbq no cargó). */
export function trackMeta(evento: string, datos?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", evento, datos ?? {});
  }
}

export default function MetaPixel() {
  useEffect(() => {
    if (!META_PIXEL_ID) return;

    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const enlace = target?.closest?.('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
      if (enlace) trackMeta("Contact");
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!META_PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
