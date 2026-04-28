import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import Etiquetas from "./components/Etiquetas";
import Beneficios from "./components/Beneficios";
import Galeria from "./components/Galeria";
import Promociones from "./components/Promociones";
import Ubicacion from "./components/Ubicacion";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Etiquetas />
        <Beneficios />
        <Galeria />
        <Promociones />
        <Ubicacion />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
