-- Migración: rate limiting del login admin (BLOQUE 2 de la corrección pre-lanzamiento)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- Es aparte de supabase-schema.sql porque supabase-schema.sql documenta el
-- esquema original; esta tabla es nueva y se agrega sola para no reemezclar
-- ambos archivos.
--
-- Para qué sirve: registrar los intentos de login del panel admin (por IP)
-- para poder bloquear temporalmente tras varios fallos seguidos. No guarda
-- contraseñas ni nada de clientes — nada que ver con la tabla "pedidos".

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
