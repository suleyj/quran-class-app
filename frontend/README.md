# Quran Class – Frontend

Nuxt 4 frontend for the Go API in `../backend`.

- SSR/prerendered (SEO) pages: no interactivity, e.g. `/` landing page.
- SPA pages (`ssr: false`, set in `nuxt.config.ts` `routeRules`): interactive, API-backed, e.g. `/home`.

## Layout

```
app/
  api/          typed Go API calls (client.ts + one file per resource)
  components/
  layouts/
  pages/        index.vue (SSR), home.vue (SPA)
```

The browser calls `/api/*`; In dev Nitro proxies it to the Go API (prefix stripped); in production route `/api/*` to the API at the reverse proxy.

## Development

```bash
# terminal 1: API (see ../backend)
# terminal 2:
npm install
npm run dev     # http://localhost:3000
```

Set `NUXT_API_PROXY_TARGET` to change the API URL (default `http://localhost:8080`).

New pages: SSR by default; add `'/path': { ssr: false }` to `routeRules` for SPA pages.
