import Image from "next/image";

type Cliente = {
  nombre: string;
  logoUrl?: string;
  logoAlt?: string;
  esExterno?: boolean;
};

const CLIENTES: Cliente[] = [
  {
    nombre: "Nevados de Chillán",
    logoUrl: "/logos/nevadoschillan.png",
    logoAlt: "Logo Nevados de Chillán",
  },
  {
    nombre: "Curimapu",
    logoUrl: "/logos/curimapu.png",
    logoAlt: "Logo Curimapu",
  },
  {
    nombre: "Rodafreno",
    logoUrl: "/logos/rodafreno.png",
    logoAlt: "Logo Rodafreno",
  },
  {
    nombre: "Cecinas Chillán",
    logoUrl: "/logos/cecinas-chillan.png",
    logoAlt: "Logo Cecinas Chillán",
  },
  {
    nombre: "Lácteos San Sebastián",
    logoUrl: "/logos/lacteosebastian.jpg",
    logoAlt: "Logo Lácteos San Sebastián",
  },
  {
    nombre: "Fruticola Olmué",
    logoUrl: "/logos/olmue.jpg",
    logoAlt: "Logo Fruticola Olmué",
  },
  {
    nombre: "Clínica Andes Salud",
    logoUrl: "https://www.andessalud.cl/wp-content/uploads/2024/07/cropped-cropped-logotipo-andessalud-270x270.png",
    logoAlt: "Logo Clínica Andes Salud",
    esExterno: true,
  },
  { nombre: "Abarrotes San Carlos" },
];

function TextCard({ nombre }: { nombre: string }) {
  const primera = nombre.charAt(0);
  const resto = nombre.slice(1);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center px-6 py-8 h-28 hover:shadow-md hover:border-[#E91E8F]/20 transition-all duration-200">
      <p className="text-xl font-black text-center leading-tight">
        <span className="text-[#E91E8F]">{primera}</span>
        <span className="text-[#2D3E9F]">{resto}</span>
      </p>
    </div>
  );
}

function LogoCard({
  logoUrl,
  logoAlt,
  nombre,
  esExterno,
}: {
  logoUrl: string;
  logoAlt: string;
  nombre: string;
  esExterno?: boolean;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center px-6 py-8 h-28 hover:shadow-md hover:border-[#47B7E8]/20 transition-all duration-200">
      <div className="relative w-full h-12">
        <Image
          src={logoUrl}
          alt={logoAlt}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 16vw"
          unoptimized={esExterno}
        />
      </div>
      <span className="sr-only">{nombre}</span>
    </div>
  );
}

export default function EmpresasClientes() {
  return (
    <section className="bg-[#f8f8f8] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#47B7E8] font-bold text-sm uppercase tracking-widest">
            Clientes
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D3E9F] mt-2 mb-3">
            Empresas que{" "}
            <span className="text-[#E91E8F]">confían en nosotros</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Más de 35 años trabajando con empresas, instituciones y negocios de la región
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CLIENTES.map((c) =>
            c.logoUrl ? (
              <LogoCard
                key={c.nombre}
                logoUrl={c.logoUrl}
                logoAlt={c.logoAlt!}
                nombre={c.nombre}
                esExterno={c.esExterno}
              />
            ) : (
              <TextCard key={c.nombre} nombre={c.nombre} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
