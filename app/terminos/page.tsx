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
          {' '}· <a href="mailto:contacto@impresoracolor.cl" className="text-[#2D3E9F] hover:underline">contacto@impresoracolor.cl</a>
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
          <strong>Custodia:</strong> guardamos los pedidos terminados durante un plazo de{' '}
          <strong>60 días corridos</strong> desde el primer aviso de disponibilidad para retiro.
          Durante este período realizaremos al menos dos recordatorios por correo electrónico o
          WhatsApp al número de contacto registrado. Vencido dicho plazo sin que el pedido haya sido
          retirado ni se haya coordinado una prórroga fundada, y tratándose de productos personalizados
          que no pueden reutilizarse ni comercializarse a terceros, se entenderá que el cliente
          abandona el material, pudiendo Impresora Color disponer su reciclaje o destrucción sin
          derecho a reembolso de los costos incurridos de fabricación.
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

      <Seccion n={9} titulo="Garantía legal y atención rápida ante defectos">
        <Destacado>
          Tienes <strong>derecho a garantía legal</strong> conforme a los artículos 19, 20 y 21 de la
          Ley N° 19.496 sobre Protección de los Derechos de los Consumidores (modificada por la Ley
          N° 21.398, vigente desde marzo de 2022). Si tu pedido presenta un defecto de fabricación, no
          es apto para el uso al que está destinado, o no corresponde a lo que compraste, tienes{' '}
          <strong>6 meses desde que retiras el pedido</strong> para elegir, a tu criterio, entre:
        </Destacado>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Reparación</strong> gratuita (en nuestro caso, reimpresión).</li>
          <li><strong>Cambio</strong> por un producto de las mismas características.</li>
          <li><strong>Devolución</strong> del dinero pagado.</li>
        </ul>
        <p>
          La elección es tuya, no nuestra: no podemos imponerte una alternativa distinta a la que
          prefieras de estas tres. Para ejercerla basta que nos escribas por WhatsApp o email con tu
          número de orden y una descripción o foto del problema; podemos pedirte el producto
          observado para evaluarlo.
        </p>
        <p>
          Además de la garantía legal, si nos informas dentro de los <strong>7 días corridos</strong>{' '}
          siguientes al retiro sobre un posible defecto imputable a Impresora Color, priorizaremos su
          revisión y, cuando corresponda, la reimpresión sin costo. Esta política de atención rápida
          es <strong>adicional y no limita ni reemplaza</strong> los derechos que otorga la garantía
          legal: pasado ese plazo rápido, tus 6 meses de garantía legal siguen disponibles igual.
        </p>
        <p className="font-medium text-gray-800">
          Esto cubre defectos imputables a nosotros: error de impresión, mal corte, color
          notoriamente distinto al archivo entregado, material dañado o cantidad incompleta. No
          cubre resultados derivados del archivo que tú mismo entregaste y aprobaste, entre ellos:
        </p>
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
        <p>
          Nada de esto limita los derechos que la ley te reconoce de forma irrenunciable como
          consumidor.
        </p>
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
