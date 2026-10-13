import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Rutas absolutas: con URLs como /npcs, un './assets' relativo seguiría
  // funcionando, pero con /npcs/ (barra final) apuntaría a /npcs/assets.
  base: '/',
})
