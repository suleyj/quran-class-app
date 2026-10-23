// All Go API calls go through /api, which Nitro proxies to the backend.
export const api = $fetch.create({ baseURL: '/api' })
