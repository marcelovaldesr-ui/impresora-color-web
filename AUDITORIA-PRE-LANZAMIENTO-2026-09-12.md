# Auditoría pre-lanzamiento — Tienda online Impresora Color Ltda

**Fecha:** 12 de septiembre de 2026
**Alcance:** repo `impresora-color-web` completo — landing, tienda, checkout, Flow.cl, Supabase, panel admin, `/terminos`, `/privacidad`, SEO y analítica.
**Método:** lectura completa del código fuente real (no until supuestos), verificación contra documentación oficial vigente de Flow.cl, CVEs publicadas de Next.js/React, y normativa chilena actual (SERNAC, Ley 19.496, Ley 21.719) vía búsqueda web con fuentes citadas. No se ejecutaron pruebas E2E en vivo ni Lighthouse esta sesión (el puente a tu computador se cayó por la actualización de Windows del 8-sep-2026 a mitad de la auditoría); donde eso importa lo digo explícitamente en vez de fingir que lo probé.

---

## Resumen ejecutivo

La base técnica de la tienda está bien construida — mejor de lo que esperaba encontrar en varios puntos críticos (el manejo de Flow.cl en particular está hecho correctamente). No encontré ninguna forma de que un cliente pague menos de lo debido, ni de que el retorno del navegador falsifique un pago. Los problemas reales no están en "¿funciona la compra?" sino en tres frentes: (1) la boleta electrónica no existe pero el sitio promete que sí, (2) hay contenido comercial (testimonios, logos de clientes) que necesito que confirmes es real y autorizado antes de exponerlo a tráfico pagado, y (3) faltan capas de seguridad básicas (headers, rate limiting, una versión de Next.js con CVEs conocidas) que cuestan poco arreglar y no tocan nada de lo que ya funciona.

Conclusión corta: **NO-GO todavía**, pero por motivos acotados y resolubles en días, no semanas. El detalle completo y el plan están abajo.

---

## Fase 1-2 — Cómo funciona el sistema hoy (verificado en código, no asumido)

Flujo real: `/tienda` (catálogo estático desde `lib/productos.ts`) → `/tienda/[slug]` (`ProductoClient.tsx`, elige opciones, sube archivo a `/api/upload` → Vercel Blob público con sufijo aleatorio) → `/carrito` (localStorage, recalcula precio contra el catálogo vigente) → `/pago` (crea el pedido en `POST /api/pedidos`, que recalcula el precio en el servidor con `precioServidor()` e ignora cualquier precio que mande el navegador) → `POST /api/pago/iniciar` (crea la transacción en Flow.cl con el monto ya guardado en Supabase) → Flow.cl → dos caminos que **no dependen uno del otro**:
- **Webhook real** `POST /api/pago/confirmar`: Flow llama a este endpoint, el código *no confía en el body* — vuelve a preguntarle a Flow (`payment/getStatus`) el estado real del token, y solo ahí marca `pago_confirmado = true`, actualiza `estado` y dispara los correos (Resend).
- **Retorno del navegador** `GET/POST /api/pago/retorno`: solo lee el estado para decidir qué mostrarle al cliente en `/confirmacion`. **No escribe nada en la base de datos.** Esto es exactamente lo que pedías verificar en la Fase 3 y está bien implementado.

Pedido → panel `/admin/pedidos` (protegido por cookie) → estados `pendiente_pago → pagado → en_produccion → listo → entregado` (más `cancelado`), con un badge derivado "Falta archivo" en vez de un estado nuevo — es una solución razonable que no tocaría.

Confirmé esto leyendo el código línea por línea, no por lo que dice un comentario. Los comentarios del código, dicho sea de paso, son inusualmente honestos y explican el "por qué" de cada decisión — quien escribió esto (con ayuda de Claude, por los patrones) dejó buena trazabilidad.

---

## Hallazgos — clasificados P0 a P3

### P0 — BLOQUEAN EL LANZAMIENTO

#### P0-1. No se emite boleta electrónica, pero el sitio promete que sí
**Qué ocurre:** el checkout, la ficha de producto, el carrito y los Términos dicen "Boleta electrónica" / "emitimos la boleta electrónica correspondiente" (`ProductoClient.tsx:464`, `carrito/page.tsx:128`, `terminos/page.tsx:53`). El código no emite ningún DTE — no hay integración con el SII ni con un facilitador de boletas. El único rastro es una línea en el correo interno: *"Recuerda emitir la boleta electrónica de este pedido"* (`api/pago/confirmar/route.ts:263`), es decir, hoy depende de que alguien la emita a mano fuera del sistema.
**Por qué importa:** esto no es solo un tema de marketing. Vender y no boletar es un incumplimiento tributario directo ante el SII, independiente de lo que digan los Términos. Y si además el sitio *afirma* que boletea y no lo hace, es una segunda capa de riesgo (publicidad de una característica inexistente).
**Riesgo:** alto — tributario (SII) y de confianza del cliente (pedir la boleta y no poder mostrarla).
**Solución propuesta:** antes de reabrir públicamente, necesito que me confirmes el estado real: ¿la boleta se está emitiendo a mano desde el correo interno como hoy sugiere el flujo, o sigue sin resolverse como decía la nota de agosto? Si sigue sin resolverse, no toques el copy todavía — resolver la emisión real (aunque sea manual pero sistemática, o vía un emisor gratuito del SII) es lo único que cierra esto de verdad. Cambiar solo el texto sin resolver el fondo sería maquillar un problema legal.
**Impacto de modificarlo:** ninguno sobre el código de la tienda — es un proceso operativo/administrativo, no un cambio de software.

#### P0-2. Testimonios y logos de clientes que no puedo verificar — necesito tu confirmación
**Qué ocurre:** `Testimonios.tsx` muestra 4 reseñas de 5 estrellas con nombres y negocios específicos (María José Sepúlveda, Carlos Muñoz - Restaurante El Rincón, Valentina Torres - Boutique Valentina, Roberto Cisternas - Constructora RC). `EmpresasClientes.tsx` muestra 13 logos como "empresas que confían en nosotros", incluyendo **Carabineros de Chile, Municipalidad de Chillán, Hospital Clínico y Seremi de Salud**.
**Por qué importa:** no tengo forma de verificar desde el código si estos testimonios son reales y si tienes autorización de esas personas/empresas para publicarlos, ni si esas instituciones públicas efectivamente son clientes actuales y autorizaron el uso de su logo. Un testimonio inventado es publicidad engañosa (tema SERNAC). Usar el logo de Carabineros o de una municipalidad sin autorización vigente es un riesgo mayor que un cliente privado cualquiera — son símbolos institucionales con reglas propias de uso.
**Riesgo:** alto si alguno no es real o no está autorizado; nulo si todos lo son.
**Solución propuesta:** no voy a asumir nada en ninguna dirección. Confírmame, trabajo por trabajo: (1) los 4 testimonios son de clientes reales que aceptaron ser citados con nombre — si es así, perfecto, se queda; (2) cada logo institucional corresponde a un trabajo real y vigente, y para los cuatro logos públicos (Carabineros, Municipalidad, Hospital Clínico, Seremi de Salud) tienes claridad de que no hay una restricción de uso de su imagen institucional en publicidad comercial.
**Impacto de modificarlo:** si algo no se puede confirmar, se retira esa tarjeta/logo — cambio de una línea, cero riesgo técnico.

#### P0-3. Panel de administración sin límite de intentos y con "sesión" que nunca expira de verdad
**Qué ocurre:** en `api/admin/login/route.ts` y `api/admin/pedidos/route.ts`, la cookie de sesión (`admin_ic`) es el **hash SHA-256 fijo de tu contraseña + un salt** — no un token aleatorio de sesión. Es decir: mientras no cambies `ADMIN_PASSWORD` o `ADMIN_SECRET`, ese valor de cookie es válido para siempre, sin importar cuántas veces "cierres sesión". Además, no hay ningún límite de intentos en el login: se puede probar contraseñas sin parar, sin bloqueo ni captcha ni demora.
**Por qué importa:** ese panel muestra nombre, email, teléfono y el archivo de diseño de cada cliente. Si alguien adivina o filtra la contraseña (fuerza bruta sin freno, o la cookie se filtra una vez por cualquier medio), tiene acceso indefinido a todos los datos de clientes y puede cambiar el estado de cualquier pedido.
**Riesgo:** alto — es la puerta a todos los datos personales de tus clientes.
**Solución propuesta (cambio pequeño y acotado):** agregar un límite de intentos fallidos por IP/tiempo en `/api/admin/login` (ej. bloquear 15 minutos tras 5 intentos fallidos) y cambiar `ADMIN_PASSWORD` por una contraseña larga y aleatoria ahora, como mitigación inmediata mientras se construye el límite de intentos. Cambiar el mecanismo de cookie a un token de sesión real con expiración es más trabajo y lo dejaría para después del lanzamiento (P1), no bloquea si ya hay una contraseña fuerte y límite de intentos.
**Impacto de modificarlo:** cero para clientes — solo afecta el login del panel interno.

#### P0-4. Versión de Next.js con vulnerabilidades públicas conocidas
**Qué ocurre:** el proyecto usa `next@16.2.4`. Verifiqué contra los boletines de seguridad publicados: esa versión está dentro del rango afectado por una vulnerabilidad de ejecución remota de código vía procesamiento de imágenes AVIF (corregida en 16.3.3) y por un problema de denegación de servicio/exposición de código fuente que afecta a Next 13.x–16.x (parches específicos por versión). La buena noticia: el problema de path traversal en Windows (CVE-2026-75604) **no aplica** porque Vercel corre en Linux, y Vercel dice mitigar parcialmente el segundo problema con su WAF — pero el propio boletín de Vercel aclara que el WAF "no garantiza protección contra todas las variantes" y que **de todas formas hay que actualizar**.
**Por qué importa:** son vulnerabilidades públicas y explotables sin autenticación en ciertos escenarios — exactamente el tipo de cosa que un atacante automatizado escanea por internet.
**Riesgo:** alto, pero de arreglo barato.
**Solución propuesta:** actualizar `next` a la última versión estable de la rama 16.x (16.3.3 o superior a la fecha en que lo hagas) y `react`/`react-dom` a la última 19.x, correr `npx tsc --noEmit` y `npx eslint` para confirmar que nada se rompe, y volver a desplegar. Es un cambio de una línea en `package.json` + reinstalar dependencias — no toca lógica de negocio. Esto quedó pendiente de ejecutar porque el puente a tu computador se cayó a mitad de esta sesión (ver nota al final); es lo primero que haría en la siguiente sesión en que puedas conectar tu equipo, antes de cualquier otra cosa de esta lista.
**Impacto de modificarlo:** bajo riesgo — es una actualización de versión menor, reversible con `git revert` si algo se rompe.

#### P0-5. Garantía legal no informada "de forma expresa y destacada" — SERNAC lo está fiscalizando activamente ahora mismo
**Qué ocurre:** verifiqué con fuentes actuales que la Ley 21.398 ("Ley Pro Consumidor") amplió la garantía legal de los artículos 19-21 de la Ley 19.496 a **6 meses desde la entrega**, con el consumidor eligiendo entre reparación, reposición o devolución. Los Términos actuales solo mencionan una política propia de "reimpresión gratis si avisas dentro de 7 días corridos" — no mencionan la garantía legal de 6 meses en ningún lado, y el plazo propio de 7 días es muchísimo más corto que el legal, lo que puede leerse como una limitación indebida de un derecho irrenunciable. Según la investigación que encargué, SERNAC está fiscalizando activamente este punto en comercio electrónico en este momento (septiembre 2026).
**Por qué importa:** es el único hallazgo de esta lista con un regulador activamente mirando el tema ahora. El arreglo es puramente de texto legal, no de código.
**Riesgo:** alto por el momento regulatorio, bajo costo de arreglo.
**Solución propuesta:** agregar a la Sección 9 de `/terminos` una mención explícita y destacada de la garantía legal de 6 meses (arts. 19-21 Ley 19.496, según Ley 21.398), aclarando que la reimpresión rápida en 7 días es **un beneficio adicional que no reemplaza ni limita** esa garantía legal, que sigue disponible durante los 6 meses completos eligiendo entre reparación, reposición o devolución. Esto es cambiar texto legal, no funcionalidad — te lo redacto en la fase de implementación para que lo revises antes de publicarlo, porque toca "reglas comerciales" y por tu propia regla eso te lo explico primero.
**Impacto de modificarlo:** ninguno en el código; es contenido de la página `/terminos`.

> Nota sobre este research: usé un agente de investigación web para verificar esto contra SERNAC, la Biblioteca del Congreso y estudios jurídicos (Carey, PPU Legal, FerradaNehme). El texto exacto del comunicado de SERNAC de septiembre 2026 no lo pude leer en el sitio oficial directamente (solo réplicas de prensa) — antes de publicar la cláusula final, vale la pena que confirmes el texto en sernac.cl o me pidas que lo intente de nuevo.

---

### P1 — CORREGIR ANTES O INMEDIATAMENTE DESPUÉS DE ABRIR

| # | Hallazgo | Archivo/ruta | Por qué importa | Solución propuesta |
|---|---|---|---|---|
| P1-1 | Datos del cliente sin escapar se insertan directo en el HTML de los correos (nombre, teléfono, nombre de archivo, y **todos** los campos del formulario de cotización). Alguien podría meter HTML/enlaces falsos en un correo que llega a tu bandeja o a la del cliente. | `api/pago/confirmar/route.ts` (líneas 192, 214, 232-234), `api/cotizar/route.ts` (líneas 31-51) | Inyección de HTML en correos transaccionales reales, tanto al equipo interno como al cliente. | Escapar (`<`, `>`, `&`, `"`) cualquier dato que venga del cliente antes de insertarlo en las plantillas HTML de correo. Cambio contenido en 2 archivos, no toca lógica de negocio ni de pago. |
| P1-2 | Sin límite de solicitudes (rate limiting) en `/api/upload`, `/api/pedidos`, `/api/cotizar` y `/api/pago/*`. | Todas las rutas `api/*` | Alguien puede llenar tu Vercel Blob de archivos basura, saturar tu bandeja de correo con cotizaciones falsas, o crear pedidos pendientes de pago sin límite (no cuesta dinero real porque no hay pago hasta Flow, pero ensucia el panel y el storage). | Agregar un límite simple por IP (ej. Vercel KV o un contador en memoria/edge) a estas rutas. Cambio aditivo, no rompe el flujo normal de un cliente real. |
| P1-3 | Cero headers de seguridad HTTP configurados (`next.config.ts` y `vercel.json` no tienen `headers()`). Sin `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, ni protección contra ser incrustado en un iframe ajeno (clickjacking). | `next.config.ts`, `vercel.json` | Es la primera línea de defensa contra varias clases de ataque, y hoy no existe ninguna. | Agregar un bloque `headers()` en `next.config.ts` con estas 5 cabeceras (dejando Content-Security-Policy para una segunda etapa porque hay que probarla con calma junto a Google Ads/Meta Pixel/Flow para no romper nada). Cambio aditivo y de bajo riesgo si se prueba después de aplicarlo. |
| P1-4 | El cálculo de "Listo para retirar el [fecha]" (`ProductoClient.tsx`, función `sumarDiasHabiles`) solo salta sábado y domingo — **no conoce ningún feriado chileno**. | `app/(store)/tienda/[slug]/ProductoClient.tsx:17-26` | Le puedes prometer al cliente una fecha de retiro que cae en Fiestas Patrias, Navidad, o el 20 de agosto (feriado comunal de Chillán, Ley 20.768 — verificado). | Agregar una lista de feriados 2026-2027 (nacionales + irrenunciables + el 20 de agosto para Chillán) a la función. Confirmé el calendario oficial vigente; te lo dejo listo para implementar. |
| P1-5 | `/carrito`, `/pago`, `/confirmacion` y `/tienda/preview` no tienen `noindex` explícito, y `robots.ts` permite rastrear todo el sitio sin excepciones. | `app/robots.ts`, páginas de `(store)` | `/confirmacion?orden=IC260906-1234` muestra producto y monto (no datos de contacto) sin protección contra indexación — si Google llegara a encontrar el enlace, podría indexarlo. | Agregar reglas `disallow` para `/carrito`, `/pago`, `/confirmacion`, `/tienda/preview` y `/admin` en `robots.ts`. Cambio de un archivo, cero riesgo. |
| P1-6 | La política de privacidad no menciona el píxel de Meta/Facebook (`MetaPixel.tsx` existe en el código y se activa solo con `NEXT_PUBLIC_META_PIXEL_ID`) y cita solo la Ley 19.628, sin mencionar la Ley 21.719 que la reemplaza. | `app/privacidad/page.tsx`, `app/components/MetaPixel.tsx` | La política debe reflejar exactamente lo que el código hace. Si esa variable de entorno está configurada en Vercel (no puedo verlo desde aquí — solo tú lo sabes), Meta está recibiendo datos de navegación sin que la política lo diga. | **Necesito que me confirmes**: ¿está configurada `NEXT_PUBLIC_META_PIXEL_ID` en Vercel hoy? Si sí, agrego Meta a la lista de terceros de la Sección 4. Además, agregar una mención a la Ley 21.719 (con la fecha de entrada en vigencia, que verifiqué que sigue en 1-dic-2026 pero con un proyecto de ley aún no aprobado que buscaría postergarla a 1-dic-2027). |
| P1-7 | La frase "los conservamos por un tiempo razonable" (retención de archivos de diseño) sigue sin plazo concreto, tal como pediste que se corrigiera. | `app/privacidad/page.tsx` Sección 5 | Es exactamente el punto que marcaste para resolver en la Fase 13. | Propongo: archivos de diseño 180 días desde la entrega del pedido (suficiente para reimpresiones, luego se eliminan); datos del pedido (nombre, email, teléfono, monto) 6 años, alineado al plazo de prescripción tributaria general del Código Tributario que verifiqué con el SII. Son plazos que defini razonablemente — dime si prefieres otros. |
| P1-8 | No existe forma de desactivar un producto/tamaño/variante sin editar código y volver a desplegar. | `lib/productos.ts` | Pediste explícitamente poder pausar una variante (ej. si se acaba el PVC) sin tocar código. Hoy no existe ese mecanismo — confirmado, no asumido. | Propongo agregar un campo `disponible?: boolean` por producto y por valor de opción, revisado tanto en la interfaz (se ve gris, no seleccionable) como en `precioServidor()` (rechaza el pedido si igual llega manipulado desde DevTools). Es aditivo — todo lo que no marques como no disponible sigue funcionando exactamente igual. |

---

### P2 — MEJORA (no bloquea, vale la pena hacerlo)

- **Condición de carrera en confirmaciones duplicadas de Flow:** si dos callbacks de Flow llegaran casi simultáneamente (poco probable, pero posible), ambos podrían leer `pago_confirmado = false` antes de que el primero termine de escribir, y enviar el correo dos veces. Fix: usar una actualización condicional (`UPDATE ... WHERE pago_confirmado = false`) y verificar cuántas filas cambiaron, en vez de leer-y-luego-escribir por separado. `api/pago/confirmar/route.ts`.
- **Sin verificación de magic bytes en los archivos subidos** — hoy solo se valida la extensión del nombre de archivo, no el contenido real. Bajo riesgo dado que Vercel Blob solo almacena, no ejecuta nada, pero conviene agregar una validación básica de cabecera de archivo para PDF/PNG/JPG. `api/upload/route.ts`.
- **El número de pedido (`IC{fecha}-{4 dígitos}`) es adivinable dentro de un rango acotado** (9.000 combinaciones por día) y permite ver producto y monto de otro pedido en `/confirmacion` sin autenticación — no expone nombre, email ni teléfono. Es un hallazgo ya conocido internamente. No propongo cambiar el formato sin hablarlo primero, porque afecta el `commerceOrder` de Flow, los correos y el panel — dime si quieres que lo evalúe con más profundidad.
- **Sin herramienta de reconciliación manual** si un webhook de Flow se pierde (la documentación oficial de Flow no especifica si reintenta el envío del webhook en caso de falla — lo verifiqué y no está documentado). Hoy el único camino es que el admin note el pedido atascado en "pendiente_pago" y lo revise a mano en el dashboard de Flow. Propongo un botón simple en el panel para re-consultar el estado de un pedido puntual contra Flow.
- **Fecha de retiro mostrada en la ficha de producto se calcula desde el momento en que se mira la página, no desde el pago o la recepción del archivo** — que es cuando los Términos dicen que realmente empieza a correr el plazo. Sugerencia de bajo riesgo: agregar la palabra "estimado" ("Listo para retirar, estimado, el...") para dejar claro que es una proyección, no una promesa fija — exactamente lo que sugeriste en la Fase 7.
- **"35 años" (contador animado y texto fijo) vs. "Desde 1989"** no cuadran en 2026 (37 años, no 35) — confirmado en `Hero.tsx` y `BandaEstadisticas.tsx`. Recomiendo la frase evergreen que tú mismo propusiste ("Imprimiendo en Chillán desde 1989") en vez de un número que hay que actualizar cada año.
- **El contador animado arranca en "0 años" / "+0 clientes" en el HTML inicial** antes de que el JavaScript lo anime — coincide con tu sospecha de la Fase 16. Fix de bajo riesgo: que el valor final se renderice desde el servidor y solo se anime visualmente, sin que el texto empiece en cero.
- **No hay validación de formato del teléfono del cliente** en el checkout — ya estaba anotado como pendiente conocido.

### P3 — FUTURO

- Migrar el storage de archivos de clientes de bucket público con nombre aleatorio a bucket privado + signed URLs con expiración — es la arquitectura más correcta a largo plazo, pero es un cambio de mayor alcance (afecta cómo se generan y consumen todos los enlaces de archivo, incluyendo los que ya están guardados). No lo haría antes de reabrir; lo dejaría para una iteración posterior una vez que el volumen de pedidos lo justifique.
- Content-Security-Policy completa (más allá de los 5 headers del P1-3) — requiere pruebas cuidadosas junto a Google Ads, Meta Pixel y el checkout de Flow para no romper ningún script de terceros.
- Accesibilidad menor: el botón personalizado de "subir archivo" en `ProductoClient.tsx` responde a Enter pero no a la barra espaciadora (falta un caso en el `onKeyDown`); no hay enlace "saltar al contenido" en la navegación; en `EmpresasClientes.tsx` el texto alternativo de cada logo se repite dos veces (una en el `alt` de la imagen, otra en un `span` oculto) — redundante para lectores de pantalla, no roto.
- `.env.example` sigue documentando `NEXT_PUBLIC_BASE_URL` **con** www, a pesar de que el código ya defiende contra ese error específico quitando el www en tiempo de ejecución (el bug de agosto que rompió una compra de prueba). El código está bien protegido; el archivo de ejemplo simplemente puede confundir a quien lo lea en el futuro. Vale la pena corregir el ejemplo para que no quede como una trampa documentada.

---

## Lo que NO alcancé a verificar en vivo esta sesión (y por qué)

A mitad de la auditoría, el puente a tu computador dejó de funcionar por la actualización de Windows del 8 de septiembre que Anthropic ya está rastreando como un problema conocido — no es algo que puedas arreglar tú. Esto significa que **no pude**:
- Correr `npm audit` / `npm outdated` reales sobre tu `package-lock.json` (mi hallazgo P0-4 se basa en boletines públicos de CVE cruzados con la versión en tu `package.json`, no en un audit ejecutado).
- Revisar el historial de git en busca de secretos commiteados por error alguna vez (confirmé que `.env*` está en `.gitignore` hoy, lo que evita que se vuelva a repetir, pero no revisé commits antiguos).
- Ejecutar Lighthouse o pruebas visuales reales en escritorio (1366×768, 1440×900, 1920×1080) ni en los cuatro anchos de celular pedidos — hice una revisión de código de accesibilidad y responsividad (Fases 9, 10, 11) pero no una prueba visual en vivo.
- Simular en vivo los 10 casos de la Fase 22 (Flow rechazado, callback duplicado, etc.) — sí pude verificar la lógica exacta que maneja cada caso leyendo el código, y sé por tu propia nota de agosto que el caso 1 (compra real con archivo) y el mobile ya se probaron en producción con la orden `IC260806-4305`. Lo que no probé es si algo cambió desde entonces que afecte esos casos (el catálogo de precios sí cambió el 6 de agosto).

Ninguno de estos pendientes cambia las conclusiones P0 de arriba — son verificaciones adicionales que recomiendo hacer en cuanto tengas tu equipo conectado de nuevo, antes de dar la luz verde final.

---

## Plan de implementación (de menor a mayor riesgo)

1. **Solo texto, cero código:** confirmar y resolver P0-2 (testimonios/logos) y P0-1 (boleta) — son decisiones tuyas, no builds.
2. **Un archivo, aditivo:** `robots.ts` (P1-5), `.env.example` (P3), `next.config.ts` headers (P1-3).
3. **Cambios contenidos de 1-2 funciones:** escapar HTML en correos (P1-1), feriados en `sumarDiasHabiles` (P1-4), texto "estimado" en fecha de retiro (P2), "35 años"→evergreen (P2), contador SSR (P2).
4. **Cambios con revisión legal tuya antes de publicar:** texto de garantía legal en `/terminos` (P0-5), actualización de `/privacidad` (P1-6, P1-7).
5. **Requieren decisión de producto tuya, luego código:** rate limiting (P1-2), límite de intentos de login + contraseña nueva (P0-3), campo `disponible` en catálogo (P1-8).
6. **Requiere tu aprobación explícita por tocar dependencias:** actualizar Next.js/React (P0-4) — bajo riesgo pero lo marco aparte porque toca `package.json`.
7. **Mayor alcance, para después del lanzamiento:** migración de storage a bucket privado (P3), CSP completa (P3), reconciliación manual de Flow (P2).

No toqué nada de precios, productos, cantidades, medidas, identidad visual, la integración de Flow, la base de datos ni la estructura de pedidos — tal como pediste. El punto ya conocido de la anomalía de precio en flyers A5 doble cara (sin resolver desde agosto, pendiente de que hables con tu mamá) sigue ahí, no es algo que yo deba decidir.

---

## Informe final

**1. Qué encontré:** un sistema de pago bien construido (Flow.cl correctamente implementado, precio siempre recalculado en servidor, el retorno del navegador no marca nada como pagado) con brechas concentradas en tres áreas: cumplimiento legal/tributario (boleta, garantía legal), contenido comercial sin verificar (testimonios, logos institucionales), y capas de seguridad básicas ausentes (headers, rate limiting, versión de Next.js desactualizada, sesión de admin sin límite de intentos).

**2. Qué corregí:** nada todavía — esta es la auditoría que pediste antes de tocar código, siguiendo tu propia "forma de trabajar".

**3. Qué queda pendiente:** todo lo listado en P0-P3 de arriba, más las dos decisiones que solo tú puedes tomar (boleta y testimonios/logos).

**4. Qué pruebas ejecuté:** lectura completa del código de la tienda, backend, Supabase, Flow, panel admin y páginas legales; verificación cruzada contra documentación oficial de Flow.cl (firma HMAC, campos de respuesta, códigos de estado); verificación de CVEs públicas de Next.js/React contra la versión instalada; dos investigaciones legales con fuentes citadas (SERNAC/Ley 19.496/feriados, y Ley 21.719/privacidad).

**5. Resultado desktop:** no probado visualmente esta sesión (ver limitaciones arriba). Revisión de código no encontró banderas rojas obvias (clases responsivas consistentes, `max-w` en todos los contenedores).

**6. Resultado mobile:** no probado visualmente esta sesión. El código ya implementa varias de las mejoras que pedías (barra sticky de precio+CTA en `ProductoClient.tsx`, touch targets de 48-52px, fecha concreta de retiro) desde la auditoría UX de agosto.

**7. Resultado Flow:** sólido. Firma correcta, monto server-side, `commerceOrder` validado, idempotencia ante callback duplicado, el retorno del navegador nunca marca pagado. Gap menor: sin reconciliación manual si se pierde un webhook (P2).

**8. Resultado Supabase:** correcto. RLS activo sin políticas públicas = la anon key no puede tocar la tabla `pedidos`; la service role key vive solo en rutas de servidor. Riesgo a vigilar: esa key es del mismo proyecto que usa tu app de gestión interna, así que si se filtrara alguna vez, expondría más que solo pedidos de la tienda.

**9. Resultado archivos:** validación de extensión y tamaño presente; falta verificación de contenido real (magic bytes) — P2. El bucket es público con nombre aleatorio, lo cual es una mitigación razonable hoy pero la política de privacidad la describe con más confianza de la que merece (P1-7/P3).

**10. Resultado seguridad:** el hallazgo más urgente de esta categoría es la versión de Next.js con CVEs públicas (P0-4) y la sesión de admin sin límite de intentos (P0-3). Sin headers de seguridad ni rate limiting en ninguna ruta (P1).

**11. Resultado legal:** la exclusión del derecho a retracto está correctamente citada y fundamentada. La garantía legal de 6 meses no está informada de forma destacada, y SERNAC está fiscalizando activamente este punto ahora mismo (P0-5).

**12. Resultado privacidad:** la política no menciona a Meta Pixel (si está activo — necesito que confirmes) ni a la Ley 21.719 que reemplazará a la Ley 19.628 actualmente citada, y sigue con la frase "tiempo razonable" que ya habías identificado para corregir.

**13. Resultado SEO:** buen trabajo previo (sitemap y `noindex` ya condicionados a que la tienda esté abierta, JSON-LD correcto). Falta blindar explícitamente carrito/pago/confirmación/preview contra indexación (P1-5), y la inconsistencia "35 años"/"desde 1989" sigue viva en el HTML (P2).

**14. Riesgos restantes:** los cinco P0 de arriba. Ninguno requiere un rediseño ni reconstrucción — todos son alcanzables en días, no semanas, y la mayoría son cambios de una función o un archivo.

---

## Checklist pre-lanzamiento

| Punto | Estado |
|---|---|
| Pago Flow.cl: firma, monto server-side, idempotencia, retorno no confirma pago | ✅ LISTO |
| RLS de Supabase / service role solo en servidor | ✅ LISTO |
| Validación de precio 100% en servidor (no confía en el navegador) | ✅ LISTO |
| Boleta electrónica | ❌ BLOQUEA LANZAMIENTO |
| Testimonios y logos institucionales verificados/autorizados | ❌ BLOQUEA LANZAMIENTO (pendiente tu confirmación) |
| Garantía legal informada de forma destacada | ❌ BLOQUEA LANZAMIENTO (SERNAC fiscalizando activamente) |
| Sesión de admin con límite de intentos + contraseña fuerte | ❌ BLOQUEA LANZAMIENTO |
| Next.js actualizado (CVEs conocidas) | ❌ BLOQUEA LANZAMIENTO |
| Headers de seguridad HTTP | ⚠️ REVISAR (P1, no bloquea pero es barato de resolver antes) |
| Rate limiting en rutas públicas | ⚠️ REVISAR |
| Feriados chilenos en el cálculo de fecha de retiro | ⚠️ REVISAR |
| noindex explícito en carrito/pago/confirmación/preview | ⚠️ REVISAR |
| Política de privacidad actualizada (Meta Pixel, Ley 21.719, retención concreta) | ⚠️ REVISAR |
| Mecanismo para desactivar producto/variante sin tocar código | ⚠️ REVISAR (no existe hoy, no es bloqueante para el primer lanzamiento) |
| Validación de contenido real de archivos subidos (magic bytes) | ⚠️ REVISAR |
| Inyección de HTML en correos transaccionales | ⚠️ REVISAR |
| Pruebas visuales desktop/mobile en vivo + Lighthouse en /tienda | ⚠️ REVISAR (no ejecutado esta sesión) |
| Auditoría de dependencias (npm audit) e historial de git | ⚠️ REVISAR (no ejecutado esta sesión, sin acceso a tu equipo) |
| Precio A5 flyers doble cara (anomalía conocida desde agosto) | ⚠️ REVISAR (decisión comercial pendiente, no técnica) |

---

## Conclusión

**NO-GO — no abrir todavía.**

Lo que falta para pasar a GO no es grande, pero es real: (1) resolver o confirmar el estado de la boleta electrónica, (2) que me confirmes que los testimonios y los logos institucionales son reales y están autorizados, (3) agregar el párrafo de garantía legal a los Términos, (4) poner un límite de intentos y una contraseña fuerte en el panel de admin, y (5) actualizar Next.js a una versión sin las CVEs conocidas. Los cinco son alcanzables en un par de días de trabajo concreto, ninguno requiere tocar precios, la base de datos, Flow o el diseño visual, y todos son reversibles si algo sale mal.

Dime cómo quieres seguir: puedo preparar ya los cambios de "solo texto" (headers, robots.ts, feriados, escape de HTML) apenas confirmes que quieres que avance, y dejamos aparte lo que depende de tu decisión (boleta, testimonios/logos, contraseña del panel, actualización de Next.js) para que tú definas el orden.
