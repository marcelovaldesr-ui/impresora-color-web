import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { CarritoProvider } from '@/lib/carrito'
import CarritoIcono from './CarritoIcono'
import Footer from '@/app/components/Footer'
import WhatsAppFloat from '@/app/components/WhatsAppFloat'
import { TIENDA_EN_CONSTRUCCION as EN_CONSTRUCCION } from '@/lib/config'
import { TIENDA_PREVIEW_COOKIE, buildTiendaPreviewToken } from '@/lib/tiendaPreview'

function ProximamenteScreen() {
  return (
    <main className="flex-1 pt-16 flex items-center justify-center min-h-screen bg-[#FAFBFF]">
      <div className="max-w-md mx-auto px-6 text-center py-20">
        <div className="w-16 h-16 bg-[#2D3E9F]/8 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#2D3E9F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#E91E8F] mb-3">
          Tienda online
        </p>
        <h1 className="text-3xl font-black text-[#111827] mb-4 leading-tight">
          Estamos preparando<br />el catálogo
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8">
          Nuestra tienda online estará disponible muy pronto. Mientras tanto, puedes cotizar directamente por WhatsApp o por email.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/56998441157?text=Hola%2C%20quiero%20cotizar%20un%20trabajo%20de%20imprenta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#E91E8F] hover:bg-[#c8186e] text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg shadow-[#E91E8F]/25 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Cotizar por WhatsApp
          </a>
          <Link
            href="/#cotizar"
            className="inline-flex items-center justify-center gap-2 border border-[#2D3E9F]/25 text-[#2D3E9F] hover:bg-[#2D3E9F]/6 font-medium text-sm px-6 py-3 rounded-full transition-colors"
          >
            Formulario de cotización
          </Link>
        </div>
        <Link href="/" className="block mt-8 text-xs text-gray-400 hover:text-[#2D3E9F] transition-colors">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies()
  const tienePreview = jar.get(TIENDA_PREVIEW_COOKIE)?.value === buildTiendaPreviewToken()
  const mostrarProximamente = EN_CONSTRUCCION && !tienePreview

  return (
    <CarritoProvider>
      <div className="min-h-screen flex flex-col">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 select-none">
              <Image
                src="/brand/logo-impresora-color.jpg.jpeg"
                alt="Impresora Color Ltda"
                width={36}
                height={36}
                className="rounded-md object-cover shrink-0"
              />
              <span className="font-black text-lg tracking-tight text-[#2D3E9F]">Impresora</span>
              <span className="font-black text-lg text-[#E91E8F] tracking-tight -ml-1.5">Color</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/tienda"
                className="text-sm font-semibold text-[#2D3E9F] hover:text-[#E91E8F] transition-colors"
              >
                Catálogo
              </Link>
              <Link
                href="/#cotizar"
                className="hidden sm:block text-sm font-medium text-gray-600 hover:text-[#E91E8F] transition-colors"
              >
                Cotizar
              </Link>
              <CarritoIcono />
            </div>
          </div>
        </nav>

        {mostrarProximamente ? <ProximamenteScreen /> : <main className="flex-1 pt-16">{children}</main>}

        <Footer />
      </div>
      <WhatsAppFloat />
    </CarritoProvider>
  )
}
