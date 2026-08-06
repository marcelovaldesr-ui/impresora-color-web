import type { Metadata } from 'next'
import Link from 'next/link'
import PaginaLegal, { Seccion, Destacado } from '@/app/components/PaginaLegal'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Impresora Color Ltda',
  description:
    'Cómo Impresora Color Ltda recopila, usa y protege los datos personales y los archivos de diseño de sus clientes.',
  alternates: { canonical: '/privacidad' },
  robots: { index: true, follow: true },
}

export default function PrivacidadPage() {
  return (
    <PaginaLegal titulo="Política de Privacidad" actualizado="6 de agosto de 2026">
      <p>
        En Impresora Color Ltda pedimos solo los datos necesarios para producir y entregar tu pedido.
        Acá te explicamos cuáles son, para qué los usamos y qué puedes exigirnos.
      </p>

      <Seccion n={1} titulo="Quién trata tus datos">
        <p>
          <strong>Impresora Color Ltda</strong>, RUT 76.065.269-5, Arauco 1060, Chillán, Región de
          Ñuble, Chile. Contacto para temas de privacidad:{' '}
          <a href="mailto:impresoracolor3@gmail.com" className="text-[#2D3E9F] hover:underline">
            impresoracolor3@gmail.com
          </a>
          .
        </p>
      </Seccion>

      <Seccion n={2} titulo="Qué datos recopilamos">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>De contacto:</strong> nombre, correo electrónico y teléfono.</li>
          <li><strong>Del pedido:</strong> productos, opciones elegidas, montos y estado.</li>
          <li><strong>Archivos de diseño</strong> que subes para imprimir.</li>
          <li>
            <strong>De navegación:</strong> datos técnicos y de uso del sitio, a través de cookies y
            herramientas de analítica.
          </li>
        </ul>
        <Destacado>
          <strong>No recibimos ni almacenamos los datos de tu tarjeta.</strong> El pago se procesa
          íntegramente en Flow.cl; nosotros solo recibimos la confirmación de que fue aprobado.
        </Destacado>
      </Seccion>

      <Seccion n={3} titulo="Para qué los usamos">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Producir tu pedido y avisarte cuando esté listo para retiro.</li>
          <li>Enviarte la confirmación de compra y la boleta.</li>
          <li>Responder tus consultas y resolver problemas con un trabajo.</li>
          <li>Cumplir obligaciones legales y tributarias.</li>
        </ul>
        <p>
          <strong>No vendemos ni cedemos tus datos a terceros</strong>, y no te enviamos publicidad
          por correo salvo que lo pidas expresamente.
        </p>
      </Seccion>

      <Seccion n={4} titulo="Con quién los compartimos">
        <p>Solo con los servicios necesarios para que la tienda funcione:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Flow.cl</strong> — procesamiento de pagos.</li>
          <li><strong>Vercel</strong> — alojamiento del sitio y de los archivos de diseño.</li>
          <li><strong>Supabase</strong> — base de datos donde se registran los pedidos.</li>
          <li><strong>Resend</strong> — envío de los correos de confirmación.</li>
          <li><strong>Google</strong> — analítica y medición de nuestra publicidad.</li>
        </ul>
        <p>
          Cada uno accede únicamente a lo que necesita para prestar su servicio. También podríamos
          entregar información si una autoridad competente nos lo exige por ley.
        </p>
      </Seccion>

      <Seccion n={5} titulo="Tus archivos de diseño">
        <p>
          Los archivos que subes se guardan en un almacenamiento con direcciones largas y aleatorias,
          imposibles de adivinar, y se usan exclusivamente para producir tu pedido.
        </p>
        <p>
          Los conservamos por un tiempo razonable para poder reimprimir si hay algún problema o si
          repites el mismo trabajo. <strong>Si quieres que eliminemos tu archivo antes, escríbenos y
          lo hacemos.</strong>
        </p>
      </Seccion>

      <Seccion n={6} titulo="Cuánto tiempo los guardamos">
        <p>
          Los datos de tus pedidos se conservan mientras sean necesarios para la relación comercial y
          para cumplir los plazos legales y tributarios que nos obligan como empresa. Después se
          eliminan o se anonimizan.
        </p>
      </Seccion>

      <Seccion n={7} titulo="Tus derechos">
        <p>
          Conforme a la Ley N° 19.628 sobre Protección de la Vida Privada, en cualquier momento puedes
          pedirnos:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Acceder</strong> a los datos que tenemos sobre ti.</li>
          <li><strong>Corregir</strong> los que estén equivocados o desactualizados.</li>
          <li><strong>Eliminar</strong> tus datos, cuando no exista una obligación legal de conservarlos.</li>
          <li><strong>Oponerte</strong> a determinados usos.</li>
        </ul>
        <p>
          Basta con escribirnos a{' '}
          <a href="mailto:impresoracolor3@gmail.com" className="text-[#2D3E9F] hover:underline">
            impresoracolor3@gmail.com
          </a>{' '}
          o por{' '}
          <a href="https://wa.me/56998441157" className="text-[#2D3E9F] hover:underline" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          . Respondemos dentro de los plazos que exige la ley.
        </p>
      </Seccion>

      <Seccion n={8} titulo="Cookies">
        <p>
          Usamos cookies propias para que funcionen el carrito y la sesión, y cookies de Google para
          medir el rendimiento del sitio y de nuestra publicidad. Puedes bloquearlas desde la
          configuración de tu navegador; ten en cuenta que si lo haces, el carrito de compras puede
          dejar de funcionar correctamente.
        </p>
      </Seccion>

      <Seccion n={9} titulo="Cambios a esta política">
        <p>
          Si actualizamos esta política, publicaremos la nueva versión en esta misma página con su
          fecha de actualización. Consulta también nuestros{' '}
          <Link href="/terminos" className="text-[#2D3E9F] hover:underline font-medium">
            Términos y Condiciones
          </Link>
          .
        </p>
      </Seccion>
    </PaginaLegal>
  )
}
