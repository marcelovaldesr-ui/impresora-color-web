# Informe de avance — Fase de Corrección Pre-Lanzamiento

**Impresora Color Ltda — impresora-color-web**
Fecha del informe: 12 de septiembre de 2026

Este documento resume todo lo hecho hasta ahora en la fase de corrección posterior a la auditoría pre-lanzamiento (que había concluido NO-GO por 5 bloqueadores P0). No es una auditoría nueva: es el registro de cómo se fueron resolviendo, bloque por bloque, los hallazgos de esa auditoría, bajo las reglas de trabajo que definiste (sin refactor general, sin tocar precios/catálogo/diseño/testimonios/logos salvo necesidad real, cambios pequeños y reversibles, la tienda sigue cerrada al público).

---

## 1. Qué quedó fuera de alcance (confirmado por el negocio)

Estos puntos de la auditoría original **no se tocaron**, por decisión tuya:

- **Testimonios**: confirmados reales y correctos. No se eliminan, sustituyen ni modifican.
- **Logos de clientes** (incluidos Carabineros, Municipalidad de Chillán, Hospital Clínico, Seremi de Salud): confirmados correctos. No se tocan.

## 2. Estado general — tabla resumen

| Bloque | Tema | Estado | ¿Bloquea lanzamiento? |
|---|---|---|---|
| 1 | Actualización Next.js (vulnerabilidades críticas) | ✅ Hecho | No — resuelto |
| 2 | Seguridad panel admin (sesión + rate limit) | ✅ Hecho | No — resuelto |
| 3 | Escape de HTML en correos | ✅ Hecho | No — resuelto |
| 4 | Headers de seguridad HTTP | ✅ Hecho | No — resuelto |
| 5 | Higiene SEO / robots | ✅ Hecho | No — resuelto |
| 6 | Fecha de retiro consciente de feriados | ✅ Hecho | No — resuelto |
| 7 | Garantía legal en /terminos | 🟡 Propuesto, esperando tu aprobación | **Sí — es un P0 de la auditoría original** |
| 8 | Política de privacidad (trackers + retención) | 🟡 Propuesto, esperando tus respuestas | No bloquea el código, pero sí la precisión legal de la página |
| 9 | Rate limit en APIs públicas | ✅ Hecho | No |
| 10 | Contenido evergreen ("35 años" → "desde 1989") | ✅ Hecho | No |
| 11 | Disponibilidad de productos | 🟡 Propuesto, no implementado | No — es mejora, no bloqueador |
| 12 | Validación de archivos (magic bytes) | ✅ Hecho | No |
| 13 | Condición de carrera en pago Flow.cl | ✅ Hecho (fix); reconciliación admin propuesta, no implementada | No — ya resuelto |
| 14 | QA visual desktop/móvil | ⏳ Pendiente | Pendiente de hacer |
| 15 | Pruebas end-to-end | ⏳ Pendiente | Pendiente de hacer |
| 16 | Validación final (audit/tsc/eslint/build/Lighthouse) | ⏳ Pendiente | Pendiente de hacer |
| — | Boleta electrónica / Flow / SII | 🟡 Checklist entregado, esperando que verifiques tú en el portal | **Sí — es un P0 de la auditoría original**, hasta que confirmes |

De los 3 P0 reales que definiste (Next.js, seguridad admin, garantía legal), **2 están resueltos** (Next.js y seguridad admin) y **1 sigue esperando tu aprobación del texto** (garantía legal). El P0 de boleta electrónica no era un problema de código: quedó como un checklist para que confirmes algo en el portal de Flow/SII, no algo que yo pueda resolver escribiendo código.

---

## 3. Detalle por bloque

### Bloque 1 — Actualización de Next.js (P0-A) ✅

**Problema:** la versión instalada (16.2.4) tenía vulnerabilidades críticas conocidas y publicadas, incluyendo una RCE no autenticada en el optimizador de imágenes AVIF que afecta a despliegues en Vercel.

**Qué se hizo:** se subió Next.js a 16.3.5 (última estable) y `eslint-config-next` en paralelo. React/React-DOM se dejaron igual (19.2.4, ya fuera del rango vulnerable). `npm audit fix` (sin `--force`) resolvió además 6 vulnerabilidades más en dependencias de build/lint.

**Resultado:** `npm audit` pasó de (1 crítica, 6 altas, 2 moderadas, 1 baja) a **0 vulnerabilidades**.

**Archivos:** `package.json`, `package-lock.json`.

**Pruebas:** `tsc` limpio, build exitoso (33/33 páginas), ESLint comparado antes/después sin regresiones (1 warning informativo nuevo por una regla más estricta, sin cambio de comportamiento).

---

### Bloque 2 — Seguridad del panel admin (P0-B) ✅

**Problema:** la "sesión" del panel admin era el hash SHA-256 fijo de `ADMIN_PASSWORD + ADMIN_SECRET` — siempre el mismo valor, sin expiración real más allá del `Max-Age` de la cookie (que el navegador puede ignorar), sin forma de invalidarlo, y sin ninguna protección contra fuerza bruta sobre la contraseña.

**Qué se hizo:**
- `lib/adminAuth.ts` (nuevo): reemplaza el hash estático por un token firmado (`base64url({iat,exp}) + "." + HMAC-SHA256`), que expira solo a las 10 horas y se invalida si se altera el payload o la firma (comparación en tiempo constante, resistente a timing attacks). El token nunca contiene ni permite reconstruir la contraseña.
- `lib/adminRateLimit.ts` (nuevo): 5 intentos fallidos de una misma IP en 15 minutos bloquean esa IP (ventana deslizante — se libera sola si el ataque para, nunca queda bloqueada para siempre). Guardado en Supabase (no se contrató ningún servicio nuevo) porque Vercel corre cada request en una instancia distinta y un contador en memoria no serviría de límite real. **Falla abierto** si Supabase falla: nunca te deja fuera de tu propio panel por una caída externa.
- `migracion-admin-login-intentos.sql` (nuevo): la tabla que sostiene el punto anterior. **Debes correrla tú una vez en el SQL Editor de Supabase** — mientras no la corras, el login funciona igual, solo sin el rate limit todavía.
- `app/api/admin/login/route.ts`: reescrito para usar lo anterior; cookie `admin_ic` con `HttpOnly; Secure; SameSite=Strict` y expiración real.
- `app/api/admin/pedidos/route.ts`, `app/api/admin/pedidos/[id]/route.ts`, `app/admin/pedidos/page.tsx`: actualizados para verificar el token nuevo en vez del hash estático.

**Trade-off aceptado y que debes conocer:** el logout borra la cookie del navegador pero no invalida el token en el servidor (no hay lista de revocación). Un token ya emitido sigue siendo válido hasta su expiración natural (10h) si alguien tuviera una copia. Se aceptó por ser un panel interno pequeño — de todas formas es una mejora enorme sobre el hash permanente anterior, que nunca expiraba.

**Pruebas:** login correcto, contraseña incorrecta, cookie manipulada, cookie con firma válida pero expirada, logout, acceso sin sesión — todo verificado en vivo con `next dev` + `curl`.

---

### Bloque 3 — Escape de HTML en correos ✅

**Problema:** los correos de `/api/cotizar` y `/api/pago/confirmar` insertaban datos del cliente directo en HTML sin escapar. Un nombre, teléfono, mensaje o nombre de archivo con algo como `<img src=x onerror=alert(1)>` se interpretaba como HTML real al abrir el correo.

**Qué se hizo:** `lib/escapeHtml.ts` (nuevo) y se aplicó a los 6 campos del formulario de cotización, y a nombre/teléfono/email del cliente y nombre de archivo en los correos de pedido. **No se tocó** el asunto del correo ni los campos `to`/`replyTo` (son texto plano/direcciones, no HTML — escaparlos ahí rompería la dirección o se vería mal), ni el teléfono en el link de WhatsApp (ya era seguro, se le aplica `.replace(/\D/g, '')` antes de usarlo).

**Pruebas:** verificado con payloads de prueba (`<img onerror=...>`, `<a href=...>`, fuga de atributo con comilla doble) — los tres quedan como texto plano.

---

### Bloque 4 — Headers de seguridad HTTP ✅

**Problema:** el sitio no mandaba ningún header de seguridad HTTP.

**Qué se hizo (`next.config.ts`):** se agregaron 5 headers de bajo riesgo en todas las rutas: `Strict-Transport-Security` (2 años, sin `preload` — esa decisión te corresponde a ti, no se activó de paso), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (desactiva cámara/micrófono/geolocalización que el sitio no usa) y `X-Frame-Options: SAMEORIGIN`.

**A propósito no se hizo:** un Content-Security-Policy completo. El sitio carga Flow.cl, Google Ads/Analytics, Meta Pixel y Vercel — armar un CSP afinado para todos esos dominios sin romper ninguno necesita más pruebas de las que da el tiempo antes del lanzamiento. Queda pendiente como mejora futura, no bloqueador.

**Pruebas:** verificado en vivo que los 5 headers llegan en `/`, `/tienda` y otras rutas.

---

### Bloque 5 — Higiene SEO / robots ✅

**Problema:** `/carrito`, `/pago`, `/confirmacion` y `/tienda/preview` no tenían ninguna protección de indexación (ni robots.txt ni meta robots) — páginas transaccionales sin valor de contenido para buscadores.

**Qué se hizo:** `app/robots.ts` agrega esas 4 rutas + `/admin` al `Disallow`. Como eso no garantiza exclusión total, se agregó además meta robots `noindex` real: layouts nuevos para `/carrito` y `/pago` (son Client Components, no pueden exportar metadata directo) y metadata directa en `/confirmacion`. **`/tienda` no se tocó a propósito** — debe seguir siendo indexable en cuanto se abra al público, y ya tenía su propia lógica correcta de noindex-mientras-cerrada.

**Pruebas:** verificado en vivo — robots.txt trae los 5 Disallow, las 3 páginas traen el meta noindex, `/` y `/tienda` siguen sin bloquear indexación.

---

### Bloque 6 — Fecha de retiro consciente de feriados ✅

**Problema:** el cálculo de "días hábiles" para la fecha estimada de retiro solo saltaba sábado/domingo — podía prometerte un retiro en Fiestas Patrias, Navidad, o el 20 de agosto (feriado comunal de Chillán y Chillán Viejo, Ley 20.768, que aplica a esta imprenta aunque el resto del país trabaje ese día).

**Qué se hizo:** `lib/feriadosChile.ts` (nuevo) centraliza los feriados 2026-2027 (cruzados contra dos fuentes + cálculo propio para Viernes/Sábado Santo, que dependen de la Pascua), documentado para que actualizarlo el próximo diciembre sea agregar líneas, no tocar lógica. `ProductoClient.tsx` ahora los usa en `sumarDiasHabiles()`. Cambio de copy: "Listo para retirar el [fecha]" → "Retiro estimado: [fecha]", más una nota aclarando que el plazo cuenta desde que se confirma el pago **y** se recibe un archivo apto para imprimir. Se aplicó el mismo criterio en el correo de confirmación de pago.

**Nota honesta:** dos categorías de feriados NO tienen fecha fija conocida de antemano (el Día de los Pueblos Indígenas depende del solsticio; un eventual feriado adicional de Fiestas Patrias es ley aparte, decidida caso a caso por el Congreso) — quedó documentado en el código para reconfirmar cerca de la fecha cada año, no se inventó un valor.

**Pruebas:** verificado con casos reales (pedido del 19-ago-2026 salta correctamente el feriado de Chillán del 20-ago; pedido del 24-dic-2026 salta Navidad).

---

### Bloque 7 — Garantía legal en /terminos (P0-C) 🟡 Esperando tu aprobación

**Problema:** la Sección 9 de `/terminos` solo describe tu política interna de reimpresión en 7 días, **sin mencionar en ningún lado la garantía legal** que exige la Ley N° 19.496 (modificada por la Ley N° 21.398, "Ley Pro Consumidor", vigente desde marzo de 2022): 6 meses desde la entrega del producto, con tres alternativas a elección del consumidor (reparación, cambio, devolución) — investigado y verificado contra fuentes oficiales de SERNAC.

**Qué propuse:** un texto de reemplazo completo para la Sección 9 (con nuevo título "Garantía legal y reimpresión rápida") que: nombra la garantía legal de forma destacada, indica el plazo correcto, explica las 3 alternativas legales, aclara que la reimpresión rápida es un servicio ADICIONAL (no un reemplazo) de la garantía legal, aclara que nada limita tus derechos irrenunciables, y mantiene la distinción entre defecto imputable a la imprenta vs. resultado del archivo que el cliente entregó y aprobó. La Sección 8 (retracto) ya estaba correcta — no se propuso ningún cambio ahí.

**Estado:** el texto completo (actual vs. propuesto, con el porqué de cada cambio) ya te lo envié en el chat. **No se ha escrito nada en el archivo real** — espero tu aprobación (tal cual, o con ajustes) antes de aplicarlo.

---

### Bloque 8 — Política de privacidad 🟡 Esperando tus respuestas

**Qué se hizo:** en vez de asumir, se leyó el código real de tracking. Esto es lo que está activo hoy:

| Servicio | Estado real | Cómo se activa |
|---|---|---|
| Google Ads (etiqueta global + conversión "clic WhatsApp") | **Activo siempre**, en todo el sitio | ID fijo en el código, no depende de variable de entorno |
| GA4 | Solo si `NEXT_PUBLIC_GA4_ID` está configurada | Variable de entorno |
| Google Ads — conversión "Compra" | Solo si `NEXT_PUBLIC_ADS_CONV_COMPRA` está configurada | Variable de entorno |
| Meta Pixel (Facebook/Instagram) | Solo si `NEXT_PUBLIC_META_PIXEL_ID` está configurada | Variable de entorno |

La política actual dice "Google — analítica y medición de nuestra publicidad", lo que cubre razonablemente Google Ads/GA4, pero **no menciona Meta/Facebook en ningún lado**. Si el píxel está activo, eso sí sería una omisión real.

**Pregunta pendiente:** ¿está configurada la variable `NEXT_PUBLIC_META_PIXEL_ID` en Vercel (Settings → Environment Variables)? Con tu respuesta, preparo (no aplico todavía) el agregado de Meta a las secciones correspondientes de `/privacidad`.

**Propuesta pendiente:** una tabla de plazos de conservación de datos (documentos tributarios: 6 años, art. 200 Código Tributario; datos del pedido: 6 años; archivos de diseño: 12 meses salvo que el cliente pida antes; logs técnicos: 90 días) para reemplazar el actual "mientras sean necesarios" sin plazo concreto en la Sección 6 de `/privacidad`. Ya te la envié con fundamento operacional/legal y riesgos de cada opción — espero tu confirmación o ajustes.

---

### Bloque 9 — Rate limit en APIs públicas ✅

**Problema:** `/api/cotizar`, `/api/upload`, `/api/pedidos` y `/api/pago/iniciar` no tenían ningún límite de solicitudes — expuestos a abuso automatizado (gasto de envíos de correo, almacenamiento, llamadas a la API de Flow).

**Qué se hizo:** `lib/publicRateLimit.ts` (nuevo) con el mismo patrón que el rate limit del login admin (ventana deslizante en Supabase, falla abierto), pero con límites generosos pensados para frenar abuso, no clientes normales: cotizar 5/10min, upload 20/10min, pedidos 10/10min, pago/iniciar 10/10min. `migracion-rate-limit-publico.sql` (nuevo) — **debes correrla tú una vez en Supabase**, igual que la del login admin.

**Hallazgo incidental corregido de paso:** en `/api/upload`, una solicitud sin el Content-Type correcto hacía que el endpoint respondiera con un 500 y detalle interno del error, en vez de un 400 normal — una línea de fix, mismo espíritu de endurecer el endpoint.

**Pruebas:** `tsc`/lint/build limpios, y probados en vivo los 4 endpoints con solicitudes inválidas para confirmar que no hay errores nuevos y que el rate limit falla abierto correctamente.

---

### Bloque 10 — Contenido evergreen ✅

**Problema:** el sitio decía "35 años" en 7 lugares distintos — cifra ya desactualizada (fundada en 1989, hoy son ~37 años) que volvería a quedar mal cada aniversario.

**Qué se hizo:** reemplazado por "desde 1989" (que no vence) en `Hero.tsx`, `PaginaServicio.tsx`, `EmpresasClientes.tsx`, `/pago`, `/tienda` y `/etiquetas-cecinas` (3 apariciones ahí). Decisión de diseño que tomé y que debes confirmar: la marca de agua decorativa gigante del Hero, que decía "35", ahora dice "89" (por 1989) — mantuve 2 dígitos a propósito para no alterar el tamaño/kerning pensado para ese elemento.

**Bug real corregido de paso:** en `BandaEstadisticas.tsx`, el contador de "+5000 clientes" arrancaba en 0 en el HTML que genera el servidor, mostrando "0 clientes satisfechos" a cualquier usuario sin JavaScript o buscador hasta que corriera la animación. Ahora el valor real está en el HTML desde el primer render; el conteo animado es puramente un efecto visual. **La cifra "+5000" no cambió.**

**Pruebas:** verificado el HTML real servido (`next start` + curl) — "+5000" y "Desde 1989" aparecen correctamente, sin ningún "35 años" ni "0 clientes" residual.

---

### Bloque 11 — Disponibilidad de productos 🟡 Propuesto, no implementado

**Propuesta:** un campo opcional `disponible?: boolean` en el tipo `Producto` de `lib/productos.ts` — al ser opcional, **ningún producto existente se toca**, todos siguen disponibles por default. El chequeo real iría en `precioServidor()` (el único lugar que ya valida todo pedido antes de cobrarlo): si un producto está marcado no disponible, el pedido se rechaza ahí mismo, del lado del servidor.

**Archivos que tocaría:** `lib/productos.ts` (el campo + el chequeo), `app/(store)/tienda/page.tsx` (badge "No disponible" en el catálogo), `app/(store)/tienda/[slug]/ProductoClient.tsx` (mensaje y compra deshabilitada en la ficha, sin borrar la página).

**Impacto:** cero en el catálogo actual — solo actúa el día que decidas marcar algo puntual. **Esfuerzo:** bajo. Queda listo para implementar apenas des el visto bueno.

---

### Bloque 12 — Validación de archivos (magic bytes) ✅

**Problema:** `/api/upload` solo validaba la extensión del nombre del archivo, que cualquiera puede cambiar a mano.

**Qué se hizo:** verificación de la firma binaria real al inicio del archivo para PDF, PNG y JPG (los tres formatos simples y estables de chequear). AI/EPS (PostScript, variantes según versión) y TIFF (dos posibles orden de bytes) quedan solo con validación de extensión, como antes — cubrir bien esas firmas pedía más casos de los que correspondía a este ajuste puntual.

**Pruebas en vivo:** un PNG renombrado a `.pdf` y un texto plano renombrado a `.jpg` se rechazan con 400; un PDF y un JPG con firma correcta pasan el chequeo sin problema.

---

### Bloque 13 — Condición de carrera en el pago Flow.cl ✅ (fix) + 🟡 (reconciliación, propuesta)

**Problema real encontrado:** Flow.cl puede llamar al webhook `/api/pago/confirmar` más de una vez para el mismo pago (reintentos si la respuesta tardó, entregas duplicadas). El código leía "¿ya está confirmado?" con una consulta separada del `UPDATE` que lo marcaba como pagado — si dos llamadas llegaban casi juntas, ambas podían leer "no confirmado" antes de que ninguna alcanzara a escribir, y las dos mandaban los correos de confirmación duplicados al cliente y a la imprenta.

**Fix aplicado:** la condición "todavía no confirmado" pasa a ser parte del mismo `UPDATE` (`.eq('pago_confirmado', false)`). Postgres serializa los `UPDATE` que compiten por la misma fila y reevalúa la condición contra el dato ya actualizado — solo la llamada que de verdad hizo el cambio recibe confirmación de vuelta, y solo esa manda los correos. Es el patrón estándar para hacer idempotente un webhook de pago. La rama de rechazado/anulado ya tenía este resguardo, no se tocó.

**Propuesta pendiente, no implementada:** un botón "Reconsultar estado" en `/admin/pedidos` para el caso raro en que el webhook de Flow nunca llegue (caída de red, etc.) y un pedido quede pagado en Flow pero pendiente en tu base — reutilizaría la misma función que ya usa el webhook. Esfuerzo bajo-medio, dime si lo implemento.

---

### Boleta electrónica / Flow / SII 🟡

Este punto **no era un problema de código** — por instrucción tuya explícita, no se construyó ninguna integración nueva con el SII ni un mecanismo de emisión manual de boletas. Se te entregó, en un momento anterior de esta misma fase, un checklist corto de qué verificar en el portal de Flow/configuración tributaria para confirmar que tu cuenta está configurada de forma que el comprobante de Flow sustituye la boleta electrónica sin duplicar la emisión (la regla del SII "tu voucher es tu boleta" aplica solo a pagos con tarjeta vía un operador autorizado — efectivo y transferencia siempre requieren boleta aparte).

Como referencia, estas son las 4 ubicaciones donde el sitio menciona "boleta electrónica" hoy (verificadas por código, sin proponer cambios salvo que tú confirmes que corresponde):

- `app/(store)/tienda/[slug]/ProductoClient.tsx` — "Pago seguro con Flow.cl · Boleta electrónica"
- `app/(store)/carrito/page.tsx` — "Boleta electrónica · Revisamos tu archivo antes de imprimir"
- `app/terminos/page.tsx` — "Por cada compra emitimos la boleta electrónica correspondiente."
- `app/api/pago/confirmar/route.ts` — pie del correo interno: "Recuerda emitir la boleta electrónica de este pedido."

**Pendiente de tu parte:** confirmar en el portal de Flow/tu configuración tributaria que esto está bien configurado.

---

### Bloques 14-16 — Pendientes

- **14 — QA visual desktop/móvil:** no iniciado. Requiere un entorno con la tienda visible (preview) y definir contigo qué breakpoints/flujos priorizar.
- **15 — Pruebas end-to-end:** no iniciado. Incluye una pausa obligatoria antes de cualquier transacción real de dinero en Flow — no se hará sin pedirte autorización explícita en ese momento.
- **16 — Validación final:** no iniciado. `npm audit` / `tsc` / `eslint` / `build` ya se vienen verificando después de cada bloque individual; falta la pasada final consolidada + Lighthouse.

---

## 4. Estado de sincronización (importante)

Todo el trabajo se hace en un clon de tu repositorio dentro de un entorno de trabajo en la nube (porque el puente directo a tu computador — `device_bash` — sigue caído por un problema de Windows del 8 de septiembre, aún no resuelto). El flujo real es:

1. Cada bloque se prueba (`tsc`, `eslint`, `build`, y pruebas en vivo cuando aplica) y se comitea en ese clon.
2. Los archivos ya probados se copian a tu disco real (verificando primero que no haya cambios tuyos que se puedan perder).
3. **Git en tu repositorio real todavía lo tienes que correr tú** (`git add -A && git commit && git push`) — no se puede ejecutar git en tu máquina mientras `device_bash` siga caído, y el push directo desde este entorno a GitHub está bloqueado por un permiso de la sesión (no relacionado con Vercel ni con tu cuenta).

En otras palabras: **tus archivos reales ya tienen todo el contenido de los bloques marcados ✅**, solo falta que el historial de git en tu repositorio se ponga al día cuando puedas.

---

## 5. Qué necesito de ti para seguir avanzando

1. **Bloque 7:** aprobar (o ajustar) el texto de garantía legal propuesto para `/terminos`.
2. **Bloque 8:** decir si `NEXT_PUBLIC_META_PIXEL_ID` está configurada en Vercel, y aprobar/ajustar la tabla de plazos de retención propuesta.
3. **Bloque 11:** dar el visto bueno para implementar el campo de disponibilidad de productos (o decir que no hace falta por ahora).
4. **Bloque 13:** decir si quieres el botón de reconciliación con Flow en el admin.
5. **Boleta:** confirmar en el portal de Flow que tu cuenta está configurada correctamente.
6. Cuando puedas, correr `migracion-admin-login-intentos.sql` y `migracion-rate-limit-publico.sql` en el SQL Editor de Supabase (ninguna de las dos rompe nada si se demora — ambas fallan abierto).
