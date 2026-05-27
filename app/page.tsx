import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BandaEstadisticas from "./components/BandaEstadisticas";
import Servicios from "./components/Servicios";
import MasProductos from "./components/MasProductos";
import Etiquetas from "./components/Etiquetas";
import Beneficios from "./components/Beneficios";
import Testimonios from "./components/Testimonios";
import EmpresasClientes from "./components/EmpresasClientes";
import Galeria from "./components/Galeria";
import Promociones from "./components/Promociones";
import Ubicacion from "./components/Ubicacion";
import FAQ from "./components/FAQ";
import FormularioCotizacion from "./components/FormularioCotizacion";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BandaEstadisticas />
        <Servicios />
        <MasProductos />
        <Etiquetas />
        <Beneficios />
        <Testimonios />
        <EmpresasClientes />
        <Galeria />
        <Promociones />
        <Ubicacion />
        <FAQ />
        <FormularioCotizacion />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
