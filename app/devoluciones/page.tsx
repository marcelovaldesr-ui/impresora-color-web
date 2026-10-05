import type { Metadata } from 'next'
import Link from 'next/link'
import PaginaLegal from '@/app/components/PaginaLegal'

export const metadata: Metadata = {
  title: 'Políticas de Devolución y Reposición | Impresora Color Ltda',
  description:
    'Cómo repone Impresora Color Ltda un pedido con fallas de fabricación, en qué casos no aplica la reposición y cómo se revisa cada caso.',
  alternates: { canonical: '/devoluciones' },
  robots: { index: true, follow: true },
}

function Acordeon({ titulo, abierto = false, children }: { titulo: string; abierto?: boolean; children: React.ReactNode }) {
  return (
    <details open={abierto} className="group border-b border-gray-200 py-4">
      <summary className="cursor-pointer list-none flex items-center gap-3 text-lg font-bold text-gray-900 group-open:text-[#E91E8F] hover:text-[#2D3E9F] transition-colors [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="text-xs transition-transform group-open:rotate-90">▶</span>
        {titulo}
      </summary>
      <div className="mt-3 pl-6 space-y-3 text-[15px] text-gray-600">{children}</div>
    </details>
  )
}

export default function DevolucionesPage() {
  return (
    <PaginaLegal titulo="Políticas de Devolución y Reposición" actualizado="5 de octubre de 2026">
      <div>
        <Acordeon titulo="¿Impresora Color responde?" abierto>
          <p>
            En Impresora Color nuestro compromiso es entregar productos gráficos de alta calidad y
            conformes a lo que cada cliente aprobó. Por eso contamos con la siguiente política de
            devolución y reposición.
          </p>
        </Acordeon>

        <Acordeon titulo="Garantía legal de 6 meses" abierto>
          <p>
            Todos nuestros productos tienen <strong>garantía legal de 6 meses</strong> desde que
            retiras tu pedido, conforme a los artículos 19, 20 y 21 de la Ley N° 19.496 sobre
            Protección de los Derechos de los Consumidores.
          </p>
          <p>
            Si el producto tiene una falla de fabricación, no sirve para el uso al que está destinado
            o no corresponde a lo que compraste, <strong>tú eliges</strong> entre:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Reparación</strong> sin costo (en nuestro caso, reimprimirlo).</li>
            <li><strong>Cambio</strong> por un producto de las mismas características.</li>
            <li><strong>Devolución</strong> del dinero pagado.</li>
          </ul>
        </Acordeon>

        <Acordeon titulo="Reposición por fallas de fabricación">
          <p>
            Si un producto (stickers, flyers, tarjetas u otros impresos) presenta fallas atribuibles a
            errores de impresión o fabricación, <strong>lo reponemos sin costo para el cliente</strong>,
            o aplicamos la alternativa de la garantía legal que prefieras.
          </p>
          <p>
            Antes de autorizar la reposición, nuestro equipo de calidad revisa el material entregado
            para confirmar que efectivamente existe una falla de producción.
          </p>
          <p className="font-medium text-gray-800">Ejemplos de fallas de fabricación:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Errores de impresión evidentes.</li>
            <li>Cortes incorrectos.</li>
            <li>Problemas graves de color, no acordes a la prueba aprobada.</li>
            <li>Defectos físicos del material.</li>
            <li>Cantidad incompleta.</li>
          </ul>
        </Acordeon>

        <Acordeon titulo="Casos en los que no aplica reposición">
          <p>No se realiza reposición ni devolución cuando:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>El producto está en buen estado y es conforme a lo aprobado previamente.</li>
            <li>
              El error proviene del archivo entregado por el cliente (ortografía, diseño, medidas,
              colores solicitados, etc.).
            </li>
            <li>
              El diseño fue aprobado por el cliente y luego se piden cambios posteriores a la
              producción.
            </li>
          </ul>
        </Acordeon>

        <Acordeon titulo="Procedimiento de revisión">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Puedes informar el problema dentro de los <strong>6 meses</strong> de garantía legal
              desde el retiro. Si nos avisas dentro de los primeros <strong>7 días corridos</strong>,
              lo revisamos con prioridad.
            </li>
            <li>Se solicitarán fotografías o la revisión física del producto.</li>
            <li>
              Nuestro equipo de calidad evalúa el caso y, si corresponde, aplicamos la alternativa que
              elijas: reimpresión, cambio o devolución del dinero.
            </li>
          </ul>
          <p>
            Para iniciar el reclamo escríbenos por{' '}
            <a href="https://wa.me/56998441157" target="_blank" rel="noopener noreferrer" className="text-[#E91E8F] hover:underline font-medium">
              WhatsApp
            </a>{' '}
            o a{' '}
            <a href="mailto:contacto@impresoracolor.cl" className="text-[#2D3E9F] hover:underline">
              contacto@impresoracolor.cl
            </a>{' '}
            con tu número de orden y una foto del problema.
          </p>
        </Acordeon>

        <Acordeon titulo="Consideraciones finales">
          <p>
            Impresora Color evalúa si un producto presenta una falla real de fabricación. Nuestro
            objetivo es siempre asegurar la satisfacción del cliente, manteniendo estándares claros y
            justos para ambas partes.
          </p>
          <p>
            Esta política no limita los derechos que la Ley N° 19.496 sobre Protección de los
            Derechos de los Consumidores te reconoce de forma irrenunciable, incluida la garantía
            legal descrita en nuestros{' '}
            <Link href="/terminos" className="text-[#2D3E9F] hover:underline font-medium">
              Términos y Condiciones
            </Link>
            .
          </p>
        </Acordeon>
      </div>
    </PaginaLegal>
  )
}
