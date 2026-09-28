-- =====================================================================
-- LANZAMIENTO TIENDA — correr UNA vez en Supabase (27-sep-2026)
-- Supabase → proyecto "Gestion Impresora Color" → SQL Editor → New query
-- Pegar TODO este archivo y apretar Run. Se puede correr dos veces sin daño.
--
-- Hace 3 cosas:
--   1) Crea la tabla del límite de intentos del login admin.
--   2) Crea la tabla del límite de solicitudes de la tienda.
--   3) Borra los pedidos de prueba de agosto y muestra los que quedan.
-- =====================================================================

CREATE TABLE IF NOT EXISTS admin_login_intentos (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ip         TEXT NOT NULL,
  ok         BOOLEAN NOT NULL,
  creado_en  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para la consulta "últimos N fallos de esta IP en los últimos M minutos"
CREATE INDEX IF NOT EXISTS idx_admin_login_intentos_ip_creado
  ON admin_login_intentos (ip, ok, creado_en DESC);

-- Mismo patrón de seguridad que "pedidos": RLS activado y SIN políticas.
-- Solo la service role key (la que usa el servidor de la web) puede leer o
-- escribir esta tabla.
ALTER TABLE admin_login_intentos ENABLE ROW LEVEL SECURITY;

create table if not exists rate_limit_publico (
  id bigserial primary key,
  ip text not null,
  ruta text not null,
  creado_en timestamptz not null default now()
);

create index if not exists rate_limit_publico_ip_ruta_creado_en_idx
  on rate_limit_publico (ip, ruta, creado_en desc);

-- Mismo patrón que el resto de las tablas: RLS activado y sin políticas,
-- así que solo el service_role (el backend, con SUPABASE_SERVICE_KEY)
-- puede leer o escribir. Nadie puede consultar o alterar esto desde el
-- navegador.
alter table rate_limit_publico enable row level security;

-- 3) Pedidos de prueba del 6-ago-2026 (compras hechas por nosotros para probar Flow)
DELETE FROM pedidos
WHERE grupo_orden IN ('IC260806-6639', 'IC260806-2856', 'IC260806-4305');

-- Lo que queda en la tabla: revisar que no haya otra prueba.
SELECT numero_orden, grupo_orden, created_at, estado, precio_total
FROM pedidos
ORDER BY created_at DESC;
