import Navbar from "./components/Navbar";
import BarraSecciones from "./components/BarraSecciones";
import Reveal from "./components/Reveal";
import SeccionOnda from "./components/SeccionOnda";
import Hero from "./components/Hero";
import BandaEstadisticas from "./components/BandaEstadisticas";
import OpcionesCotizar from "./components/OpcionesCotizar";
import Servicios from "./components/Servicios";
import MasProductos from "./components/MasProductos";
import PaginasWeb from "./components/PaginasWeb";
import Beneficios from "./components/Beneficios";
import Testimonios from "./components/Testimonios";
import EmpresasClientes from "./components/EmpresasClientes";
import Galeria from "./components/Galeria";
import Ubicacion from "./components/Ubicacion";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";
import BackToTop from "./components/BackToTop";
import { PREGUNTAS } from "@/lib/faq";

// Rich results de FAQ en Google — mantiene sincronía con el acordeón del home
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PREGUNTAS.map((p) => ({
    "@type": "Question",
    name: p.q,
    acceptedAnswer: { "@type": "Answer", text: p.a },
  })),
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <BarraSecciones />
      <main>
        <Hero />
        <BandaEstadisticas />
        <Reveal><OpcionesCotizar /></Reveal>
        <Reveal><Servicios /></Reveal>
        <Reveal><MasProductos /></Reveal>
        <SeccionOnda colorArriba="#f9fafb" colorAbajo="#0F1730" />
        <Reveal><PaginasWeb /></Reveal>
        <SeccionOnda colorArriba="#0F1730" colorAbajo="#F6F8FC" invertir />
        <Reveal><Beneficios /></Reveal>
        <Reveal><EmpresasClientes /></Reveal>
        <Reveal><Testimonios /></Reveal>
        <Reveal><Galeria /></Reveal>
        <Reveal><Ubicacion /></Reveal>
        <Reveal><FAQ /></Reveal>
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
