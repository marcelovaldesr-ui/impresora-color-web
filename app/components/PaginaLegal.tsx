import Link from 'next/link'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PaginaLegal({
  titulo,
  actualizado,
  children,
}: {
  titulo: string
  actualizado: string
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-[#FAFBFF] min-h-screen">
        <article className="max-w-3xl mx-auto px-5">
          <Link href="/" className="text-sm text-gray-400 hover:text-[#2D3E9F] transition-colors">
            ← Volver al inicio
          </Link>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-4 mb-2 leading-tight">
            {titulo}
          </h1>
          <p className="text-sm text-gray-400 mb-10">Última actualización: {actualizado}</p>

          <div className="legal space-y-7 text-[15px] leading-relaxed text-gray-700">{children}</div>

          <div className="mt-14 pt-8 border-t border-gray-200 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/terminos" className="text-[#2D3E9F] hover:underline font-medium">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="text-[#2D3E9F] hover:underline font-medium">
              Política de Privacidad
            </Link>
            <a
              href="https://wa.me/56998441157"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E91E8F] hover:underline font-medium"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

export function Seccion({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-black text-gray-900 mb-3 flex gap-2.5">
        <span className="text-[#E91E8F] shrink-0">{n}.</span>
        <span>{titulo}</span>
      </h2>
      <div className="space-y-3 pl-0 sm:pl-7">{children}</div>
    </section>
  )
}

export function Destacado({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-[#E91E8F] bg-[#FDF4F9] rounded-r-xl px-4 py-3 text-[15px] text-gray-800">
      {children}
    </div>
  )
}
