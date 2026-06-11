"use client";
import { useEffect } from "react";
import { trackWhatsAppConversion } from "@/app/lib/gtag";

export default function WhatsAppTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const link = (e.target as Element).closest('a[href*="wa.me"]');
      if (link) trackWhatsAppConversion();
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return null;
}
