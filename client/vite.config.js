import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // A fixed port of our own: auth cookies and BETTER_AUTH_URL (server/.env) depend on
    // this exact address, so fail loudly instead of silently moving to another port
    port: 5180,
    strictPort: true,
    // In development, send /api requests to the Express server so the browser
    // only ever talks to one origin (same as production behind Vercel)
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
