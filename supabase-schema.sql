-- Schema para la tienda online de Impresora Color Ltda
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query

CREATE TABLE IF NOT EXISTS pedidos (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_orden          TEXT UNIQUE NOT NULL,
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

  -- Precios en CLP (enteros)
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

-- Índices útiles para el panel admin
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON pedidos (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado     ON pedidos (estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_flow_token ON pedidos (flow_token);
