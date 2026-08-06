import type { Metadata } from 'next'
import Link from 'next/link'
import PaginaLegal, { Seccion, Destacado } from '@/app/components/PaginaLegal'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Impresora Color Ltda',
  description:
    'Términos y condiciones de compra de la tienda online de Impresora Color Ltda: plazos, retiro en tienda, garantía y derecho a retracto.',
  alternates: { canonical: '/terminos' },
  robots: { index: true, follow: true },
}

export default function TerminosPage() {
  return (
    <PaginaLegal titulo="Términos y Condiciones" actualizado="6 de agosto de 2026">
      <p>
        Estos términos regulan las compras realizadas en la tienda online de Impresora Color Ltda.
        Al completar una compra, declaras haberlos leído y aceptado.
      </p>

      <Seccion n={1} titulo="Quiénes somos">
        <p>
          <strong>Impresora Color Ltda</strong>, RUT 76.065.269-5, con domicilio comercial en
          Arauco 1060, Chillán, Región de Ñuble, Chile.
        </p>
        <p>
          Contacto: <a href="https://wa.me/56998441157" className="text-[#2D3E9F] hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp +56 9 9844 1157</a>
          {' '}· <a href="mailto:impresoracolor3@gmail.com" className="text-[#2D3E9F] hover:underline">impresoracolor3@gmail.com</a>
        </p>
      </Seccion>

      <Seccion n={2} titulo="Qué vendemos">
        <p>
          Vendemos productos de impresión <strong>confeccionados a pedido según el diseño que entrega
          cada cliente</strong>: tarjetas, flyers, stickers, pendones, lonas, credenciales y otros
          productos gráficos.
        </p>
        <p>
          Al tratarse de productos personalizados, cada pedido se fabrica exclusivamente para ti y no
          puede ser reutilizado ni revendido a otra persona. Esto es relevante para los puntos 7 y 8.
        </p>
      </Seccion>

      <Seccion n={3} titulo="Precios y pago">
        <p>
          Todos los precios se expresan en pesos chilenos (CLP) e <strong>incluyen IVA</strong>. El
          precio válido es el que aparece en pantalla al momento de completar la compra.
        </p>
        <p>
          Los pagos se procesan a través de <strong>Flow.cl</strong>, que admite tarjetas de crédito,
          débito y transferencia. No almacenamos ni tenemos acceso a los datos de tu tarjeta.
        </p>
        <p>Por cada compra emitimos la boleta electrónica correspondiente.</p>
      </Seccion>

      <Seccion n={4} titulo="Cómo se concreta el pedido">
        <p>
          El pedido queda confirmado únicamente cuando Flow.cl nos informa que el pago fue aprobado.
          En ese momento recibirás un correo de confirmación con tu número de orden y el detalle de lo
          comprado.
        </p>
        <p>
          Si no recibes ese correo dentro de una hora, escríbenos por WhatsApp indicando tu número de
          orden antes de volver a pagar.
        </p>
      </Seccion>

      <Seccion n={5} titulo="Tu archivo de diseño">
        <p>
          Imprimimos <strong>exactamente el archivo que nos entregas</strong>. No modificamos
          contenidos, textos ni colores por cuenta propia.
        </p>
        <p>Al subir un archivo declaras que:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Revisaste ortografía, datos de contacto, precios y cualquier otro texto.</li>
          <li>
            Tienes los derechos para usar y reproducir las imágenes, logos, tipografías y demás
            contenidos incluidos.
          </li>
          <li>El contenido no infringe derechos de terceros ni la legislación vigente.</li>
        </ul>
        <Destacado>
          La revisión automática de archivos de nuestra tienda es una <strong>ayuda orientativa</strong>,
          no una aprobación. Que un archivo pase la revisión no garantiza un resultado perfecto, y la
          responsabilidad final sobre el contenido es siempre del cliente.
        </Destacado>
        <p>
          Nos reservamos el derecho de no imprimir material con contenido ilegal, discriminatorio o
          que vulnere derechos de terceros. En ese caso devolvemos el 100% de lo pagado.
        </p>
      </Seccion>

      <Seccion n={6} titulo="Plazos de producción">
        <p>
          Cada producto indica su plazo estimado, que va de <strong>1 a 3 días hábiles</strong>. Ese
          plazo empieza a correr desde que se confirma el pago y recibimos el archivo conforme, no
          desde el momento de la compra.
        </p>
        <p>
          Son días hábiles: de lunes a viernes, sin contar festivos. Los plazos son estimados y
          pueden extenderse en temporadas de alta demanda o ante fallas de equipos; si eso ocurre, te
          avisamos.
        </p>
      </Seccion>

      <Seccion n={7} titulo="Entrega: solo retiro en tienda">
        <Destacado>
          Por ahora <strong>no realizamos despachos</strong>. Todos los pedidos de la tienda online se
          retiran presencialmente en <strong>Arauco 1060, Chillán</strong>, de{' '}
          <strong>lunes a viernes de 9:00 a 18:00 horas</strong>, en horario continuado.
        </Destacado>
        <p>
          Te avisaremos cuando tu pedido esté listo. Para retirarlo basta con indicar tu número de
          orden.
        </p>
        <p>
          <strong>Custodia:</strong> guardamos los pedidos terminados durante <strong>30 días
          corridos</strong> desde que te avisamos que están listos. Pasado ese plazo, y dado que se
          trata de productos personalizados que no pueden destinarse a otro cliente, podremos
          eliminarlos sin derecho a devolución del dinero.
        </p>
      </Seccion>

      <Seccion n={8} titulo="Derecho a retracto">
        <Destacado>
          De acuerdo con el artículo 3 bis, letra b), de la Ley N° 19.496 sobre Protección de los
          Derechos de los Consumidores, <strong>Impresora Color Ltda dispone expresamente que no
          aplica el derecho a retracto</strong> en las compras de esta tienda online.
        </Destacado>
        <p>
          El motivo es que todos nuestros productos se confeccionan a medida, según el diseño y las
          especificaciones de cada cliente, por lo que no pueden reintegrarse a stock ni venderse a
          otra persona.
        </p>
        <p>
          Esta exclusión se informa aquí, de forma previa a la compra, y no afecta tus derechos en
          caso de que el producto llegue defectuoso o no corresponda a lo comprado, que se rigen por
          el punto 9.
        </p>
      </Seccion>

      <Seccion n={9} titulo="Garantía por trabajos defectuosos">
        <p>
          Si el trabajo presenta un defecto <strong>imputable a nosotros</strong> —error de
          impresión, mal corte, color notoriamente distinto al archivo entregado, material dañado o
          cantidad incompleta— <strong>lo reimprimimos sin costo</strong>.
        </p>
        <p>
          Para hacerlo válido, avísanos dentro de los <strong>7 días corridos</strong> siguientes al
          retiro, con tu número de orden y una foto del problema. Es posible que te pidamos devolver
          el material observado.
        </p>
        <p className="font-medium text-gray-800">La garantía no cubre:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Errores presentes en el archivo entregado por el cliente (textos, datos, ortografía).</li>
          <li>Baja resolución o mala calidad del archivo original.</li>
          <li>
            Variaciones normales de color entre lo que se ve en una pantalla y el resultado impreso.
            Ninguna pantalla reproduce con exactitud los colores de impresión.
          </li>
          <li>Diferencias menores de corte dentro de las tolerancias propias de la industria gráfica.</li>
          <li>Daños ocurridos después del retiro del pedido.</li>
        </ul>
      </Seccion>

      <Seccion n={10} titulo="Cancelación de un pedido">
        <p>
          Puedes solicitar la cancelación por WhatsApp <strong>siempre que el pedido no haya entrado
          en producción</strong>. En ese caso devolvemos el total pagado por el mismo medio de pago.
        </p>
        <p>
          Una vez iniciada la producción no es posible cancelar, porque el material ya fue impreso con
          tu diseño.
        </p>
      </Seccion>

      <Seccion n={11} titulo="Tus datos personales">
        <p>
          El tratamiento de tus datos se rige por nuestra{' '}
          <Link href="/privacidad" className="text-[#2D3E9F] hover:underline font-medium">
            Política de Privacidad
          </Link>
          .
        </p>
      </Seccion>

      <Seccion n={12} titulo="Legislación aplicable">
        <p>
          Estas condiciones se rigen por la legislación chilena, en especial la Ley N° 19.496 sobre
          Protección de los Derechos de los Consumidores. Ante cualquier problema, escríbenos primero
          a nosotros: resolvemos la gran mayoría de los casos directamente y sin trámites.
        </p>
        <p>
          Podemos actualizar estos términos en cualquier momento. La versión aplicable a tu compra es
          la publicada en esta página al momento de realizarla.
        </p>
      </Seccion>
    </PaginaLegal>
  )
}
