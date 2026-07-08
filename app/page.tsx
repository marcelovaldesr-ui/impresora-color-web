import Navbar from "./components/Navbar";
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
import Promociones from "./components/Promociones";
import Ubicacion from "./components/Ubicacion";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
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
      <Navbar />
      <main>
        <Hero />
        <BandaEstadisticas />
        <OpcionesCotizar />
        <Servicios />
        <MasProductos />
        <PaginasWeb />
        <Beneficios />
        <EmpresasClientes />
        <Testimonios />
        <Galeria />
        <Promociones />
        <Ubicacion />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
