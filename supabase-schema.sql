-- Schema para la tienda online de Impresora Color Ltda
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
--
-- Se puede correr sobre el MISMO proyecto Supabase de la app de gestión:
-- la tabla "pedidos" no choca con ninguna de las que ya existen allí
-- (clients, leads, jobs, work_orders, expenses, etc.).

CREATE TABLE IF NOT EXISTS pedidos (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- numero_orden identifica UNA línea del pedido (IC260804-1234-1)
  numero_orden          TEXT UNIQUE NOT NULL,
  -- grupo_orden agrupa todas las líneas que se pagaron juntas (IC260804-1234).
  -- Es también el commerceOrder que se le manda a Flow.
  grupo_orden           TEXT NOT NULL,

  estado                TEXT NOT NULL DEFAULT 'pendiente_pago'
                          CHECK (estado IN ('pendiente_pago','pagado','en_produccion','listo','entregado','cancelado')),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Datos del cliente
  cliente_nombre        TEXT NOT NULL,
  cliente_email         TEXT NOT NULL,
  cliente_telefono      TEXT NOT NULL,

  -- Producto
  producto_nombre       TEXT NOT NULL,
  producto_slug         TEXT NOT NULL,
  opciones              JSONB NOT NULL DEFAULT '{}',
  cantidad              INTEGER NOT NULL DEFAULT 1,

  -- Precios en CLP (enteros). Siempre calculados en el servidor.
  precio_neto           INTEGER NOT NULL,
  precio_iva            INTEGER NOT NULL,
  precio_total          INTEGER NOT NULL,

  -- Archivo de diseño (Vercel Blob)
  archivo_url           TEXT,
  archivo_nombre_original TEXT,

  -- Pago Flow.cl
  flow_token            TEXT,
  flow_orden            TEXT,
  pago_confirmado       BOOLEAN NOT NULL DEFAULT FALSE,
  pago_confirmado_at    TIMESTAMPTZ,

  -- Admin
  notas                 TEXT
);

-- Índices útiles para el panel admin y el flujo de pago
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at  ON pedidos (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado      ON pedidos (estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_flow_token  ON pedidos (flow_token);
CREATE INDEX IF NOT EXISTS idx_pedidos_grupo_orden ON pedidos (grupo_orden);

-- -------------------------------------------------------------------------
-- Seguridad: RLS activado y SIN políticas públicas.
-- La web se conecta con la SERVICE ROLE KEY, que ignora RLS, así que la tienda
-- sigue funcionando. Pero nadie con la anon key (la que usa la app de gestión
-- en el navegador) puede leer ni escribir los pedidos ni los datos de clientes.
-- -------------------------------------------------------------------------
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
