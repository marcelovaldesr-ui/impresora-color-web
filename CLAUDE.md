# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Next.js 16 / React 19)
npm run build    # Production build
npm run lint     # ESLint (config: eslint-config-next)
```

There are no automated tests in this project.

## Architecture

**Impresora Color Ltda** — print shop website for Chillán, Chile. Two distinct surfaces share the same Next.js app:

### 1. Landing page (`app/`)
Single-page marketing site assembled from section components in `app/components/`. The root layout (`app/layout.tsx`) injects JSON-LD structured data for local SEO.

### 2. Online store (`app/(store)/`)
Route group with its own layout that mounts `CarritoProvider`. Flow:
- `/tienda` — product catalog (slugs come from `lib/productos.ts`)
- `/tienda/[slug]` — product detail + options selector + file upload → adds item to cart
- `/carrito` — cart review
- `/pago` — checkout form that creates a `pedidos` row in Supabase, uploads design file to Vercel Blob, then hits `/api/pago/iniciar` to start a Flow.cl transaction
- `/confirmacion` — post-payment landing

### 3. Admin panel (`app/admin/`)
Password-only auth (cookie `admin_ic` = SHA-256 of `ADMIN_PASSWORD + ADMIN_SECRET`). `/admin/pedidos` shows all orders with status management.

## Key libraries

| Concern | Library |
|---|---|
| Database | Supabase (`lib/supabase.ts`) — single `pedidos` table, see `supabase-schema.sql` |
| Payments | Flow.cl (`lib/flow.ts`) — HMAC-SHA256 signed requests; `FLOW_ENV=sandbox` switches to sandbox |
| File storage | Vercel Blob (`@vercel/blob`) — design files uploaded via `/api/upload` |
| Email | Resend (`resend`) — quotation form submissions via `/api/cotizar` |
| Cart state | React Context + `useReducer` + `localStorage` key `carrito_ic` (`lib/carrito.tsx`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |

## Product catalog

All products are defined statically in `lib/productos.ts` as `PRODUCTOS: Producto[]`. Each product has a `calcularPrecio(opciones)` function and lookup tables at the top of the file. **Update those tables to change prices.**

`lib/productos.ts` also exports `formatCLP` (Chilean peso formatter) and `calcularIVA` (splits IVA from a gross price at 19%).

## Brand colors

- Blue: `#2D3E9F`
- Pink/magenta: `#E91E8F`

## Required environment variables

```
SUPABASE_URL
SUPABASE_SERVICE_KEY
RESEND_API_KEY
FLOW_API_KEY
FLOW_SECRET_KEY
FLOW_ENV            # "sandbox" or omit for production
ADMIN_PASSWORD
ADMIN_SECRET
NEXT_PUBLIC_BASE_URL   # e.g. https://www.impresoracolor.cl
```
