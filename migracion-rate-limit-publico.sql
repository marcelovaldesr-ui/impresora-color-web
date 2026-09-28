-- Tabla para el rate limiting de los endpoints públicos de la tienda
-- (/api/cotizar, /api/upload, /api/pedidos, /api/pago/iniciar).
-- Ver lib/publicRateLimit.ts para el detalle de por qué existe y cómo se usa.
--
-- Marcelo: correr esto una vez en el SQL Editor de Supabase, igual que
-- migracion-admin-login-intentos.sql. Mientras no se corra, el rate
-- limiting simplemente no bloquea nada (falla abierto) — no rompe la
-- tienda, solo no protege todavía.

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
