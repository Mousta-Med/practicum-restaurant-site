import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // In development, send /api requests to the Express server so the browser
    // only ever talks to one origin (same as production behind Vercel)
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
