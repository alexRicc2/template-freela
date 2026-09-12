# Restaurant template

Monorepo with an **Astro** public site and **Payload CMS 3** on **Supabase Postgres**. The homepage and menu are CMS-driven — edit dishes in Payload and they show up on the site.

Inspired by the structure of [Feudal Burguer](https://feudalburguer.com.br/).

## Apps

| App | Path | Dev URL |
| --- | --- | --- |
| Site | `frontend` | http://localhost:4321 |
| CMS | `cms` | http://localhost:3000/admin |

## Setup

1. Copy `.env.example` to `.env` and fill in the Supabase **shared pooler** URI (session mode, port `5432`). URL-encode `/`, `@`, `#` in the password. Do not use the `db.….supabase.co` direct host on Vercel (IPv6-only).
2. Copy the same `DATABASE_URL` / `PAYLOAD_SECRET` into `cms/.env` and into the Vercel CMS project env vars.
3. Install and run:

```sh
pnpm install
pnpm dev
```

On first CMS boot, Payload creates a `payload` schema in Supabase and seeds the default restaurant content (Forja Burger). Create your admin user at `/admin`.

## Edit the menu

Payload → **Cardápio** → **Itens do cardápio** / **Categorias**. Featured items appear on the homepage hover cards. Site name, hours, address, and reservation slots live under **Configurações do site**.
