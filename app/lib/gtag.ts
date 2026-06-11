declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = "AW-434671504";

export function trackWhatsAppConversion() {
  window.gtag?.("event", "conversion", {
    send_to: "AW-434671504/rD-SCP6E8rwcEJCfos8B",
  });
}

export function trackFormConversion() {
  window.gtag?.("event", "conversion", {
    send_to: "AW-434671504/nebXCOPy2LwcEJCfos8B",
  });
}
